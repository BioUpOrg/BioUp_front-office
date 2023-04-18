import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import LandingPageNav from "./components/navbars/landingPageNav";
import HeaderTop from "./components/navbars/headerTop";
import MainFooter from "./components/footers/mainFooter";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Composts from "./pages/composts/composts";
import Services from "./pages/services";
import Register from "./pages/register";
import Login from "./pages/login";
import Page404 from "./pages/errorsPages/404";
import Page401 from "./pages/errorsPages/401";
import Page500 from "./pages/errorsPages/500";
import Dashboard from "./pages/dashboard/dashboard";
import Farm from "./pages/farm";
import FarmMangment from "./pages/ManageFarm/farmMangment";
import MyContract from "./pages/ContractDelivery/MyContract";
import AddFarm from "./pages/ManageFarm/AddFarm";
import FarmDetails from "./pages/ManageFarm/FarmDetails";
import PlantDetails from "./pages/ManageFarm/PlantDetails";
import OTPVerification from "./pages/verifyAccount";
import RecoverPassSms from "./pages/RecupererPasswordPhone";
import UserVerificationWithMail from "./pages/UserVerificationWithMail";
import RecoverPassEmail from "./pages/RecuperePasswordWithEmail";
import CompostForm from "./components/forms/compostForm";
import ProductForm from "./components/forms/productForm";
import DashboardStats from "./pages/dashboard/dashboardStats";
import DashboardCompostDetails from "./pages/dashboard/compostDetails";
import Reviews from "./pages/dashboard/Reviews";
import AdditionalInfo from "./pages/dashboard/additionalInfo";
import Description from "./pages/dashboard/Description";
import CompostDetails from "./pages/composts/compostDetails";
import ContractForm from "./components/forms/contractForm";
import UserDashbord from "./components/authentication/register/UserDashbors";
import ProductLayout from "./pages/ManageProducts/ProductLayout";
import AddProduct from "./pages/ManageProducts/addProduct";
import UpdateProduct from "./pages/ManageProducts/UpdateProduct";
import ProductDetails from "./pages/ManageProducts/ProductDetails";
import Products from "./pages/ManageProducts/Products";
import Myproducts from "./pages/ManageProducts/MyProducts";
import { lazy, Suspense } from "react";
import SpinnerExample from "./pages/ManageProducts/Spinner";
import PopSignature from "./pages/ContractDelivery/popSignature";
import AnimalDetails from "./pages/ManageFarm/AnimalDetails";
import DeliveryMap from "./pages/locationAgent/DeliveryMap";
import axios from "axios";
import { useEffect, useState } from "react";
import { MyLocation } from "@mui/icons-material";
import GetListCommandeNotShipped from "./pages/Shipment/GetListCommandeNotShipped";
import Cart from "./pages/cart";
import HeaderMiddle from "./components/navbars/headerMiddle";
const MyAppRoutes = () => {
  const [isDeliveryAgent, setIsDeliveryAgent] = useState(false);
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("TOKEN_KEY") ? true : false;
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("TOKEN_KEY");
    const fetchUser = async () => {
      try {
        const res = await axios
          .get("http://localhost:3000/users/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          .then((response) => {
            console.log(response.data);
            if (response.data.role === "transporter") {
              setIsDeliveryAgent(true);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {}
    };

    useEffect(() => {
      fetchUser();
    }, []);

    if (isDeliveryAgent) {
      if (isDeliveryAgent === false) {
        return <Navigate to="/dashboard" />;
      } else if (isDeliveryAgent === true) {
        return children;
      }
    }
  };

  return (
    <BrowserRouter>
    {/* <HeaderTop/>
    <HeaderMiddle/> */}
      <LandingPageNav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Products" element={<ProductLayout />}>
            <Route path="myproducts" element={<Myproducts />} />
            <Route path="list" element={<Products />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="update/:id" element={<UpdateProduct />} />
            <Route path=":id" element={<ProductDetails />} />
          </Route>
        <Route path="/Farm" element={<Farm />} />
        <Route path="/ManageMyFarm" element={<FarmMangment />} />
        <Route path="/addFarm" element={<AddFarm />} />
        <Route path="/ManageMyFarm/FarmsDetail" element={<FarmDetails />} />
        <Route path="/ManageMyFarm/PlantsDetail" element={<PlantDetails />} />
        <Route path="/ManageMyFarm/AnimalsDetail" element={<AnimalDetails />} />
        <Route path="/Composts" element={<Composts />} />
        <Route path="compost-details" element={<CompostDetails />}>
          <Route path="Description" element={<Description />} />
          <Route path="Additional-Info" element={<AdditionalInfo />} />
          <Route path="Reviews" element={<Reviews />} />
        </Route>
        <Route path="/Services" element={<Services />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/verify-account-sms" element={<><OTPVerification/></>}/>
        <Route path="/recover-pass-sms" element ={<> <RecoverPassSms/></>}/>
        <Route path="/users/check/activate/account/:token" element={<><UserVerificationWithMail/></>}/>
        <Route path="/RecoverPassEmail" element={<RecoverPassEmail/>} />
        <Route path="delivery-agent-contract-form" element={<><PrivateRoute><ContractForm/></PrivateRoute></>}/>

        <Route
          path="/verify-account-sms"
          element={
            <>
              <OTPVerification />
            </>
          }
        />
        <Route
          path="/recover-pass-sms"
          element={
            <>
              {" "}
              <RecoverPassSms />
            </>
          }
        />
        <Route
          path="/users/check/activate/account/:token"
          element={
            <>
              <UserVerificationWithMail />
            </>
          }
        />
        <Route path="/RecoverPassEmail" element={<RecoverPassEmail />} />
        <Route
          path="delivery-agent-contract-form"
          element={
            <>
              <PrivateRoute>
                <ContractForm />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
         <Route path="user-dashboard" element={<UserDashbord/>}/>
         <Route path="mycontract" element={<ProtectedRoute><MyContract/></ProtectedRoute>}/>
         <Route path="popSignature" element={<ProtectedRoute><PopSignature/></ProtectedRoute>}/>
         <Route path="mylocation" element ={<DeliveryMap />}/>
         <Route path="listorder" element={<ProtectedRoute><GetListCommandeNotShipped/></ProtectedRoute>}/>
          <Route path="user-dashboard" element={<UserDashbord />} />
          <Route
            path="mycontract"
            element={
              <ProtectedRoute>
                <MyContract />
              </ProtectedRoute>
            }
          />
          <Route
            path="popSignature"
            element={
              <ProtectedRoute>
                <PopSignature />
              </ProtectedRoute>
            }
          />
          <Route path="mylocation" element={<DeliveryMap />} />
          <Route path="listorder" element={<GetListCommandeNotShipped />} />
          <Route path="stats" element={<DashboardStats />} />
          <Route path="Products" element={<ProductLayout />}>
            <Route path="myproducts" element={<Myproducts />} />
            <Route path="list" element={<Products />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="update/:id" element={<UpdateProduct />} />
            <Route path=":id" element={<ProductDetails />} />
          </Route>
          <Route path="compost-form/:id?" element={<CompostForm />} />
          <Route path="compost-details" element={<DashboardCompostDetails />}>
            <Route path="Description" element={<Description />} />
            <Route path="Additional-Info" element={<AdditionalInfo />} />
            <Route path="Reviews" element={<Reviews />} />
            {/* </Route> */}
            <Route path="product-form" element={<ProductForm />} />
          </Route>

        </Route>
          <Route path="/cart" element={<Cart/>}/>
        <Route path="/401" element={<Page401 />} />
        <Route path="/405" element={<Page500 />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
      <MainFooter />
    </BrowserRouter>
  );
};

export default MyAppRoutes;
