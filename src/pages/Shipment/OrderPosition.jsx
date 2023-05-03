import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.js";
import "../../pages/locationAgent/map.css";
import L from 'leaflet';
import { Col, Container, Row } from 'react-bootstrap';

function OrderPosition() {
  const pathname = window.location.pathname;
  const [orderPos, setOrderPos] = useState(null);
  const [distance, setDistance] = useState(null);
const [estimtime,setestimeTime]=useState(null);
  useEffect(() => {
    if (pathname) {
        const values = pathname.split('/').slice(2); // ['36.798', '10.1717']
        const lat = values[0]; // '36.798'
        const lng = values[1]; // '10.1717'
        console.log(lat,lng);
        setOrderPos({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }
  }, [pathname]);

  const MapOrder = () => {
    const [mypos, setmypos] = useState(null);
    const [route, setRoute] = useState(null);

    const map = useMap();

    useEffect(() => {
      map.locate({
        enableHighAccuracy: true
      }).on("locationfound", function (e) {
        setmypos(e.latlng);
        console.log("pos", e.latlng);
        map.flyTo(e.latlng, map.getZoom(13));
      });
    }, []);

    useEffect(() => {
      if (mypos && orderPos) {
        const d = mypos.distanceTo(orderPos).toFixed(0);
        setDistance(d/1000);;
        const estimatedtime=((d/1000)/80).toFixed(2);
        setestimeTime(estimatedtime);
        const router = L.Routing.control({
          waypoints: [
            L.latLng(mypos.lat, mypos.lng),
            L.latLng(orderPos.lat, orderPos.lng)
          ],
          createMarker: ()=>null,
          
          router: new L.Routing.osrmv1({
            draggableWaypoints: false, // disable dragging of waypoints
          }),
         
          fitSelectedRoutes: false,
          show: false,
        
        });
        router.addTo(map);
        setRoute(router);
      }
    }, [mypos, orderPos]);
  

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
    const redMarkerIcon = L.icon({
      iconUrl: 'https://clipground.com/images/png-marker-7.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [12, 41]
    });
   
    
    
    return mypos === null ? null : (
      <>
        <Marker position={mypos} icon={markerIcon} 
        >
          <Popup>You are here</Popup>
        </Marker>

        {orderPos && (
          <Marker position={orderPos} icon={redMarkerIcon}>
            <Popup>Order position</Popup>
          </Marker>
          
        )}
        

      </>
    );
  };
  
  return (
    <>
      <Container style={{display:"block"}}>
        <Row className='justify-content-center'>
          <Col style={{ marginTop: "3%", marginBottom: "3%" }}>
            <MapContainer
              center={[33.886917, 9.537499]}
              zoom={8}
              scrollWheelZoom
              enableHighAccuracy
              style={{ height: "60vh", width: "100%", display: 'flex' }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}@2x.png?key=8C2aiIdUf5jqf5kpbfKD"
              />
              
              <MapOrder  />
             

            </MapContainer>
         {
  distance && estimtime &&
  <div style={{margin:'2%'}}>
    {distance === 0 ?
      <h4 style={{color:"green",margin:'1%'}}>Congratulations! Your order has arrived.</h4> :
      <>
        <h4>The Distance Between you and your Order Is:</h4>
        <h3 style={{color:"green",margin:'1%'}}>{distance} Km</h3>
        <h4>Estimated Time:</h4>
        <h3 style={{color:"green",margin:'1%'}}>{estimtime} h</h3>
      </>
    }
  </div>
}

          </Col>
        </Row>
       </Container>
         
   
    </>
  );
}

export default OrderPosition;
