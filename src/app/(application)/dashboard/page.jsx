"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function DashMain() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          setError("Invalid response from the server");
        }
      } catch (err) {
        setError(err.response?.data?.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-secondary text-primary p-4 md:p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-primary">
          <thead>
            <tr className="bg-secondary text-gray-400">
              <th className="px-4 py-3 text-left font-medium">Order #</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
              <th className="px-4 py-3 text-center font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-primary">
                <td className="px-4 py-3 text-left">
                  <Link className="font-medium hover:underline" href="#">
                    #{order.id}
                  </Link>
                </td>
                <td className="px-4 py-3 text-left">{order.status}</td>
                <td className="px-4 py-3 text-right">${order.total_price}</td>
                <td className="px-4 py-3 text-center">
                  <div className="space-y-2">
                    {order.details.map((detail) => (
                      <div key={detail.id}>
                        <p>{detail.service_name}</p>
                        <p>Price: ${detail.service_price}</p>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
