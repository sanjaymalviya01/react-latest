"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";
function OrderSummary() {
  const cart = useSelector((state) => state.userReducer.loggedInUser.cart);
  const [subtotal, setSubtotal] = useState(0);
  const [Total, setTotal] = useState(0);
  const [sgst, setsgst] = useState(0);
  const [cgst, setcgst] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  useEffect(() => {
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
    <div className="ordersummary">
      <div className="ordersummary-flex">
        <div>
          <h5 className="ordersummary-head w-36">Title</h5>
        </div>
        <p className="ordersummary-head">Quantity</p>
        <p className="ordersummary-head text-right w-24">Price</p>
      </div>
      <hr />
      <div className="ordersummary-productdetails">
        {cart.map((product, index) => (
          <div key={index} className="ordersummary-product">
            <div>
              <h5 className="ordersummary-product-titel">{product.title}</h5>
            </div>
            <p className="ordersummary-product-quantity">
              ${product.price} X {product.quantity}
            </p>
            <p className="ordersummary-product-price">
              $
              {(
                (product.price -
                  (product.discountPercentage / 100) * product.price) *
                product.quantity
              ).toFixed(2)}
            </p>
            <hr />
          </div>
        ))}
      </div>
      <div className="ordersummary-additional-rates">
        <p>subtotal</p>
        <p>${subtotal}</p>
      </div>

      <div className="ordersummary-additional-rates">
        <p>CGST(9%)</p>
        <p>${cgst}</p>
      </div>
      <div className="ordersummary-additional-rates">
        <p>SGST(9%)</p>
        <p>${sgst}</p>
      </div>
      <div className="ordersummary-additional-rates">
        <p>shipping</p>
        <p>${shippingCharge.toFixed(2)}</p>
      </div>

      <div className="ordersummary-total">
        <p className="font-semibold">Total</p>
        <p className="font-semibold">${Total}</p>
      </div>
    </div>
  );
}

export default OrderSummary;
