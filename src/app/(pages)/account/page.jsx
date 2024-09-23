'use client'
import React from "react";
import BreadCrumb from "../../components/Breadcrumb/Breadcrumb";
import AcountWrapper from "../../components/Wrapper/AcountWrapper";
import { useSelector } from "react-redux";
import Link from "next/link";

function page() {
  const user = useSelector((state)=>state.userReducer.loggedInUser)
  if(user.length){
    // console.log(user)
  }else{
    return(<div className='rounder shadow m-4 p-10 ' style={{display:'flex',alignItems:"center",justifyContent:"center",flexDirection:'column', gap:"20px"}}>
      <h1>Some thing went wrong</h1>
      <Link href={'/login'}className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium" style={{width:"150px"}}>Login</Link>
    </div>)
  }
  return (
    <>
      <BreadCrumb />
      <AcountWrapper user={user} />
    </>
  );
}

export default page;
