import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Services() {
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
    
      <Link to={"/delivery-agent-contract-form"}> click To visit delivery agent form</Link>
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
