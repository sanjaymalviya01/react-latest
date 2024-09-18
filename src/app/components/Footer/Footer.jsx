import React from "react";
import FooterLinks from "./FooterLinks";
import Link from "next/link";
import { MdNetworkWifi } from "react-icons/md";
import Image from "next/image";
import Logo from "@/app/assets/images/logo.svg";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
      <div className="container grid grid-cols-1 ">
        <div className="col-span-1 space-y-4">
          <Image src={Logo} alt="logo" className="w-30" />
          <div className="mr-2">
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
              hic?
            </p>
          </div>
          <div className="flex space-x-5">
            <Link href="#" className="text-gray-400 hover:text-gray-500">
              <FaFacebook/>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-500">
              <CiInstagram/>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-500">
              <FaTwitter/>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-500">
              <FaGithub/>
            </Link>
          </div>
        </div>
        <FooterLinks />
      </div>
    </footer>
  );
};

export default Footer;
