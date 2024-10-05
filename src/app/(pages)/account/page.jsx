"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/Breadcrumb/Breadcrumb";
import AcountWrapper from "../../components/Wrapper/AcountWrapper";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { checkData } from "../login/actions";

function page() {
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
          <AcountWrapper loggedInUser={loggedInUser} />
        </>
      )}
    </>
  );
}

export default page;
