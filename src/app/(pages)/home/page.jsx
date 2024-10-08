import React from "react";
import Ads from "@/app/components/Ads/Ads";
import Banner from "@/app/components/Banner/Banner";
import Categories from "@/app/components/Categories/Categories";
import Features from "@/app/components/Features/Features";
import NewArrival from "@/app/components/NewArrival/NewArrival";
import Product from "@/app/components/Product/Product";

async function HomePage() {
  let data = await fetchRecomndedProduct();
  return (
    <>
      <Banner />
      <Features />
      <Categories />
      <NewArrival />
      <Ads />
      <Product {...{ data }} />
    </>
  );
}

export default HomePage;

export const fetchRecomndedProduct = async () => {
  try {
    const response = await fetch(
      "https://dummyjson.com/products?limit=8&skip=5"
    );
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
