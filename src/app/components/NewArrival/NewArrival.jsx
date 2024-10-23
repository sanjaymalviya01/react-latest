import React from "react";
import Image from "next/image";
import Link from "next/link";
import product1 from "@/app/assets/images/products/product1.jpg";
import product2 from "@/app/assets/images/products/product2.jpg";
import product3 from "@/app/assets/images/products/product3.jpg";
import product4 from "@/app/assets/images/products/product4.jpg";
import "./style.css";
import { GiMagnifyingGlass } from "react-icons/gi";
import { FaHeart, FaStar } from "react-icons/fa";

const NewArrival = () => {
  return (
    <div className="new-arrival">
      <h2 className="new-arrival-head">top new arrival</h2>
      <div className="new-arrival-grid">
        <div className="new-arrival-product group">
          <div className="relative">
            <Image src={product1} alt="product 1" className="w-full" />
            <div className="new-arrival-product-linkdiv group-hover:opacity-100">
              <Link
                href="#"
                className="new-arrival-product-link"
                title="view product"
              >
                <GiMagnifyingGlass />
              </Link>
              <Link
                href="#"
                className="new-arrival-product-link"
                title="add to wishlist"
              >
                <FaHeart />
              </Link>
            </div>
          </div>
          <div className="product-detail">
            <Link href="#">
              <h4 className="product-name">Guyer Chair</h4>
            </Link>
            <div className="product-price">
              <p className="product-discounted-price">$45.00</p>
              <p className="product-real-price">$55.90</p>
            </div>
            <div className="stars-div">
              <div className="stars">
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
              </div>
              <div className="rating">(150)</div>
            </div>
          </div>
          <Link href="#" className="add-to-cart">
            Add to cart
          </Link>
        </div>
        <div className="new-arrival-product group">
          <div className="relative">
            <Image src={product4} alt="product 1" className="w-full" />
            <div className="new-arrival-product-linkdiv group-hover:opacity-100">
              <Link
                href="#"
                className="new-arrival-product-link"
                title="view product"
              >
                <GiMagnifyingGlass />
              </Link>
              <Link
                href="#"
                className="new-arrival-product-link"
                title="add to wishlist"
              >
                <FaHeart />
              </Link>
            </div>
          </div>
          <div className="product-detail">
            <Link href="#">
              <h4 className="product-name">Bed King Size</h4>
            </Link>
            <div className="product-price">
              <p className="product-discounted-price">$45.00</p>
              <p className="product-real-price">$55.90</p>
            </div>
            <div className="stars-div">
              <div className="stars">
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
              </div>
              <div className="rating">(150)</div>
            </div>
          </div>
          <Link href="#" className="add-to-cart">
            Add to cart
          </Link>
        </div>
        <div className="new-arrival-product group">
          <div className="relative">
            <Image src={product1} alt="product 1" className="w-full" />
            <div className="new-arrival-product-linkdiv group-hover:opacity-100">
              <Link
                href="#"
                className="new-arrival-product-link"
                title="view product"
              >
                <GiMagnifyingGlass />
              </Link>
              <Link
                href="#"
                className="new-arrival-product-link"
                title="add to wishlist"
              >
                <FaHeart />
              </Link>
            </div>
          </div>
          <div className="product-detail">
            <Link href="#">
              <h4 className="product-name">Guyer Chair</h4>
            </Link>
            <div className="product-price">
              <p className="product-discounted-price">$45.00</p>
              <p className="product-real-price">$55.90</p>
            </div>
            <div className="stars-div">
              <div className="stars">
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
              </div>
              <div className="rating">(150)</div>
            </div>
          </div>
          <Link href="#" className="add-to-cart">
            Add to cart
          </Link>
        </div>
        <div className="new-arrival-product group">
          <div className="relative">
            <Image src={product4} alt="product 1" className="w-full" />
            <div className="new-arrival-product-linkdiv group-hover:opacity-100">
              <Link
                href="#"
                className="new-arrival-product-link"
                title="view product"
              >
                <GiMagnifyingGlass />
              </Link>
              <Link
                href="#"
                className="new-arrival-product-link"
                title="add to wishlist"
              >
                <FaHeart />
              </Link>
            </div>
          </div>
          <div className="product-detail">
            <Link href="#">
              <h4 className="product-name">Bed King Size</h4>
            </Link>
            <div className="product-price">
              <p className="product-discounted-price">$45.00</p>
              <p className="product-real-price">$55.90</p>
            </div>
            <div className="stars-div">
              <div className="stars">
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
              </div>
              <div className="rating">(150)</div>
            </div>
          </div>
          <Link href="#" className="add-to-cart">
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
