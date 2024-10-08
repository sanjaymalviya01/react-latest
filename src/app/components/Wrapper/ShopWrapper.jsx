"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaGripVertical, FaHeart, FaList, FaStar } from "react-icons/fa";
import { GiMagnifyingGlass } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import Pagination, { paginate } from "../Pagination/Pagination";
import {
  addToCart,
  addToWishList,
  removeFromWishlist,
} from "@/redux/userSlice";
import { useRouter, useSearchParams } from "next/navigation";

const ShopWrapper = ({
  allpro,
  productsByCategory,
  productsByBrand,
  highestPrice,
  lowestPrice,
}) => {
  const [view, setView] = useState("thumbnail");
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
    <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
      <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
        {category && (
          <div className="divide-y divide-gray-200 space-y-5">
            <div>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Categories
              </h3>
              <div
                className="space-y-2"
                style={{ maxHeight: "15rem", overflow: "auto" }}
              >
                {Object.entries(category).map((ProductCategory, index) => (
                  <div key={index}>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name={`cat-${index}`}
                        id={`cat-${index}`}
                        className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                        onClick={(e) => {
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
                        htmlFor="brand-1"
                        className="text-gray-600 ml-3 cusror-pointer"
                      >
                        {ProductCategory[0]}
                      </label>
                      <div className="ml-auto text-gray-600 text-sm">
                        ({ProductCategory[1]})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                                const { [key]: removed, ...newState } =
                                  prevState;
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
        )}
      </div>

      <div className="col-span-3">
        <div className="flex items-center mb-4">
          <select
            name="sort"
            id="sort"
            onChange={(e) => {
              setSort(e.target.value);
            }}
            className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
          >
            <option value="default">Default sorting</option>
            <option value="price-low-to-high">Price low to high</option>
            <option value="price-high-to-low">Price high to low</option>
            <option value="rating-low-to-high">Rating low to high</option>
            <option value="rating-high-to-low">Rating high to low</option>
          </select>

          <div className="flex gap-2 ml-auto">
            {view == "listview" && (
              <div
                className="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer"
                onClick={() => {
                  setView("thumbnail");
                }}
              >
                <FaGripVertical />
              </div>
            )}
            {view == "thumbnail" && (
              <div
                className="border border-gray-300 w-10 h-9 flex items-center justify-center text-gray-600 rounded cursor-pointer"
                onClick={() => {
                  setView("listview");
                }}
              >
                <FaList />
              </div>
            )}
          </div>
        </div>
        {view == "thumbnail" && (
          <div className="grid md:grid-cols-3 grid-cols-2 gap-6 shadow rounded">
            {paginatedProducts.map((product, index) => (
              <div key={`paginatedProducts-${index}`}>
                <div className="bg-white shadow rounded overflow-hidden group">
                  <div className="relative">
                    <div style={{ height: "200px", position: "relative" }}>
                      <Image
                        fill={true}
                        sizes="(max-width: 768px)"
                        priority={false}
                        src={product.images[0]}
                        alt={product.title}
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
                            href={{
                              pathname: "/product",
                              query: { productId: product.id },
                            }}
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
                    <Link
                      href={{
                        pathname: "/product",
                        query: { productId: product.id },
                      }}
                    >
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
                        <p className="text-xl text-primary font-semibold">
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
                          {Array.from(
                            { length: product.rating },
                            (_, index) => (
                              <>
                                <span>
                                  <FaStar />
                                </span>
                              </>
                            )
                          )}
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
                  <button
                    className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                    onClick={() => {
                      if (
                        sessionStorage.getItem("token") != null ||
                        sessionStorage.getItem("token") != ""
                      ) {
                        dispatch(addToCart(product));
                        router.push(`/cart`);
                      } else {
                        router.push(`/login`);
                      }
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {view == "listview" && (
          <div className="grid md:grid-cols-1 grid-cols-1 gap-6 shadow rounded">
            {paginatedProducts.map((product) => (
              <>
                <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
                  <div
                    className="w-28"
                    style={{ height: "100px", position: "relative" }}
                  >
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
                    <p className="text-xs text-gray-400 font-semibold">
                      {product.brand}
                    </p>
                    <Link
                      href={{
                        pathname: "/product",
                        query: { productId: product.id },
                      }}
                    >
                      <h2
                        className="text-gray-800 text-xl font-medium uppercase"
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
                    <div className="flex justify-between flex-col">
                      <p className="text-xs text-gray-400 font-semibold">
                        sku-{product.sku}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <div className="flex gap-1">
                          <div className="flex gap-1 text-sm text-primary">
                            {Array.from(
                              { length: product.rating },
                              (_, index) => (
                                <>
                                  <span>
                                    <FaStar />
                                  </span>
                                </>
                              )
                            )}
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
                          ({product.rating})
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 font-semibold">
                        Offer - {product.discountPercentage} % off
                      </p>
                    </div>
                  </div>
                  <del className="text-xs text-gray-400 font-semibold">
                    ${product.price}
                  </del>
                  <div className="text-primary text-lg font-semibold">
                    $
                    {(
                      product.price -
                      [(product.discountPercentage / 100) * product.price]
                    ).toFixed(2)}
                  </div>
                  <button
                    onClick={() => {
                      if (
                        sessionStorage.getItem("token") != null ||
                        sessionStorage.getItem("token") != ""
                      ) {
                        dispatch(addToCart(product));
                        router.push(`/cart`);
                      } else {
                        router.push(`/login`);
                      }
                    }}
                    className="px-6 py-2 text-center text-sm text-primary bg-dark border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                  >
                    add to cart
                  </button>
                  <button
                    className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                    onClick={() => {
                      dispatch(removeFromWishlist(product));
                    }}
                  >
                    remove
                  </button>

                  <div className="text-gray-600 cursor-pointer hover:text-primary">
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </div>
              </>
            ))}
            {/* {paginatedProducts.map((product, index) => (
              <div key={`paginatedProducts-${index}`}>
                <div className="bg-white shadow rounded overflow-hidden group">
                  <div className="relative">
                    <div style={{ height: "200px", position: "relative" }}>
                      <Image
                        fill={true}
                        sizes="(max-width: 768px)"
                        priority={false}
                        src={product.images[0]}
                        alt={product.title}
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
                            href={{
                              pathname: "/product",
                              query: { productId: product.id },
                            }}
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
                    <Link
                      href={{
                        pathname: "/product",
                        query: { productId: product.id },
                      }}
                    >
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
                        <p className="text-xl text-primary font-semibold">
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
                          {Array.from(
                            { length: product.rating },
                            (_, index) => (
                              <>
                                <span>
                                  <FaStar />
                                </span>
                              </>
                            )
                          )}
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
                  <button
                    className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                    onClick={() => {
                      if (
                        sessionStorage.getItem("token") != null ||
                        sessionStorage.getItem("token") != ""
                      ) {
                        dispatch(addToCart(product));
                        router.push(`/cart`);
                      } else {
                        router.push(`/login`);
                      }
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))} */}
          </div>
        )}
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
