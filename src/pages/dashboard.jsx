import React, { useState } from "react";
import { Card, Nav } from "react-bootstrap";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import UserDashbord from "../components/authentication/register/UserDashbors";
import Contract from "../pages/ContractDelivery/MyContract";
import axios from "axios";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
export default function Dashboard() {
  const location = useLocation();
  const message = new URLSearchParams(location.search).get("message");
  const [statusRole,setStatusRole]=useState('true');
  const token =  localStorage.getItem("TOKEN_KEY");
  const decoded = jwt_decode(token);
  const userId=decoded.role;

  useEffect(()=>{
        if(userId==="transporter"){
          setStatusRole(false)

        }
    console.log(statusRole)

  },[])
 

  return (
    <div class="container" style={{marginBlock:"100px"}}>
      <div class="row">
        <div class="col-lg-12 m-auto">
          <div class="row">
            <div class="col-md-3">
              <div class="dashboard-menu">
                <ul class="nav flex-column" role="tablist">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/Dashboard">
                      <i className="fi-rs-shopping-cart-check mr-10"></i>sell
                     Dashboard
                    </NavLink>
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
                 
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Dashboard/mylocation">
                      <i className="fi-rs-marker mr-10"></i>Get My Location 
                    </NavLink>
                    </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Dashboard/user-dashboard">
                      <i className="fi-rs-shopping-cart-check mr-10"></i>sell
                     User Details
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink hidden={statusRole} className="nav-link" to="/Dashboard/mycontract">
                      <i className="fi-rs-shopping-cart-check mr-10"></i>
                     My Contract
                    </NavLink>
                    </li>
                
                  
                   
                  <li class="nav-item">
                    <a class="nav-link" href="/page-login">
                      <i class="fi-rs-sign-out mr-10"></i>Logout
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
