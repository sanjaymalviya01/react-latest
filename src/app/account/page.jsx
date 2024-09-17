import React from "react";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Copyright from "../components/Copyright/Copyright";
import BreadCrumb from "./comp/BreadCrumb";

const page = () => {
  return (
    <>
      <Header />
      <Navbar />
      <BreadCrumb/>

      <Footer />
      <Copyright />
    </>
  );
};

export default page;
