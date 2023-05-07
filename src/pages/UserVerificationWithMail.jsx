import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import { BASE_URL } from '../endpoints';
const UserVerificationWithMail = () => {
const [msg,setMsg]=useState('');
const {token}= useParams();

const urlverifMail =BASE_URL+"users/check/activate/account/";
 const verifyToken= async (token)=>{
    token = token || ''
    return axios.get(`${urlverifMail}${token}`)
        .then(response => {
          console.log(response.data)
            return response.data;
        })
        .catch(error => {
            return error;
        })
 }
    const status= verifyToken(token).then(response=>{
        console.log(response);
    console.log("res",response);
    if(response ==="unverified"){
      setMsg("Your account Not Verified Please check your mail ");
    }else{
   
      setMsg(`Hi ,${response.lastName} ${response.firstName} your Account has been  Verified`);
    }
    
 })


  return (
    <Container style = {{marginTop:'3%'}}>
      <Row className="justify-content-center">
        <Col md={10}>
          <div className="swiper-slide">
            <div className="card-2 bg-9 wow animate__animated animate__fadeInUp">
              <figure className="img-hover-scale overflow-hidden">
                <a>
                <h2 class="display-2 mb-30">{msg}</h2>
                  <img src="assets/imgs/shop/cat-13.png" alt="" />
                </a>
              </figure>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UserVerificationWithMail
