"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import avatar from "@/app/assets/images/avatar.png";
import product6 from "@/app/assets/images/products/product6.jpg";
import product5 from "@/app/assets/images/products/product5.jpg";
import product10 from "@/app/assets/images/products/product10.jpg";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { onUerLogOut, onUpdateUser } from "@/redux/userSlice";

const AcountWrapper = ({ user }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const urlToken = searchParams.get("token");
  const [profile, setprofile] = useState(false);
  const [account, setaccount] = useState(false);
  const [wishlist, setwishlist] = useState(false);
  const [userData, setuserData] = useState(false);
  const [formData, setformData] = useState("");

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

  const pathname = usePathname();

  useEffect(() => {
    if (user[0].token == urlToken) {
      console.log("token matched");
      setuserData(user[0]);
      setformData(user[0]);
    }else{
      return (<div className='rounder shadow m-4 p-10 ' style={{display:'flex',alignItems:"center",justifyContent:"center",flexDirection:'column', gap:"20px"}}>
        <h1>Some thing went wrong</h1>
        <Link href={'/login'}className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium" style={{width:"150px"}}>Login</Link>
      </div>)
    }
    if (pathname == "/profile") {
      setprofile(true);
    }
    if (pathname == "/account") {
      setaccount(true);
    }
    if (pathname == "/wishlist") {
      setwishlist(true);
    }
  }, [pathname, searchParams]);
  return (
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
                dispatch(onUerLogOut());
              }}
              style={{ border: "none" }}
              className="relative hover:text-primary block font-medium capitalize transition"
            >
              <span className="absolute -left-8 top-0 text-base">
                <i className="fa-regular fa-arrow-right-from-bracket"></i>
              </span>
              Logout
            </button>
          </div>
        </div>
      </div>

      {account && (
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
              <p className="text-gray-800">{userData.address.postalCode}</p>
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
                console.log(formData);
              }}
            >
              save changes
            </button>
          </div>
        </div>
      )}
      {wishlist && (
        <div className="col-span-9 space-y-4">
          <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
            <div className="w-28">
              <Image src={product6} alt="product 6" className="w-full" />
            </div>
            <div className="w-1/3">
              <h2 className="text-gray-800 text-xl font-medium uppercase">
                Italian L shape
              </h2>
              <p className="text-gray-500 text-sm">
                Availability: <span className="text-green-600">In Stock</span>
              </p>
            </div>
            <div className="text-primary text-lg font-semibold">$320.00</div>
            <Link
              href="#"
              className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
            >
              add to cart
            </Link>

            <div className="text-gray-600 cursor-pointer hover:text-primary">
              <i className="fa-solid fa-trash"></i>
            </div>
          </div>

          <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
            <div className="w-28">
              <Image src={product5} alt="product 6" className="w-full" />
            </div>
            <div className="w-1/3">
              <h2 className="text-gray-800 text-xl font-medium uppercase">
                Dining Table
              </h2>
              <p className="text-gray-500 text-sm">
                Availability: <span className="text-green-600">In Stock</span>
              </p>
            </div>
            <div className="text-primary text-lg font-semibold">$320.00</div>
            <Link
              href="#"
              className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
            >
              add to cart
            </Link>

            <div className="text-gray-600 cursor-pointer hover:text-primary">
              <i className="fa-solid fa-trash"></i>
            </div>
          </div>

          <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
            <div className="w-28">
              <Image src={product10} alt="product 6" className="w-full" />
            </div>
            <div className="w-1/3">
              <h2 className="text-gray-800 text-xl font-medium uppercase">
                Sofa
              </h2>
              <p className="text-gray-500 text-sm">
                Availability: <span className="text-red-600">Out of Stock</span>
              </p>
            </div>
            <div className="text-primary text-lg font-semibold">$320.00</div>
            <Link
              href="#"
              className="cursor-not-allowed px-6 py-2 text-center text-sm text-white bg-red-400 border border-red-400 rounded transition uppercase font-roboto font-medium"
            >
              add to cart
            </Link>

            <div className="text-gray-600 cursor-pointer hover:text-primary">
              <i className="fa-solid fa-trash"></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcountWrapper;
