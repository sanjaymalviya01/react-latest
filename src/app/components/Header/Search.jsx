"use client";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import { GiMagnifyingGlass } from "react-icons/gi";
const Search = () => {
  const [searchedValue, setSearchedValue] = useState("");
  const router = useRouter();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (searchedValue == "") {
        router.push(`/shop`);
      } else {
        router.push(`/shop?search=${searchedValue}`);
      }
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [searchedValue]);
  return (
    <div className="w-full max-w-xl relative flex">
      <span className="absolute left-4 top-4 text-lg text-gray-400">
        <GiMagnifyingGlass />
      </span>
      <input
        type="text"
        name="search"
        value={searchedValue}
        onChange={(e) => setSearchedValue(e.target.value)}
        id="search"
        className="w-full border border-primary 
         pl-12 py-3 pr-3 rounded focus:outline-none"
        placeholder="Search your Products here"
      />
      {searchedValue && (
        <span
          className="absolute right-4 
         top-3 text-lg text-gray-400"
        >
          <button
            className="text-sm"
            onClick={() => {
              const a = "";
              setSearchedValue("");
              router.push(`/shop`);
            }}
          >
            Clear
          </button>
        </span>
      )}
    </div>
  );
};

export default Search;
