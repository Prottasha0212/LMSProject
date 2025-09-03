import React from "react";
import Navbar from "../../componenets/educator/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../../componenets/educator/Sidebar";
import Footer from "../../componenets/educator/Footer";

const Educator = () => {
  return (
    <div className="text-default min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{<Outlet />}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Educator;