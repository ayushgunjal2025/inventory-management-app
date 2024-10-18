import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    gender: '',
    contact: '',
    email: ''
  });

  // CustomerManagement.js
const fetchCustomers = () => {
  axios.get('https://inventory-management-api-vfn1.onrender.com/api/v1/getCustomer')  // Updated the API URL
    .then((response) => setCustomers(response.data))
    .catch((error) => console.error(error));
};

const addCustomer = () => {
  axios.post('https://inventory-management-api-vfn1.onrender.com/api/v1/createCustomer', newCustomer)  // Updated the API URL
    .then(() => {
      fetchCustomers();
      setNewCustomer({ name: '', gender: '', contact: '', email: '' });
    })
    .catch((error) => console.error(error));
};


  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="customer-management p-4 bg-gray-900 text-white">
      <h2 className="text-center text-sky-600 text-2xl mb-4">Customer Management</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          className="block w-full p-2 mb-2 border border-sky-600 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-sky-600"
        />
        <input
          type="text"
          placeholder="Gender"
          value={newCustomer.gender}
          onChange={(e) => setNewCustomer({ ...newCustomer, gender: e.target.value })}
          className="block w-full p-2 mb-2 border border-sky-600 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-sky-600"
        />
        <input
          type="text"
          placeholder="Contact"
          value={newCustomer.contact}
          onChange={(e) => setNewCustomer({ ...newCustomer, contact: e.target.value })}
          className="block w-full p-2 mb-2 border border-sky-600 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-sky-600"
        />
        <input
          type="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          className="block w-full p-2 mb-4 border border-sky-600 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-sky-600"
        />
        <button 
          onClick={addCustomer} 
          className="w-full p-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition duration-200"
        >
          Save
        </button>
      </div>

      <h3 className="text-lg mb-2">Customer List</h3>
      <table className="min-w-full bg-gray-800 border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="py-2 px-4 border-b border-gray-600 text-left">Name</th>
            <th className="py-2 px-4 border-b border-gray-600 text-left">Gender</th>
            <th className="py-2 px-4 border-b border-gray-600 text-left">Contact</th>
            <th className="py-2 px-4 border-b border-gray-600 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id} className="hover:bg-gray-700">
              <td className="py-2 px-4 border-b border-gray-600">{customer.name}</td>
              <td className="py-2 px-4 border-b border-gray-600">{customer.gender}</td>
              <td className="py-2 px-4 border-b border-gray-600">{customer.contact}</td>
              <td className="py-2 px-4 border-b border-gray-600">{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement;
