"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import category1 from "@/app/assets/images/category/category-1.jpg";
import "./Style.css";

const Categories = ({ productCotegories }) => {
  return (
    <div className="container py-16">
      <h2 className="shop-by-category">shop by category</h2>
      <div className="home-category-container">
        {productCotegories.map((category, index) => (
          <div
            className="category-img-div group"
            style={{ height: "200px", position: "relative" }}
            key={category.slug}
          >
            <Image src={category1} alt="category 1" className="w-full" />
            <Link
              href={`/shop?category=${category.slug}`}
              className="category-img-div-link font-roboto group-hover:bg-opacity-60"
            >
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
