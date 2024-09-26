"use client";
import { checkData } from "@/app/(pages)/login/actions";
import { onUerLogOut } from "@/redux/userSlice";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Navmenu = ({ searchParams }) => {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const token = useSearchParams().get("token");
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      const request1 = checkData(token);
      Promise.all([request1]).then(([data1]) => {
        if (data1.props.newData.message) {
          alert(data1.props.newData.message);
          setLoggedInUser(false);
          dispatch(onUerLogOut());
          router.push(`/login`);
        } else {
          setLoggedInUser(true);
        }
      });
    }
  }, []);
  return (
    <div className="flex items-center space-x-6 capitalize">
      <Link
        href={`/home?${searchParams}`}
        className="text-gray-200 hover:text-white transition"
      >
        Home
      </Link>
      <Link
        href={`/shop?${searchParams}`}
        className="text-gray-200 hover:text-white transition"
      >
        Shop
      </Link>
      {loggedInUser && (
        <Link
          href={`/profile?${searchParams}`}
          className="text-gray-200 hover:text-white transition"
        >
          Profile
        </Link>
      )}
    </div>
  );
};

export default Navmenu;
