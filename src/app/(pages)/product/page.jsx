"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/Breadcrumb/Breadcrumb";
import ProductDetail from "./comp/ProductDetail";
import ProductDescription from "./comp/ProductDescription";
import Product from "../../components/Product/Product";
import { useSearchParams } from "next/navigation";

function page() {
  const [product, setProduct] = useState();
  const searchparam = useSearchParams();
  const productId = searchparam.get("product");

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, []);
  return (
    <>
      {product && (
        <>
          <BreadCrumb />
          <ProductDetail product={product} />
          <ProductDescription product={product} />
          <Product product={product} />
        </>
      )}
    </>
  );
}

export default page;
