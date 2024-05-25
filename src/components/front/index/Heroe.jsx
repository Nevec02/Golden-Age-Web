import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Component() {
  return (
    <section className="w-full py-24 md:py-32 lg:py-40  text-primary">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to Golden Age
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-3xl mx-auto">
          Discover the power of Golden Age. Our mission is to make the world a better place. 
        </p>
        <div className="mt-10">
          <Link href="/contact">
            <Button color="primary" variant="bordered">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
