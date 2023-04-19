import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  decrement,
  getBioProductsItemsCount,
  getCompostItemsCount,
  increment,
  remove,
  selectCart,
  selectTotal,
} from "../store/cart";
import { NavLink } from "react-router-dom";
import { setCompostDetails } from "../store/composts";
import { BiShoppingBag } from "react-icons/bi";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart);
  const handleDetailsOnClick = (compost) => {
    dispatch(setCompostDetails(compost));
  };

  const handleIncrementOnClick = (e) => {
    dispatch(increment(e));
  };
  const handleDecrementOnClick = (e) => {
    dispatch(decrement(e));
  };
  const handleRemoveOnClick = (e) => {
    dispatch(remove(e));
  };
  const handleClearOnClick = () => {
    dispatch(clear());
  };

  const countComposts = useSelector(getCompostItemsCount);
  const countBioProducts = useSelector(getBioProductsItemsCount);
  const cartTotal = useSelector(selectTotal);

  return (
    <section className="mt-50 mb-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-40">
            <h1 className="heading-2 mb-10">Your Cart</h1>
            <div className="d-flex justify-content-between">
              <h6 className="text-body">
                There are <span className="text-brand">{countBioProducts}</span>{" "}
                bio products in your cart and{" "}
                <span className="text-brand">{countComposts}</span> composts
              </h6>
              <h6 className="text-body">
                <NavLink
                  className="text-muted"
                  onClick={() => {
                    handleClearOnClick();
                  }}
                >
                  <i className="fi-rs-trash mr-5"></i>Clear Cart
                </NavLink>
              </h6>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="table-responsive shopping-summery">
              <table className="table table-wislist">
                <thead>
                  <tr className="main-heading">
                    <th className="custome-checkbox start pl-30" colSpan={2}>
                      Product
                    </th>
                    <th className="col">Unit Price</th>
                    <th className="col">Quantity</th>
                    <th className="col">Subtotal</th>
                    <th className="col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems &&
                    cartItems.map((e) => (
                      <tr>
                        <td className="image product-thumbnail">
                          <img src={e.cartItem.image} />
                        </td>
                        <td className="product-des product-name">
                          <h6 className="product-name">
                            <NavLink
                              to={"/compost-details/Description"}
                              onClick={() => {
                                handleDetailsOnClick(e.cartItem);
                              }}
                            >
                              {e.cartItem.name}
                            </NavLink>
                          </h6>
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
                        </td>
                        <td className="price" data-title="Price">
                          <h4 className="text-brand">
                            ${e.cartItem.unitPrice}
                          </h4>
                        </td>
                        <td
                          className="text-center detail-info"
                          data-title="Stock"
                        >
                          <div className="detail-extralink mr-15">
                            <div className="detail-qty border radius ">
                              <NavLink
                                className="qty-down"
                                onClick={() => {
                                  handleDecrementOnClick(e);
                                }}
                              >
                                <i className="fi-rs-angle-small-down"></i>
                              </NavLink>
                              <div className="qty-val">{e.quantity}</div>
                              <NavLink
                                className="qty-up"
                                onClick={() => {
                                  handleIncrementOnClick(e);
                                }}
                              >
                                <i className="fi-rs-angle-small-up"></i>
                              </NavLink>
                            </div>
                          </div>
                        </td>
                        <td className="text-right" data-title="Cart">
                          <h4 className="text-body">
                            ${e.cartItem.unitPrice * e.quantity}
                          </h4>
                        </td>
                        <td className="action" data-title="Remove">
                          <NavLink
                            className="text-muted"
                            onClick={() => {
                              handleRemoveOnClick(e);
                            }}
                          >
                            <i className="fi-rs-trash"></i>
                          </NavLink>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div class="cart-action text-end">
              <NavLink
                to={"/composts"}
                class="btn"
                style={{
                  backgroundColor: "#3bb77e",
                  padding: "10px",
                  color: "#ffffff",
                  display: "inline-flex",
                  borderRadius: "5px",
                }}
              >
                <BiShoppingBag style={{ fontSize: "20", marginRight: "5px" }} />
                Continue Shopping
              </NavLink>
            </div>
          </div>
        </div>
        <div class="divider center_icon mt-50 mb-50"><i class="fi-rs-fingerprint"></i></div>
        <div className="row">
          <div class="col-lg-6 col-md-12">
            <div class="border p-md-4 p-30 border-radius cart-totals">
              <div class="heading_s1 mb-3">
                <h4>Cart Totals</h4>
              </div>
              <div class="table-responsive">
                <table class="table">
                  <tbody>
                    <tr>
                      <td class="cart_total_label">Cart Subtotal</td>
                      <td class="cart_total_amount">
                        <span class="font-lg fw-900 text-brand">$ {cartTotal.toFixed(2)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="cart_total_label">Shipping</td>
                      <td class="cart_total_amount">
                        <i class="ti-gift mr-5"></i>Free Shipping
                      </td>
                    </tr>
                    <tr>
                      <td class="cart_total_label">Total</td>
                      <td class="cart_total_amount">
                        <strong>
                          <span class="font-xl fw-900 text-brand">${cartTotal.toFixed(2)}</span>
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <NavLink to={"/checkout"} className="btn">
                <i class="fi-rs-box-alt mr-10"></i>Proceed To CheckOut
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
