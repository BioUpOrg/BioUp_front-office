import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { getMyContract } from "../services/contractService";
import Swal from 'sweetalert2';
function Services() {
  const token =  localStorage.getItem("TOKEN_KEY");
  const decoded = jwt_decode(token);
  const userId=decoded;
  const navigate=useNavigate();
const hanleClickform=()=>{
  getMyContract(userId._id).then(res=>{   
    if(res){

      Swal.fire({
        title: "Confirmation",
        text: "You have already Fill this form",
        icon: "warning",
        timer: 3000, // 2 seconds
        showConfirmButton: false
      }); 
      navigate('/');     

  }else{
    navigate('/delivery-agent-contract-form');
  }
 })
}
  return (
<Container>
 <Row className='justify-content-center'>
     
     <div  style={{margin:'2%'}}>
  <div className="featured-card">
    <img src="/assets/imgs/theme/icons/icon-2.svg" alt="" />
    <h3 style={{marginBottom:'2%'}}>You Have a Car ? </h3>
    <p>
      We offer you the possibility today to join our team and be one of our delivery agents 
    </p>
    <p>
    what you waiting for , click the button and fill the form to be one of us 
      </p>
    
      <Button  onClick={hanleClickform}> click To visit delivery agent form</Button>
  </div>
</div>

<div style={{margin:'2%'}}>
  <div className="featured-card">
    <img src="/assets/imgs/theme/icons/icon-2.svg" alt="" />
    <h4>Wide Assortment</h4>
    <p>
      There are many variations of passages of Lorem Ipsum available, but the
      majority have suffered alteration in some form
    </p>
    <a href="#">Read more</a>
  </div>
</div>

<div  style={{margin:'2%'}}>
  <div className="featured-card">
    <img src="/assets/imgs/theme/icons/icon-2.svg" alt="" />
    <h4>Wide Assortment</h4>
    <p>
      There are many variations of passages of Lorem Ipsum available, but the
      majority have suffered alteration in some form
    </p>
    <a href="#">Read more</a>
  </div>
</div>

 </Row>
</Container>

    );
}

export default Services;
