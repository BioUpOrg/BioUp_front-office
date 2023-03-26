import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPageNav from "./components/navbars/landingPageNav";
import MainFooter from "./components/footers/mainFooter";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Composts from "./pages/composts";
import Products from "./pages/products";
import Services from "./pages/services";
import Register from "./pages/register";
import Login from "./pages/login";
import Page404 from "./pages/errorsPages/404";
import Page401 from "./pages/errorsPages/401";
import Page500 from "./pages/errorsPages/500";
import Dashboard from "./pages/dashboard";
import Farm from "./pages/farm";
import FarmMangment from "./pages/ManageFarm/farmMangment";

import AddFarm from './pages/ManageFarm/AddFarm';

import FarmDetails from './pages/ManageFarm/FarmDetails';

import OTPVerification from './pages/verifyAccount';
import RecoverPassSms from './pages/RecupererPasswordPhone';
import UserVerificationWithMail from './pages/UserVerificationWithMail';
import RecoverPassEmail from './pages/RecuperePasswordWithEmail';

const MyAppRoutes = () => {

  const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("TOKEN_KEY") ? true : false;
    return isAuthenticated ? children : <Navigate to="/login" />;
  }


  

  return (
    <BrowserRouter>
      <LandingPageNav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Farm" element={<Farm />} />
        <Route path="/ManageMyFarm" element={<FarmMangment />} />
        <Route path="/addFarm" element={<AddFarm />} />
        <Route path="/ManageMyFarm/FarmsDetail" element={<FarmDetails />} />

        <Route path="/Composts" element={<Composts />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      
        <Route path="/verify-account-sms" element={<><OTPVerification/></>}/>
        <Route path="/recover-pass-sms" element ={<> <RecoverPassSms/></>}/>
        <Route path="/users/check/activate/account/:token" element={<><UserVerificationWithMail/></>}/>
        <Route path="/RecoverPassEmail" element={<RecoverPassEmail/>} />
        <Route
          path="/dashboard"
          element={<PrivateRoute>
            <Dashboard />
          </PrivateRoute>}
        />
        <Route path="/401" element={<Page401 />} />
        <Route path="/405" element={<Page500 />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
      <MainFooter />
    </BrowserRouter>
  );
};

export default MyAppRoutes;
