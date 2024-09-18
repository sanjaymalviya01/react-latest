import Link from 'next/link'
import React from 'react'

const Navmenu = () => {
  return (
    <div className="flex items-center space-x-6 capitalize">
            <Link
              href="/"
              className="text-gray-200 hover:text-white transition"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-gray-200 hover:text-white transition"
            >
              Shop
            </Link>
            <Link
              href="/aboutus"
              className="text-gray-200 hover:text-white transition"
            >
              About us
            </Link>
            <Link
              href="/contactus"
              className="text-gray-200 hover:text-white transition"
            >
              Contact us
            </Link>
          </div>
  )
}

export default Navmenu