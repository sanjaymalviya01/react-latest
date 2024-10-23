"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import Navmenu from "./Navmenu";
import { FaBars } from "react-icons/fa";
import { usePathname, useSearchParams } from "next/navigation";
import Wishlist from "./Wishlist";
import { checkData } from "@/app/(pages)/login/actions";
import LoginRegisterBtn from "./LoginRegisterBtn";
import "./style.css";

const Navbar = () => {
  const pathname = usePathname();
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [token, setToken] = useState();
  const [renderWishlist, setRenderWishlist] = useState(false);
  const searchParams = useSearchParams();
  const urlToken = searchParams.get("token");
  const verifyOnAnyChange = async (token) => {
    const request1 = await checkData(token);
    Promise.all([request1]).then(([data1]) => {
      if (data1.props.newData.message) {
        setLoggedInUser(false);
      } else {
        setLoggedInUser(data1.props.newData);
      }
    });
  };
  useEffect(() => {
    const token = sessionStorage.getItem("token") || urlToken;
    if (token) {
      setToken(token);
      verifyOnAnyChange(token);
      setRenderWishlist(true);
    } else {
      setRenderWishlist(false);
      setLoggedInUser(false);
      setToken(false);
    }
  }, [pathname, token]);
  return (
    <nav className="navbar-main">
      <div className="navbar-main-div">
        <div className="navbar-dropdown-div group">
          <span className="navbar-dropdown-span">
            <FaBars />
          </span>

          <Dropdown />
        </div>

        <div className="navbar-menu-div">
          <Navmenu />
          {renderWishlist ? (
            <Wishlist loggedInUser={loggedInUser} />
          ) : (
            <LoginRegisterBtn />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
