"use client";
import React, { useEffect, useState } from "react";
import AcountWrapper from "../../components/Wrapper/AcountWrapper";
import BreadCrumb from "../../components/Breadcrumb/Breadcrumb";
import { useRouter, useSearchParams } from "next/navigation";
import { checkData } from "../login/actions";
import { useDispatch } from "react-redux";
import { onUerLogOut } from "@/redux/userSlice";

function page() {
  const [loggedInUser, setLoggedInUser] = useState(true);
  const token = useSearchParams().get("token");
  const router = useRouter();
  const dispatch = useDispatch()
  useEffect(() => {
    const request1 = checkData(token);
    Promise.all([request1]).then(([data1]) => {
      if (data1.props.newData.message) {
        alert(data1.props.newData.message);
        setLoggedInUser(false);
        dispatch(onUerLogOut())
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
}

export default page;
