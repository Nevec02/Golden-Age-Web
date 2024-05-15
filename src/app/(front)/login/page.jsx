"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      console.log("Response from server:", response.data);
      if (response.data.message) {
        router.push("/dashboard");
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        console.error("Unexpected login error:", err);
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <h1>LOGIN</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <Link href="/register">Register</Link>
    </div>
  );
}