import Ads from "./components/Ads/Ads";
import Banner from "./components/Banner/Banner";
import Categories from "./components/Categories/Categories";
import Features from "./components/Features/Features";
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
