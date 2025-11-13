'use client'
import Image from "next/image"



const Categories = ({imageUrl,name}) => {

   

  return (
    <div className="flex flex-col items-center">
        <Image width={130} height={130} src={`${imageUrl}`} alt={name}/>
        <p className="text-base font-medium">{name}</p>
    </div>
  )
}

export default Categories
