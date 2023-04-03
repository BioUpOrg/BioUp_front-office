import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


function MapPage({ onMapClick }) {
    function handleClick(e) {
        onMapClick(e.latlng);
      }
    
      return (
        <div style={{ height: '300px', width: '100%' }}>
          <MapContainer center={[33.8869, 9.5375]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ClickHandler onClick={handleClick} />
          </MapContainer>
        </div>
      );
    }
    
    function ClickHandler({ onClick }) {
      useMapEvents({
        click(e) {
          onClick(e);
        },
      });
    
      return null;
    }
    

export default MapPage;