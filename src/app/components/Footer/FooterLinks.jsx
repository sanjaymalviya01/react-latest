import Link from 'next/link'
import React from 'react'

const FooterLinks = () => {
  return (
    
    <div className="col-span-2 grid grid-cols-2 gap-4">
    <div className="grid grid-cols-2 gap-4 md:gap-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Solutions
        </h3>
        <div className="mt-4 space-y-4">
          <Link
            href="#"
            className="text-base text-gray-500 hover:text-gray-900 block"
          >
            Marketing
          </Link>
          <Link
            href="#"
            className="text-base text-gray-500 hover:text-gray-900 block"
          >
            Analitycs
          </Link>
          <Link
            href="#"
            className="text-base text-gray-500 hover:text-gray-900 block"
          >
            Commerce
          </Link>
          <Link
            href="#"
            className="text-base text-gray-500 hover:text-gray-900 block"
          >
            Insights
          </Link>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Support
        </h3>
        <div className="mt-4 space-y-4">
          <Link
            href="#"
            className="text-base text-gray-500 hover:text-gray-900 block"
          >
            Pricing
          </Link>
          {/* <!-- <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Documentation</a> --> */}
          <Link
            href="#"
            className="text-base text-gray-500 hover:text-gray-900 block"
          >
            Guides
          </Link>
          <Link
            href="#"
            className="text-base text-gray-500 hover:text-gray-900 block"
          >
            API Status
          </Link>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Solutions
        </h3>
        <div className="mt-4 space-y-4">
          <Link
            href="#"
            className="text-base text-gray-500 hover:text-gray-900 block"
          >
            Marketing
          </Link>
          <Link
            href="#"
            className="text-base text-gray-500 hover:text-gray-900 block"
          >
            Analitycs
          </Link>
          <Link
            href="#"
            className="text-base text-gray-500 hover:text-gray-900 block"
          >
            Commerce
          </Link>
          <Link
            href="#"
            className="text-base text-gray-500 hover:text-gray-900 block"
          >
            Insights
          </Link>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Support
        </h3>
        <div className="mt-4 space-y-4">
          <Link
            href="#"
            className="text-base text-gray-500 hover:text-gray-900 block"
          >
            Pricing
          </Link>
          {/* <!-- <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">Documentation</a> --> */}
          <Link
            href="#"
            className="text-base text-gray-500 hover:text-gray-900 block"
          >
            Guides
          </Link>
          <Link
            href="#"
            className="text-base text-gray-500 hover:text-gray-900 block"
          >
            API Status
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default FooterLinks