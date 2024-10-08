"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckOutForm from "./CheckOutForm";

function CheckoutWrapper() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [some, setsome] = useState(false);
  const [token, setToken] = useState(false);
  const cart = useSelector((state) => state.userReducer.loggedInUser.cart);
  console.log("cart : ", cart);
  const [subtotal, setSubtotal] = useState(0);
  const [Total, setTotal] = useState(0);
  const [sgst, setsgst] = useState(0);
  const [cgst, setcgst] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
    const ST = cart
      .reduce(
        (total, item) =>
          total +
          (item.price - (item.discountPercentage / 100) * item.price) *
            item.quantity,
        0
      )
      .toFixed(2);
    setSubtotal(ST);
    const CGST = (0.09 * ST).toFixed(2);
    const SGST = (0.09 * ST).toFixed(2);
    setcgst(CGST);
    setsgst(SGST);
    let gTotal = (
      parseFloat(ST) +
      parseFloat(CGST) +
      parseFloat(SGST) +
      parseFloat(shippingCharge)
    ).toFixed(2);
    setTotal(gTotal);
  }, []);

  return (
    <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
      <div className="col-span-12 border border-gray-200 p-4 rounded">
        <CheckOutForm />
        {/* <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first-name" className="text-gray-600">
                First Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                className="input-box"
              />
            </div>
            <div>
              <label htmlFor="last-name" className="text-gray-600">
                Last Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                className="input-box"
              />
            </div>
          </div>
          <div>
            <label htmlFor="company" className="text-gray-600">
              Company
            </label>
            <input
              type="text"
              name="company"
              id="company"
              className="input-box"
            />
          </div>
          <div>
            <label htmlFor="region" className="text-gray-600">
              Country/Region
            </label>
            <input
              type="text"
              name="region"
              id="region"
              className="input-box"
            />
          </div>
          <div>
            <label htmlFor="address" className="text-gray-600">
              Street address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="input-box"
            />
          </div>
          <div>
            <label htmlFor="city" className="text-gray-600">
              City
            </label>
            <input type="text" name="city" id="city" className="input-box" />
          </div>
          <div>
            <label htmlFor="phone" className="text-gray-600">
              Phone number
            </label>
            <input type="text" name="phone" id="phone" className="input-box" />
          </div>
          <div>
            <label htmlFor="email" className="text-gray-600">
              Email address
            </label>
            <input type="email" name="email" id="email" className="input-box" />
          </div>
          <div>
            <label htmlFor="company" className="text-gray-600">
              Company
            </label>
            <input
              type="text"
              name="company"
              id="company"
              className="input-box"
            />
          </div>
        </div> */}
      </div>
      {/* {token != null && token != "" && (
        <div className="col-span-5 border border-gray-200 p-4 rounded">
          <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
            order summary
          </h4>
          <>
            <div className="flex justify-between py-3">
              <div>
                <h5
                  className="text-gray-800 font-medium"
                  style={{ width: "150px" }}
                >
                  Title
                </h5>
              </div>
              <p className="text-gray-600">Quantity</p>
              <p
                className="text-gray-800 font-medium text-right"
                style={{ width: "100px" }}
              >
                Price
              </p>
            </div>
          </>
          <hr />
          <div className="space-y-2 py-3">
            {cart.map((product) => (
              <>
                <div className="flex justify-between">
                  <div>
                    <h5
                      className="text-gray-800 font-medium"
                      style={{ width: "150px" }}
                    >
                      {product.title}
                      <span className="text-sm text-gray-400">
                        (${product.price})
                      </span>
                    </h5>
                  </div>
                  <p className="text-gray-600 text-sm">
                    ${product.price} X {product.quantity}
                  </p>
                  <p
                    className="text-gray-800 font-medium text-right"
                    style={{ width: "100px" }}
                  >
                    $
                    {(
                      (product.price -
                        (product.discountPercentage / 100) * product.price) *
                      product.quantity
                    ).toFixed(2)}
                  </p>
                </div>
                <hr />
              </>
            ))}
          </div>
          <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
            <p>subtotal</p>
            <p>${subtotal}</p>
          </div>

          <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
            <p>CGST(9%)</p>
            <p>${cgst}</p>
          </div>
          <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
            <p>SGST(9%)</p>
            <p>${sgst}</p>
          </div>
          <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
            <p>shipping</p>
            <p>${shippingCharge.toFixed(2)}</p>
          </div>

          <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
            <p className="font-semibold">Total</p>
            <p>${Total}</p>
          </div>

          <div className="flex items-center mb-4 mt-2">
            <input
              type="checkbox"
              name="aggrement"
              id="aggrement"
              onClick={(e) => {
                setAgreeTerms(e.target.checked);
              }}
              className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
            />
            <label
              htmlFor="aggrement"
              className="text-gray-600 ml-3 cursor-pointer text-sm"
            >
              I agree to the{" "}
              <Link href="#" className="text-primary">
                terms & conditions
              </Link>
            </label>
          </div>
          {some && (
            <p className="text-sm text-primary text-center">
              To place order agree terms & conditions first
            </p>
          )}

          <button
            onClick={() => {
              if (!agreeTerms) {
                setsome(true);
                setTimeout(() => {
                  setsome(false);
                }, 5000);
              } else {
                alert("Order Placed");
              }
            }}
            className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
          >
            Place order
          </button>
        </div>
      )} */}
    </div>
  );
}

export default CheckoutWrapper;
