"use client";
import React from "react";
import Image from "next/image";


const projects = [
  {
    title: "Producción de Video Corporativo",
    description: "Un video corporativo innovador que destaca los valores y la misión de la empresa Alphabet.",
    imageUrl: "/img/project00.jpg",
  },
  {
    title: "Documental Cultural",
    description: "Documental sobre las tradiciones y cultura de la región Kikonga, capturando la esencia local.",
    imageUrl: "/img/project01.jpg",
  },
  {
    title: "Anuncio Publicitario",
    description: "Anuncio publicitario para la campaña de lanzamiento del nuevo producto de la empresa DEF.",
    imageUrl: "/img/project02.jpg",
  },
  {
    title: "Cobertura de Evento en Vivo",
    description: "Cobertura en vivo del evento anual de tecnología, mostrando las últimas innovaciones.",
    imageUrl: "/img/project03.jpg",
  },
];

export default function PortfolioPage() {
  return (
    <div className="bg-black text-primary min-h-screen py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Nuestro Portafolio</h1>
        <p className="text-gray-500">
          Una breve descripción de nuestros trabajos audiovisuales y proyectos destacados en el sector profesional.
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
