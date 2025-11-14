'use client'
import Image from "next/image"

const Categories = ({ imageUrl, name }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 sm:w-24 sm:h-24  flex items-center justify-center ">
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          className="object-cover w-full h-full"
        />
      </div>

      <p className="text-[13px] sm:text-sm font-medium mt-2 leading-tight">
        {name}
      </p>
    </div>
  )
}

export default Categories
