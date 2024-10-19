"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import category1 from "@/app/assets/images/category/category-1.jpg";
import category2 from "@/app/assets/images/category/category-2.jpg";
import category3 from "@/app/assets/images/category/category-3.jpg";
import category4 from "@/app/assets/images/category/category-4.jpg";
import category5 from "@/app/assets/images/category/category-5.jpg";
import category6 from "@/app/assets/images/category/category-6.jpg";

const Categories = ({ productCotegories }) => {
  const [categories, setCategories] = useState();
  useEffect(() => {
    setCategories(productCotegories);
  }, []);
  return (
    <div className="container py-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        shop by category
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {productCotegories.map((category, index) => (
          <div
            className="relative rounded-sm overflow-hidden group"
            style={{ height: "200px", position: "relative" }}
            key={category.slug}
          >
            <Image src={category1} alt="category 1" className="w-full" />
            {/* <p>hello{Object.entries(imgObj)[index][1]}</p> */}
            <Link
              href={`/shop?category=${category.slug}`}
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
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
