"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function OrderSummary() {
  const [token, setToken] = useState(false);
  const cart = useSelector((state) => state.userReducer.loggedInUser.cart);
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
    <div className="col-span-5 border border-gray-200 p-4 rounded">
      <>
        <div
          className="flex justify-between 
        "
        >
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
        <p className="font-semibold">${Total}</p>
      </div>
    </div>
  );
}

export default OrderSummary;
