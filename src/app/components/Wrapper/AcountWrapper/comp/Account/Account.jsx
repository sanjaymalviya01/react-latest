import React from "react";
import "./style.css";
import Link from "next/link";

function Account({ userData }) {
  return (
    <div className="account-grid">
      <div className="account-col">
        <div className="head-div">
          <h3 className="heading">Personal Profile</h3>
          <Link href="#" className="link">
            Edit
          </Link>
        </div>
        <div className="info-div">
          <h4 className="username">
            {userData.firstName} {userData.lastName}
          </h4>
          <p className="user-data">{userData.email}</p>
          <p className="user-data">{userData.phone}</p>
        </div>
      </div>

      <div className="account-col">
        <div className="head-div">
          <h3 className="heading">Shipping address</h3>
          <Link href="#" className="link">
            Edit
          </Link>
        </div>
        <div className="info-div">
          <h4 className="username">
            {userData.firstName} {userData.lastName}
          </h4>
          <p className="user-data">
            {userData.address.address},{userData.address.city}
          </p>
          <p className="user-data">{userData.address.postalCode}</p>
          <p className="user-data">{userData.phone}</p>
        </div>
      </div>

      <div className="account-col">
        <div className="head-div">
          <h3 className="heading">Billing address</h3>
          <Link href="#" className="link">
            Edit
          </Link>
        </div>
        <div className="info-div">
          <h4 className="username">John Doe</h4>
          <p className="user-data">
            {userData.company.address.address}, {userData.company.address.city}
          </p>
          <p className="user-data">{userData.company.address.postalCode}</p>
          <p className="user-data">{userData.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default Account;
