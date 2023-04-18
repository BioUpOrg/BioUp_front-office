import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { getProduct } from "../../../src/services/api";
import Rating from '@mui/material/Rating';
import { addRating , getRating } from "../../../src/services/api";
import { useSelector } from "react-redux";
import { Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';




function ProductDetails() {
  const product = useSelector((state) => state.entities.products.selectedProduct);
  const [rating, setRating] = useState({
    ratingValue: 0,
    product:"",
    user:""
  });
  const param = useParams();
    const [value, setValue] = useState(2);
    const userId = useSelector((state) => state.entities.users.userId);
    console.log("userId",userId);

    
    const [ratingV, setRatingV] = useState({
      ratingVa: 0,
    });
    useEffect(() => {
   //   getProductFunction();
      setRatingV({ ...ratingV, ratingVa: getRating(product._id) }); 


     
    }, []) ;
    const addRatingP = async (e) => {
      e.preventDefault();
      console.log("target",e.target.value);
      setRating({ ...rating, ratingValue: e.target.value, product: product._id,user:userId  });
    //setRating({ ...rating, product: product._id });
      console.log("rating",rating);
      console.log("ok");
  }
  const add = async () => {
    console.log("rating btn",rating);
    await addRating(rating);
  }
  
    const getProductFunction = async () => {
     /* const response = await getProduct(product._id);
      product = response.data;
      console.log(response.data)*/

    }; 

  return (
    <Container style={{ marginTop: "30px" }}>
       {product._id !== undefined ? <Row>
         

<Col md={8}>


          <Col md={8}>
          <Row>
          <Col md={12}>
            <h1>{product.name}</h1>

            </Col>
            <Col md={12}>
            {product?.pic ? (
              <img src={product?.pic} alt="product" width={200} height={200}/>
            ) :
            <Icon icon="mdi:camera" style={{ fontSize: '100px' }} />
          

            }
            </Col>
            </Row>
            <Row>
            <Col md={12}>
            <h5>Description : </h5>
            </Col>
            <Col>
            <p style={{ marginLeft: "50px"}}>
            {product.description}
            </p>
            </Col>
            </Row>
            <Row>
        
            </Row>      
          </Col>
          </Col>

      
        </Row> : <p> Product does not exist </p>}


      </Container>
  )
}

export default ProductDetails