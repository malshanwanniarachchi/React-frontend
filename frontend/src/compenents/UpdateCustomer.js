import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateCustomer.css'; // Import the CSS file

export default function UpdateCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/customers/show/customer/${id}`);
        console.log('Fetched customer data:', response.data); // Debug log
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/customers/update/customer/${id}`, customer);
      if (response.status === 200) {
        alert('Customer updated successfully!');
        navigate('/list');
      } else {
        alert('Failed to update customer.');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Error updating customer.');
    }
  };

  return (
    <div className="update-customer-container">
      <h2>Update Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
