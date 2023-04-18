import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

const tabcord = []; // Declare tabcord outside of the component

function LeafletGeocoder({ onSearch }) {
  const [coordinates, setCoordinates] = useState(null);
  const map = useMap();

  useEffect(() => {
    const searchControl = L.Control.geocoder({
      defaultMarkGeocode: false,
    
    }).on('markgeocode', function (e) {
      var latlng = e.geocode.center;
      setCoordinates(latlng);
      L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
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
    }
  }, [coordinates, onSearch]);

  return null;
}

export default LeafletGeocoder;
