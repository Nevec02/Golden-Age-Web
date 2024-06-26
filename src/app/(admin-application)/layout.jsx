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
        <div className="grid min-h-screen lg:grid-cols-[250px_1fr] grid-rows-[auto_1fr] lg:grid-rows-1">
          <aside className="bg-black border-r border-primary text-yellow-500 flex flex-col lg:row-span-2 lg:h-screen">
            <div className="flex items-center justify-center h-16 lg:h-auto">
              <Image src="/icons/GALogo.png" alt="Golden Age Logo" priority width={150} height={150} />
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                <li>
                  <Link href="/admin-dashboard" className="block px-4 py-2 rounded-md hover:bg-primary hover:text-black">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/admin-dashboard/services" className="block px-4 py-2 rounded-md hover:bg-primary hover:text-black">
                    Gestión de Servicios
                  </Link>
                </li>
                <li>
                  <Link href="/admin-dashboard/users" className="block px-4 py-2 rounded-md hover:bg-primary hover:text-black">
                    Gestión de usuarios
                  </Link>
                </li>
                <li>
                  <Link href="/admin-dashboard/orders" className="block px-4 py-2 rounded-md hover:bg-primary hover:text-black">
                    Pedidos
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="p-4 border-t border-primary">
              <LogoutButton />
            </div>
          </aside>
          <main className="flex flex-col flex-1 lg:row-start-1 lg:col-start-2">
            <Header />
            <div className="flex-1 p-6 bg-secondary text-primary">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
