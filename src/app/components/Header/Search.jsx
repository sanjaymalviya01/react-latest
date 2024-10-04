"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { GiMagnifyingGlass } from "react-icons/gi";
import { MdClear } from "react-icons/md";

const Search = () => {
  const [searchedValue, setSearchedValue] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchElement = useRef();
  const searchInput = () => {
    searchElement.current.focus();
    setSearchedValue(searchElement.current.value);
  };
  // const goSearch = () => {
  // };
  useEffect(() => {
    router.push(`/shop?search=${searchedValue}`);
    // goSearch();
  }, [searchedValue]);
  return (
    <div className="w-full max-w-xl relative flex">
      <span className="absolute left-4 top-4 text-lg text-gray-400">
        <GiMagnifyingGlass />
      </span>
      <input
        type="text"
        name="search"
        ref={searchElement}
        id="search"
        className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
        placeholder="search"
        // onChange={() => {
        //   if (pathname != "/shop") {
        //     router.push("/shop");
        //   }
        // }}
      />
      {searchedValue && searchElement.current.value != "" && (
        <span className="absolute right-1/4 top-3 text-lg text-gray-400">
          {/* <MdClear /> */}
          <button
            className="text-sm"
            onClick={() => {
              searchElement.current.value = "";
              searchInput();
            }}
          >
            Clear
          </button>
        </span>
      )}
      <button
        className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition"
        onClick={searchInput}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
