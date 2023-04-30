import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProduct } from '../../../src/services/api';
import { useNavigate } from 'react-router-dom';

const RecomendationCard = ({ productId }) => {
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(productId).then((res) => {
      setProduct(res.data);
    });
  }, [productId]);
  const redirect = () => {
    //window.location.reload();
  };

  return (
    <Card style={{ width: '18rem', marginTop: '10px' }}>
      <Link to={`/products/${product._id}`}>
        <Card.Img variant="top" src={product.pic} width={5} height={200} />
      </Link>
      <Card.Body>
        <Link onClick={()=>redirect()} to={`/products/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>{product.price} DT</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RecomendationCard;
