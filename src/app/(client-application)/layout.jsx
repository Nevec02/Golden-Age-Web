import "@/app/globals.css";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import Header from "@/components/back/Header";

export const metadata = {
  title: "Dashboard Page",
  description: "Created by Nevec",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-black text-primary min-h-screen">
        <div className="grid min-h-screen lg:grid-cols-[250px_1fr]">
          <aside className="bg-black border-r border-primary text-yellow-500 flex flex-col">
            <div className="flex items-center justify-center h-16">
              <Image src="/icons/GALogo.png" alt="Golden Age Logo" priority width={150} height={150} />
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 rounded-md hover:bg-primary hover:text-black">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/services" className="block px-4 py-2 rounded-md hover:bg-primary hover:text-black">
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/orders" className="block px-4 py-2 rounded-md hover:bg-primary hover:text-black">
                    Compras
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="p-4 border-t border-primary">
              <LogoutButton />
            </div>
          </aside>
          <main className="flex flex-col flex-1">
            <Header />
            <div className="flex-1 p-6 bg-secondary text-primary">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
