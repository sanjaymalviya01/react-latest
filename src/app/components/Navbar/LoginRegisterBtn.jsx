"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function LoginRegisterBtn() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/login") {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [pathname]);
  return (
    <>
      {visible ? (
        <Link href="/login" className="nav-login-reg">
          Login
        </Link>
      ) : (
        <Link href="/register" className="nav-login-reg">
          Register
        </Link>
      )}
    </>
  );
}

export default LoginRegisterBtn;
