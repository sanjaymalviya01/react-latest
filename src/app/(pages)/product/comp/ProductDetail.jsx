import Image from "next/image";
import React, { useState } from "react";
import product1 from "@/app/assets/images/products/product1.jpg";
import product2 from "@/app/assets/images/products/product2.jpg";
import product3 from "@/app/assets/images/products/product3.jpg";
import product4 from "@/app/assets/images/products/product4.jpg";
import product5 from "@/app/assets/images/products/product5.jpg";
import product6 from "@/app/assets/images/products/product6.jpg";
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
import { useRouter, useSearchParams } from "next/navigation";

function ProductDetail({ product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [imgIndex, setImgIndex] = useState(0);
  const loggedInUser = useSelector((state) => state.userReducer.loggedInUser);
  const reduxProduct = loggedInUser.cart.find((item) => item.id == product.id);
  // console.log(reduxProduct);
  return (
    <div className="container grid grid-cols-2 gap-6">
      <div>
        <Image
          src={product.images[imgIndex]}
          width={500}
          height={100}
          alt="product"
          className="w-full"
        />
        <div className="grid grid-cols-5 gap-4 mt-4">
          {product.images.map((img, index) => (
            <Image
              key={index}
              src={img}
              width={100}
              height={100}
              alt="product2"
              className="product-img w-full cursor-pointer border "
              onClick={() => {
                setImgIndex(index);
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-medium uppercase mb-2">{product.title}</h2>
        <div className="flex items-center mb-4 gap-1">
          <div className="flex gap-1 text-sm text-primary">
            {Array.from({ length: product.rating }, (_, index) => (
              <>
                <span>
                  <FaStar />
                </span>
              </>
            ))}
          </div>
          <div className="flex gap-1 text-sm text-slate-400">
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
          <div className="text-xs text-gray-500 ml-3">
            ({product.reviews.length} Reviews)
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-gray-800 font-semibold space-x-2">
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
            <span className="text-gray-800 font-semibold">Brand: </span>
            <span className="text-gray-600">{product.brand}</span>
          </p>
          <p className="space-x-2">
            <span className="text-gray-800 font-semibold">Category: </span>
            <span className="text-gray-600">{product.category}</span>
          </p>
          <p className="space-x-2">
            <span className="text-gray-800 font-semibold">SKU: </span>
            <span className="text-gray-600">{product.sku}</span>
          </p>
        </div>
        <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
          <p className="text-xl text-primary font-semibold">
            $
            {(
              product.price -
              [(product.discountPercentage / 100) * product.price]
            ).toFixed(2)}
          </p>
          <p className="text-base text-gray-400 line-through">
            ${product.price}
          </p>
        </div>

        <p className="mt-4 text-gray-600">{product.description}</p>
        {reduxProduct && (
          <div className="mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
              <div
                className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                onClick={() => {
                  if (reduxProduct.quantity > 1) {
                    dispatch(
                      setCartQuantity([reduxProduct, reduxProduct.quantity - 1])
                    );
                  }
                  console.log(reduxProduct.quantity);
                }}
              >
                -
              </div>
              <div className="h-8 w-8 text-base flex items-center justify-center">
                {/* {quantity} */}
                {reduxProduct && reduxProduct.quantity}
              </div>
              <div
                className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                onClick={() => {
                  if (reduxProduct.quantity < reduxProduct.stock) {
                    dispatch(
                      setCartQuantity([reduxProduct, reduxProduct.quantity + 1])
                    );
                  }
                  console.log(reduxProduct.quantity);
                }}
              >
                +
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
          <button
            onClick={() => {
              dispatch(addToCart(product));
              router.push(`/cart`);
            }}
            className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
          >
            <FaShoppingBag /> Add to cart
          </button>
          <button
            onClick={() => {
              // if(reduxProduct.)
              dispatch(addToWishList(product));
            }}
            className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
          >
            <FaHeart /> Wishlist
          </button>
        </div>

        <div className="flex gap-3 mt-4">
          <Link
            href="#"
            className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
          >
            <FaFacebook />
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
          >
            <FaTwitter />
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
          >
            <FaInstagram />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
