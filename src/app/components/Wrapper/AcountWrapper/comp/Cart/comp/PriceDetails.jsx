import React from "react";
import "./style.css";
import { useRouter } from "next/navigation";

function PriceDetails({ reduxUser }) {
  const router = useRouter();
  return (
    <div className="price-details">
      <h1 className="heading">price details</h1>
      <div className="grid">
        <hr />
        <div className="price-details-col">
          <p>
            Price ({reduxUser.cart.length} item
            {reduxUser.cart.length > 1 ? "s" : ""})
          </p>
          <p>
            $
            {reduxUser.cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </p>
        </div>
        <div className="price-details-col">
          <p>Discount</p>
          <p>
            $
            {reduxUser.cart
              .reduce(
                (total, item) =>
                  total +
                  (item.discountPercentage / 100) * item.price * item.quantity,
                0
              )
              .toFixed(2)}
          </p>
        </div>
        <div className="price-details-col">
          <p>Delivery Charges</p>
          <p>Free</p>
        </div>

        <hr />
        <div className="price-details-col">
          <p>Total Amount</p>
          <p className="text-primary">
            $
            {reduxUser.cart
              .reduce(
                (total, item) =>
                  total +
                  (item.price - (item.discountPercentage / 100) * item.price) *
                    item.quantity,
                0
              )
              .toFixed(2)}
          </p>
        </div>
        <div className="will-save">
          <p>
            You will save $
            {reduxUser.cart
              .reduce(
                (total, item) =>
                  total +
                  (item.discountPercentage / 100) * item.price * item.quantity,
                0
              )
              .toFixed(2)}{" "}
            on this order
          </p>
        </div>

        <button
          className="order-btn"
          onClick={() => {
            router.push(`/checkout`);
          }}
        >
          place order
        </button>
      </div>
    </div>
  );
}

export default PriceDetails;
