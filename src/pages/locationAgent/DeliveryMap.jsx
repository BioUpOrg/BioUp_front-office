import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.js";
import "./map.css";

import L from 'leaflet';
import { Col, Container, Row } from 'react-bootstrap';
import MyMissions from '../Shipment/MyMissions';
import LeafletGeocoder from '../Shipment/LeafletGeocoder';

const Maps = () => {
  const [searchCoordinates, setSearchCoordinates] = useState(null);
  const [route, setRoute] = useState(null);

  const handleSearch = (e) => {
    const result = e?.geocode?.features?.[0];
    if (result) {
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

    useEffect(() => {
      if (searchCoordinates) {
        const router = L.Routing.control({
          waypoints: [
            L.latLng(position.lat, position.lng),

            searchCoordinates
          ],
          
          routeWhileDragging: true,
          showAlternatives: false,
          lineOptions: {
            styles: [{ color: '#007bff', weight: 6 }]
          },
          createMarker: function (i, waypoint, n) {
            if (i === 0) {
              return L.marker(waypoint.latLng, { icon: markerIcon, draggable: true }).bindPopup('Start').openPopup();
            } else {
              return L.marker(waypoint.latLng, { icon: markerIcon, draggable: true }).bindPopup('End').openPopup();
            }
          }
        });

        setRoute(router);
        router.addTo(map);
      }
    }, [position, searchCoordinates]);

    return position === null ? null : (
      <>
        <Marker position={position} icon={markerIcon}>
          <Popup>You are here</Popup>
        </Marker>
        {searchCoordinates && <Marker position={searchCoordinates} />}
      </>
    );
  }

  return (
    <>
      <Container>
        <Row>
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
            <LeafletGeocoder 
              onSearch={handleSearch}
            />
            
            <DeliveryMap />
          </MapContainer>
        </Row>
      </Container>
    </>
  );
  }
  export default Maps;  