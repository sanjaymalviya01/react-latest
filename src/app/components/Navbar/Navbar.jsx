import Link from "next/link";
import React from "react";
import Dropdown from "./Dropdown";
import Navmenu from "./Navmenu";
import {FaBars} from 'react-icons/fa'

const Navbar = () => {
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

          <Dropdown/>
        </div>

        <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
          <Navmenu/>
          <Link
            href="/login"
            className="text-gray-200 hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
