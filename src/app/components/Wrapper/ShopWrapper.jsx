"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { GiMagnifyingGlass } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import Pagination, { paginate } from "../Pagination/Pagination";
import {
  addToCart,
  addToWishList,
  removeFromWishlist,
} from "@/redux/userSlice";
import { useRouter, useSearchParams } from "next/navigation";

const ShopWrapper = () => {
  const [allProducts, setAllProducts] = useState([]);

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();
  const [brands, setBrands] = useState();

  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedBrand, setSelectedBrand] = useState({});
  const [selectedHighestPrice, setSelectedHighestPrice] = useState(0);
  const [selectedLowestPrice, setSelectedLowestPrice] = useState(0);

  const [paginatedProducts, setPaginatedProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const user = useSelector((state) => state.userReducer.loggedInUser);

  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searches = searchParams.get("search");

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=200`);
      const data = await response.json();
      setAllProducts(data.products);
      setProducts(data.products);

      const productsByBrand = data.products.reduce((arrayBrand, product) => {
        if (product.brand !== undefined) {
          arrayBrand[product.brand] = (arrayBrand[product.brand] || 0) + 1;
        }
        return arrayBrand;
      }, {});
      setBrands(productsByBrand);

      const highestPrice = Math.max(
        ...data.products.map((product) => product.price)
      );
      const lowestPrice = Math.min(
        ...data.products.map((product) => product.price)
      );
      setSelectedHighestPrice(highestPrice);
      setSelectedLowestPrice(lowestPrice);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchcategories = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/categories`);
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchsearchedProducts = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searches}`
      );
      const data = await response.json();
      // console.log(data);
      setProducts(data.products);
      // setAllProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchAllProducts();
    fetchcategories();
  }, []);
  useMemo(() => {
    if (searches != "") {
      fetchsearchedProducts();
    } else {
      fetchAllProducts();
    }
  }, [searchParams]);
  useMemo(() => {
    let filteredProducts = allProducts;
    if (Object.keys(selectedCategory).length) {
      filteredProducts = filteredProducts.filter(
        (product) => selectedCategory[product.category]
      );
    }
    Object.keys(selectedBrand).map((brand) => {
      let item = filteredProducts.find((product) => product.brand == brand);
      if (item == undefined) {
        setSelectedBrand({});
      }
    });
    let filteredBrands = filteredProducts.reduce((arrayBrand, product) => {
      if (product.brand !== undefined) {
        arrayBrand[product.brand] = (arrayBrand[product.brand] || 0) + 1;
      }
      return arrayBrand;
    }, {});
    setBrands(filteredBrands);

    if (Object.keys(selectedBrand).length) {
      filteredProducts = filteredProducts.filter(
        (product) => selectedBrand[product.brand]
      );
    }

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price <= selectedHighestPrice &&
        product.price >= selectedLowestPrice
    );

    setProducts(filteredProducts);
  }, [
    selectedCategory,
    selectedBrand,
    selectedHighestPrice,
    selectedLowestPrice,
  ]);
  useMemo(() => {
    if (products) {
      const paginatedProducts = paginate(products, currentPage, pageSize);
      setPaginatedProducts(paginatedProducts);
    }
  }, [products, currentPage, user]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
      <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
        <div className="divide-y divide-gray-200 space-y-5">
          {category && (
            <div>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Categories
              </h3>
              <div
                className="space-y-2"
                style={{ maxHeight: "15rem", overflow: "auto" }}
              >
                {category.map((ProductCategory, index) => (
                  <div key={index}>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name={`cat-${index}`}
                        id={`cat-${index}`}
                        className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                        onClick={(e) => {
                          // console.log(ProductCategory.slug, e.target.checked);
                          if (e.target.checked === true) {
                            setSelectedCategory((prevData) => ({
                              ...prevData,
                              [ProductCategory.slug]: e.target.checked,
                            }));
                          } else {
                            setSelectedCategory((prevState) => {
                              const {
                                [ProductCategory.slug]: removed,
                                ...newState
                              } = prevState;
                              return newState;
                            });
                          }
                        }} // onClick={(e) => {
                        //   console.log(e.target.checked, "hello");
                        //   if (e.target.checked === true) {
                        //     setSelectedCategory((prevData) => ({
                        //       ...prevData,
                        //       [key]: e.target.checked,
                        //     }));
                        //   } else {
                        //     setSelectedCategory((prevState) => {
                        //       const { [key]: removed, ...newState } = prevState;
                        //       return newState;
                        //     });
                        //   }
                        // }}
                      />
                      <div className="ml-auto text-gray-600 text-sm">
                        ({ProductCategory.name})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {brands && (
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Brands
              </h3>
              <div
                className="space-y-2"
                style={{ maxHeight: "15rem", overflow: "auto" }}
              >
                {Object.entries(brands).map(([key, value], index) => (
                  <div key={index}>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="brand-1"
                        id="brand-1"
                        checked={selectedBrand[key] || false}
                        onChange={(e) => {
                          if (e.target.checked === true) {
                            setSelectedBrand((prevData) => ({
                              ...prevData,
                              [key]: e.target.checked,
                            }));
                          } else {
                            setSelectedBrand((prevState) => {
                              const { [key]: removed, ...newState } = prevState;
                              return newState;
                            });
                          }
                        }}
                        className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                      />
                      <label
                        htmlFor="brand-1"
                        className="text-gray-600 ml-3 cusror-pointer"
                      >
                        {key}
                      </label>
                      <div className="ml-auto text-gray-600 text-sm">
                        ({value})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
              Price
            </h3>
            <div className="mt-4 flex items-center">
              <input
                type="number"
                name="min"
                id="min"
                value={selectedLowestPrice}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setSelectedLowestPrice(e.target.value, 0);
                  }
                }}
                className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                placeholder="min"
              />
              <span className="mx-3 text-gray-500">-</span>
              <input
                type="number"
                name="max"
                id="max"
                value={selectedHighestPrice}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setSelectedHighestPrice(e.target.value);
                  }
                }}
                className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                placeholder="max"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-3">
        <div className="grid md:grid-cols-3 grid-cols-2 gap-6 shadow rounded">
          {paginatedProducts.map((product, index) => (
            // {products.map((product, index) => (
            <div key={index}>
              <div className="bg-white shadow rounded overflow-hidden group">
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
                    {Object.keys(user).length != 0 && (
                      <>
                        <Link
                          href={`/product?product=${product.id}`}
                          className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                          title="view product"
                        >
                          <GiMagnifyingGlass />
                        </Link>
                        <label
                          className="custom-wishlist-label"
                          htmlFor="wishlist"
                        >
                          <input
                            type="checkbox"
                            name=""
                            id="wishlist"
                            checked={user.wishlist.find((item) =>
                              item.id == product.id ? true : false
                            )}
                            onChange={(e) => {
                              if (e.target.checked == true) {
                                dispatch(addToWishList(product));
                              } else {
                                dispatch(removeFromWishlist(product));
                              }
                            }}
                          />
                          <span className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition">
                            <FaHeart />
                          </span>
                        </label>
                      </>
                    )}
                  </div>
                </div>
                <div className="pt-4 pb-3 px-4">
                  <div className="flex items-baseline d-flex justify-between gap-2">
                    <p className="text-xs text-gray-400 font-semibold">
                      {product.brand}
                    </p>
                    <p className="text-xs text-gray-400 font-semibold">
                      sku-{product.sku}
                    </p>
                  </div>
                  <Link href={`/product?product=${product.id}`}>
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

                  <div className="group relative m-1 flex justify-center">
                    <span className="opacity-75 absolute top-0 scale-0 rounded bg-gray-800 p-2 text-sm text-white group-hover:scale-100">
                      ✨ {product.title}
                    </span>
                  </div>

                  <div className="flex mb-1 space-x-2 justify-between items-center gap-2">
                    <div className="">
                      <p className="text-sm text-gray-400 flex flex-col">
                        <del className="text-sm text-primary">
                          <span>$</span>
                          {product.price}
                        </del>
                        {product.discountPercentage} % off
                      </p>
                    </div>
                    <div className="">
                      <p className="text-3xl text-primary font-semibold">
                        <span>$</span>
                        {(
                          product.price -
                          [(product.discountPercentage / 100) * product.price]
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex gap-1">
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
                    </div>
                    <div className="text-xs text-gray-500 ml-3">
                      Rating ({product.rating})
                    </div>
                  </div>
                </div>
                {sessionStorage.getItem("token") != null ? (
                  // {Object.keys(user).length != 0 ? (
                  <button
                    className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                    onClick={() => {
                      dispatch(addToCart(product));
                      router.push(`/cart`);
                    }}
                  >
                    Add to cart
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                  >
                    Login to Purchase
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
        <Pagination
          items={products.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default ShopWrapper;
