"use client";
import React from "react";
import Image from "next/image";
import logo from "@/app/assets/images/logo.svg";
import Link from "next/link";
import Search from "./Search";
import "./style.css";
function Header() {
  return (
    <header className="header-main">
      <div className="header-logo-div">
        <Link href="/">
          <Image src={logo} alt="Logo" className="w-32" />
        </Link>

        <Search />
      </div>
    </header>
  );
}

export default Header;
