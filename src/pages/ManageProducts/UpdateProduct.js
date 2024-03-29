import { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../../src/services/api";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const param = useParams();
  const [product, setProduct] = useState({
    id: param.id ,
    name: "",
    unitPrice: 0,
    img: "",
    like: 0,
    quantityWeight: 0,
    description: "",
  });
  const dispatch = useDispatch()
  const { name, unitPrice, quantityWeight, description } = product;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getProductFunction();
  }, []);

  const getProductFunction = async () => {
    const response = await getProduct(param.id);
    setProduct(response.data);
  };
  const onValueChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const onFileHandle = (e) => {
    console.log(e.target.files);
    setProduct({ ...product, [e.target.name]: e.target.files[0].name });
  };
  const UpdateP= async () => {
    setIsLoading(true);
    const res = await updateProduct(param.id,product);
    console.log(res)
    if(res.status ===200){
      setIsLoading(false);
    //  dispatch(updateProductReducer(product))
      navigate("/Dashboard/Products/myproducts");

    }
    
  };
  return (
    <>
      <Container style={{ marginTop: "30px" }}>
        <h2>Modify Your {name} Product</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
                onChange={(e) => onValueChange(e)}
              name="name"
              value={name}
              type="text"
              placeholder="Enter a Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description "
                onChange={(e) => onValueChange(e)}
              name="description"
              value={description}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>unitPrice</Form.Label>
            <Form.Control
              type="number"
                onChange={(e) => onValueChange(e)}
              name="unitPrice"
              value={unitPrice}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>quantityWeight</Form.Label>
            <Form.Control
              type="number"
                onChange={(e) => onValueChange(e)}
              name="quantityWeight"
              value={quantityWeight}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
                onChange={(e) => onFileHandle(e)}
              name="img"
            />
          </Form.Group>
          <Button variant="primary" onClick={()=>UpdateP()}>
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
            <> Update Product</>
          )}
          </Button>
          <Button onClick={() => navigate("/products")} variant="secondary">
            Cancel
          </Button>
        </Form>
      </Container>
    </>
  );
}
