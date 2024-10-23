"use client";
import Link from "next/link";

const Navmenu = () => {
  return (
    <div className="nav-navmenu">
      <Link href={`/home`} className="nav-navmenu-link">
        Home
      </Link>
      <Link href={`/shop`} className="nav-navmenu-link">
        Shop
      </Link>
    </div>
  );
};

export default Navmenu;
