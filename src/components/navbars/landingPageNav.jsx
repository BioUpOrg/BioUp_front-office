import { Link, NavLink } from "react-router-dom";
import { BiHeart, BiUser } from "react-icons/bi";
import {MdOutlineCompareArrows} from "react-icons/md";
import {AiOutlineShoppingCart} from "react-icons/ai";
import React from 'react'
import { useNavigate } from "react-router-dom";
import { Logout } from "../../services/authService";
import "./landingPageNavCss.css";
import { Icon } from '@iconify/react';
import { useSelector } from "react-redux";
import { getCartItemsCount } from "../../store/cart";


export default function LandingPageNav() {


  const navigate= useNavigate();
  let registerBtn;
  let loginBtn;
  let signout;
  const isAuthenticated = localStorage.getItem("TOKEN_KEY") ? true : false;
  
  const logout = async () => {
    await Logout(navigate);
    // navigate('/');
  }


  if (!isAuthenticated) {
    registerBtn = (
      <div className="header-action-icon-2">
        <Link to={"/Register"}>
          <button className="bioup-btn-default">register</button>
        </Link>
      </div>
    );
  }
  if (!isAuthenticated) {
    loginBtn = (
      <div className="header-action-icon-2">
        <Link to={"/Login"}>
          <button className="bioup-btn-radius">login</button>
        </Link>
      </div>
    );
  }
  if(isAuthenticated){
    signout=<li>
    <Link to={"/"} onClick={() => logout()}>
      <i className="fi fi-rs-sign-out mr-10"></i>Sign out
    </Link>
  </li>
  }

  const cartItemsCount = useSelector(getCartItemsCount);
  
  return (
    <div className="header-bottom header-bottom-bg-color bioup-sticky-navbar">
      <div className="container">
        <div className="header-wrapf d-flex justify-content-between position-relative">
          <div className="">
            <Link to="index.html">
              <img
                src="/assets/media/bioup-logo.png"
                className="img-fluid"
                style={{ maxWidth: "100px" }}
                alt="bioup logo"
              />
            </Link>
          </div>
          <div className="header-nav d-none d-lg-flex">
            <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block font-heading">
              <nav>
                <ul>
                  <li>
                    <Link className="active" to={"/"}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to={"/About"}>About</Link>
                  </li>
                  <li>
                    <Link to={"/Services"}>Our Services</Link>
                  </li>
                  <li>
                    <Link to={"/products/list"}>Bio Products</Link>
                  </li>
                  <li className="position-static">
                    <Link to={"/Composts"}>Composts</Link>
                  </li>
                  <li>
                    <Link to={"/ManageMyFarm"}>My Farm</Link>
                  </li>
                  <li>
                    <Link to={"/Blog"}>Our Blog</Link>
                  </li>
                  <li>
                    <Link to={"/Contact"}>Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="header-action-right">
            {registerBtn}
            {loginBtn}
            <div className="header-action-2">
            <div className="header-action-icon-2">
                  <a href="shop-compare">
                  <MdOutlineCompareArrows/>
                    <span className="pro-count blue">0</span>
                  </a>
                  <a href="shop-compare">
                    <span className="lable ml-0">Compare</span>
                  </a>
                </div>
                <div className="header-action-icon-2">
                  <a href="shop-wishlist">
                  <BiHeart/>
                    <span className="pro-count blue">0</span>
                  </a>
                  <span className="lable">Wishlist</span>
                </div>
                <div className="header-action-icon-2">
                  <NavLink to={"/cart"} className="mini-cart-icon" >
                  <AiOutlineShoppingCart/>
                    <span className="pro-count blue">{cartItemsCount}</span>
                  </NavLink>
                  <a href="shop-cart">
                    <span className="lable">Cart</span>
                  </a>
                </div>
              <div className="header-action-icon-2">
                <a href="page-account">
                  <BiUser />
                </a>
                <a href="page-account">
                  <span className="lable ml-0">Account</span>
                </a>
                <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                  <ul>
                    <li>
                      <Link to="/Dashboard/stats">
                        <i className="fi fi-rs-user mr-10"></i>Dashboard
                      </Link>
                    </li>
                    <li>
                      <a href="page-account">
                        <i className="fi fi-rs-location-alt mr-10"></i>Order
                        Tracking
                      </a>
                    </li>
                    <li>
                      <a href="page-account">
                        <i className="fi fi-rs-label mr-10"></i>My Voucher
                      </a>
                    </li>
                    <li>
                      <a href="shop-wishlist">
                        <i className="fi fi-rs-heart mr-10"></i>My Wishlist
                      </a>
                    </li>
                    {/* <li>
                      <a href="page-account">
                        <i className="fi fi-rs-settings-sliders mr-10"></i>
                        Setting
                      </a>
                    </li> */}
                    {/* <li>
                      <a href="page-login">
                        <i className="fi fi-rs-sign-out mr-10"></i>Sign out
                      </a>
                    </li> */}
                    {signout}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
