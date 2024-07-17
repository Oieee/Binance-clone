import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AppRoutes from "../routes/AppRoutes";

const Layout = () => {
  return (
    <div className="bg-[#181A20] text-white px-8 w-screen min-h-[100vh] font-semibold">
      <Router>
        <Header />
        <div className="max-w-screen-xl mx-auto mt-12">
          <Routes>
            <Route path="/*" element={<AppRoutes />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default Layout;
