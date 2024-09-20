import React from "react";
import BreadCrumb from "../../components/Breadcrumb/Breadcrumb";
import ProductDetail from "./comp/ProductDetail";
import ProductDescription from "./comp/ProductDescription";
import Product from "../../components/Product/Product";

function page() {
  return (
    <>
      <BreadCrumb />
      <ProductDetail />
      <ProductDescription/>
      <Product/>
    </>
  );
}

export default page;
