import { addToCart, removeFromWishlist } from "@/redux/userSlice";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import "./style.css";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Wishlist({ reduxUser }) {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="wishlist-col">
      {reduxUser.wishlist.length === 0 ? (
        <div className="no-data" key={"no-data"}>
          <h1>No Data To show </h1>
        </div>
      ) : (
        reduxUser.wishlist &&
        reduxUser.wishlist.map((product) => (
          <>
            <div className="product-div">
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
              <div className="w-1/3">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-fields">
                  Availability:{" "}
                  {product.stock === 0 ? (
                    <span className="text-red-500">All added to cart</span>
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
              </div>
              <div className="product-price">
                $
                {(
                  product.price -
                  [(product.discountPercentage / 100) * product.price]
                ).toFixed(2)}
              </div>
              <button
                onClick={() => {
                  if (
                    sessionStorage.getItem("token") !== null &&
                    sessionStorage.getItem("token") !== ""
                  ) {
                    if (product.stock > 0) {
                      dispatch(addToCart(product));
                      router.push(`/cart`);
                    }
                  } else {
                    router.push(`/login`);
                  }
                }}
                className={`add-to-cart ${
                  product.stock > 0
                    ? "enabled-add-to-cart"
                    : "disabled-add-to-cart "
                }`}
              >
                add to cart
              </button>
              <div
                className="remove-btn"
                onClick={() => {
                  dispatch(removeFromWishlist(product));
                }}
              >
                <FaTrash />
              </div>
            </div>
          </>
        ))
      )}
    </div>
  );
}

export default Wishlist;
