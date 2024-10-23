import Link from "next/link";
import React from "react";
import "./style.css";

function page() {
  return (
    <div className="py-16">
      <div className="register-main">
        <h2 className="register-head">Create an account</h2>
        <p className="register-msg">Register for new cosutumer</p>
        <form action="#" method="post" autoComplete="off">
          <div className="space-y-2">
            <div>
              <label htmlFor="name" className="register-input-label">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="register-input"
                placeholder="fulan fulana"
              />
            </div>
            <div>
              <label htmlFor="email" className="register-input-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="register-input"
                placeholder="youremail.@domain.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="register-input-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="register-input"
                placeholder="*******"
              />
            </div>
            <div>
              <label htmlFor="confirm" className="register-input-label">
                Confirm password
              </label>
              <input
                type="password"
                name="confirm"
                id="confirm"
                className="register-input"
                placeholder="*******"
              />
            </div>
          </div>
          <div className="mt-6">
            <div className="register-check-div">
              <input
                type="checkbox"
                name="aggrement"
                id="aggrement"
                className="register-check"
              />
              <label htmlFor="aggrement" className="register-check-label">
                I have read and agree to the{" "}
                <Link href="#" className="text-primary">
                  terms & conditions
                </Link>
              </label>
            </div>
          </div>
          <div className="mt-4">
            <button type="submit" className="register-submit-btn">
              create account
            </button>
          </div>
        </form>

        <div className="or-signup-with-div">
          <div className="or-signup-with">Or signup with</div>
          <div className="or-signup-with-border"></div>
        </div>
        <div className="register-social-links">
          <Link href="#" className="register-fb-link">
            facebook
          </Link>
          <Link href="#" className="register-google-link">
            google
          </Link>
        </div>

        <p className="already-have-account">
          Already have account?{" "}
          <Link href="/login" className="text-primary">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default page;
