// CustomerList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Customerlist.css'; // Import your CSS file

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Function to fetch customer data
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/customers/show/customer');
        setCustomers(response.data); // Set the fetched customers into state
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once

  const handleDeleteCustomer = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/customers/delete/customer/${id}`);
      if (response.status === 200) {
        setCustomers(customers.filter(customer => customer.id !== id));
        alert('Customer deleted successfully!');
      } else {
        alert('Failed to delete customer.');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Error deleting customer.');
    }
  };

  return (
    <div className="customer-list-container">
      <h2>Customer List</h2>
      <ul className="customer-list">
        {customers.map((customer) => (
          <li key={customer.id} className="customer-item">
            <div className="customer-details">
              <strong>Name:</strong> {customer.name}<br />
              <strong>Email:</strong> {customer.email}
            </div>
            <div className="customer-buttons">
              <Link to={`/edit/${customer.id}`} className="customer-edit-link">
                Edit
              </Link>
              <button
                className="customer-delete-button"
                onClick={() => handleDeleteCustomer(customer.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
