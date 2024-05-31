"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await axios.get('/api/Admin/services');
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
      <h1 className="text-2xl font-bold mb-6">Services</h1>
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
  );
}
