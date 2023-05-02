import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import { updateMylocation } from '../../services/shipmentService';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from "../../store/users";
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
});



const tabcord =  [];

function LeafletGeocoder({ onSearch, position }) {
  
  const [coordinates, setCoordinates] = useState(null);
  const [routingControl, setRoutingControl] = useState(null); // Add state variable for routing control
  const [pos,setPos]=useState(null);
  const map = useMap();
  const dispatch = useDispatch();
  const token = localStorage.getItem("TOKEN_KEY");
  const decoded = jwt_decode(token);
  const userId = decoded._id;  

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
    const marker = L.marker(latlng)
      .addTo(map)
      .bindPopup(e.geocode.name)
      .openPopup();
    map.fitBounds(e.geocode.bbox);
    marker.on('click', function() {
      Swal.fire({
        title: 'Do you want to remove this marker?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          map.removeLayer(marker);
          const index = tabcord.indexOf(latlng);
          if (index > -1) {
            tabcord.splice(index, 1);
             window.location.reload();
          }
        }
      });
    });
  });

  searchControl.addTo(map);

  return () => {
    map.removeControl(searchControl);
  };
}, [map]);


  useEffect(() => {
    setPos(position);
  }, [position]);

  useEffect(() => {
    if (coordinates) {
      onSearch(coordinates);
      console.log(coordinates);
       
   
    
      if (tabcord.length === 0 || tabcord[0] !== pos) {
        tabcord.splice(0);
           tabcord[0]=pos;
        console.log('initpos', );

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
      if (routingControl !== null) {
        map.removeControl(routingControl);
      }
      
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
      
      // Set routingControl state variable to new routing control
      setRoutingControl(routing);
   
    }
    dispatch(setUserId(userId));

    updateMylocation(pos,userId);

  }, [coordinates, onSearch, pos]);


  
  return null;
}

export default LeafletGeocoder