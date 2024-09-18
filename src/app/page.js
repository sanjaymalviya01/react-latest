// import Hello from "@/app/components/Hello";
// import Image from "next/image";
import Ads from "./components/Ads/Ads";
import Banner from "./components/Banner/Banner";
import Categories from "./components/Categories/Categories";
import Copyright from "./components/Copyright/Copyright";
import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import NewArrival from "./components/NewArrival/NewArrival";
import Product from "./components/Product/Product";


export default function Home() {
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
