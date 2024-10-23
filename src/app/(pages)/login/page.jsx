"use client";
import React, { useState } from "react";
import Link from "next/link";
import * as yup from "yup";
import { navigate } from "./actions";
import "./style.css";

const loginSchema = yup.object({
  username: yup
    .string()
    .min(4, "Username is too short!")
    .required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password is too short!"),
});

function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = async () => {
    const newLogin = {
      username,
      password,
    };

    try {
      await loginSchema.validate(newLogin, { abortEarly: false });
      setErrors({});
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };
  const onChangeHandel = (e) => {
    const targetId = e.target.id;
    if (targetId == "username") {
      setUsername(e.target.value);
    }
    if (targetId == "password") {
      setPassword(e.target.value);
    }
    handleSubmit();
  };
  return (
    <div className="py-16">
      <div className="login-main-div">
        <h2 className="login-heading">Login</h2>
        <p className="login-welcome">welcome back customer</p>
        <form action={navigate} autoComplete="off">
          <div className="space-y-2">
            <div>
              <label htmlFor="username" className="login-input-label">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                value={username}
                onChange={onChangeHandel}
                className="login-input"
                placeholder="Enter Your Username"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="login-input-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={onChangeHandel}
                className="login-input"
                placeholder="*******"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="login-check-fogot">
            <div className="login-check-div">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="login-check-input"
              />
              <label htmlFor="remember" className="login-check-label">
                Remember me
              </label>
            </div>
            <Link href="#" className="text-primary">
              Forgot password
            </Link>
          </div>
          <div className="mt-4">
            <button type="submit" className="login-submit-button">
              Login
            </button>
          </div>
        </form>

        <div className="or-login-with-main">
          <div className="or-login-with">Or login with</div>
          <div className="or-login-with-border"></div>
        </div>
        <div className="login-link-div">
          <Link href="#" className="login-fb-link">
            facebook
          </Link>
          <Link href="#" className="login-google-link">
            google
          </Link>
        </div>

        <p className="dont-have-account">
          Do not have account?{" "}
          <Link href="/register" className="text-primary">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Index;
