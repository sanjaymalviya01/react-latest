"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Pagination, { paginate } from "../Pagination/Pagination";
import Categories from "../Categories/Categories";

function ShopWrapper() {
  const [Products, setProducts] = useState(null);
  const [ProductsTemp, setProductsTemp] = useState(null);
  const [paginatedProducts, setPaginatedProducts] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedCategories, setselectedCategories] = useState({});
  const [Brands, setBrands] = useState(null);
  const [HighestPrice, setHighestPrice] = useState(1000);
  const [lowestPrice, setLowestPrice] = useState(0);
  const [selectedBrand, setselectedBrand] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setProductsTemp(data.products);
        const productsByCategory = data.products.reduce(
          (arrayCategory, product) => {
            arrayCategory[product.category] =
              (arrayCategory[product.category] || 0) + 1;
            return arrayCategory;
          },
          {}
        );
        setCategory(productsByCategory);

        const productsByBrand = data.products.reduce((arrayBrand, product) => {
          if (product.brand != undefined) {
            arrayBrand[product.brand] = (arrayBrand[product.brand] || 0) + 1;
          }
          return arrayBrand;
        }, {});
        setBrands(productsByBrand);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    let categoryArray = [];
    setProducts(categoryArray);
    const TempProduct = ProductsTemp;

    Object.keys(selectedCategories).map((category) => {
      TempProduct.map((product) => {
        if (product.category == category) {
          categoryArray.push(product);
        }
      });
    });
    if (ProductsTemp || categoryArray.length) {
      const categoryForBrand = categoryArray.length
        ? categoryArray
        : ProductsTemp;
      const productsByBrand = categoryForBrand.reduce((arrayBrand, product) => {
        if (product.brand != undefined) {
          arrayBrand[product.brand] = (arrayBrand[product.brand] || 0) + 1;
        }
        return arrayBrand;
      }, {});
      setBrands(productsByBrand);
    }
    if (Object.keys(selectedBrand).length) {
      const tempCategoryArray = [];
      Object.keys(selectedBrand).map((brand) => {
        if (categoryArray.length) {
          categoryArray.map((product) => {
            if (product.brand == brand) {
              tempCategoryArray.push(product);
            }
          });
        } else {
          ProductsTemp.map((product) => {
            if (product.brand == brand) {
              tempCategoryArray.push(product);
            }
          });
        }
      });
      categoryArray = tempCategoryArray;
    }
    function getUniqueListBy(categoryArray, key) {
      return [
        ...new Map(categoryArray.map((item) => [item[key], item])).values(),
      ];
    }
    categoryArray = getUniqueListBy(categoryArray, "id");

    let priceArr = [];
    categoryArray.map((product) => {
      if (product.price <= HighestPrice && product.price >= lowestPrice) {
        priceArr.push(product);
      }
    });

    categoryArray = priceArr;

    setCurrentPage(1);
    if (categoryArray && categoryArray.length != 0) {
      setProducts(categoryArray);
    } else {
      setProducts(ProductsTemp);
    }
  }, [selectedCategories, selectedBrand, HighestPrice, lowestPrice]);

  useEffect(() => {
    if (Products) {
      const paginatedProducts = paginate(Products, currentPage, pageSize);
      setPaginatedProducts(paginatedProducts);
    }
  }, [Products, currentPage, ProductsTemp, selectedCategories]);
  return (
    <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
      <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
        <div className="divide-y divide-gray-200 space-y-5">
          {category && (
            <div>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Categories
              </h3>
              <div className="space-y-2">
                {Object.entries(category).map(([key, value], index) => (
                  <div key={index}>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name={`cat-${index}`}
                        id={`cat-${index}`}
                        className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                        checked={selectedCategories[key] || false}
                        onChange={(e) => {
                          if (e.target.checked === true) {
                            setselectedCategories((prevData) => ({
                              ...prevData,
                              [key]: e.target.checked,
                            }));
                          } else {
                            setselectedCategories((prevState) => {
                              const { [key]: removed, ...newState } = prevState;
                              return newState;
                            });
                          }
                        }}
                      />
                      <label
                        htmlFor="cat-1"
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
          {Brands && (
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Brands
              </h3>
              <div className="space-y-2">
                {Object.entries(Brands).map(([key, value], index) => (
                  <div key={index}>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="brand-1"
                        id="brand-1"
                        checked={selectedBrand[key] || false}
                        onChange={(e) => {
                          if (e.target.checked === true) {
                            setselectedBrand((prevData) => ({
                              ...prevData,
                              [key]: e.target.checked,
                            }));
                          } else {
                            setselectedBrand((prevState) => {
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
                value={lowestPrice}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setLowestPrice(e.target.value, 0);
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
                value={HighestPrice}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setHighestPrice(e.target.value);
                  }
                }}
                className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                placeholder="max"
              />
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
              size
            </h3>
            <div className="flex items-center gap-2">
              <div className="size-selector">
                <input
                  type="radio"
                  name="size"
                  id="size-xs"
                  className="hidden"
                />
                <label
                  htmlFor="size-xs"
                  className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                >
                  XS
                </label>
              </div>
              <div className="size-selector">
                <input
                  type="radio"
                  name="size"
                  id="size-sm"
                  className="hidden"
                />
                <label
                  htmlFor="size-sm"
                  className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                >
                  S
                </label>
              </div>
              <div className="size-selector">
                <input
                  type="radio"
                  name="size"
                  id="size-m"
                  className="hidden"
                />
                <label
                  htmlFor="size-m"
                  className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                >
                  M
                </label>
              </div>
              <div className="size-selector">
                <input
                  type="radio"
                  name="size"
                  id="size-l"
                  className="hidden"
                />
                <label
                  htmlFor="size-l"
                  className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                >
                  L
                </label>
              </div>
              <div className="size-selector">
                <input
                  type="radio"
                  name="size"
                  id="size-xl"
                  className="hidden"
                />
                <label
                  htmlFor="size-xl"
                  className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                >
                  XL
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
              Color
            </h3>
            <div className="flex items-center gap-2">
              <div className="color-selector">
                <input type="radio" name="color" id="red" className="hidden" />
                <label
                  htmlFor="red"
                  className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                  style={{ backgroundColor: "#fc3d57" }}
                ></label>
              </div>
              <div className="color-selector">
                <input
                  type="radio"
                  name="color"
                  id="black"
                  className="hidden"
                />
                <label
                  htmlFor="black"
                  className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                  style={{ backgroundColor: "#000" }}
                ></label>
              </div>
              <div className="color-selector">
                <input
                  type="radio"
                  name="color"
                  id="white"
                  className="hidden"
                />
                <label
                  htmlFor="white"
                  className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                  style={{ backgroundColor: "#fff" }}
                ></label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {paginatedProducts && (
        <div className="col-span-3">
          <div className="flex items-center mb-4">
            <select
              name="sort"
              id="sort"
              className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
            >
              <option value="">Default sorting</option>
              <option value="price-low-to-high">Price low to high</option>
              <option value="price-high-to-low">Price high to low</option>
              <option value="latest">Latest product</option>
            </select>

            <div className="flex gap-2 ml-auto">
              <div className="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
                <i className="fa-solid fa-grip-vertical"></i>
              </div>
              <div className="border border-gray-300 w-10 h-9 flex items-center justify-center text-gray-600 rounded cursor-pointer">
                <i className="fa-solid fa-list"></i>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
            {paginatedProducts.map((product, index) => (
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
                      <Link
                        href="#"
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                        title="view product"
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </Link>
                      <Link
                        href="#"
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                        title="add to wishlist"
                      >
                        <i className="fa-solid fa-heart"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="pt-4 pb-3 px-4">
                    <Link href="#">
                      <h4
                        className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition"
                        style={{ height: "50px" }}
                      >
                        {product.title}
                      </h4>
                    </Link>
                    <div className="flex items-baseline mb-1 space-x-2">
                      <p className="text-xl text-primary font-semibold">
                        {product.price}
                      </p>
                      <p className="text-sm text-gray-400 ">
                        {product.discountPercentage} % off
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex gap-1 text-sm text-yellow-400">
                        <span>
                          <i className="fa-solid fa-star"></i>
                        </span>
                        <span>
                          <i className="fa-solid fa-star"></i>
                        </span>
                        <span>
                          <i className="fa-solid fa-star"></i>
                        </span>
                        <span>
                          <i className="fa-solid fa-star"></i>
                        </span>
                        <span>
                          <i className="fa-solid fa-star"></i>
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 ml-3">
                        Rating ({product.rating})
                      </div>
                    </div>
                  </div>
                  <Link
                    href="#"
                    className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                  >
                    Add to cart
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            items={Products.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}

export default ShopWrapper;
