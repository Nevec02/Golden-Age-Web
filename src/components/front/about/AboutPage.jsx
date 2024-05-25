"use client";
import React from "react";
import Image from "next/image";
import aboutImage from "../../../../public/img/cat.jpg";

export default function AboutPage() {
  return (
    <div className="bg-black text-primary min-h-screen py-12">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 px-4">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">About</h1>
          <p className="text-xl text-gray-400 mb-4">Subheading for description or instructions</p>
          <p className="text-gray-400 mb-4">
            Body text for your whole article or post. We&apho;ll put in some lorem ipsum to show how a filled-out page might look like:
          </p>
          <p className="text-gray-400 mb-4">
            Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquid, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.
          </p>
        </div>
        <div className="lg:w-1/2">
          <Image
            src={aboutImage}
            alt="About Image"
            width={600}
            height={600}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
