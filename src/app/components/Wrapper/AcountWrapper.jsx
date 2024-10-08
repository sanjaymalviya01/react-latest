"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  onUerLogOut,
  onUpdateUser,
  removeFromCart,
  removeFromWishlist,
  setCartQuantity,
} from "@/redux/userSlice";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaHeart } from "react-icons/fa";

const AcountWrapper = () => {
  const reduxUser = useSelector((state) => state.userReducer.loggedInUser);
  const router = useRouter();
  const dispatch = useDispatch();
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
    if (pathname == "/profile") {
      setprofile(true);
    }
    if (pathname == "/account") {
      setaccount(true);
    }
    if (pathname == "/wishlist") {
      setwishlist(true);
    }
    if (pathname == "/cart") {
      setcart(true);
    }
  }, [pathname]);
  return (
    <>
      {Object.keys(reduxUser).length != 0 ? (
        <>
          <div className="container grid grid-cols-12 items-start gap-6 pt-4 pb-16">
            <div className="col-span-3">
              <div className="px-4 py-3 shadow flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src={userData.image}
                    width={500}
                    height={500}
                    alt="profile"
                    className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-gray-600">Hello,</p>
                  <h4 className="text-gray-800 font-medium">
                    {userData.firstName} {userData.lastName}
                  </h4>
                </div>
              </div>

              <div className="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
                <div className="space-y-1 pl-8">
                  <Link
                    href="#"
                    className="relative text-primary block font-medium capitalize transition"
                  >
                    <span className="absolute -left-8 top-0 text-base">
                      <i className="fa-regular fa-address-card"></i>
                    </span>
                    Manage account
                  </Link>
                  <Link
                    href="#"
                    className="relative hover:text-primary block capitalize transition"
                  >
                    Profile information
                  </Link>
                  <Link
                    href="#"
                    className="relative hover:text-primary block capitalize transition"
                  >
                    Manage addresses
                  </Link>
                  <Link
                    href="#"
                    className="relative hover:text-primary block capitalize transition"
                  >
                    Change password
                  </Link>
                </div>

                <div className="space-y-1 pl-8 pt-4">
                  <Link
                    href="#"
                    className="relative hover:text-primary block font-medium capitalize transition"
                  >
                    <span className="absolute -left-8 top-0 text-base">
                      <i className="fa-solid fa-box-archive"></i>
                    </span>
                    My order history
                  </Link>
                  <Link
                    href="#"
                    className="relative hover:text-primary block capitalize transition"
                  >
                    My returns
                  </Link>
                  <Link
                    href="#"
                    className="relative hover:text-primary block capitalize transition"
                  >
                    My Cancellations
                  </Link>
                  <Link
                    href="#"
                    className="relative hover:text-primary block capitalize transition"
                  >
                    My reviews
                  </Link>
                </div>

                <div className="space-y-1 pl-8 pt-4">
                  <Link
                    href="#"
                    className="relative hover:text-primary block font-medium capitalize transition"
                  >
                    <span className="absolute -left-8 top-0 text-base">
                      <i className="fa-regular fa-credit-card"></i>
                    </span>
                    Payment methods
                  </Link>
                  <Link
                    href="#"
                    className="relative hover:text-primary block capitalize transition"
                  >
                    voucher
                  </Link>
                </div>

                <div className="space-y-1 pl-8 pt-4">
                  <Link
                    href="#"
                    className="relative hover:text-primary block font-medium capitalize transition"
                  >
                    <span className="absolute -left-8 top-0 text-base">
                      <i className="fa-regular fa-heart"></i>
                    </span>
                    My wishlist
                  </Link>
                </div>

                <div className="space-y-1 pl-8 pt-4">
                  <button
                    onClick={() => {
                      sessionStorage.setItem("token", "");
                      router.push("/login");
                    }}
                    style={{ border: "none" }}
                    className="relative hover:text-primary block font-medium capitalize transition"
                  >
                    <span className="absolute -left-8 top-0 text-base">
                      <FaArrowRight />
                    </span>
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {account && userData && (
              <div className="col-span-9 grid grid-cols-3 gap-4">
                <div className="shadow rounded bg-white px-4 pt-6 pb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-800 text-lg">
                      Personal Profile
                    </h3>
                    <Link href="#" className="text-primary">
                      Edit
                    </Link>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-gray-700 font-medium">
                      {userData.firstName} {userData.lastName}
                    </h4>
                    <p className="text-gray-800">{userData.email}</p>
                    <p className="text-gray-800">{userData.phone}</p>
                  </div>
                </div>

                <div className="shadow rounded bg-white px-4 pt-6 pb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-800 text-lg">
                      Shipping address
                    </h3>
                    <Link href="#" className="text-primary">
                      Edit
                    </Link>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-gray-700 font-medium">
                      {userData.firstName} {userData.lastName}
                    </h4>
                    <p className="text-gray-800">
                      {userData.address.address},{userData.address.city}
                    </p>
                    <p className="text-gray-800">
                      {userData.address.postalCode}
                    </p>
                    <p className="text-gray-800">{userData.phone}</p>
                  </div>
                </div>

                <div className="shadow rounded bg-white px-4 pt-6 pb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-800 text-lg">
                      Billing address
                    </h3>
                    <Link href="#" className="text-primary">
                      Edit
                    </Link>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-gray-700 font-medium">John Doe</h4>
                    <p className="text-gray-800">
                      {userData.company.address.address},{" "}
                      {userData.company.address.city}
                    </p>
                    <p className="text-gray-800">
                      {userData.company.address.postalCode}
                    </p>
                    <p className="text-gray-800">{userData.phone}</p>
                  </div>
                </div>
              </div>
            )}
            {profile && (
              <div className="col-span-9 shadow rounded px-6 pt-5 pb-7">
                <h4 className="text-lg font-medium capitalize mb-4">
                  Profile information
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="first">First name</label>
                      <input
                        type="text"
                        name="first"
                        id="first"
                        value={formData.firstName}
                        onChange={(e) => {
                          setformData((prevData) => ({
                            ...prevData,
                            firstName: e.target.value,
                          }));
                        }}
                        className="input-box"
                      />
                    </div>
                    <div>
                      <label htmlFor="last">Last name</label>
                      <input
                        type="text"
                        name="last"
                        id="last"
                        value={formData.lastName}
                        onChange={(e) => {
                          setformData((prevData) => ({
                            ...prevData,
                            lastName: e.target.value,
                          }));
                        }}
                        className="input-box"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="birthday">Birthday</label>
                      <input
                        type="date"
                        name="birthday"
                        id="birthday"
                        value={formData.birthDate}
                        onChange={(e) => {
                          setformData((prevData) => ({
                            ...prevData,
                            birthDate: e.target.value,
                          }));
                        }}
                        className="input-box"
                      />
                    </div>
                    <div>
                      <label htmlFor="gender">Gender</label>
                      <select
                        name="gender"
                        id="gender"
                        className="input-box"
                        value={formData.gender}
                        onChange={(e) => {
                          setformData((prevData) => ({
                            ...prevData,
                            gender: e.target.value,
                          }));
                        }}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="input-box"
                        value={formData.email}
                        onChange={(e) => {
                          setformData((prevData) => ({
                            ...prevData,
                            email: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone">Phone number</label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          setformData((prevData) => ({
                            ...prevData,
                            phone: e.target.value,
                          }));
                        }}
                        className="input-box"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(onUpdateUser(formData));
                    }}
                  >
                    save changes
                  </button>
                </div>
              </div>
            )}
            {wishlist && reduxUser.wishlist && (
              <div className="col-span-9 space-y-4">
                {reduxUser.wishlist.length == 0 ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h1>No Data To show </h1>
                  </div>
                ) : (
                  reduxUser.wishlist &&
                  reduxUser.wishlist.map((product) => (
                    <>
                      <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
                        <div
                          className="w-28"
                          style={{ height: "100px", position: "relative" }}
                        >
                          <Image
                            fill={true}
                            sizes="(max-width: 768px)"
                            priority={false}
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full"
                          />
                        </div>
                        <div className="w-1/3">
                          <h2 className="text-gray-800 text-xl font-medium uppercase">
                            {product.title}
                          </h2>
                          <p className="text-gray-500 text-sm">
                            Availability:{" "}
                            <span className="text-green-600">
                              {product.stock} In Stock
                            </span>
                          </p>
                        </div>
                        <div className="text-primary text-lg font-semibold">
                          ${product.price}
                        </div>
                        <button
                          onClick={() => {
                            if (
                              sessionStorage.getItem("token") != null ||
                              sessionStorage.getItem("token") != ""
                            ) {
                              dispatch(addToCart(product));
                              router.push(`/cart`);
                            } else {
                              router.push(`/login`);
                            }
                          }}
                          className="px-6 py-2 text-center text-sm text-primary bg-dark border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                        >
                          add to cart
                        </button>
                        <button
                          className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                          onClick={() => {
                            dispatch(removeFromWishlist(product));
                          }}
                        >
                          remove
                        </button>

                        <div className="text-gray-600 cursor-pointer hover:text-primary">
                          <i className="fa-solid fa-trash"></i>
                        </div>
                      </div>
                    </>
                  ))
                )}
              </div>
            )}
            {cart && reduxUser.cart && (
              <div
                className="
            col-span-9 
            flex"
              >
                <div>
                  {reduxUser.cart.length == 0 ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <h1>No Data To show </h1>
                    </div>
                  ) : (
                    reduxUser.cart &&
                    reduxUser.cart.map((product) => (
                      <>
                        <div className="flex flex-col items-center justify-between border gap-6 p-4 border-gray-200 rounded">
                          <div style={{ display: "flex", width: "480px" }}>
                            <div
                              className="w-28"
                              style={{ height: "100px", position: "relative" }}
                            >
                              <Image
                                fill={true}
                                sizes="(max-width: 768px)"
                                priority={false}
                                src={product.images[0]}
                                alt={product.title}
                                className="w-full"
                              />
                            </div>
                            <div>
                              <Link
                                href={{
                                  pathname: "/product",
                                  query: { productId: product.id },
                                }}
                              >
                                <h2
                                  className="text-gray-800 text-xl font-medium uppercase overflow-hidden text-wrap"
                                  style={{
                                    width: "350px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {product.title}
                                </h2>
                              </Link>
                              <div className="flex justify-between">
                                <div>
                                  <p className="text-gray-500 text-sm">
                                    Availability:{" "}
                                    {product.stock == product.quantity ? (
                                      <>
                                        <span className="text-red-500">
                                          Out of stock
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        {product.stock - product.quantity <=
                                        10 ? (
                                          <>
                                            <span className="text-orange-500">
                                              Low Stock -{" "}
                                              {product.stock - product.quantity}
                                            </span>
                                          </>
                                        ) : (
                                          <>
                                            <span className="text-green-500">
                                              In Stock -{" "}
                                              {product.stock - product.quantity}
                                            </span>
                                          </>
                                        )}
                                      </>
                                    )}
                                  </p>
                                  <p className="text-gray-500 text-sm">
                                    Discount:{" "}
                                    <span className="text-green-600">
                                      {product.discountPercentage} %
                                    </span>{" "}
                                  </p>
                                </div>
                                <div className="text-primary text-2xl font-semibold flex items-baseline">
                                  <del className="text-xs text-gray-400 font-normal">
                                    ${product.price}
                                  </del>
                                  $
                                  {(
                                    product.price -
                                    (product.discountPercentage / 100) *
                                      product.price
                                  ).toFixed(2)}
                                </div>
                              </div>
                              <div className="flex justify-around mt-2">
                                <div className="flex items-center content-center">
                                  <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                                    <div
                                      className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                                      onClick={() => {
                                        if (product.quantity > 1) {
                                          dispatch(
                                            setCartQuantity([
                                              product,
                                              product.quantity - 1,
                                            ])
                                          );
                                        }
                                        console.log(product.quantity);
                                      }}
                                    >
                                      -
                                    </div>
                                    <div className="h-8 w-8 text-base flex items-center justify-center">
                                      {product && product.quantity}
                                    </div>
                                    <div
                                      className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                                      onClick={() => {
                                        if (product.quantity < product.stock) {
                                          dispatch(
                                            setCartQuantity([
                                              product,
                                              product.quantity + 1,
                                            ])
                                          );
                                        }
                                        console.log(product.quantity);
                                      }}
                                    >
                                      +
                                    </div>
                                  </div>
                                </div>

                                <button
                                  className="px-3 py-1 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                                  onClick={() => {
                                    dispatch(removeFromCart(product));
                                  }}
                                >
                                  remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))
                  )}
                </div>
                {reduxUser.cart && reduxUser.cart.length != 0 && (
                  <>
                    <div
                      className="border flex flex-col ml-6 "
                      style={{
                        width: "350px",
                        alignItems: "center",
                      }}
                    >
                      <h1 className="text-gray-800 text-xl my-4 font-medium uppercase">
                        price details
                      </h1>
                      <div className="flex flex-col">
                        <hr />
                        <div className="flex justify-between gap-10 my-2">
                          <p>
                            Price ({reduxUser.cart.length} item
                            {reduxUser.cart.length > 1 ? "s" : ""})
                          </p>
                          <p>
                            $
                            {reduxUser.cart
                              .reduce(
                                (total, item) =>
                                  total + item.price * item.quantity,
                                0
                              )
                              .toFixed(2)}
                          </p>
                        </div>
                        <div className="flex justify-between gap-10 my-2">
                          <p>Discount</p>
                          <p>
                            $
                            {reduxUser.cart
                              .reduce(
                                (total, item) =>
                                  total +
                                  (item.discountPercentage / 100) *
                                    item.price *
                                    item.quantity,
                                0
                              )
                              .toFixed(2)}
                          </p>
                        </div>
                        <div className="flex justify-between gap-10 my-2">
                          <p>Delivery Charges</p>
                          <p>Free</p>
                        </div>

                        <hr />
                        <div className="flex justify-between gap-10 my-2">
                          <p>Total Amount</p>
                          <p className="text-primary">
                            $
                            {reduxUser.cart
                              .reduce(
                                (total, item) =>
                                  total +
                                  (item.price -
                                    (item.discountPercentage / 100) *
                                      item.price) *
                                    item.quantity,
                                0
                              )
                              .toFixed(2)}
                          </p>
                        </div>
                        <div className="text-primary text-sm">
                          <p>
                            You will save $
                            {reduxUser.cart
                              .reduce(
                                (total, item) =>
                                  total +
                                  (item.discountPercentage / 100) *
                                    item.price *
                                    item.quantity,
                                0
                              )
                              .toFixed(2)}{" "}
                            on this order
                          </p>
                        </div>

                        <button
                          className="m-4 px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                          onClick={() => {
                            router.push(`/checkout`);
                          }}
                        >
                          place order
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        router.push("/login")
      )}
    </>
  );
};

export default AcountWrapper;
