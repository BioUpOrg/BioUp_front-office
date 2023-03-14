import { Link } from "react-router-dom";
import LoginForm from "../components/forms/loginForm";
import React, { useState } from "react";
import { RegisterForm } from "../components/authentication/register";
import axios, * as others from 'axios';


async function ConnectFb(Code){
  try {
    const response = await axios.get('http://localhost:3000/fb/test', {
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
async function ConnectGoogle(Code){
  try {
    const response = await axios.get('http://localhost:3000/google/test', {
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};




const handleButtonClick = () => {
  window.open("http://localhost:3000/fb/auth/facebook");
    ConnectFb().then(response =>{
   //   console.log("response "+JSON.stringify(response) );
    //  console.log("data",JSON.stringify(response.data))  ;
      localStorage.setItem("TOKEN_KEY", JSON.stringify(response.data));
        console.log("TOKEN_KEY from localStorage: ",localStorage.getItem("TOKEN_KEY"))
  
    }
    )
}
const handleButtonClick2 = () => {
  window.open("http://localhost:3000/google/auth");
    ConnectGoogle().then(response =>{
   //   console.log("response "+JSON.stringify(response) );
    //  console.log("data",JSON.stringify(response.data))  ;
      localStorage.setItem("TOKEN_KEY", JSON.stringify(response.data));
        console.log("TOKEN_KEY from localStorage: ",localStorage.getItem("TOKEN_KEY"))
  
    }
    )
}


export default function Register() {
  return (
    <div className="page-content pt-150 pb-150">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
            <div className="row">
              <div className="col-lg-6 col-md-8">
                <div className="login_wrap widget-taber-content background-white">
                  <div className="padding_eight_all bg-white">
                    <div className="heading_s1">
                      <h1 className="mb-5">Create an Account</h1>
                      <p>
                        Already have an account?
                        <Link to={"/Login"}>Log in instead!</Link>
                      </p>
                    </div>


                      <br/>
                     

                    <RegisterForm />


                    
                  </div>
                </div>
              </div>
              <div className="col-lg-6 pr-30 d-none d-lg-block">
                <div className="card-login mt-115">
                  <a href="#" className="social-login facebook-login">
                    <img
                      src="assets/imgs/theme/icons/logo-facebook.svg"
                      alt=""
                    />
            <span>                    <a  onClick={handleButtonClick} >Register facebook</a>
</span>                  </a>
                  <a href="#" className="social-login apple-login">
                    <img src="assets/imgs/theme/icons/logo-apple.svg" alt="" />
          <span>                    <a  onClick={handleButtonClick2} >Register google</a>
</span>                   </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
