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
        <div className="recomnded-product">
          <h2 className="recomnded-product-heading">recomended for you</h2>
          <div className="recomnded-product-grid">
            {RecomndedProduct.map((product, index) => (
              <div key={index} className="recomnded-product-div group">
                <div className="relative">
                  <div className="recomnded-product-img">
                    <Image
                      fill={true}
                      sizes="(max-width: 768px)"
                      src={product.images[0]}
                      alt="product 1"
                      className="w-full"
                    />
                  </div>
                  <div className="recomnded-product-link-div group-hover:opacity-100">
                    <Link
                      href="#"
                      className="recomnded-product-link"
                      title="view product"
                    >
                      <GiMagnifyingGlass />
                    </Link>
                    <Link
                      href="#"
                      className="recomnded-product-link"
                      title="add to wishlist"
                    >
                      <FaHeart />
                    </Link>
                  </div>
                </div>
                <div className="recomnded-product-details">
                  <Link href={`/product/${product.id}`}>
                    <h4 className="recomnded-product-title">{product.title}</h4>
                  </Link>
                  <div className="recomnded-product-price">
                    <p className="recomnded-product-discounted-price">
                      $
                      {(
                        product.price -
                        [(product.discountPercentage / 100) * product.price]
                      ).toFixed(2)}
                    </p>
                    <p className="recomnded-product-real-price">
                      ${product.price}
                    </p>
                  </div>
                  <div className="recomnded-product-rating">
                    <div className="recomnded-product-rated">
                      {Array.from({ length: product.rating }, (_, index) => (
                        <span key={index}>
                          <FaStar />
                        </span>
                      ))}
                    </div>
                    <div className="recomnded-product-unrated">
                      {Array.from(
                        { length: 5 - Math.floor(product.rating) },
                        (_, index) => (
                          <span key={index}>
                            <FaStar />
                          </span>
                        )
                      )}
                    </div>
                    <div className="recomnded-product-reviews">
                      ({product.reviews.length} reviews)
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (
                      sessionStorage.getItem("token") !== null &&
                      sessionStorage.getItem("token") !== ""
                    ) {
                      debugger;
                      dispatch(addToCart(product));
                      router.push(`/cart`);
                    } else {
                      router.push(`/login`);
                    }
                  }}
                  className="recomnded-product-add-to-cart"
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
