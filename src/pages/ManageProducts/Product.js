import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { increment } from "../../store/slices/cartSlice";
import { deleteProduct, getProducts } from "../../../src/services/api";
import { Icon } from '@iconify/react';
import { BsTrash } from "react-icons/bs";
import { BsInfoCircle } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { selectProduct,deleteProductReducer } from "../../../src/store/slices/productSlice";
import {useNavigate} from "react-router-dom";


function Product(props) {
  const navigate = useNavigate();
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
    dispatch(deleteProductReducer(product));
    window.location.reload(false);

   }
}
  const addToCart = (p) => {
    dispatch(increment(p));
  };
  const handleProductDetails = () => {
    dispatch(selectProduct(product));
  };

  useEffect(() => {
    console.log("Likes Update");
  }, []);
  const className = likes > 5 ?"bestProduct mx-auto my-2":"mx-auto my-2" ;
  return (
    <tr  className={className}>
 
      <td>
        {product?.pic ? (
              <img src={product?.pic} alt="product" width={60} height={60} />
            ) :
            <Icon icon="mdi:camera" style={{ fontSize: '100px' }} />
          

            }
      </td>
          

        <td>
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>{product.quantity}</td>
      
        
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
                  <td className="text-center">

          
            <BsTrash
            size={20}
            color="#FF0000"
            style={{ cursor: "pointer" }} onClick={() =>{
deleteProd(product._id)
}}                
/>
<NavLink to={`/products/update/${product._id}`} >
            <FiEdit
              size={20}
              color="#FFA500"
              style={{ cursor: "pointer", marginInline: "10px" }}
            />
          </NavLink>
          <NavLink  to={"/Dashboard/product-details/Description"} >
            <BsInfoCircle
              size={20}
              color="#00FF00"
              style={{ cursor: "pointer" }}
              onClick={handleProductDetails}

            />
          </NavLink>

          </td>
            
         
    </tr>
  );
}

export default Product;
