import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from "react-bootstrap";
import { NavLink, useParams } from 'react-router-dom';
import { getProduct } from "../../../src/services/api";
import Rating from '@mui/material/Rating';
import { addRating , getRating } from "../../../src/services/api";
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import RecomendationCard from './recomendationCard';
import data from '../../data.json';
import { addItemToCart, decrement, increment } from '../../store/cart';
import { addItemToWishList } from '../../store/wishlist';

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

  //cart code 
  const dispatch = useDispatch();

  const handleIncrementOnClick = (product) => {
    const cartItem = { cartItem: { ...product }, quantity: 0, type: "product" };
    dispatch(increment(cartItem));

  };
  const handleDecrementOnClick = (product) => {
    const cartItem = { cartItem: { ...product }, quantity: 0, type: "product" };
    dispatch(decrement(cartItem));

  };
  const addToCartOnClick = (product) => {
    const cartItem = { cartItem: { ...product }, quantity: 0, type: "product" };
    dispatch(addItemToCart(cartItem));
  };

  const handleAddToWishListOnClick = (compost) => {
    dispatch(addItemToWishList(compost));
  };



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
            <div className="detail-extralink">
                          <div className="detail-qty border radius">
                            <NavLink
                              className="qty-down"
                              onClick={() => {
                                handleDecrementOnClick(product);
                              }}
                            >
                              <i className="fi-rs-angle-small-down"></i>
                            </NavLink>
                            <div className="qty-val">{0}</div>
                            <NavLink
                              className="qty-up"
                              onClick={() => {
                                handleIncrementOnClick(product);
                              }}
                            >
                              <i className="fi-rs-angle-small-up"></i>
                            </NavLink>
                          </div>
                          <div className="product-extra-link2">
                            <button
                              className="button button-add-to-cart"
                              onClick={() => {
                                addToCartOnClick(product);
                              }}
                            >
                              Add to cart
                            </button>
                            <NavLink
            to={"/wishlist"}
            onClick={() => {
              handleAddToWishListOnClick(product);
            }}
              aria-label="Add To Wishlist"
              className="action-btn hover-up"
            >
                              <i className="fi-rs-heart"></i>
                              </NavLink>
                            <NavLink
                              aria-label="Compare"
                              className="action-btn hover-up"
                            >
                              <i className="fi-rs-shuffle"></i>
                            </NavLink>
                          </div>
                        </div>
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
