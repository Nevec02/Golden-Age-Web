"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";

const imageList = [
  'service1.jpg',
  'service2.jpg',
  'service3.jpg',
  'service4.jpg',
  'service5.jpg',
  'service6.jpg',
  'service7.jpg',
  'service8.jpg',
  'service9.jpg',
  'service10.jpg'
];

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        const servicesWithRandomImages = response.data
          .filter(service => service.active)
          .map(service => ({
            ...service,
            image: `/img/services/${imageList[Math.floor(Math.random() * imageList.length)]}`,
          }));
        setServices(servicesWithRandomImages);
      } catch (err) {
        setError(err.response?.data?.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const addToCart = (service) => {
    setCart((prevCart) => {
      if (prevCart.find(item => item.id === service.id)) {
        return prevCart; // Service already in cart
      }
      return [...prevCart, service];
    });
  };

  const removeFromCart = (serviceId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== serviceId));
  };

  const handlePurchase = async () => {
    try {
      const orderDetails = cart.map(item => ({
        service_id: item.id,
        quantity: 1, 
        price: item.price
      }));
  
      const total_price = cart.reduce((total, item) => total + parseFloat(item.price), 0);
  
      const response = await axios.post('/api/orders', { total_price, details: orderDetails });
      alert('Order successful');
      setCart([]);
    } catch (error) {
      console.error('Purchase error:', error);
      alert('There was an error processing your order. Please try again.');
    }
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
          <Card
            className="bg-secondary text-primary border-black border hover:border-primary"
            shadow="sm"
            key={index}
            isPressable
            onPress={() => addToCart(service)}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={service.name}
                className="w-full object-cover h-[200px]"
                src={service.image}
              />
            </CardBody>
            <CardFooter className="text-small justify-between flex flex-col">
              <b>{service.name}</b>
              <p>{service.description}</p>
              <p className="text-green-400">${service.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Cesta de servicios</h2>
        {cart.length === 0 ? (
          <p>Carrito vacio</p>
        ) : (
          <div className="border border-solid border-primary w-1/4 p-8">
            <ul className="border-b border-primary">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span>
                    <Button className="mr-2" auto flat color="danger" onPress={() => removeFromCart(item.id)}>
                      Eliminar
                    </Button>
                    {item.name} - ${item.price}
                  </span>
                </li>
              ))}
            </ul>
            <Button className="mt-4" color="success" onPress={handlePurchase}>Purchase</Button>
          </div>
        )}
      </div>
    </div>
  );
}
