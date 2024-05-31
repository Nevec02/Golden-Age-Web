"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@nextui-org/react";

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
      <h1 className="text-2xl font-bold mb-6">Mis Pedidos</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-primary">
          <thead>
            <tr className="bg-secondary text-gray-400">
              <th className="px-4 py-3 text-center font-medium">Fecha pedido</th>
              <th className="px-4 py-3 text-center font-medium">Total</th>
              <th className="px-4 py-3 text-center font-medium">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr className="border-b border-primary">
                  <td className="px-4 py-3 text-center">
                      <p>{order.created_at.slice(0, 10)}</p>
                  </td>
                  <td className="px-4 py-3 text-center">${order.total_price}</td>
                  <td className="px-4 py-3 text-center">
                    <Button color="primary"
                      onClick={() => {
                        const detailsRow = document.getElementById(`details-${order.id}`);
                        if (detailsRow) {
                          detailsRow.classList.toggle("hidden");
                        }
                      }}
                    >
                      Ver Detalles
                    </Button>
                  </td>
                </tr>
                <tr id={`details-${order.id}`} className="hidden border-b border-primary">
                <td colSpan="3" className="px-4 py-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.details.map((detail) => (
                      <div key={detail.id} className="bg-secondary p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold underline">{detail.service_name}</h2>
                        <p className="mt-2">Precio: ${detail.service_price}</p>
                     </div>
                    ))}
                  </div>
                </td>
              </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
