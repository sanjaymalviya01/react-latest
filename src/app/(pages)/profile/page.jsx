"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/Breadcrumb/Breadcrumb";
import AcountWrapper from "../../components/Wrapper/AcountWrapper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { checkData } from "../login/actions";
import { onLoginUser, onUerLogOut } from "@/redux/userSlice";

function page() {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  useEffect(() => {
    router.refresh();
    const request1 = checkData(token);
    Promise.all([request1]).then(([data1]) => {
      if (data1.props.newData.message) {
        alert(data1.props.newData.message);
        setLoggedInUser(false);
        dispatch(onUerLogOut());
        router.push(`/login`);
      } else {
        setUser(data1.props.newData);
        dispatch(onLoginUser(data1.props.newData));
        sessionStorage.setItem("token", token);
      }
    });
    router.refresh();
  }, []);
  return (
    <>
      <BreadCrumb />
      {user && <AcountWrapper user={user} />}
    </>
  );
}

export default page;
