"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const BreadCrumb = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // const url = `${pathname}?${searchParams}`;
    const url = `${pathname}`;
    url.replace('/','')
    console.log(url);
  }, [pathname, searchParams]);
  return (
    <div className="container py-4 flex items-center gap-3">
      <Link href="../index.html" className="text-primary text-base">
        <i className="fa-solid fa-house"></i>
      </Link>
      <span className="text-sm text-gray-400">
        <i className="fa-solid fa-chevron-right"></i>
      </span>
      <p className="text-gray-600 font-medium">{pathname.replace('/','')[0].toUpperCase()+pathname.slice(2)}</p>
    </div>
  );
};

export default BreadCrumb;
