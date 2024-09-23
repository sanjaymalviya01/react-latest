"use client";
import Link from "next/link";
import React from "react";
import Dropdown from "./Dropdown";
import Navmenu from "./Navmenu";
import { FaBars } from "react-icons/fa";
import { usePathname, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import Wishlist from "../Header/Wishlist";

const Navbar = () => {
  const loggedInUser = useSelector((state) => state.userReducer.loggedInUser);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <nav className="bg-gray-800">
      <div className="container flex">
        <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
          <span className="text-white">
            <FaBars />
          </span>
          <span className="capitalize ml-2 text-white hidden">
            All Categories
          </span>

          <Dropdown />
        </div>

        <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
          <Navmenu searchParams={searchParams} />
          {loggedInUser.length >= 1 && searchParams ? (
            <Wishlist />
          ) : pathname == "/login" ? (
            <Link
              href="/register"
              className="text-gray-200 hover:text-white transition"
            >
              Register
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-gray-200 hover:text-white transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
