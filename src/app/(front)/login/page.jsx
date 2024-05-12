"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      // Handle successful login response
      console.log("Response from server:", response.data);
      if (response.data.message) {
        window.location.href = "/dashboard";
      } else {
        setError(response.data.error); // Set error message from the server
      }
    } catch (err) {
      // Handle login error
      if (err.response) {
        // Server returned an error response
        setError(err.response.data.error); // Set error message from the server
      } else {
        // An unexpected error occurred
        console.error("Unexpected login error:", err);
        setError("An unexpected error occurred"); // Set a generic error message
      }
    }
  };
  

  return (
    <div>
      <h1>LOGIN</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
