import React from 'react'
import { Link } from "react-router-dom";
import LoginForm from "../components/forms/loginForm";
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
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






export default function Login() {
  return (
    <div className="page-content pt-150 pb-150">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
            <div className="row">
              <div className="col-lg-6 pr-30 d-none d-lg-block">
                <div className="card-login mt-115">
                  <a href="#" className="social-login facebook-login">
                    <img
                      src="assets/imgs/theme/icons/logo-facebook.svg"
                      alt=""
                    />
                    <span>                    <a  onClick={handleButtonClick} >login fb</a>
</span>

                  </a>
                  <a href="#" className="social-login apple-login">
                    <img src="assets/imgs/theme/icons/logo-apple.svg" alt="" />
                    <span>                    <a  onClick={handleButtonClick2} >login google</a>
</span>                  </a>
                </div>
              </div>
              <div className="col-lg-6 col-md-8">
                <div className="login_wrap widget-taber-content background-white">
                  <div className="padding_eight_all bg-white">
                    <div className="heading_s1">
                      <h1 className="mb-5">Login</h1>
                      <p className="mb-30">
                        Don't have an account?
                        <Link to={"/Register"}>Create here</Link>
                      </p>
                    </div>
                    <LoginForm/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

