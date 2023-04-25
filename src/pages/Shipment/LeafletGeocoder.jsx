import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
});



const tabcord = [];

function LeafletGeocoder({ onSearch, position }) {
  const [coordinates, setCoordinates] = useState(null);
  const map = useMap();
  function sortTabcordByNearestDistance(point) {
    tabcord.sort((a, b) => {
      const distanceA = point.distanceTo(a);
      const distanceB = point.distanceTo(b);
      return distanceA - distanceB;
    });
  }

  
  useEffect(() => {
    const searchControl = L.Control.geocoder({
      defaultMarkGeocode: false,
    }).on('markgeocode', function (e) {
      const latlng = e.geocode.center;
      setCoordinates(latlng);
      L.marker(latlng)
        .addTo(map)
        .bindPopup(e.geocode.name)
        .openPopup();
      map.fitBounds(e.geocode.bbox);
    });

    searchControl.addTo(map);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  useEffect(() => {
    if (coordinates) {
      onSearch(coordinates);
      console.log(coordinates);
    
      if (tabcord.length === 0 || tabcord[0] !== position) {
        tabcord.push(position);
        console.log('initpos', position);
      }
    
      tabcord.push(coordinates);
      console.log('tabcord', tabcord);
    
      // Sort tabcord array based on nearest distance to the initial position
      sortTabcordByNearestDistance(tabcord[0]);
    
      // Calculate total distance and nearest place/distance
      let totalDistance = 0;
      let nearestPlace = null;
      let nearestDistance = null;
    
      for (let i = 1; i < tabcord.length; i++) {
        const distance = tabcord[0].distanceTo(tabcord[i]);
    
        if (nearestDistance === null || distance < nearestDistance) {
          nearestDistance = distance;
          nearestPlace = tabcord[i];
        }
    
        totalDistance += distance;
      }
    
      console.log('nearestPlace', nearestPlace);
      console.log('nearestDistance', nearestDistance);
      console.log('totalDistance', totalDistance);

      // Remove any existing routing control from the map
      map.eachLayer((layer) => {
        if (layer instanceof L.Routing.control) {
          map.removeControl(layer);
        }
      });
    
      // Create a new routing control using Dijkstra's algorithm to calculate the shortest path
      const routing = L.Routing.control({
        waypoints: tabcord.map((c) => L.latLng(c)),
        createMarker: () => null, // Do not create markers for start and end waypoints
        router: new L.Routing.osrmv1({
          draggableWaypoints: false, // disable dragging of waypoints
        }), // Use OSRM router with Dijkstra's algorithm
        lineOptions: {  

          styles: [
            { color: 'blue', opacity: 1, weight: 1.5 },

          ],
        },
      }).addTo(map);
    
      routing.setWaypoints(tabcord.map((c) => L.latLng(c)));
    }
    
  }, [coordinates, onSearch, position]);

  return null;
}

export default LeafletGeocoder