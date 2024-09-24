"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination, { paginate } from "../Pagination/Pagination";

function ShopWrapper() {
  const [allProducts, setAllProducts] = useState([]);
  const [Products, setProducts] = useState([]);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [selectedCategories, setselectedCategories] = useState({});
  const [Brands, setBrands] = useState(null);
  const [filteredBrands, setFilteredBrands] = useState(null);
  const [HighestPrice, setHighestPrice] = useState(1000);
  const [lowestPrice, setLowestPrice] = useState(0);
  const [selectedBrand, setselectedBrand] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products`);
      const data = await response.json();
      setAllProducts(data.products);

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
      setHighestPrice(highestPrice);
      setLowestPrice(lowestPrice);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  useEffect(() => {
    let filteredProducts = allProducts;
    if (Object.keys(selectedCategories).length) {
      async function getCategories() {
        const categoriesToFetch = Object.keys(selectedCategories).filter(
          (category) => selectedCategories[category]
        );
        const fetchPromises = categoriesToFetch.map((category) =>
          fetch(`https://dummyjson.com/products/category/${category}`).then(
            (res) => res.json()
          )
        );

        Promise.all(fetchPromises)
          .then((results) => {
            const allProducts = results.flatMap((result) => result.products);
            setProducts(allProducts);
            console.log(allProducts);
            return allProducts;
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      getCategories();
    }

    setProducts(filteredProducts);
    setCurrentPage(1);
  }, [selectedCategories]);
  useEffect(() => {
    let filteredProducts = allProducts;
    if (Object.keys(selectedBrand).length) {
      filteredProducts = filteredProducts.filter(
        (product) => selectedBrand[product.brand]
      );
    }

    setProducts(filteredProducts);
    setCurrentPage(1);
  }, [selectedBrand]);

  useEffect(() => {
    let filteredProducts = allProducts;

    filteredProducts = filteredProducts.filter(
      (product) => product.price <= HighestPrice && product.price >= lowestPrice
    );

    setProducts(filteredProducts);
    setCurrentPage(1);
  }, [HighestPrice, lowestPrice, allProducts]);

  useEffect(() => {
    if (Products) {
      const paginatedProducts = paginate(Products, currentPage, pageSize);
      setPaginatedProducts(paginatedProducts);
    }
  }, [Products, currentPage]);

  useEffect(() => {
    if (selectedCategories && Object.keys(selectedCategories).length) {
      const filteredBrands = allProducts
        .filter((product) => selectedCategories[product.category])
        .reduce((arrayBrand, product) => {
          if (product.brand !== undefined) {
            arrayBrand[product.brand] = (arrayBrand[product.brand] || 0) + 1;
          }
          return arrayBrand;
        }, {});
      setFilteredBrands(filteredBrands);
    } else {
      setFilteredBrands(Brands);
    }
  }, [selectedCategories, allProducts, Brands]);

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
          {filteredBrands && (
            <div className="pt-4" style={{ height: "28rem", overflow: "auto" }}>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Brands
              </h3>
              <div className="space-y-2">
                {Object.entries(filteredBrands).map(([key, value], index) => (
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
        </div>
      </div>
      {paginatedProducts && (
        <div className="col-span-3">
          <div
            className="grid md:grid-cols-3 grid-cols-2 gap-6 shadow rounded"
            style={{ height: "48rem" }}
          >
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
                    href={`/product?id=${product.id}`}
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
