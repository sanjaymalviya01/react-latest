"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { PiGear } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ImProfile } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";
import { onUerLogOut } from "@/redux/userSlice";

const Wishlist = ({}) => {
  const searchParams = useSearchParams();
  const [wishlistCount, setwishlistCount] = useState(0);
  const [moreMenu, setMoreMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [token, setToken] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userReducer.loggedInUser);
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      router.push("/login");
    } else {
      setToken(sessionStorage.getItem("token"));
    }
  }, [sessionStorage.getItem("token")]);

  useEffect(() => {
    if (loggedInUser.wishlist != undefined) {
      setwishlistCount(loggedInUser.wishlist.length);
    }
    if (loggedInUser.cart != undefined) {
      let count = 0;
      loggedInUser.cart.map((product) => {
        count = count + product.quantity;
      });
      setCartCount(count);
    }
  }, [loggedInUser]);
  return (
    <>
      <div className="flex items-center space-x-4">
        <Link
          href={`/wishlist`}
          className="text-center text-gray-700 hover:text-primary transition relative"
        >
          <div className="text-2xl">
            <CiHeart className="text-white" />
          </div>
          <div className="text-white text-xs leading-3">Wishlist</div>
          <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
            {wishlistCount}
          </div>
        </Link>
        <Link
          href={`/cart`}
          className="text-center text-gray-700 hover:text-primary transition relative"
        >
          <div className="text-2xl">
            <CiShoppingCart className="text-white" />
          </div>
          <div className="text-xs leading-3 text-white">Cart</div>
          <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
            {cartCount}
          </div>
        </Link>
        <div className="relative inline-block text-left">
          <div>
            <Link
              href="#"
              type="button"
              className="text-center text-gray-700 hover:text-primary transition relative"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => {
                moreMenu == false ? setMoreMenu(true) : setMoreMenu(false);
              }}
            >
              <div className="text-2xl">
                <PiGear className="text-white" />
              </div>
              <div className="text-xs leading-3 text-white">More</div>
            </Link>
            {moreMenu && (
              <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
                onClick={() => {
                  setMoreMenu(false);
                }}
              >
                <div className="py-1" role="none">
                  <Link
                    href={`/account`}
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-0"
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <FaUserAlt className="text-gray-700" />
                    Account
                  </Link>
                  <Link
                    href={`/profile?token=${token}`}
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-0"
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <ImProfile className="text-gray-700" />
                    Profile
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-0"
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                    onClick={() => {
                      sessionStorage.setItem("token", "");
                      router.push("/login");
                    }}
                  >
                    <MdLogout className="text-gray-700" />
                    Log Out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
