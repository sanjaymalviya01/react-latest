import Image from 'next/image'
import React from 'react'
import methods from '@/app/assets/images/methods.png'

const Copyright = () => {
  return (
    <div className="bg-gray-800 py-4">
        <div className="container flex items-center justify-between">
            <p className="text-white">&copy; TailCommerce - All Right Reserved</p>
            <div className='flex items-end'>
                <Image src={methods} alt="methods" className="h-5 w-auto" />
            </div>
        </div>
    </div>
  )
}

export default Copyright