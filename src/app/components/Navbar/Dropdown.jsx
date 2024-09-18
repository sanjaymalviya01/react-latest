import Link from "next/link";
import Image from "next/image";
import sofa from "@/app/assets/images/icons/sofa.svg";
import terrace from "@/app/assets/images/icons/terrace.svg";
import bed from "@/app/assets/images/icons/bed.svg";
import office from "@/app/assets/images/icons/office.svg";
import outdoorCafe from "@/app/assets/images/icons/outdoor-cafe.svg";
import bed2 from "@/app/assets/images/icons/bed-2.svg";
import React from "react";

const Dropdown = () => {
  return (
    <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
      <Link
        href="#"
        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
      >
        <Image src={sofa} alt="sofa" className="w-5 h-5 object-contain" />
        <span className="ml-6 text-gray-600 text-sm">Sofa</span>
      </Link>
      <Link
        href="#"
        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
      >
        <Image src={terrace} alt="sofa" className="w-5 h-5 object-contain" />
        <span className="ml-6 text-gray-600 text-sm">Terarce</span>
      </Link>
      <Link
        href="#"
        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
      >
        <Image src={bed} alt="sofa" className="w-5 h-5 object-contain" />
        <span className="ml-6 text-gray-600 text-sm">Bed</span>
      </Link>
      <Link
        href="#"
        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
      >
        <Image src={office} alt="sofa" className="w-5 h-5 object-contain" />
        <span className="ml-6 text-gray-600 text-sm">office</span>
      </Link>
      <Link
        href="#"
        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
      >
        <Image
          src={outdoorCafe}
          alt="sofa"
          className="w-5 h-5 object-contain"
        />
        <span className="ml-6 text-gray-600 text-sm">Outdoor</span>
      </Link>
      <Link
        href="#"
        className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
      >
        <Image src={bed2} alt="sofa" className="w-5 h-5 object-contain" />
        <span className="ml-6 text-gray-600 text-sm">Mattress</span>
      </Link>
    </div>
  );
};

export default Dropdown;
