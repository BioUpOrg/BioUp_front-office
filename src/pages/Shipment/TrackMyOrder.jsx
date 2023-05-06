import React, { useState } from 'react';
import { getMyOrderLocation } from '../../services/shipmentService';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import  {map} from './map.css'
import Swal from 'sweetalert2';

function TrackMyOrder() {
  const [trackid, setTrackid] = useState("");
  const [agentposition, setAgentPosition] = useState(null);
  const handleTrackidChange = (event) => {
    const { value } = event.target;
    setTrackid(value);
  }

  const handleGetMyOrderPosition = async () => {
    try {
      const res = await getMyOrderLocation(trackid);
      if (res.data && res.data.lat && res.data.lng) {
        setAgentPosition({ lat: res.data.lat, lng: res.data.lng });
      } else {
        Swal.fire({
          title: "Try Again",
          text: "This is not a valid tracking Id, please verified again",
          icon: "error",
          timer: 3000, // 2 seconds
          showConfirmButton: true

        });       }
    } catch (error) {
      console.log(error);
    }
  }
  
  

  return (
    <div className="col-md-9">
      <div className="tab-pane fade active show">
        <div className="card">
          <div className="card-header">
            <h3 className="mb-0">Orders tracking</h3>
          </div>
          <div className="card-body contact-from-area">
            <p>
              To track your order please enter your OrderID in the box below and
              press "Track" button. This was given to you on your receipt and in
              the confirmation email or phone you should have received.
            </p>
            <div className="row">
              <div className="col-lg-8">
                <form className="contact-form-style mt-30 mb-50">
                  <div className="input-style mb-20">
                    <label>Order ID</label>
                    <input
                      name="order-id"
                      placeholder="Please Enter the TrackingID That You Receive"
                      type="text"
                      value={trackid}
                      onChange={handleTrackidChange}
                    />
                  </div>
                  <div className="container">
      <div className="row ">
        <div className="col-md-4 col-sm-4" style={{marginBottom:'2%'}}>
          <Button block onClick={handleGetMyOrderPosition}>Track</Button>
        </div>
        <div className="col-md-8 col-sm-8" style={{margin:"2%"}}>
          {agentposition && agentposition.lat && agentposition.lng && (
            <Link  style={{ fontFamily: "sans-serif" }} to={`/order/${agentposition.lat}/${agentposition.lng}`}>
              View Live position of your Order on Map
            </Link>
          )}
          
          
        </div>
      </div>
    </div>
                 

               
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackMyOrder;
