"use client";
import React from "react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-black text-primary min-h-screen py-12">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 px-4">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
          <p className="text-xl text-gray-400 mb-4">Conozca a los CEOs: Nacho y Jorge</p>
          <p className="text-gray-400 mb-4">
            Somos Nacho y Jorge, dos CEOs con una amplia gama de capacidades en la industria audiovisual. Con años de experiencia y un profundo conocimiento del sector, nos dedicamos a ofrecer servicios de alta calidad y soluciones innovadoras a nuestros clientes.
          </p>
          <p className="text-gray-400 mb-4">
            Nacho, con un fondo en dirección cinematográfica, ha trabajado en numerosos proyectos internacionales que han recibido reconocimiento global. Jorge, un experto en tecnología audiovisual, ha liderado múltiples iniciativas tecnológicas que han revolucionado la manera en que se producen y consumen contenidos audiovisuales.
          </p>
          <p className="text-gray-400 mb-4">
            Nuestra misión es proporcionar experiencias audiovisuales excepcionales que superen las expectativas. Trabajamos con las ultimas tecnologías y un equipo talentoso para asegurar que cada proyecto se realice con el máximo nivel de profesionalismo y creatividad.
          </p>
          <p className="text-gray-400 mb-4">
            Desde la producción de videos corporativos hasta la cobertura de eventos en vivo, estamos comprometidos a ofrecer resultados que destaquen y ayuden a nuestros clientes a alcanzar sus objetivos. Juntos, lideramos nuestra empresa hacia nuevas alturas, siempre con la mirada puesta en la excelencia y la innovación.
          </p>
        </div>
        <div className="lg:w-1/2">
          <Image
            src="/img/aboutus.jpg"
            alt="Imagen de Nosotros"
            width={600}
            height={600}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
