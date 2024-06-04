import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

export default function TotalRevenueCard() {
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/Admin/orders');
        const totalRevenue = response.data.allOrders.reduce((acc, order) => acc + parseFloat(order.total_price), 0);
        setRevenue(totalRevenue);
      } catch (err) {
        console.error('Error fetching revenue:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="bg-black text-primary">
      <CardHeader>
        <h3 className="text-lg font-bold">Total Revenue</h3>
      </CardHeader>
      <CardBody>
        <p className="text-3xl font-semibold">${revenue.toFixed(2)}</p>
      </CardBody>
    </Card>
  );
}
