import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar, FaTrash } from "react-icons/fa";
import "./style.css";
import { addToCart, removeFromWishlist } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

function List({ paginatedProducts, user }) {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="listview-grid">
      {paginatedProducts.map((product) => (
        <>
          <div className="listview-product-div">
            <div className="listview-product-img-div">
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
              <p className="listview-product-brand">{product.brand}</p>
              <Link
                href={{
                  pathname: "/product",
                  query: { productId: product.id },
                }}
              >
                <h2
                  className="listview-product-title"
                  style={{
                    height: "22px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.title}
                </h2>
              </Link>
              <div className="listview-product-sku-div">
                <p className="listview-product-sku ">sku-{product.sku}</p>
              </div>
              <div className="listview-product-star">
                <div className="listview-product-star-center">
                  <div className="listview-product-star-gap">
                    <div className="listview-product-star-primary">
                      {Array.from({ length: product.rating }, (_, index) => (
                        <>
                          <span>
                            <FaStar />
                          </span>
                        </>
                      ))}
                    </div>

                    <div className="listview-product-star-slate">
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
                  <div className="listview-product-rating ">
                    ({product.rating})
                  </div>
                </div>
                <p className="listview-product-percent-off ">
                  Offer - {product.discountPercentage} % off
                </p>
              </div>
            </div>
            <del className="listview-product-real-price ">${product.price}</del>
            <div className="listview-product-discounted-price ">
              $
              {(
                product.price -
                [(product.discountPercentage / 100) * product.price]
              ).toFixed(2)}
            </div>
            <button
              onClick={() => {
                if (
                  sessionStorage.getItem("token") != null &&
                  sessionStorage.getItem("token") != ""
                ) {
                  dispatch(addToCart(product));
                  router.push(`/cart`);
                } else {
                  router.push(`/login`);
                }
              }}
              className="listview-product-add-to-cart "
            >
              add to cart
            </button>
          </div>
        </>
      ))}
    </div>
  );
}

export default List;
