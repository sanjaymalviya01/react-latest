"use client";
import React, { useEffect, useState } from "react";
import banner from "@/app/assets/images/banner-bg.jpg";
import Link from "next/link";
import "./Style.css";

const Banner = () => {
  const [token, settoken] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      settoken(sessionStorage.getItem("token"));
    }
  }, []);
  return (
    <div
      className="banner-image"
      style={{ backgroundImage: `url(${banner.src})` }}
    >
      <div className="container">
        <h1 className="heading">
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
            <Link href="/login" className="shopping-btn">
              Login & Start Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-12">
            <Link href="/shop" className="shopping-btn">
              Let's Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
