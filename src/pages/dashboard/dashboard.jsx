import React, { useState } from "react";
import { Card, Nav } from "react-bootstrap";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { getMyContract } from "../../services/contractService";
export default function Dashboard() {
  const location = useLocation();
  const message = new URLSearchParams(location.search).get("message");
  const [statusRole,setStatusRole]=useState('true');
  const [isadmin ,setisAdmin]=useState(false);
  const  [signedtransport,setsignedtransport]=useState(true);
  const token =  localStorage.getItem("TOKEN_KEY");
  const decoded = jwt_decode(token);
  const userId=decoded.role;
  const userIde=decoded;
  const navigate=useNavigate();

  useEffect(()=>{
   
        if(userId==="transporter"){
          setStatusRole(false);
          console.log("iduser",userIde._id);
          getMyContract(userIde._id).then(res=>{
           
             if(res){
                console.log("contractsig",res.signature);
                if(res.signature!==""){
                  setsignedtransport(false);
                  navigate('/dashboard/mylocation')
                }
           }
          })
        }
        else if (userId==="admin"){
          setisAdmin(true);
navigate('/Dashboard/manageShipments') ;
       }

    console.log(statusRole)

  },[statusRole,isadmin,signedtransport])
 

  return (
    <div class="container" style={{margin:"2%"}}>
      <div class="row">
        <div class="col-sm-12 m-auto">
          <div class="row">
            <div class="col-md-3">
              <div class="dashboard-menu">
          
                
                <ul class="nav flex-column" role="tablist">
                       
                <li hidden={!isadmin} className="nav-item">
                    <NavLink className="nav-link" to="/Dashboard/manageContracts">
                      <i className="fi-rs-settings-sliders mr-10"></i>Manage Contracts
                    </NavLink>
                  </li>
                  <li hidden={!isadmin} className="nav-item">
                    <NavLink className="nav-link" to="/Dashboard/manageShipments">
                      <i className="fi-rs-settings-sliders mr-10"></i>Manage Shipments
                    </NavLink>
                  </li>
                <li className="nav-item" hidden={!statusRole}>
                    <NavLink  className="nav-link" to="/Dashboard/stats">
                      <i className="fi-rs-settings-sliders mr-10"></i>Dashboard
                    </NavLink>
                  </li>
                
                
                  <li className="nav-item" hidden={!statusRole}>
                    <NavLink className="nav-link" to="/Dashboard/compost-Form">
                      <i className="fi-rs-shopping-bag mr-10"></i>sell compost
                    </NavLink>
                  </li>
                  <li className="nav-item"hidden={!statusRole}>
                    <NavLink className="nav-link" to="/Dashboard/Products/myproducts">
                      <i className="fi-rs-shopping-bag mr-10"></i>My products
                    </NavLink>
                  </li>
                  <li className="nav-item" hidden={!statusRole}>
                    <NavLink className="nav-link" to="/Dashboard/product-Form">
                      <i className="fi-rs-shopping-cart-check mr-10"></i>sell
                      bio-product
                    </NavLink>
                  </li>
                  <li className="nav-item" hidden={signedtransport}>
                    <NavLink    className="nav-link" to="/Dashboard/mylocation">
                      <i className="fi-rs-marker mr-10"></i>My Mission
                    </NavLink>
                    </li>
                    <li className="nav-item"hidden={signedtransport}>
                    <NavLink   className="nav-link" to="/Dashboard/listorder">
                      <i className="fi-rs-marker mr-10"></i>Oders Not Shipped
                    </NavLink>
                    </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Dashboard/user-dashboard">
                      <i className="fi-rs-shopping-cart-check mr-10"></i>
                     User Details
                    </NavLink>
                    </li>
                    <li className="nav-item" hidden={statusRole} >
                    <NavLink className="nav-link" to="/Dashboard/mycontract">
                      <i className="fi-rs-shopping-cart-check mr-10"></i>
                     My Contract
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink   className="nav-link" to="/Dashboard/trackMyOrder">
                      <i className="fi-rs-marker mr-10"></i>My Orders 
                    </NavLink>
                    </li>
                  
                   
                 
                </ul>
              </div>
            </div>
            <div className="col-sm-9">
              <div className="tab-content account dashboard-content">
                <Outlet/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
