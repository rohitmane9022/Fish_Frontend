

import Image from "next/image";
import React from "react";

export default function AboutUs() {
  return (
    <section className="bg-[#fff7f8] py-20">
      <div className="max-w-6xl mx-auto px-6">
     
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
           
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              About Us
            </h2>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              Established in the heart of the city, <span className="font-semibold text-gray-900">Bombay Seafood & Cold Store</span> has been the trusted name for premium, fresh, and frozen seafood for over <span className="font-semibold text-[#d90445]">40 years</span>.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              We believe in quality above all else. Our cold store ensures every catch—from the local shores to international waters—retains its pristine freshness, flavor, and nutritional value.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              When you choose us, you're choosing the best of the ocean, preserved to perfection.
            </p>
          </div>
    
        <div>
           <Image src="/aboutImg.png" alt="About Image" width={100} height={100} className="w-full h-full rounded-2xl  object-cover"/>
        </div>
        
        </div>
      </div>
    </section>
  );
}