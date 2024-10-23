import Link from "next/link";
import Image from "next/image";
import sofa from "@/app/assets/images/icons/sofa.svg";
import React, { useEffect, useState } from "react";
import "./style.css";
import { fetchProductCotegories } from "./fetchFile";

const Dropdown = () => {
  const [categories, setCategories] = useState([]);
  const fetch = async () => {
    const productCotegories = await fetchProductCotegories();
    if (productCotegories) {
      setCategories(productCotegories);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="nav-dropdown-main group-hover:opacity-100 group-hover:visible">
      {categories.map((category, index) => (
        <Link
          key={index}
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
