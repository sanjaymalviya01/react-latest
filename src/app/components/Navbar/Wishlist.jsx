"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { PiGear } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { ImProfile } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";

const Wishlist = ({}) => {
  const [wishlistCount, setwishlistCount] = useState(0);
  const [moreMenu, setMoreMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [token, setToken] = useState("");
  const router = useRouter();
  const loggedInUser = useSelector((state) => state.userReducer.loggedInUser);
  const sessionStorageToken = sessionStorage.getItem("token");
  useEffect(() => {
    if (sessionStorageToken) {
      setToken(sessionStorageToken);
    }
  }, [sessionStorageToken]);

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
    <div className="nav-wishlist">
      <Link href={`/wishlist`} className="nav-wishlist-link">
        <div className="nav-wishlist-link-icon">
          <CiHeart />
        </div>
        <div className="nav-wishlist-link-name">Wishlist</div>
        {wishlistCount != 0 && (
          <div className="nav-wishlist-link-wishlist-count">
            {wishlistCount}
          </div>
        )}
      </Link>
      <Link href={`/cart`} className="nav-wishlist-link">
        <div className="nav-wishlist-link-icon">
          <CiShoppingCart />
        </div>
        <div className="nav-wishlist-link-name">Cart</div>
        {cartCount != 0 && (
          <div className="nav-wishlist-link-cart-count">{cartCount}</div>
        )}
      </Link>
      <div className="nav-wishlist-morebtn">
        <div>
          <Link
            href="#"
            className="nav-wishlist-link"
            onClick={() => {
              moreMenu == false ? setMoreMenu(true) : setMoreMenu(false);
            }}
          >
            <div className="nav-wishlist-link-icon">
              <PiGear />
            </div>
            <div className="nav-wishlist-link-name">More</div>
          </Link>
          {moreMenu && (
            <div
              className="nav-wishlist-moremenu"
              onClick={() => {
                setMoreMenu(false);
              }}
            >
              <div className="py-1" role="none">
                <Link href={`/account`} className="nav-wishlist-moremenu-link">
                  <FaUserAlt className="text-gray-700" />
                  Account
                </Link>
                <Link
                  href={`/profile?token=${token}`}
                  className="nav-wishlist-moremenu-link"
                >
                  <ImProfile className="text-gray-700" />
                  Profile
                </Link>
                <button
                  className="nav-wishlist-moremenu-link"
                  onClick={() => {
                    sessionStorage.removeItem("token");
                    router.push("/login");
                  }}
                >
                  <MdLogout className="text-gray-700" />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
