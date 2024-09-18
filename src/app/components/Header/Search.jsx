import React from 'react'
import { GiMagnifyingGlass } from 'react-icons/gi'

const Search = () => {
  return (
    <div className="w-full max-w-xl relative flex">
          <span className="absolute left-4 top-3 text-lg text-gray-400">
            <GiMagnifyingGlass/>
          </span>
          <input
            type="text" 
            name="search"
            id="search"
            className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
            placeholder="search"
          />
          <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">
            Search
          </button>
        </div>
  )
}

export default Search