import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { increment } from "../../store/slices/cartSlice";
import { deleteProduct, getProducts } from "../../../src/services/api";
import { Icon } from '@iconify/react';

function Product(props) {
  const [product,] = useState(props.product);
  const [likes, setLikes] = useState(props.product.like);
  const dispatch = useDispatch();
  const like = () => {
    setLikes(likes + 1);
  };
  const deleteProd = async (id) => {
    const result = window.confirm("Are you sure you want to delete?");
  if (result) {
    await deleteProduct(id);
    getProducts();
   }
}
  const addToCart = (p) => {
    dispatch(increment(p));
  };
  useEffect(() => {
    console.log("Likes Update");
  }, []);
  const className = likes > 5 ?"bestProduct mx-auto my-2":"mx-auto my-2" ;
  return (
    <Card style={{ width: "18rem" }} className={className}>
 
      <Card.Body>
        {product?.pic ? (
              <img src={product?.pic} alt="product" />
            ) :
            <Icon icon="mdi:camera" style={{ fontSize: '100px' }} />
          

            }
          

        <Card.Title>
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>Price :{product.price}</Card.Text>
        <Card.Text>Quantity :{product.quantity}</Card.Text>
        <Row>
      
        
          {/* <Col md={6}>
            <Button
            size="sm"
              variant="primary"
              onClick={() => props.buyFunction(product)}
              disabled={product.quantity <= 0}
            >
              Buy
            </Button>
          </Col> */}
        </Row>
        <br></br>
        <Row>
            <Col md={6}>       
            </Col>
            
          </Row>
         
      </Card.Body>
    </Card>
  );
}

export default Product;
