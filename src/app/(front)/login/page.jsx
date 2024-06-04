"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {Chip} from "@nextui-org/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      if (response.data.message) {
        const role = response.data.role;
        if (role === 1) {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="bg-black text-primary min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md text-center">
        <h2 className="text-2xl font-bold">Login</h2>
        <p className="text-gray-500 mb-8">
          Enter your email to login to your account
        </p>
        {error && <Chip color="danger" className="mb-4">{error}</Chip>}
        <div className="mb-4">
          <input
            type="email"
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-black text-primary"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-black text-primary"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mb-4 rounded-md bg-primary text-black font-bold"
        >
          Login
        </button>
      </form>
      <Link
        href={"/register"}
        className="inline-flex h-10 items-center justify-center rounded-md border border-primary px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
      >
        Register
      </Link>
    </div>
  );
}
