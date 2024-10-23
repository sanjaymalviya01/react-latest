"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  FaAddressCard,
  FaArrowRight,
  FaCreditCard,
  FaHeart,
} from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import "./style.css";
import Account from "./comp/Account/Account";
import Profile from "./comp/Profile/Profile";
import Wishlist from "./comp/Wishlist/Wishlist";
import Cart from "./comp/Cart/Cart";

const AcountWrapper = () => {
  const reduxUser = useSelector((state) => state.userReducer.loggedInUser);
  const router = useRouter();
  const [profile, setprofile] = useState(false);
  const [account, setaccount] = useState(false);
  const [wishlist, setwishlist] = useState(false);
  const [cart, setcart] = useState(false);
  const [userData, setuserData] = useState(false);
  const [formData, setformData] = useState("");

  const pathname = usePathname();

  useEffect(() => {
    setuserData(reduxUser);
    setformData(reduxUser);
    if (pathname === "/profile") {
      setprofile(true);
    }
    if (pathname === "/account") {
      setaccount(true);
    }
    if (pathname === "/wishlist") {
      setwishlist(true);
    }
    if (pathname === "/cart") {
      setcart(true);
    }
  }, [pathname]);
  return (
    <>
      {Object.keys(reduxUser).length !== 0 ? (
        <div className="side-nav-grid">
          <div className="col-span-3">
            <div className="user-info">
              <div className="user-img-div">
                {userData && (
                  <Image
                    src={userData.image}
                    width={100}
                    height={100}
                    alt="profile"
                    className="user-img"
                  />
                )}
              </div>
              <div className="flex-grow">
                <p className="greet-text">Hello,</p>
                <h4 className="user-full-name">
                  {userData.firstName} {userData.lastName}
                </h4>
              </div>
            </div>

            <div className="side-nav-options">
              <div className="wrapper-link-div">
                <Link
                  href="/account"
                  className={`wrapper-link ${
                    pathname === "/account" && "active-wrapper-link"
                  }`}
                >
                  <span className="wrapper-link-icon">
                    <FaAddressCard />
                  </span>
                  Manage account
                </Link>
                <Link
                  href={`/profile?token=${sessionStorage.getItem("token")}`}
                  className={`wrapper-link ${
                    pathname === "/profile" && "active-wrapper-link"
                  }`}
                >
                  Profile information
                </Link>
                <Link href="#" className="wrapper-link">
                  Manage addresses
                </Link>
                <Link href="#" className="wrapper-link">
                  Change password
                </Link>
              </div>

              <div className="wrapper-link-div pt-4">
                <Link href="#" className="wrapper-link">
                  <span className="wrapper-link-icon">
                    <FaBoxArchive />
                  </span>
                  My order history
                </Link>
                <Link href="#" className="wrapper-link">
                  My returns
                </Link>
                <Link href="#" className="wrapper-link">
                  My Cancellations
                </Link>
                <Link href="#" className="wrapper-link">
                  My reviews
                </Link>
              </div>

              <div className="wrapper-link-div pt-4">
                <Link href="#" className="wrapper-link">
                  <span className="wrapper-link-icon">
                    <FaCreditCard />
                  </span>
                  Payment methods
                </Link>
                <Link href="#" className="wrapper-link">
                  voucher
                </Link>
              </div>

              <div className="wrapper-link-div pt-4">
                <Link href="/wishlist" className="wrapper-link">
                  <span className="wrapper-link-icon">
                    <FaHeart />
                  </span>
                  My wishlist
                </Link>
              </div>

              <div className="wrapper-link-div pt-4">
                <button
                  onClick={() => {
                    sessionStorage.setItem("token", "");
                    router.push("/login");
                  }}
                  className="wrapper-link"
                >
                  <span className="wrapper-link-icon">
                    <FaArrowRight />
                  </span>
                  Logout
                </button>
              </div>
            </div>
          </div>

          {account && userData && <Account {...{ userData }} />}
          {profile && <Profile {...{ formData, setformData }} />}
          {wishlist && reduxUser.wishlist && <Wishlist {...{ reduxUser }} />}
          {cart && reduxUser.cart && <Cart {...{ reduxUser }} />}
        </div>
      ) : (
        router.push("/login")
      )}
    </>
  );
};

export default AcountWrapper;
