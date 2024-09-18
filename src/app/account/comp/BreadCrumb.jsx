"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const BreadCrumb = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log(url);
    // You can now use the current URL
    // ...
  }, [pathname, searchParams]);
  return (
    <div className="container py-4 flex items-center gap-3">
      <a href="../index.html" className="text-primary text-base">
        <i className="fa-solid fa-house"></i>
      </a>
      <span className="text-sm text-gray-400">
        <i className="fa-solid fa-chevron-right"></i>
      </span>
      <p className="text-gray-600 font-medium">Account</p>
    </div>
  );
};

export default BreadCrumb;
