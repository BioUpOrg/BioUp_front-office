import React, { useState } from 'react';
import { getMyOrderLocation } from '../../services/shipmentService';
import { Button } from 'react-bootstrap';
import OrderPosition from './OrderPosition';
import { Link } from 'react-router-dom';

function TrackMyOrder() {
  const [trackid, setTrackid] = useState("");
  const [agentposition, setAgentPosition] = useState(null);
  const [error, setError] = useState(null);
  const handleTrackidChange = (event) => {
    const { value } = event.target;
    setTrackid(value);
  }

  const handleGetMyOrderPosition = async () => {
    try {
      const res = await getMyOrderLocation(trackid);
      if (res && res.data) {
      await  setAgentPosition({ lat: res.data.lat, lng: res.data.lng });
        setError(null);
      } else {
        setAgentPosition(null);
        setError("Please verify your tracking ID");
      }
    } catch (error) {
      setAgentPosition(null);
      setError(error.message);
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

                 <Button onClick={handleGetMyOrderPosition}>Track</Button>
                 {agentposition && agentposition.lat && agentposition.lng && (
          <Link   to={`/order/${agentposition.lat}/${agentposition.lng}`}>
          View Order Position
         </Link>
)}

                  {error && (
                    <p style={{color: 'red'}}>{error}</p>
                  )}
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
