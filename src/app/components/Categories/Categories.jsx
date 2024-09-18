import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import category1 from '@/app/assets/images/category/category-1.jpg'
import category2 from '@/app/assets/images/category/category-2.jpg'
import category3 from '@/app/assets/images/category/category-3.jpg'
import category4 from '@/app/assets/images/category/category-4.jpg'
import category5 from '@/app/assets/images/category/category-5.jpg'
import category6 from '@/app/assets/images/category/category-6.jpg'

const Categories = () => {
  return (
    <div className="container py-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">shop by category</h2>
        <div className="grid grid-cols-3 gap-3">
            <div className="relative rounded-sm overflow-hidden group">
                <Image src={category1} alt="category 1" className="w-full"/>
                <Link href="#"
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Bedroom</Link>
            </div>
            <div className="relative rounded-sm overflow-hidden group">
                <Image src={category2} alt="category 1" className="w-full"/>
                <Link href="#"
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Mattrass</Link>
            </div>
            <div className="relative rounded-sm overflow-hidden group">
                <Image src={category3} alt="category 1" className="w-full"/>
                <Link href="#"
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Outdoor
                </Link>
            </div>
            <div className="relative rounded-sm overflow-hidden group">
                <Image src={category4} alt="category 1" className="w-full"/>
                <Link href="#"
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Sofa</Link>
            </div>
            <div className="relative rounded-sm overflow-hidden group">
                <Image src={category5} alt="category 1" className="w-full"/>
                <Link href="#"
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Living
                    Room</Link>
            </div>
            <div className="relative rounded-sm overflow-hidden group">
                <Image src={category6} alt="category 1" className="w-full"/>
                <Link href="#"
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Kitchen</Link>
            </div>
        </div>
    </div>
  )
}

export default Categories