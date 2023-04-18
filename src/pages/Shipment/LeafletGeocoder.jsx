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

function LeafletGeocoder({ onSearch }) {
  const [coordinates, setCoordinates] = useState(null);
  const map = useMap();
const tabcord=[]
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
      tabcord.push(coordinates); // Add coordinates to the existing tabcord array
      console.log(tabcord);
     /*  L.Routing.control({
        waypoints: [L.latLng(36.8002068, 10.1857757), L.latLng(tabcord[0])],
        routeWhileDragging: true,
      }).addTo(map);*/
    }
  }, [coordinates, onSearch]);




  return null;
}

export default LeafletGeocoder;
