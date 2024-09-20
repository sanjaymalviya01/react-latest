"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "@/redux/userSlice";
import React from "react";
import Image from "next/image";
import logo from "@/app/assets/images/logo.svg";
import Link from "next/link";
import Search from "./Search";
import Wishlist from "./Wishlist";
import { usePathname } from "next/navigation";
function Header() {
  const users = useSelector((state) => state.userReducer.users);
  const [usersData, setusersData] = useState([]);
  const [allData, setallData] = useState([]);
  const dispatch = useDispatch();

  const pathname = usePathname();

  useEffect(() => {
    const request1 = fetch("https://dummyjson.com/users").then((response) =>
      response.json()
    );
    const request2 = fetch("https://dummyjson.com/products").then((response) =>
      response.json()
    );
    Promise.all([request1, request2])
      .then(([data1, data2]) => {
        setallData([data1, data2]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  if (allData.length) {
    dispatch(fetchUsers(allData));
    setallData([]);
  }

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
