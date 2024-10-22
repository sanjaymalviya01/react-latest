"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/Breadcrumb/Breadcrumb";
import AcountWrapper from "../../components/Wrapper/AcountWrapper/AcountWrapper";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { checkData } from "../login/actions";
import { onLoginUser } from "@/redux/userSlice";

function page() {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  useEffect(() => {
    const request1 = checkData(token);
    Promise.all([request1]).then(([data1]) => {
      if (data1.props.newData.message) {
        alert(data1.props.newData.message);
        router.push(`/login`);
      } else {
        setUser(data1.props.newData);
        dispatch(onLoginUser(data1.props.newData));
        sessionStorage.setItem("token", token);
      }
    });
    // router.refresh();
  }, []);
  return (
    <>
      <BreadCrumb />
      {user && <AcountWrapper {...{ user, token }} />}
    </>
  );
}

export default page;
