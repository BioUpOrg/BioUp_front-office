import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { getProduct } from "../../../src/services/api";
import Rating from '@mui/material/Rating';
import { addRating , getRating } from "../../../src/services/api";
import { useSelector } from "react-redux";
import { Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import RecomendationCard from './recomendationCard';
import data from '../../data.json';

export default function ProductDetails() {
 // const product = useSelector((state)=>state.entities.products.products)
 const allProducts = useSelector((state)=>state.entities.products.products)
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [rating, setRating] = useState({
    ratingValue: 0,
    product: "",
    user: ""
  });
  const param = useParams();
  const [value, setValue] = useState(2);
  const userId = useSelector((state) => state.entities.users.userId);
  console.log("userId", userId);

  useEffect(() => {
    getProduct(param.id).then((res) => {
      setProduct(res.data);
      const products = data; // assuming data.json contains the product data
      const relatedProductIds = getProductsInSameCluster(products, res.data._id);
      setRelatedProducts(relatedProductIds);
    });
  }, []);

  function addRatingP(e) {
    const user = userId;
    const product = param.id;
    const ratingValue = value;
    setRating({ ratingValue, product, user });
   // console.log("rating", rating);
  }

  function add() {
    addRating(rating).then((res) => {
      console.log("rating added successfully");
    });
  }

  function getProductsInSameCluster(products, productId) {
    const clusterId = products.find(
      (product) =>
        product.product1 === productId ||
        product.product2 === productId ||
        product.product3 === productId ||
        product.product4 === productId
    ).cluster;

    const productsInSameCluster = products
      .filter((product) => product.cluster === clusterId)
      .map((product) => [product.product1, product.product2, product.product3, product.product4])
      .flat()
      .filter((product) => product !== undefined && product !== productId);

    return productsInSameCluster;
  }

  return (
    <Container style={{ marginTop: "30px" }}>
      {product._id !== undefined ? (
        <Row>
          <Col md={6}>
            {product?.pic ? (
              <img src={product?.pic} alt="product" width={500} height={500} />
            ) : (
              <Icon icon="mdi:camera" style={{ fontSize: "100px" }} />
            )}
          </Col>
          <Col md={6}>
            <h1>{product.name}</h1>

            <h5>Description : </h5>
            <p style={{ marginLeft: "50px" }}>{product.description}</p>
            <h5>Price :</h5>
            <p style={{ marginLeft: "50px" }}>{product.price} DT</p>

            <Rating
              name="simple-controlled"
              value={value}
              onChange={(e, ratingValue) => {
                setValue(ratingValue);
                addRatingP(e);
                add();

                console.log("ratingValuenow", product.rating);
              }}
            />

            <p>rating :{product.rating}</p>
          </Col>
        </Row>
      ) : (
        <h1>loading</h1>
      )}
      <Container >

      <h5>Related Products</h5>
      </Container>


      <Row>
        {relatedProducts.map((productId) => (
          <Col md={3} key={productId}>
            <RecomendationCard productId={productId} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
