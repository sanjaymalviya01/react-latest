'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import product1 from "@/app/assets/images/products/product1.jpg";
import product2 from "@/app/assets/images/products/product2.jpg";
import product3 from "@/app/assets/images/products/product3.jpg";
import product4 from "@/app/assets/images/products/product4.jpg";
import Index from "@/app/(pages)/login/page";
import { GiMagnifyingGlass } from "react-icons/gi";
import { FaHeart, FaStar } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/userSlice";

const Product = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [RecomndedProduct, setRecomndedProduct] = useState();
  const fetchRecomndedProduct = async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/products?limit=8&skip=5"
      );
      const data = await response.json();
      setRecomndedProduct(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchRecomndedProduct();
  }, []);
  return (
    <>
      {RecomndedProduct && (
        <div className="container pb-16">
          <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
            recomended for you
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {RecomndedProduct.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow rounded overflow-hidden group"
              >
                <div className="relative">
                  <div style={{ height: "200px" }}>
                    <Image
                      fill={true}
                      src={product.images[0]}
                      alt="product 1"
                      className="w-full"
                    />
                  </div>
                  <div
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Link
                      href="#"
                      className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                      title="view product"
                    >
                      <GiMagnifyingGlass />
                    </Link>
                    <Link
                      href="#"
                      className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                      title="add to wishlist"
                    >
                      <FaHeart />
                    </Link>
                  </div>
                </div>
                <div className="pt-4 pb-3 px-4">
                  <Link href={`/product?${searchParams}&product=${product.id}`}>
                    <h4
                      className=" product-title uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition"
                      style={{
                        height: "22px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.title}
                    </h4>
                  </Link>
                  <div className="flex items-baseline mb-1 space-x-2">
                    <p className="text-xl text-primary font-semibold">
                      ${product.price}
                    </p>
                    <p className="text-sm text-gray-400 line-through">
                      $
                      {(
                        product.price -
                        [(product.discountPercentage / 100) * product.price]
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
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
                      ({product.reviews.length} reviews)
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    dispatch(addToCart(product));
                    router.push(`/cart?${searchParams}`);
                  }}
                  className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
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
