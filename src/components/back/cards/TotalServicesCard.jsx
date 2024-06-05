import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

export default function TotalServicesCard() {
  const [services, setServices] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/Admin/services');
        setServices(response.data.length);
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="bg-black text-primary">
      <CardHeader className="justify-center text-center">
        <h3 className="text-lg font-bold">Total Services</h3>
      </CardHeader>
      <CardBody className="justify-center text-center">
        <p className="text-3xl font-semibold">{services}</p>
      </CardBody>
    </Card>
  );
}
