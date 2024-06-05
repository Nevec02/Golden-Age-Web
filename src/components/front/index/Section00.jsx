"use client";
import Image from "next/image";
import Link from "next/link";

export default function Section() {
  return (
    <div className="bg-black text-primary">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto grid gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-8 xl:space-y-10 order-2 lg:order-1">
            <Image
              alt="Servicios Audiovisuales"
              className="aspect-video w-full overflow-hidden rounded-xl object-cover"
              height={365}
              src="/img/img00.jpg"
              width={650}
            />
          </div>
          <div className="space-y-8 xl:space-y-10 order-1 lg:order-2">
            <div className="space-y-4 lg:space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl xl:text-4xl">
                  Descubre el Poder de Nuestros Servicios Audiovisuales
                </h2>
                <p className="max-w-[900px] text-primary md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Aprovecha los beneficios de nuestros servicios audiovisuales sin la carga de gestionar infraestructuras. 
                  Ofrece experiencias personalizadas y de alta calidad a tus usuarios con facilidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto grid gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-8 xl:space-y-10">
            <div className="space-y-4 lg:space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl xl:text-4xl">
                  Acelera Tu Flujo de Trabajo
                </h2>
                <p className="max-w-[900px] text-primary md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Mejora tu productividad con herramientas y servicios que te permiten enfocarte en la creación de contenido, 
                  no en la gestión de infraestructuras.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-8 xl:space-y-10">
            <Image
              alt="Acelera Tu Trabajo"
              className="aspect-video w-full overflow-hidden rounded-xl object-cover"
              height={365}
              src="/img/img01.jpg"
              width={650}
            />
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto grid gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-8 xl:space-y-10 order-2 lg:order-1">
            <Image
              alt="Escala Sin Esfuerzo"
              className="aspect-video w-full overflow-hidden rounded-xl object-cover"
              height={365}
              src="/img/img02.jpg"
              width={650}
            />
          </div>
          <div className="space-y-8 xl:space-y-10 order-1 lg:order-2">
            <div className="space-y-4 lg:space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl xl:text-4xl">
                  Escala Sin Esfuerzo
                </h2>
                <p className="max-w-[900px] text-primary md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Escala tus proyectos audiovisuales para satisfacer la creciente demanda sin la complicación de gestionar recursos adicionales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto grid gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-8 xl:space-y-10">
            <div className="space-y-4 lg:space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl xl:text-4xl">
                  Mejora la Seguridad
                </h2>
                <p className="max-w-[900px] text-primary md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Mantén tus datos y proyectos seguros con nuestras completas características de seguridad y mejores prácticas.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-8 xl:space-y-10">
            <Image
              alt="Mejora la Seguridad"
              className="aspect-video w-full overflow-hidden rounded-xl object-cover"
              height={365}
              src="/img/img03.jpg"
              width={650}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
