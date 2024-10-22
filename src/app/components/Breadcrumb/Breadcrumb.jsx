"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import "./Style.css";
import {
  FaChevronRight,
  FaHeart,
  FaHouseUser,
  FaProductHunt,
  FaShopify,
  FaShoppingBag,
  FaShoppingCart,
  FaShopware,
  FaUser,
} from "react-icons/fa";

const BreadCrumb = () => {
  const pathname = usePathname();
  return (
    <div className="bread-crumb">
      <Link href="/" className="bread-crumb-icon">
        {pathname == "/shop" && <FaShopify />}
        {pathname == "/product" && <FaShoppingBag />}
        {pathname == "/cart" && <FaShoppingCart />}
        {pathname == "/wishlist" && <FaHeart />}
        {pathname == "/account" && <FaUser />}
        {pathname == "/profile" && <FaUser />}
      </Link>
      <span className="bread-crumb-right-icon">
        <FaChevronRight />
      </span>
      <p className="bread-crumb-pathname">
        {pathname.replace("/", "")[0].toUpperCase() + pathname.slice(2)}
      </p>
    </div>
  );
};

export default BreadCrumb;
