"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DashMainAdmin() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get('/api/Admin/orders');
        const usersResponse = await axios.get('/api/Admin/users');
        const servicesResponse = await axios.get('/api/services');

        setOrders(Array.isArray(ordersResponse.data.allOrders) ? ordersResponse.data.allOrders : []);
        setUsers(Array.isArray(usersResponse.data.users) ? usersResponse.data.users : []);
        setServices(Array.isArray(servicesResponse.data) ? servicesResponse.data : []);
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
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Orders Table */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Orders</h2>
        <table className="w-full table-auto border border-primary">
          <thead>
            <tr className="bg-secondary text-gray-400">
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">User ID</th>
              <th className="px-4 py-3 text-left">Total Price</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b border-primary">
                <td className="px-4 py-3">{order.id}</td>
                <td className="px-4 py-3">{order.user_id}</td>
                <td className="px-4 py-3">{order.total_price}</td>
                <td className="px-4 py-3">{order.status}</td>
                <td className="px-4 py-3">{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Users Table */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Users</h2>
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

      {/* Services Table */}
      <div>
        <h2 className="text-xl font-bold mb-4">Services</h2>
        <table className="w-full table-auto border border-primary">
          <thead>
            <tr className="bg-secondary text-gray-400">
              <th className="px-4 py-3 text-left">Service ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id} className="border-b border-primary">
                <td className="px-4 py-3">{service.id}</td>
                <td className="px-4 py-3">{service.name}</td>
                <td className="px-4 py-3">{service.description}</td>
                <td className="px-4 py-3">{service.price}</td>
                <td className="px-4 py-3">{service.active ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
