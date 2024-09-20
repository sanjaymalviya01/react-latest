import React from "react";
import Ads from "@/app/components/Ads/Ads";
import Banner from "@/app/components/Banner/Banner";
import Categories from "@/app/components/Categories/Categories";
import Features from "@/app/components/Features/Features";
import NewArrival from "@/app/components/NewArrival/NewArrival";
import Product from "@/app/components/Product/Product";

function HomePage() {
  return (
    <>
      <Banner />
      <Features />
      <Categories />
      <NewArrival />
      <Ads />
      <Product />
    </>
  );
}

export default HomePage;
