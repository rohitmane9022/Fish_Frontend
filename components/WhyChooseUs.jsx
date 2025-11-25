"use client";
import React from "react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "The Best Catch.",
      text: `We source premium seafood daily, from local boats and trusted international partners.`,
    },
    {
      title: "Rapid Cold Chain",
      text: ` Our state-of-the-art cold storage system immediately locks in flavor and nutrients the moment the product is sourced, ensuring true "sea-to-table" freshness.`,
    },
    {
      title: "Quality Control",
      text: `Every piece is rigorously inspected and handled with meticulous care before it reaches your hands.`,
    },
    {
      title: "Expertise & Heritage",
      text: `As Bombay Seafood & Cold Store, we have a long-standing reputation built on trust, quality, and decades of experience in the seafood industry.`,
    },
    {
      title: "Local Knowledge",
      text: `Our team possesses deep knowledge of fish sourcing, seasons, and preparation, ensuring you always get the best product advice.`,
    },
    {
      title: "Specialty Cold Store Items",
      text: `We don't just sell fresh fish; our cold store offers a vast selection of premium frozen goods, prepared items, and gourmet ingredients for maximum convenience.`,
    },
  ];

  return (
    <section className="bg-[#fff7f8] py-14 border-b border-2">
      
      <div className="max-w-6xl mx-auto px-6 ">
        <h2 className="text-[#d90445] sm:font-bold font-semibold sm:text-4xl text-2xl mb-8">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-10"> 
        {features.map((item, i) => (
          <div key={i} className="text-gray-800">
            <div className="w-10 h-[3px] bg-[#d90445] mb-2 rounded"></div>
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">{item.text}</p>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
