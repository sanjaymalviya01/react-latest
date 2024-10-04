"use client";
import React, { useEffect, useState } from "react";
import banner from "@/app/assets/images/banner-bg.jpg";
import Link from "next/link";

const Banner = () => {
  const [token, settoken] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      settoken(sessionStorage.getItem("token"));
    }
  }, []);
  // const token = sessionStorage.getItem("token");
  return (
    <div
      className="bg-cover bg-no-repeat bg-center py-36"
      style={{ backgroundImage: `url(${banner.src})` }}
    >
      <div className="container">
        <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
          best collection for <br /> home decoration
        </h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam{" "}
          <br />
          accusantium perspiciatis, sapiente magni eos dolorum ex quos dolores
          odio
        </p>
        {!token ? (
          <div className="mt-12">
            <Link
              href="/login"
              className="bg-primary border border-primary text-white px-8 py-3 font-medium 
                    rounded-md hover:bg-transparent hover:text-primary"
            >
              Login & Start Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-12">
            <Link
              href="/shop"
              className="bg-primary border border-primary text-white px-8 py-3 font-medium 
                    rounded-md hover:bg-transparent hover:text-primary"
            >
              Let's Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
