import React, { useEffect, useState } from 'react'
import { deleteshipment, getAllshipments } from '../../services/shipmentService'
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
function Manageshipment() {
   const [shipments,setShipments]=useState([]);

    useEffect(()=>{
        getAllshipments().then(res=>{
            console.log(res.data);
            setShipments(res.data);
        }).catch(err=>{
            console.log(err);
        })



    },[]);

    const removeShipment = (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteshipment(id).then(res => {
            if (res) {
              console.log(res.data);
              window.location.reload();
            }
          }).catch(err => {
            console.log(err);
          })
          Swal.fire(
            'Deleted!',
            'Your shipment has been deleted.',
            'success'
          )
        }
      })
    }
  return (
    <section className="mt-50 mb-50">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 mb-40">
          <h1 className="heading-2 mb-10">List Of Shipments</h1>
          <div className="d-flex justify-content-between"></div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive shopping-summery">
            <table className="table table-wislist">
              <thead>
                <tr className="main-heading">
                  
                  <th className="col">Transporter name </th>
                  <th className="col">Transporter picture</th>
                  <th className="col">Transporter Contact</th>
                  <th className='col'>Shipment Detail</th>
                  <th className="col">Shipment Status</th>
                  <th className='col'>Action</th>


                </tr>
              </thead>
              <tbody>
              {shipments && shipments.map((s) => {
  return (
    <tr key={s._id}>
      <td>{s.shipment_agent.firstName}{s.shipment_agent.lastName}</td>
      <td><img src={s.shipment_agent.pic}/></td>
      <td>{s.shipment_agent.email ? s.shipment_agent.email : s.shipment_agent.phone}</td>
      <td>
        {s.shipment_items.map((item) => {
          return (
            <div key={item._id}>
              <p>Place: {item.commande_id.deliveryPlace}</p>
              <p> Total Price:{item.commande_id.totalPrice}</p>
              {item.commande_id.products.map((product) => {
                return (
                    <>
                  <div key={product._id}>
                    <p>Product: {product.type}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                  <hr style={{marginRight:'10%'}}/>
                  </>
                );
              })}
            </div>
          );
        })}
      </td>
      <td>{s.shipment_status ? 'Shipped' : 'Not Shipped' }</td>
      <td><Button onClick={()=>removeShipment(s._id)}>Delete Shipment</Button></td>
    </tr>
  );
})}

              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="divider center_icon mt-50 mb-50">
        <i className="fi-rs-fingerprint"></i>
      </div>
      <div className="row"></div>
    </div>
  </section>
  )
}

export default Manageshipment;
