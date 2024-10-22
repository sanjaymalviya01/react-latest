"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaGripHorizontal, FaHeart, FaList, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Pagination, { paginate } from "../../Pagination/Pagination";
import {
  addToCart,
  addToWishList,
  removeFromWishlist,
} from "@/redux/userSlice";
import { useRouter, useSearchParams } from "next/navigation";
import "./style.css";
import Grip from "./view/Grip/Grip";
import List from "./view/List/List";

const ShopWrapper = ({
  allpro,
  productsByCategory,
  productsByBrand,
  highestPrice,
  lowestPrice,
}) => {
  const [view, setView] = useState("grip");
  const [allProducts, setAllProducts] = useState([]);

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();
  const [brands, setBrands] = useState();

  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedBrand, setSelectedBrand] = useState({});
  const [selectedHighestPrice, setSelectedHighestPrice] = useState(0);
  const [selectedLowestPrice, setSelectedLowestPrice] = useState(0);
  const [sort, setSort] = useState();

  const [paginatedProducts, setPaginatedProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const user = useSelector((state) => state.userReducer.loggedInUser);

  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searches = searchParams.get("search");
  const searchCategory = searchParams.get("category");

  const fetchsearchedProducts = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searches}`
      );
      const data = await response.json();

      setAllProducts(data.products);
      setProducts(data.products);

      const productsByCategory = data.products.reduce(
        (arrayCategory, product) => {
          if (product.category !== undefined) {
            arrayCategory[product.category] =
              (arrayCategory[product.category] || 0) + 1;
          }
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
      setSelectedHighestPrice(highestPrice);
      setSelectedLowestPrice(lowestPrice);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    if (searchCategory) {
      setSelectedCategory((prevData) => ({
        ...prevData,
        [searchCategory]: true,
      }));
    }
  }, [allProducts, searchCategory]);
  useMemo(() => {
    if (searches && searches != "") {
      setCurrentPage(1);
      fetchsearchedProducts();
    } else {
      setAllProducts(allpro);
      setProducts(allpro);
      setCategory(productsByCategory);
      setBrands(productsByBrand);
      setSelectedHighestPrice(highestPrice);
      setSelectedLowestPrice(lowestPrice);
    }
  }, [searches]);
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

    setCurrentPage(1);
    setProducts(filteredProducts);
  }, [
    selectedCategory,
    selectedBrand,
    selectedHighestPrice,
    selectedLowestPrice,
    sort,
  ]);
  useMemo(() => {
    if (products) {
      let filteredProducts = products;
      switch (sort) {
        case "price-low-to-high":
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-high-to-low":
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "rating-low-to-high":
          filteredProducts.sort((a, b) => a.rating - b.rating);
          break;
        case "rating-low-to-high":
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;

        default:
          break;
      }
      const paginatedProducts = paginate(products, currentPage, pageSize);
      setPaginatedProducts(paginatedProducts);
    }
  }, [products, currentPage, user]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="shop-wrapper-grid">
      <div className="shop-wrapper-filter ">
        {category && (
          <div className="shop-wrapper-filter-main">
            <div>
              <h3 className="shop-wrapper-filter-head">Categories</h3>
              <div className="shop-wrapper-filter-scroller">
                {Object.entries(category).map((ProductCategory, index) => (
                  <div key={index}>
                    <div className="shop-wrapper-filter-input-div">
                      <input
                        type="checkbox"
                        name={`cat-${index}`}
                        id={`cat-${index}`}
                        checked={selectedCategory[ProductCategory[0]]}
                        className="shop-wrapper-filter-input"
                        onClick={(e) => {
                          if (searchParams) {
                            router.push("/shop");
                          }
                          if (e.target.checked === true) {
                            setSelectedCategory((prevData) => ({
                              ...prevData,
                              [ProductCategory[0]]: e.target.checked,
                            }));
                          } else {
                            setSelectedCategory((prevState) => {
                              const {
                                [ProductCategory[0]]: removed,
                                ...newState
                              } = prevState;
                              return newState;
                            });
                          }
                        }}
                      />
                      <label
                        htmlFor={`cat-${index}`}
                        className="shop-wrapper-filter-name"
                      >
                        {ProductCategory[0]}
                      </label>
                      <label
                        htmlFor={`cat-${index}`}
                        className="shop-wrapper-filter-quantity"
                      >
                        ({ProductCategory[1]})
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {brands && (
              <div className="pt-4">
                <h3 className="shop-wrapper-filter-head">Brands</h3>
                <div className="shop-wrapper-filter-scroller">
                  {Object.entries(brands).map(([key, value], index) => (
                    <div key={index}>
                      <div className="shop-wrapper-filter-input-div">
                        <input
                          type="checkbox"
                          name={`brand-${index}`}
                          id={`brand-${index}`}
                          checked={selectedBrand[key] || false}
                          onChange={(e) => {
                            if (e.target.checked === true) {
                              setSelectedBrand((prevData) => ({
                                ...prevData,
                                [key]: e.target.checked,
                              }));
                            } else {
                              setSelectedBrand((prevState) => {
                                const { [key]: removed, ...newState } =
                                  prevState;
                                return newState;
                              });
                            }
                          }}
                          className="shop-wrapper-filter-input"
                        />
                        <label
                          htmlFor={`brand-${index}`}
                          className="shop-wrapper-filter-name"
                        >
                          {key}
                        </label>
                        <label
                          htmlFor={`brand-${index}`}
                          className="shop-wrapper-filter-quantity"
                        >
                          ({value})
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="pt-4">
              <h3 className="shop-wrapper-filter-head">Price</h3>
              <div className="shop-wrapper-filter-price">
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
                  className="shop-wrapper-filter-price-input"
                  placeholder="min"
                />
                <span className="shop-wrapper-filter-price-span">-</span>
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
                  className="shop-wrapper-filter-price-input"
                  placeholder="max"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-3">
        <div className="top-btn-div">
          <select
            name="sort"
            id="sort"
            onChange={(e) => {
              setSort(e.target.value);
            }}
            className="sort-btn"
          >
            <option value="default">Default sorting</option>
            <option value="price-low-to-high">Price low to high</option>
            <option value="price-high-to-low">Price high to low</option>
            <option value="rating-low-to-high">Rating low to high</option>
            <option value="rating-high-to-low">Rating high to low</option>
          </select>

          <div className="shop-wrapper-view-btn">
            {view == "listview" && (
              <div
                className=" grip-btn"
                onClick={() => {
                  setView("grip");
                }}
              >
                <FaGripHorizontal />
              </div>
            )}
            {view == "grip" && (
              <div
                className="list-btn"
                onClick={() => {
                  setView("listview");
                }}
              >
                <FaList />
              </div>
            )}
          </div>
        </div>
        {view == "grip" && <Grip {...{ paginatedProducts, user }} />}
        {view == "listview" && <List {...{ paginatedProducts, user }} />}
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
