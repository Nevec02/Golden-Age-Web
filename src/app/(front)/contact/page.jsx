"use client";
import React, { useState } from 'react';

export default function ContactPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add your form submission logic here
    // For example, using axios to send the data to an API endpoint
    try {
      const response = await axios.post('/api/contact', { firstName, lastName, email, message });
      setSuccess('Your message has been sent successfully!');
      setError(null);
    } catch (err) {
      setError('An error occurred while sending your message.');
      setSuccess(null);
    }
  };

  return (
    <div className="bg-black text-primary min-h-screen flex flex-col items-center justify-center py-12">
      <h2 className="text-4xl font-bold mb-2">Contact us</h2>
      <p className="text-gray-500 mb-8">Subheading for description or instructions</p>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-black text-primary"
            required
          />
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-black text-primary"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-black text-primary"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-black text-primary"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-md bg-primary text-black font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
