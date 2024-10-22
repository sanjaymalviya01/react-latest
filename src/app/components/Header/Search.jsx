"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { GiMagnifyingGlass } from "react-icons/gi";
import debounce from "lodash.debounce";
import "./style.css";
const Search = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const updateQuery = (e) => setQuery(e?.target?.value);

  const debouncedOnChange = debounce(updateQuery, 2000);
  const queryFunction = () => {
    if (query) {
      router.push(`/shop?search=${query}`);
    } else {
      router.push(`${pathname}`);
    }
  };
  useEffect(() => {
    queryFunction();
  }, [query]);

  return (
    <div className="search-main">
      <span className="search-magnifying-glass">
        <GiMagnifyingGlass />
      </span>
      <input
        type="text"
        name="search"
        onChange={debouncedOnChange}
        id="search"
        className="w-full border border-primary pl-12 py-3 pr-3 rounded focus:outline-none"
        placeholder="Search your Products here"
      />
    </div>
  );
};

export default Search;
