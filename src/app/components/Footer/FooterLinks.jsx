import Link from "next/link";
import React from "react";

const FooterLinks = () => {
  return (
    <div className="footerlinks-main">
      <div className="footerlinks-grid">
        <div>
          <h3 className="footerlinks-head">Solutions</h3>
          <div className="footerlinks-link-div">
            <Link href="#" className="footerlinks-link">
              Marketing
            </Link>
            <Link href="#" className="footerlinks-link">
              Analitycs
            </Link>
            <Link href="#" className="footerlinks-link">
              Commerce
            </Link>
            <Link href="#" className="footerlinks-link">
              Insights
            </Link>
          </div>
        </div>

        <div>
          <h3 className="footerlinks-head">Support</h3>
          <div className="footerlinks-link-div">
            <Link href="#" className="footerlinks-link">
              Pricing
            </Link>
            <Link href="#" className="footerlinks-link">
              Guides
            </Link>
            <Link href="#" className="footerlinks-link">
              API Status
            </Link>
          </div>
        </div>
      </div>
      <div className="footerlinks-grid">
        <div>
          <h3 className="footerlinks-head">Solutions</h3>
          <div className="footerlinks-link-div">
            <Link href="#" className="footerlinks-link">
              Marketing
            </Link>
            <Link href="#" className="footerlinks-link">
              Analitycs
            </Link>
            <Link href="#" className="footerlinks-link">
              Commerce
            </Link>
            <Link href="#" className="footerlinks-link">
              Insights
            </Link>
          </div>
        </div>

        <div>
          <h3 className="footerlinks-head">Support</h3>
          <div className="footerlinks-link-div">
            <Link href="#" className="footerlinks-link">
              Pricing
            </Link>
            <Link href="#" className="footerlinks-link">
              Guides
            </Link>
            <Link href="#" className="footerlinks-link">
              API Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
