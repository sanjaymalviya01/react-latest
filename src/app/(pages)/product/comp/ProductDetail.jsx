"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaHeart,
  FaInstagram,
  FaShoppingBag,
  FaStar,
  FaTwitter,
} from "react-icons/fa";
import { addToCart, addToWishList, setCartQuantity } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import "./style.css";

function ProductDetail({ product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [imgIndex, setImgIndex] = useState(0);
  const [reduxProduct, setReduxProduct] = useState();
  const [productQuantity, setProductQuantity] = useState(1);
  const loggedInUser = useSelector((state) => state.userReducer.loggedInUser);

  useEffect(() => {
    if (Object.keys(loggedInUser).length) {
      const reduxProduct = loggedInUser.cart.find(
        (item) => item.id == product.id
      );
      if (reduxProduct) {
        setProductQuantity(reduxProduct.quantity);
      }
    }
  }, [loggedInUser]);
  return (
    <div className="product-detail-grid">
      <div>
        <div className="product-detail-img-div">
          <Image
            fill={true}
            sizes="(max-width: 768px)"
            priority={false}
            src={product.images[imgIndex]}
            alt={product.title}
            className="w-full"
          />
        </div>
        <div className="product-detail-more-img-div">
          {product.images.map((img, index) => (
            <div
              key={`optionalImage-${index}`}
              className="product-detail-more-img"
            >
              <Image
                fill={true}
                sizes="(max-width: 768px)"
                priority={false}
                src={img}
                alt={product.title}
                className="product-img"
                onClick={() => {
                  setImgIndex(index);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="product-detail-title">{product.title}</h2>
        <div className="product-detail-star">
          <div className="product-detail-star-primary">
            {Array.from({ length: product.rating }, (_, index) => (
              <>
                <span>
                  <FaStar />
                </span>
              </>
            ))}
          </div>
          <div className="product-detail-star-slate">
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
          <div className="product-detail-review">
            ({product.reviews.length} Reviews)
          </div>
        </div>
        <div className="space-y-2">
          <p className="product-detail-availablity">
            <span>Availability: </span>
            {product.availabilityStatus == "Low Stock" && (
              <span className="text-orange-600">
                {product.availabilityStatus}
              </span>
            )}
            {product.availabilityStatus == "In Stock" && (
              <span className="text-green-600">
                {product.availabilityStatus}
              </span>
            )}
          </p>
          <p className="space-x-2">
            <span className="product-detail-mini-heads">Brand: </span>
            <span className="text-gray-600">{product.brand}</span>
          </p>
          <p className="space-x-2">
            <span className="product-detail-mini-heads">Category: </span>
            <span className="text-gray-600">{product.category}</span>
          </p>
          <p className="space-x-2">
            <span className="product-detail-mini-heads">SKU: </span>
            <span className="text-gray-600">{product.sku}</span>
          </p>
        </div>
        <div className="product-detail-price">
          <p className="product-detail-price-real">${product.price}</p>
          <p className="product-detail-price-discounted">
            $
            {(
              product.price -
              [(product.discountPercentage / 100) * product.price]
            ).toFixed(2)}
          </p>
        </div>

        <p className="product-detail-desc">{product.description}</p>
        <div className="mt-4">
          <h3 className="product-detail-quantity-head">Quantity</h3>
          <div className="product-detail-quantity-btn-div">
            <div
              className="product-detail-quantity-btn"
              onClick={() => {
                if (productQuantity > 1) {
                  setProductQuantity(productQuantity - 1);
                }
              }}
            >
              -
            </div>
            <div className="product-detail-quantity">{productQuantity}</div>
            <div
              className="product-detail-quantity-btn"
              onClick={() => {
                if (productQuantity < product.stock) {
                  setProductQuantity(productQuantity + 1);
                }
              }}
            >
              +
            </div>
          </div>
        </div>

        <div className="product-detail-action-div">
          <button
            onClick={() => {
              if (
                sessionStorage.getItem("token") != null ||
                sessionStorage.getItem("token") != ""
              ) {
                dispatch(setCartQuantity([product, productQuantity]));
                router.push(`/cart`);
              } else {
                router.push(`/login`);
              }
            }}
            className="product-detail-add-to-cart"
          >
            <FaShoppingBag /> Add to cart
          </button>
          <button
            onClick={() => {
              dispatch(addToWishList(product));
            }}
            className="product-detail-wishlist"
          >
            <FaHeart /> Wishlist
          </button>
        </div>

        <div className="product-detail-social-div">
          <Link href="#" className="product-detail-social-link">
            <FaFacebook />
          </Link>
          <Link href="#" className="product-detail-social-link">
            <FaTwitter />
          </Link>
          <Link href="#" className="product-detail-social-link">
            <FaInstagram />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
