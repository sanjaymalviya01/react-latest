"use client";
import BreadCrumb from "@/app/components/Breadcrumb/Breadcrumb";
import AcountWrapper from "@/app/components/Wrapper/AcountWrapper";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkData } from "../login/actions";
import { onUerLogOut } from "@/redux/userSlice";

const page = () => {
  const [loggedInUser, setLoggedInUser] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const request1 = checkData(token);
    Promise.all([request1]).then(([data1]) => {
      if (data1.props.newData.message) {
        alert(data1.props.newData.message);
        setLoggedInUser(false);
        router.push(`/login`);
      } else {
        setLoggedInUser(data1.props.newData);
      }
    });
  }, []);
  return (
    <>
      {loggedInUser && (
        <>
          <BreadCrumb />
          <AcountWrapper user={loggedInUser} />
        </>
      )}
    </>
  );
};

export default page;
