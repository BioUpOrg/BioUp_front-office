import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import {
  decrement,
  increment,
  remove,
  selectCart,
  selectCountAll,
  selectTotal,
} from "../ReduxToolkit/slices/cartSlice";
export default function Cart(props) {
  const Total = useSelector(selectTotal);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  function TotalPrice(price, q) {
    return Number(price * q).toString();
  }
  const addItemToCart = (p) => {
    dispatch(increment(p));
  };
  const RemoveItemFromCart = (p) => {
    dispatch(decrement(p));
  };
  const DeleteItem = (p) => {
    dispatch(remove(p));
  };
  return (
    <>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <Container className="h-100 py-5">
          <Row className="justify-content-center align-items-center h-100">
            <Col>
              <Card className="shopping-cart" style={{ borderRadius: "15px",width:'80%' }}>
                <Card.Body className="text-black">
                  <Row>
                    <Col lg="12" className="px-5 py-4">
                      <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                        Shopping Cart
                      </h3>
                      {cart.map((item, key) => {
                        return (
                          <div className="d-flex align-items-center mb-5">
                            <div className="flex-shrink-0">
                              <Card.Img
                                src={require("../assets/images/" + item.img)}
                                
                                style={{ width: "150px" }}
                                alt="Generic placeholder image"
                              />
                            </div>

                            <div className="flex-grow-1 ms-3">
                            
                              <h5 tag="h5" className="text-primary">
                                {item.name}
                              </h5>
                              
                              <div className="d-flex align-items-center">
                                <p className="fw-bold mb-0 me-5 pe-3">
                                  {item.price} DT
                                </p>

                                {/* <div className="def-number-input number-input safari_only"> */}
                                  <button
                                    className="RemoveItem"
                                    onClick={() => RemoveItemFromCart(item)}
                                  >-</button>
                                  
                                  <input
                                    className="quantity fw-bold text-black def-number-input number-input safari_only"
                                    min={0}
                                    value={item.quantity}
                                    type="number"
                                  />
                                  <button
                                    className="AddItem"
                                    onClick={() => addItemToCart(item)}
                                  >+</button>
                                  <p className="fw-bold mb-0 me-5 pe-3">
                                  Total Price : {item.quantity*item.price} DT
                                </p>
                                {/* </div> */}
                                <button className="RemoveCart" onClick={()=>DeleteItem(item)}>X</button>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <hr
                        className="mb-4"
                        style={{
                          height: "2px",
                          backgroundColor: "#1266f1",
                          opacity: 1,
                        }}
                      />

                      <div
                        className="d-flex justify-content-between p-2 mb-2"
                        style={{ backgroundColor: "#e1f5fe" }}
                      >
                        <h5 tag="h5" className="fw-bold mb-0">
                          Total:
                        </h5>
                        <h5 tag="h5" className="fw-bold mb-0">
                          {Total} DT{" "}
                        </h5>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
