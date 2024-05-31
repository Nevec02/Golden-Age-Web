"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get('/api/Admin/orders');
        setOrders(Array.isArray(ordersResponse.data.allOrders) ? ordersResponse.data.allOrders : []);
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
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
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
  );
}
