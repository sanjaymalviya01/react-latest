import Link from "next/link";
import React from "react";

const Navmenu = ({ searchParams }) => {
  return (
    <div className="flex items-center space-x-6 capitalize">
      <Link
        href={`/home?${searchParams}`}
        className="text-gray-200 hover:text-white transition"
      >
        Home
      </Link>
      <Link
        href={`/shop?${searchParams}`}
        className="text-gray-200 hover:text-white transition"
      >
        Shop
      </Link>
    </div>
  );
};

export default Navmenu;
