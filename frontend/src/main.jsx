import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HomePage from "./landing_page/home/HomePage";
import Signup from "./landing_page/signup/Signup";
import AboutPage from "./landing_page/About/Aboutpage";
import ProductPage from "./landing_page/products/ProductPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";
import Login from "./landing_page/login/Login";




import NotFound from "./landing_page/NotFound";
import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";



createRoot(document.getElementById('root')).render(
   <BrowserRouter>
    <Navbar />
    <Routes>
       <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />}></Route>
       <Route path="/signup" element={<Signup />} />
      <Route path="/About" element={<AboutPage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="*" element={<NotFound />} />
      

      
    </Routes>
    <Footer />
  </BrowserRouter>
);
