import React, { useState, useEffect } from "react";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Home from "./Page/Home";
import About from "./Page/About";
import Products from "./Page/Products";
import Payment from "./Page/Payment";
import Contact from "./Page/Contact";
import Team from "./Page/Team";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [cartData, setCartData] = useState([]);

  // Navbar Drawer Api Calling
  const fetchCartData = async () => {
    try {
      const res = await axios.get("https://digitalden-backend-lq55.onrender.com/auth/getproducts");
      setCartData(res.data);
    } catch (err) {
      console.log("fetch error", err);
    }
  };
  useEffect(() => {
    fetchCartData(); // load on page start
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar cartData={cartData} onCartUpdate={fetchCartData} />
        <Routes>
          <Route path="/" element={<Home onAddSuccess={fetchCartData} />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Payment cartData={cartData} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
