import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Price from "../pages/Price";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/coin" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/price" element={<Price />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
