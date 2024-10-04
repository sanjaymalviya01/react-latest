"use client";
import React from "react";
import Image from "next/image";
import logo from "@/app/assets/images/logo.svg";
import Link from "next/link";
import Search from "./Search";
function Header() {
  return (
    <header className="py-4 shadow-sm bg-white">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="Logo" className="w-32" />
        </Link>

        <Search />
      </div>
    </header>
  );
}

export default Header;
