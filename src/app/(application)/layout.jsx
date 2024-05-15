import "@/app/globals.css";
import React from "react";
import LogoutButton from "@/components/LogoutButton";

export const metadata = {
  title: "Dashboard Page",
  description: "Created by Nevec",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <h2>Dashboard Layout</h2>
        <LogoutButton />
        {children}
      </body>
    </html>
  );
}