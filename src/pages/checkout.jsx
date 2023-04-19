import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectCart, selectTotal } from "../store/cart";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { addCommand } from "../services/shipmentService";

function Checkout() {
  const cartItems = useSelector(selectCart);
  const cartTotal = useSelector(selectTotal);

  const [formState, setFormState] = useState({
    address: "",
    address2: "",
    city: "",
    state: "",
    postCode: "",
    phone: "",
    email: "",
    orderNotes: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //   console.log("formState: ",formState);
    const orderItems = [];
    cartItems.map((e) => {
      let p = {};
      p.type = e.type;
      p.quantity = e.quantity;
      p.product = e.cartItem._id;
      orderItems.push(p);
    });
    const order = {
      totalPrice: cartTotal,
      status: false,
      buyer: "",
      products: orderItems,
      deliveryPlace: formState,
    };
    const res = await addCommand(order);
  };

  return (
    <section className="mt-50 mb-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mb-40">
            <h1 className="heading-2 mb-10">Checkout</h1>
            <div className="d-flex justify-content-between">
              <h6 className="text-body">
                There are <span className="text-brand">3</span> products in your
                cart
              </h6>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-50">
            <div className="border p-40 cart-totals ml-30 mb-50">
              <div className="d-flex align-items-end justify-content-between mb-30">
                <h4>Your Order</h4>
                <h6 className="text-muted">Subtotal: {cartTotal} </h6>
              </div>
              <div className="divider-2 mb-30"></div>
              <div className="table-responsive order_table">
                <table className="table no-border">
                  <tbody>
                    {cartItems &&
                      cartItems.map((e) => (
                        <tr>
                          <td className="image product-thumbnail">
                            <img src={e.cartItem.image} />
                          </td>
                          <td>
                            <h6 className="w-160 mb-5">
                              <NavLink>{e.cartItem.name}</NavLink>
                              <div className="product-rate-cover">
                                <div className="product-rate d-inline-block">
                                  <div
                                    className="product-rating"
                                    style={{ width: "90%" }}
                                  ></div>
                                </div>
                                <span className="font-small ml-5 text-muted">
                                  {" "}
                                  (4.0)
                                </span>
                              </div>
                            </h6>{" "}
                          </td>
                          <td>
                            <h6 className="text-muted pl-20 pr-20">
                              x ${e.quantity}
                            </h6>
                          </td>
                          <td>
                            <h4 className="text-brand">
                              ${e.cartItem.unitPrice}
                            </h4>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="bt-1 border-color-1 mt-30 mb-30"></div>
              <div className="payment_method">
                <div className="mb-25">
                  <h5>Payment</h5>
                </div>
                <div className="payment_option">
                  <div className="custome-radio">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_option"
                      id="exampleRadios3"
                      checked=""
                    />
                    <label
                      className="form-check-label"
                      for="exampleRadios3"
                      data-bs-toggle="collapse"
                      data-target="#bankTranfer"
                      aria-controls="bankTranfer"
                    >
                      Direct Bank Transfer
                    </label>
                    <div className="form-group collapse in" id="bankTranfer">
                      <p className="text-muted mt-5">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration.{" "}
                      </p>
                    </div>
                  </div>
                  <div className="custome-radio">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_option"
                      id="exampleRadios4"
                      checked=""
                    />
                    <label
                      className="form-check-label"
                      for="exampleRadios4"
                      data-bs-toggle="collapse"
                      data-target="#checkPayment"
                      aria-controls="checkPayment"
                    >
                      Check Payment
                    </label>
                    <div className="form-group collapse in" id="checkPayment">
                      <p className="text-muted mt-5">
                        Please send your cheque to Store Name, Store Street,
                        Store Town, Store State / County, Store Postcode.{" "}
                      </p>
                    </div>
                  </div>
                  <div className="custome-radio">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_option"
                      id="exampleRadios5"
                      checked=""
                    />
                    <label
                      className="form-check-label"
                      for="exampleRadios5"
                      data-bs-toggle="collapse"
                      data-target="#paypal"
                      aria-controls="paypal"
                    >
                      Paypal
                    </label>
                    <div className="form-group collapse in" id="paypal">
                      <p className="text-muted mt-5">
                        Pay via PayPal; you can pay with your credit card if you
                        don't have a PayPal account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-50">
            <div className="border p-40 cart-totals ml-30 mb-50">
              <div className="mb-25">
                <h4>Billing Details</h4>
              </div>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    name="address"
                    placeholder="address *"
                    value={formState.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="address2"
                    placeholder="address 2 *"
                    value={formState.address2}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="city"
                    placeholder="City *"
                    value={formState.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="state"
                    placeholder="State *"
                    value={formState.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="postCode"
                    placeholder="Post code / Zip code *"
                    value={formState.postCode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone *"
                    value={formState.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address *"
                    value={formState.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-30">
                  <textarea
                    rows="5"
                    name="orderNotes"
                    placeholder="Order notes"
                    value={formState.orderNotes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-50">
            <div className="border p-40 cart-totals ml-30 mb-50">
              <form method="post" className="apply-coupon">
                <input type="text" placeholder="Enter Coupon Code..." />
                <button className="btn btn-md" name="login">
                  Apply Coupon
                </button>
              </form>
              <button
                className="btn btn-fill-out btn-block mt-30"
                onClick={handleSubmit}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
