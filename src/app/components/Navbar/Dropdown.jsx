import Link from "next/link";
import Image from "next/image";
import sofa from "@/app/assets/images/icons/sofa.svg";
import React, { useEffect, useState } from "react";
import "./style.css";

const Dropdown = () => {
  const [categories, setCategories] = useState([]);
  const fetchProductCotegories = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(async () => {
    const productCotegories = await fetchProductCotegories();
    if (productCotegories) {
      setCategories(productCotegories);
    }
  }, []);

  return (
    <div className="nav-dropdown-main group-hover:opacity-100 group-hover:visible">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/shop?category=${category.slug}`}
          className="nav-category-link"
        >
          <Image src={sofa} alt="sofa" className="nav-category-img" />
          <span className="nav-category-name">{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Dropdown;
