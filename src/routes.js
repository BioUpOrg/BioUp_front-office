import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPageNav from './components/navbars/landingPageNav';
import MainFooter from './components/footers/mainFooter';
import Home  from './pages/home';
import About  from './pages/about';
import Contact  from './pages/contact';
import Composts from './pages/composts';
import Products from './pages/products';
import Services from './pages/services';
import Register from './pages/register';
import Login from './pages/login';

import OTPVerification from './pages/verifyAccount';
import RecoverPassSms from './pages/RecupererPasswordPhone';
import UserVerificationWithMail from './pages/UserVerificationWithMail';
import RecoverPassEmail from './pages/RecuperePasswordWithEmail';

const MyAppRoutes = () => {
  return (
    <BrowserRouter>
        <LandingPageNav/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/Products" element={<Products/>} />
          <Route path="/Composts" element={<Composts/>} />
          <Route path="/Services" element={<Services/>} />
          <Route path="/Contact" element={<Contact/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/verify-account-sms" element={<><OTPVerification/></>}/>
          <Route path="/recover-pass-sms" element ={<> <RecoverPassSms/></>}/>
          <Route path="/users/check/activate/account/:token" element={<><UserVerificationWithMail/></>}/>
          <Route path="/RecoverPassEmail" element={<RecoverPassEmail/>} />
        </Routes>
        <MainFooter/>
    </BrowserRouter>
  );
};

export default MyAppRoutes;
