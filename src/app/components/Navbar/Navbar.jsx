"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import Navmenu from "./Navmenu";
import { FaBars } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Wishlist from "./Wishlist";
import { checkData } from "@/app/(pages)/login/actions";
import { onUerLogOut } from "@/redux/userSlice";

const Navbar = () => {
  const pathname = usePathname();
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [token, setToken] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const urlToken = searchParams.get("token");
  useEffect(() => {
    // router.refresh();
    const token = sessionStorage.getItem("token") || urlToken;
    if (token) {
      setToken(token);
      const request1 = checkData(token);
      Promise.all([request1]).then(([data1]) => {
        if (data1.props.newData.message) {
          setLoggedInUser(false);
        } else {
          setLoggedInUser(data1.props.newData);
        }
      });
    } else {
      setLoggedInUser(false);
      setToken(false);
    }
  }, [pathname, token]);
  return (
    <nav className="bg-gray-800">
      <div className="container flex">
        <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
          <span className="text-white">
            <FaBars />
          </span>

          <Dropdown />
        </div>

        <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
          <Navmenu />
          {token && (
            <>
              {pathname != "/login" && pathname != "/register" && (
                <Wishlist loggedInUser={loggedInUser} />
              )}
            </>
          )}
          {!token && (
            <>
              {pathname == "/login" ? (
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
