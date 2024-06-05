"use client";

import React, { Suspense } from "react";
import TotalUsersCard from "@/components/back/cards/TotalUsersCard";
import TotalServicesCard from "@/components/back/cards/TotalServicesCard";
import TotalRevenueCard from "@/components/back/cards/TotalRevenueCard";

export default function DashMainAdmin() {
  return (
    <div className="admin-dashboard">
      <h1 className="text-2xl font-bold mb-6 text-center">Bienvenido a Golden Age Web App</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Suspense fallback={<div>Loading Users...</div>}>
          <TotalUsersCard />
        </Suspense>
        <Suspense fallback={<div>Loading Services...</div>}>
          <TotalServicesCard />
        </Suspense>
        <Suspense fallback={<div>Loading Revenue...</div>}>
          <TotalRevenueCard />
        </Suspense>
      </div>
    </div>
  );
}
