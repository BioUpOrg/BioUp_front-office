import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import { addProduct } from "../../../src/services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductReducer } from "../../store/slices/productSlice";
import Row from "react-bootstrap/Row";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { TextField } from '@mui/material';


function AddProduct() {

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    pic:'',
    like: 0,
    quantity: 0,
    description: "",
    categorie : "",
    user:""

  });
  const [pic, setPic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = product;


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.entities.users.userId);
  console.log("userId",userId);

  const handleChange = (e) => {
    console.log(e.target.value);
    setProduct({ ...product, [e.target.name]: e.target.value });
    console.log(product);

  };
  const handleChangeFile = (e) => {
    /*console.log(e.target.files[0].name);
    console.log(e.target.name); */

    setProduct({ ...product, pic: e.target.files[0] });
    console.log(product); 
    console.log("file",e.target.files[0]);
    //setPic(event.target.files[0]);

  };
  const handleChangeSelect =(e) => {
    if(product.categorie === ""){
      setProduct({ ...product, categorie: e.target.value });
    }
    else if(!product.categorie.includes(e.target.value)){
      setProduct({ ...product, categorie:
        product.categorie+"|"+e.target.value });
    }
         console.log(product);

  }
  const cancelchange= (e) => {
    setProduct({ ...product, categorie: ""});

  }


  const add = (e) => {

    e.preventDefault();
    setIsLoading(true);
    console.log("product in insertion",product);
    const formData = new FormData();
formData.append('file', product.pic);
formData.append('name', product.name);
formData.append('price', product.price);
formData.append('like', product.like);
formData.append('quantity', product.quantity);
formData.append('description', product.description);
formData.append('categorie', product.categorie);
formData.append('user', product.user);
const userData = formData;

    addProduct(userData).then(() => {
      console.log("product in insertion",userData);
      setIsLoading(false);
      dispatch(addProductReducer(userData));
      navigate("/products/list");
    });
  };
  useEffect(() => {
    setProduct({ ...product, user: userId });
    console.log("product",product);
  }, []);

  return (
    <Container style={{ marginTop: "30px" }}>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Enter the name"
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
     

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the product description"
            name="description"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicSelect">
    <Form.Label>Select Norm Type</Form.Label>
    <Form.Select
      type="text"
      name="categorie"
      onChange={(e) => handleChangeSelect(e)}
      >
      <option value="Bio food">Bio food</option>
      <option value="Cosmetic">Cosmetic</option>
      <option value="Other">Other</option>
    </Form.Select>
    <Row >
        <p >{product.categorie}</p>
        <a  style={{color:'red', border:'1px solid red', width:'5rem', display:'flex', justifyContent:'center', borderRadius:'0.6rem', marginLeft:'1rem'}} onClick={(e) => cancelchange(e) } >
    Cancel
        </a>
        </Row>
     
  </Form.Group>

  
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <TextField name="pic" fullWidth type="file" onChange={handleChangeFile} />
               </Form.Group>
        <Button variant="primary" type="submit" onClick={(e) => add(e)}>
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            <> Add Product</>
          )}
        </Button>
        {/* <Button variant="gray" type="reset">
          Save
        </Button> */}
      </Form>
    </Container>
  );
}

export default AddProduct;
