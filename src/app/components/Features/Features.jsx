import React from "react";
import Image from "next/image";
import deliveryVan from "@/app/assets/images/icons/delivery-van.svg";
import moneyback from "@/app/assets/images/icons/money-back.svg";
import servicehours from "@/app/assets/images/icons/service-hours.svg";
import "./style.css";

const Features = () => {
  return (
    <div className="feature-container">
      <div className="feature-container-grid">
        <div className="feature-container-img-div">
          <Image
            src={deliveryVan}
            alt="deliveryVan"
            className="feature-container-img"
          />
          <div>
            <h4 className="feature-head">Free Shipping</h4>
            <p className="feature-para">Order over $200</p>
          </div>
        </div>
        <div className="feature-container-img-div">
          <Image
            src={moneyback}
            alt="Delivery"
            className="feature-container-img"
          />
          <div>
            <h4 className="feature-head">Money Rturns</h4>
            <p className="feature-para">30 days money returs</p>
          </div>
        </div>
        <div className="feature-container-img-div">
          <Image
            src={servicehours}
            alt="Delivery"
            className="feature-container-img"
          />
          <div>
            <h4 className="feature-head">24/7 Support</h4>
            <p className="feature-para">Customer support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
