import Image from "next/image";
import React from "react";
import methods from "@/app/assets/images/methods.png";
import "./style.css";

const Copyright = () => {
  return (
    <div className="copyright-main">
      <p className="text-white">&copy; TailCommerce - All Right Reserved</p>
      <div className="copyright-img-div">
        <Image src={methods} alt="methods" className="copyright-img" />
      </div>
    </div>
  );
};

export default Copyright;
