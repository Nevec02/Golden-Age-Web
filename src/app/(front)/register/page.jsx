"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {Chip} from "@nextui-org/react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      router.push("/login"); // Redirect to the login page after successful registration
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="bg-black text-primary min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md text-center">
        <h2 className="text-2xl font-bold">Create an account</h2>
        <p className="text-gray-500 mb-8">
          Enter your email to sign up for this app
        </p>
        {error && <Chip color="danger" className="mb-4">{error}</Chip>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-black text-primary"
            required
          />
        </div>
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
            placeholder="Password"
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
          Sign up with email
        </button>
      </form>
      <Link
        href={"/login"}
        className="inline-flex h-10 items-center justify-center rounded-md border border-primary px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
      >
        Login
      </Link>
    </div>
  );
}
