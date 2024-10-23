import BreadCrumb from "@/app/components/Breadcrumb/Breadcrumb";
import React from "react";
import ProductDetail from "../comp/ProductDetail";
import ProductDescription from "../comp/ProductDescription";
import Product from "@/app/components/Product/Product";

const page = async ({ params }) => {
  const id = await params.id;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await res.json();
  return (
    <>
      <BreadCrumb />
      <ProductDetail product={product} />
      <ProductDescription product={product} />
      <Product product={product} />
    </>
  );
};

export default page;
