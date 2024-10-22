import React from "react";
import FooterLinks from "./FooterLinks";
import Link from "next/link";
import { MdNetworkWifi } from "react-icons/md";
import Image from "next/image";
import Logo from "@/app/assets/images/logo.svg";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import Copyright from "../Copyright/Copyright";
import "./style.css";

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="footer-grid">
        <div className="footer-logo-div">
          <Image src={Logo} alt="logo" className="w-30" />
          <div className="mr-2">
            <p className="footer-logo-para">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
              hic?
            </p>
          </div>
          <div className="footer-social-div">
            <Link href="#" className="footer-social-link">
              <FaFacebook />
            </Link>
            <Link href="#" className="footer-social-link">
              <CiInstagram />
            </Link>
            <Link href="#" className="footer-social-link">
              <FaTwitter />
            </Link>
            <Link href="#" className="footer-social-link">
              <FaGithub />
            </Link>
          </div>
        </div>
        <FooterLinks />
      </div>
      <Copyright />
    </footer>
  );
};

export default Footer;
