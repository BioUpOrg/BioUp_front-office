import React, { useState } from "react";
import { Card, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import UserDashbord from "../components/authentication/register/UserDashbors";
import Contract from "../pages/MyContract";
export default function Dashboard() {
  const location = useLocation();
  const message = new URLSearchParams(location.search).get("message");
  const [activeItem,setActiveItem]=useState('account-item');
  
   const handleClick = (item) => {
  console.log(item);
  setActiveItem(item);

  };
  return (
    <div class="container" style={{marginBlock:"100px"}}>
      <div class="row">
        <div class="col-lg-12 m-auto">
          <div class="row">
            <div class="col-md-3">
              <div class="dashboard-menu">
                <ul class="nav flex-column" role="tablist">

                  <li class="nav-item">
                    <a
                      className={`nav-link ${
                        activeItem === "dashboard-item" ? "active" : ""
                      }`}
                      onClick={() => handleClick("dashboard-item")}
                    >
                        <i className="fi-rs-settings-sliders mr-10">Dashboard</i>
                        </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link">
                      <i class="fi-rs-shopping-bag mr-10"></i>Orders
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link">
                      <i class="fi-rs-shopping-cart-check mr-10"></i>Track Your
                      Order
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link">
                      <i class="fi-rs-marker mr-10"></i>My Address
                    </a>
                  </li>
                  <li class="nav-item">
                  <a name="account-item"
                      className={`nav-link ${
                        activeItem === "account-item" ? "active" : ""
                      }`}
                      onClick={(e) => handleClick(e.target.name)}
                    >
                      <i className="fi-rs-user mr-10"></i>Account details
                    </a>
                  </li>
                  <li class="nav-item" >
                  <a
                  name="contract-item" 
                      className={`nav-link ${
                        activeItem === "contract-item" ? "active" : ""
                      }`}
                      onClick={(e) => handleClick(e.target.name)}
                    >
                      <i className="fi-rs-marker mr-10"></i>Contract
                    </a>
                  </li>
                  
                   
                  <li class="nav-item">
                    <a class="nav-link" href="/page-login">
                      <i class="fi-rs-sign-out mr-10"></i>Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-9">
              <div class="tab-content account dashboard-content pl-50">
                <div class="tab-pane fade ">
                  <div class="card">
                    <div class="card-header">
                      <h3 class="mb-0">Hello Rosie!</h3>
                    </div>
                    <div class="card-body">
                      <p>
                        From your account dashboard. you can easily check &amp;
                        view your <a href="#">recent orders</a>,manage your{" "}
                        <a href="#">shipping and billing addresses</a> and{" "}
                        <a href="#">edit your password and account details.</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade ">
                  <div class="card">
                    <div class="card-header">
                      <h3 class="mb-0">Your Orders</h3>
                    </div>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>Order</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th>Total</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>#1357</td>
                              <td>March 45, 2020</td>
                              <td>Processing</td>
                              <td>$125.00 for 2 item</td>
                              <td>
                                <a href="#" class="btn-small d-block">
                                  View
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>#2468</td>
                              <td>June 29, 2020</td>
                              <td>Completed</td>
                              <td>$364.00 for 5 item</td>
                              <td>
                                <a href="#" class="btn-small d-block">
                                  View
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>#2366</td>
                              <td>August 02, 2020</td>
                              <td>Completed</td>
                              <td>$280.00 for 3 item</td>
                              <td>
                                <a href="#" class="btn-small d-block">
                                  View
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade ">
                  <div class="card">
                    <div class="card-header">
                      <h3 class="mb-0">Orders tracking</h3>
                    </div>
                    <div class="card-body contact-from-area">
                      <p>
                        To track your order please enter your OrderID in the box
                        below and press "Track" button. This was given to you on
                        your receipt and in the confirmation email you should
                        have received.
                      </p>
                      <div class="row">
                        <div class="col-lg-8">
                          <form
                            class="contact-form-style mt-30 mb-50"
                            action="#"
                            method="post"
                          >
                            <div class="input-style mb-20">
                              <label>Order ID</label>
                              <input
                                name="order-id"
                                placeholder="Found in your order confirmation email"
                                type="text"
                              />
                            </div>
                            <div class="input-style mb-20">
                              <label>Billing email</label>
                              <input
                                name="billing-email"
                                placeholder="Email you used during checkout"
                                type="email"
                              />
                            </div>
                            <button
                              class="submit submit-auto-width"
                              type="submit"
                            >
                              Track
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade ">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="card mb-3 mb-lg-0">
                        <div class="card-header">
                          <h3 class="mb-0">Billing Address</h3>
                        </div>
                        <div class="card-body">
                          <p>New York</p>
                          <a href="#" class="btn-small">
                            Edit
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="card">
                        <div class="card-header">
                          <h5 class="mb-0">Shipping Address</h5>
                        </div>
                        <div class="card-body">
                          <p>Sarasota</p>
                          <a href="#" class="btn-small">
                            Edit
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade active show">
                 <Card>
                              
                  {activeItem ==="account-item" ?  (
                    <UserDashbord />
                  ) : (
                    <>
                      {/* Placeholder content */}
                    </>
                  )}

                  {activeItem === "contract-item" ? (
                    <Contract />
                  ) : (
                    <>
                      {/* Placeholder content */}
                    </>
                  )}
                 </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
