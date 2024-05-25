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
              alt="Serverless Computing"
              className="aspect-video w-full overflow-hidden rounded-xl object-cover"
              height={365}
              src="/placeholder.svg"
              width={650}
            />
          </div>
          <div className="space-y-8 xl:space-y-10 order-1 lg:order-2">
            <div className="space-y-4 lg:space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl xl:text-4xl">
                  Unlock the Power of Serverless
                </h2>
                <p className="max-w-[900px] text-primary md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Leverage the benefits of serverless compute without the overhead of infrastructure management. Deliver
                  lightning-fast, personalized experiences to your users with ease.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-black shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
                  href="#"
                >
                  Get Started
                </Link>
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
                  Accelerate Your Workflow
                </h2>
                <p className="max-w-[900px] text-primary md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Improve your productivity with tools and services that allow you to focus on writing code, not managing infrastructure.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-black shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
                  href="#"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-8 xl:space-y-10">
            <Image
              alt="Accelerate Workflow"
              className="aspect-video w-full overflow-hidden rounded-xl object-cover"
              height={365}
              src="/placeholder.svg"
              width={650}
            />
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto grid gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-8 xl:space-y-10 order-2 lg:order-1">
            <Image
              alt="Scale Effortlessly"
              className="aspect-video w-full overflow-hidden rounded-xl object-cover"
              height={365}
              src="/placeholder.svg"
              width={650}
            />
          </div>
          <div className="space-y-8 xl:space-y-10 order-1 lg:order-2">
            <div className="space-y-4 lg:space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl xl:text-4xl">
                  Scale Effortlessly
                </h2>
                <p className="max-w-[900px] text-primary md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Seamlessly scale your applications to meet growing demands without the headache of provisioning resources.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-black shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
                  href="#"
                >
                  Get Started
                </Link>
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
                  Enhance Security
                </h2>
                <p className="max-w-[900px] text-primary md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Keep your data and applications secure with our comprehensive security features and best practices.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-black shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
                  href="#"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-8 xl:space-y-10">
            <Image
              alt="Enhance Security"
              className="aspect-video w-full overflow-hidden rounded-xl object-cover"
              height={365}
              src="/placeholder.svg"
              width={650}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
