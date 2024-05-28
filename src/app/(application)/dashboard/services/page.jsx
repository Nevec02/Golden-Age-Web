"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        setServices(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const addToCart = (service) => {
    setCart((prevCart) => [...prevCart, service]);
  };

  const handlePurchase = () => {
    alert(`Purchasing ${cart.length} services`);
    // Aquí puedes agregar la lógica para manejar la compra
    setCart([]); // Vaciar la cesta después de la compra
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {services.map((service, index) => (
          <Card className="bg-secondary text-primary border-black border hover:border-primary" shadow="sm" key={index} isPressable onPress={() => addToCart(service)}>
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={service.name}
                className="w-full object-cover h-[140px]"
                src="/img/cat.jpg"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{service.name}</b>
              <p className=" text-green-400">${service.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p>No services in cart</p>
        ) : (
          <div>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price}
                </li>
              ))}
            </ul>
            <Button onPress={handlePurchase}>Purchase</Button>
          </div>
        )}
      </div>
    </div>
  );
}
