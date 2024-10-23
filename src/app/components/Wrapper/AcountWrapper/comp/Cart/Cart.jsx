import React from "react";
import "./style.css";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeFromCart, setCartQuantity } from "@/redux/userSlice";
import PriceDetails from "./comp/PriceDetails";
function Cart({ reduxUser }) {
  const dispatch = useDispatch();
  return (
    <div className="cart-col">
      <div>
        {reduxUser.cart.length === 0 ? (
          <div className="no-data">
            <h1>No Data To show </h1>
          </div>
        ) : (
          reduxUser.cart &&
          reduxUser.cart.map((product, index) => (
            <div key={index} className="product-div">
              <div className="img-div">
                <Image
                  fill={true}
                  sizes="(max-width: 768px)"
                  priority={false}
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full"
                />
              </div>
              <div>
                <Link href={`/product/${product.id}`}>
                  <h2 className="product-title">{product.title}</h2>
                </Link>
                <div className="product-fields-div">
                  <div>
                    <p className="product-fields">
                      Availability:{" "}
                      {product.stock === 0 ? (
                        <>
                          <span className="text-red-500">Out of stock</span>
                        </>
                      ) : (
                        <>
                          {product.stock - product.quantity <= 10 ? (
                            <>
                              <span className="text-orange-500">
                                Low Stock - {product.stock}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-green-500">
                                In Stock - {product.stock}
                              </span>
                            </>
                          )}
                        </>
                      )}
                    </p>
                    <p className="product-fields">
                      Discount:{" "}
                      <span className="text-green-600">
                        {product.discountPercentage} %
                      </span>{" "}
                    </p>
                  </div>
                  <div className="price-div">
                    <del className="real-price">${product.price}</del>$
                    {(
                      product.price -
                      (product.discountPercentage / 100) * product.price
                    ).toFixed(2)}
                  </div>
                </div>
                <div className="btn-div">
                  <div className="quantity-div">
                    <div className="quantity-btn-wrapper">
                      <div
                        className="quantity-btn"
                        onClick={() => {
                          if (product.quantity > 1) {
                            dispatch(
                              setCartQuantity([product, product.quantity - 1])
                            );
                          }
                        }}
                      >
                        -
                      </div>
                      <div className="quantity-val">
                        {product && product.quantity}
                      </div>
                      <div
                        className="quantity-btn"
                        onClick={() => {
                          if (product.stock > 0) {
                            dispatch(
                              setCartQuantity([product, product.quantity + 1])
                            );
                          }
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => {
                      dispatch(removeFromCart(product));
                    }}
                  >
                    remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {reduxUser.cart && reduxUser.cart.length !== 0 && (
        <PriceDetails {...{ reduxUser }} />
      )}
    </div>
  );
}

export default Cart;
