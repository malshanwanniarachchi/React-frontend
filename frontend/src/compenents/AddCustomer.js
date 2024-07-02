import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Addcustomer.css'; // Adjust the path as needed

export default function AddCustomer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customer = { name, email };

    try {
      const response = await fetch('http://localhost:5000/customers/add/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });

      if (response.ok) {
        alert('Customer added successfully!');
        setName('');
        setEmail('');
        
        // Navigate to the customer list page after successful addition
        navigate('/list');
      } else {
        alert('Failed to add customer.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding customer.');
    }
  };

  return (
    <div className="add-customer-container">
      <h1>Add Customer</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
}
