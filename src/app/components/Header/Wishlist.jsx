'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";

const Wishlist = () => {
  let searchParams = useSearchParams();
  if(searchParams.length===0){
    searchParams = ''
  }
  return (
    <>
      <div className="flex items-center space-x-4">
        <Link
          href={`/wishlist?${searchParams}`}
          className="text-center text-gray-700 hover:text-primary transition relative"
        >
          <div className="text-2xl">
            <CiHeart className="text-white" />
          </div>
          <div className="text-white text-xs leading-3">Wishlist</div>
          <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
            8
          </div>
        </Link>
        <Link
          href={`/account?${searchParams}`}
          className="text-center text-gray-700 hover:text-primary transition relative"
        >
          <div className="text-2xl">
            <CiShoppingCart className="text-white" />
          </div>
          <div className="text-xs leading-3 text-white">Cart</div>
          <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
            2
          </div>
        </Link>
        <Link
          href={`/account?${searchParams}`}
          className="text-center text-gray-700 hover:text-primary transition relative"
        >
          <div className="text-2xl">
            <CiUser className="text-white" />
          </div>
          <div className="text-xs leading-3 text-white">Account</div>
        </Link>
      </div>
    </>
  );
};

export default Wishlist;
