"use client";
import { useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Form from "./comp/form/Form";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
function page() {
  const loggedInUser = useSelector((state) => state.userReducer.loggedInUser);
  const router = useRouter();
  const pathname = usePathname();
  const [showData, setshowdata] = useState(false);
  useEffect(() => {
    if (
      sessionStorage.getItem("token") === null ||
      loggedInUser.cart.length === 0
    ) {
      router.push("/shop");
    } else {
      setshowdata(true);
    }
  }, [pathname]);
  return (
    <>
      {showData && (
        <>
          <Breadcrumb />
          <Form />
        </>
      )}
    </>
  );
}

export default page;
