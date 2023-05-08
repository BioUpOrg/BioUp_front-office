import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.js";
import {map} from './map.css';

import L from 'leaflet';
import {  Button, Col, Container, Row } from 'react-bootstrap';
import MyMissions from '../Shipment/MyMissions';
import LeafletGeocoder from '../Shipment/LeafletGeocoder';
import Routing from '../Shipment/Routing';
import { useDispatch, useSelector } from 'react-redux';

const Maps = () => {
  const dispatch =useDispatch()
  const [searchCoordinates, setSearchCoordinates] = useState(null);
  const [route, setRoute] = useState(null);
  const tabcordFromLocalStorage = JSON.parse(localStorage.getItem('tabcord'));
 



  const handleSearch = (e) => {
    const result = e?.geocode?.features?.[0];
    if (result) {
      console.log("result",result)
      const geometry = result.geometry;
      const latLng = L.latLng(geometry.coordinates[1], geometry.coordinates[0]);
      setSearchCoordinates(latLng);
    }
  };

  useEffect(() => {
    
    console.log("searchCoordinates", searchCoordinates);
  }, [searchCoordinates]);

  function DeliveryMap() {
    const [position, setPosition] = useState(null);
    const [deliveryPosition, setDeliveryPosition] = useState(null);
    const [draggable, setDraggable] = useState(true);


    const map = useMap();

    useEffect(() => {
     console.log("tabc",tabcordFromLocalStorage)
      map.locate({
        enableHighAccuracy:true
      }).on("locationfound", function (e) {
        setPosition(e.latlng);
        console.log("pos",e.latlng);
        map.flyTo(e.latlng, map.getZoom(13));
      });
    }, []);
    useEffect(() => {
      if (position) {
        setDeliveryPosition(position);
      }
    }, [position]);


    
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
      <>
      <Marker position={position} icon={markerIcon} draggable={draggable} eventHandlers={{
    dragend: (event) => {
      setPosition(event.target.getLatLng());
      console.log("new position", position)
    },
  }} >
          <Popup>You are here</Popup>
        </Marker>
        {searchCoordinates && <Marker position={searchCoordinates} />
        }
        
        <LeafletGeocoder  
        onSearch={handleSearch} 
         position={deliveryPosition}
     
/>
      </>
    );

  }
const seeViewFullScreen=()=>{
var mapId=document.getElementById('map');
mapId.requestFullscreen();
}
  return (
    <>
        <MyMissions/>

      <Container id='map'>
        <Row>

          <Col>

          <MapContainer  
              center={[33.886917, 9.537499]}
              zoom={13}
              scrollWheelZoom
              enableHighAccuracy
              className='map-container'
              style={{ height: "100vh",width:"100%",display:'flex' }}
            >
            <TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution="Map data © <a href='https://openstreetmap.org'>OpenStreetMap</a> contributors"
/>
              <DeliveryMap  />

            </MapContainer>

          </Col>
           

          
        </Row>
        <Row  className='col-sm-3 ' style={ {marginTop:'2%'}} >
          <Col >
            <Button onClick={seeViewFullScreen}>see On Full Screen</Button>
          </Col>
         
        </Row>
      </Container>
    </>
  );
  
  }
  
  export default Maps;  