import Image from "next/image";
import logo from "../../public/icons/GALogo.png";
export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <hr className="border-primary my-4" />
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Image src={logo} alt="Golden Age Logo" width={150} height={150} />
        </div>
        <p className="text-primary text-sm">
          © 2024 Golden Age. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
