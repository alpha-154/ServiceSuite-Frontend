import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/customComponents/Navbar";
import Footer from "@/customComponents/Footer";


const Layout = () => {
  
  return (
    <div className="flex flex-col min-h-screen font-serif py-2 md:py-3">
      <Navbar />
      <main className="container-style overflow-x-clip">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;