"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('/api/Admin/users');
        setUsers(Array.isArray(usersResponse.data.users) ? usersResponse.data.users : []);
      } catch (err) {
        setError(err.response?.data?.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <table className="w-full table-auto border border-primary">
        <thead>
          <tr className="bg-secondary text-gray-400">
            <th className="px-4 py-3 text-left">User ID</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b border-primary">
              <td className="px-4 py-3">{user.id}</td>
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.rol === 1 ? 'Admin' : 'User'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
