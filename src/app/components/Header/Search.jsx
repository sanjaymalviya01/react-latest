"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { GiMagnifyingGlass } from "react-icons/gi";
import debounce from "lodash.debounce";
const Search = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (query) {
      router.push(`/shop?search=${query}`);
    } else {
      router.push(`${pathname}`);
    }
  }, [query]);

  const updateQuery = (e) => setQuery(e?.target?.value);

  const debouncedOnChange = debounce(updateQuery, 2000);

  return (
    <div className="w-full max-w-xl relative flex">
      <span className="absolute left-4 top-4 text-lg text-gray-400">
        <GiMagnifyingGlass />
      </span>
      <input
        type="text"
        name="search"
        onChange={debouncedOnChange}
        id="search"
        className="w-full border border-primary
         pl-12 py-3 pr-3 rounded focus:outline-none"
        placeholder="Search your Products here"
      />
    </div>
  );
};

export default Search;
