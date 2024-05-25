"use client";
import React from "react";
import Image from "next/image";
import cat from "../../../../public/img/cat.jpg";

const projects = [
  {
    title: "Project title",
    description: "Description of your first project",
    imageUrl: cat,
  },
  {
    title: "Project title",
    description: "Description of your second work",
    imageUrl: cat,
  },
  {
    title: "Project title",
    description: "Description of your third creation",
    imageUrl: cat,
  },
  {
    title: "Project title",
    description: "Description of your fourth endeavor",
    imageUrl: cat,
  },
];

export default function PortfolioPage() {
  return (
    <div className="bg-black text-primary min-h-screen py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Portfolio title</h1>
        <p className="text-gray-500">
          A subheading with a brief description of you, your work, and what you&apos;re all about—no biggie
        </p>
      </div>
      <div className="container mx-auto grid gap-8 px-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {projects.map((project, index) => (
          <div key={index} className="bg-black border border-gray-800 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-gray-500">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
