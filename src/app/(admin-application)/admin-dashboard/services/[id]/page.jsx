"use client";

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EditService() {
  const { id } = useParams();
  const router = useRouter();
  const [service, setService] = useState({
    name: '',
    description: '',
    price: 0,
    active: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`/api/Admin/services/${id}`);
        if (response.data && response.data.data) {
          setService(response.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setService((prevService) => ({
      ...prevService,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/Admin/services/${id}`, service);
      setSuccess('Service updated successfully');
      setError(null);
      setTimeout(() => {
        router.push('/admin-dashboard/services');
      }, 2000);
    } catch (err) {
      console.error('Failed to update service:', err);
      setError('Failed to update service');
      setSuccess(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error && !service) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className=" text-primary min-h-screen flex flex-col items-center justify-center py-12">
      <h2 className="text-4xl font-bold mb-2">Editar Servicio</h2>
      <p className="text-gray-500 mb-8">Modifique los datos del servicio.</p>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={service.name}
            placeholder="Name"
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-black text-primary"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="description"
            value={service.description}
            placeholder="Description"
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-black text-primary"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="price"
            value={service.price}
            placeholder="Price"
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-black text-primary"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="active"
            checked={service.active}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Activo</label>
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-md bg-primary text-black font-bold"
        >
          Actualizar servicio
        </button>
      </form>
    </div>
  );
}
