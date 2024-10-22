"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GiMagnifyingGlass } from "react-icons/gi";
import { FaHeart, FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/userSlice";
import "./style.css";

const Product = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [RecomndedProduct, setRecomndedProduct] = useState();
  useEffect(() => {
    setRecomndedProduct(data);
  }, [data]);
  return (
    <>
      {RecomndedProduct && (
        <div className="recomnded-product" key={`RecomndedProduct-heading`}>
          <h2 className="heading">recomended for you</h2>
          <div className="recomnded-product-grid">
            {RecomndedProduct.map((product, index) => (
              <div
                // key={`RecomndedProduct-${product.id}`}
                key={product.sku}
                className="product-div group"
              >
                <div className="relative">
                  <div
                    className="img"
                    // style={{ height: "200px" }}
                  >
                    <Image
                      fill={true}
                      src={product.images[0]}
                      alt="product 1"
                      className="w-full"
                    />
                  </div>
                  <div className="link-div group-hover:opacity-100">
                    <Link
                      href="#"
                      className="product-link"
                      title="view product"
                    >
                      <GiMagnifyingGlass />
                    </Link>
                    <Link
                      href="#"
                      className="product-link"
                      title="add to wishlist"
                    >
                      <FaHeart />
                    </Link>
                  </div>
                </div>
                <div className="product-details">
                  <Link
                    href={{
                      pathname: "/product",
                      query: { productId: product.id },
                    }}
                  >
                    <h4 className="product-title">{product.title}</h4>
                  </Link>
                  <div className="product-price">
                    <p className="product-discounted-price">
                      $
                      {(
                        product.price -
                        [(product.discountPercentage / 100) * product.price]
                      ).toFixed(2)}
                    </p>
                    <p className="product-real-price">${product.price}</p>
                  </div>
                  <div className="rating">
                    <div className="rated">
                      {Array.from({ length: product.rating }, (_, index) => (
                        <>
                          <span>
                            <FaStar />
                          </span>
                        </>
                      ))}
                    </div>
                    <div className="unrated">
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
                    <div className="reviews">
                      ({product.reviews.length} reviews)
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (
                      sessionStorage.getItem("token") != null &&
                      sessionStorage.getItem("token") != ""
                    ) {
                      debugger;
                      dispatch(addToCart(product));
                      router.push(`/cart`);
                    } else {
                      router.push(`/login`);
                    }
                  }}
                  className="add-to-cart"
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
