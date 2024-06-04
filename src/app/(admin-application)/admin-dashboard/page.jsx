"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

export default function DashMainAdmin() {
  const [stats, setStats] = useState({ users: 0, services: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, servicesResponse, ordersResponse] = await Promise.all([
          axios.get('/api/Admin/users'),
          axios.get('/api/Admin/services'),
          axios.get('/api/Admin/orders')
        ]);

        console.log('Users response:', usersResponse.data);
        console.log('Services response:', servicesResponse.data);
        console.log('Orders response:', ordersResponse.data);

        const totalRevenue = ordersResponse.data.allOrders.reduce((acc, order) => acc + parseFloat(order.total_price), 0);

        setStats({
          users: usersResponse.data.users.length,
          services: servicesResponse.data.length,
          revenue: totalRevenue
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg font-semibold">Error: {error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-black text-primary">
          <CardHeader>
            <h3 className="text-lg font-bold">Total Users</h3>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-semibold">{stats.users}</p>
          </CardBody>
        </Card>
        <Card className="bg-black text-primary">
          <CardHeader>
            <h3 className="text-lg font-bold">Total Services</h3>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-semibold">{stats.services}</p>
          </CardBody>
        </Card>
        <Card className="bg-black text-primary">
          <CardHeader>
            <h3 className="text-lg font-bold">Total Revenue</h3>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-semibold">${stats.revenue.toFixed(2)}</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
