"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {

      await axios.post("/api/auth/logout");

      Cookies.remove("jwt", { path: "/" });


      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;