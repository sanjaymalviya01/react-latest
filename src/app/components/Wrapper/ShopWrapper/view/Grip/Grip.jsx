import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { GiMagnifyingGlass } from "react-icons/gi";
import "./style.css";
import { useDispatch } from "react-redux";
import {
  addToCart,
  addToWishList,
  removeFromWishlist,
} from "@/redux/userSlice";
import { useRouter } from "next/navigation";

function Grip({ paginatedProducts, user }) {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="grip-grid">
      {paginatedProducts.map((product, index) => (
        <div key={`paginatedProducts-${index}`}>
          <div className="shop-product-div group">
            <div className="relative">
              <div className="shop-img-div">
                <Image
                  fill={true}
                  sizes="(max-width: 768px)"
                  priority={false}
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full"
                />
              </div>
              <div className="link-div">
                {Object.keys(user).length !== 0 && (
                  <>
                    <Link
                      href={{
                        pathname: "/product",
                        query: { productId: product.id },
                      }}
                      className="view-product"
                      title="view product"
                    >
                      <GiMagnifyingGlass />
                    </Link>
                    <label className="custom-wishlist-label" htmlFor="wishlist">
                      <input
                        type="checkbox"
                        name=""
                        id="wishlist"
                        checked={user.wishlist.find((item) =>
                          item.id === product.id ? true : false
                        )}
                        onChange={(e) => {
                          if (e.target.checked === true) {
                            dispatch(addToWishList(product));
                          } else {
                            dispatch(removeFromWishlist(product));
                          }
                        }}
                      />
                      <span className="heart-btn">
                        <FaHeart />
                      </span>
                    </label>
                  </>
                )}
              </div>
            </div>
            <div className="product-details">
              <div className="brand-sku">
                <p className="brand">{product.brand}</p>
                <p className="sku">sku-{product.sku}</p>
              </div>
              <Link
                href={{
                  pathname: "/product",
                  query: { productId: product.id },
                }}
              >
                <h4 className="product-title">{product.title}</h4>
              </Link>

              <div className="group title-tooltip">
                <span className="tooltip-span">✨ {product.title}</span>
              </div>

              <div className="shop-price-details">
                <p className="price-discount">
                  <del className="real-price">
                    <span>$</span>
                    {product.price}
                  </del>
                  {product.discountPercentage} % off
                </p>
                <p className="discounted-price">
                  <span>$</span>
                  {(
                    product.price -
                    [(product.discountPercentage / 100) * product.price]
                  ).toFixed(2)}
                </p>
              </div>
              <div className="stars-div">
                <div className="stars-align">
                  <div className="star-primary">
                    {Array.from({ length: product.rating }, (_, index) => (
                      <>
                        <span>
                          <FaStar />
                        </span>
                      </>
                    ))}
                  </div>

                  <div className="star-slate">
                    {Array.from(
                      { length: 5 - Math.floor(product.rating) },
                      (_, index) => (
                        <>
                          <span>
                            <FaStar />
                          </span>
                        </>
                      )
                    )}
                  </div>
                </div>
                <div className="product-rating">Rating ({product.rating})</div>
              </div>
            </div>
            <button
              className="add-to-cart"
              onClick={() => {
                if (
                  sessionStorage.getItem("token") !== null &&
                  sessionStorage.getItem("token") !== ""
                ) {
                  dispatch(addToCart(product));
                  router.push(`/cart`);
                } else {
                  router.push(`/login`);
                }
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Grip;
