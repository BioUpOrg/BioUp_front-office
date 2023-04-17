import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "./map.css";
import L from 'leaflet';
import { Col, Container, Row } from 'react-bootstrap';
import MyMissions from '../Shipment/MyMissions';



const Maps = () => {
  function DeliveryMap() {
    const [position, setPosition] = useState(null);

    const map = useMap();

    useEffect(() => {
      map.locate({
        enableHighAccuracy:true
        
      }).on("locationfound", function (e) {
        setPosition(e.latlng);
        console.log("pos",e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }, []);
    const markerIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [12, 41]
    });

    return position === null ? null : (
      <Marker  position={position} icon={markerIcon} >
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <>
    
   <Container>
     <Row >
     
        <MyMissions/>
      
    
      <MapContainer
      center={[33.886917, 9.537499]}
      zoom={13}
      scrollWheelZoom
       enableHighAccuracy
      style={{ height: "80em" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      
      <DeliveryMap />
    </MapContainer>
     </Row>
   </Container>
   
 
    </>
  );
};

export default Maps;
