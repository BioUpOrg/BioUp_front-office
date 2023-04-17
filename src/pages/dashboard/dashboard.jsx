import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container" style={{ marginBlock: "200px" }}>
      <div className="row">
        <div className="col-lg-10 m-auto">
          <div className="row">
            <div className="col-md-3">
              <div className="dashboard-menu">
                <ul className="nav flex-column" role="tablist">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Dashboard/stats">
                      <i className="fi-rs-settings-sliders mr-10"></i>Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Dashboard/compost-Form">
                      <i className="fi-rs-shopping-bag mr-10"></i>sell compost
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Dashboard/Products/myproducts">
                      <i className="fi-rs-shopping-bag mr-10"></i>My products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Dashboard/product-Form">
                      <i className="fi-rs-shopping-cart-check mr-10"></i>sell
                      bio-product
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Dashboard/Account-details">
                      <i className="fi-rs-user mr-10"></i>Account details
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/page-login">
                      <i className="fi-rs-sign-out mr-10"></i>Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content account dashboard-content pl-50">
                <Outlet/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
