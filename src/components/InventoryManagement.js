import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    quantity: 0,
    brand: '',
    supplier: '',
    oldStock: 0,
    category: ''
  });

  // API base URL
  const API_URL = 'https://inventory-management-api-vfn1.onrender.com/api/v1';

  // Fetch products from the backend
  const fetchProducts = () => {
    axios.get(`${API_URL}/getProduct`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  };

  // Add a new product to the backend
  const addProduct = () => {
    axios.post(`${API_URL}/createProduct`, newProduct)
      .then(() => {
        fetchProducts();
        setNewProduct({ name: '', price: 0, quantity: 0, brand: '', supplier: '', oldStock: 0, category: '' });
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="inventory-management p-4 bg-gray-900 text-white">
      <h2 className="text-center text-sky-600 text-2xl mb-4">Inventory Management</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="block w-full p-2 mb-2 border border-sky-600 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-sky-600"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          className="block w-full p-2 mb-2 border border-sky-600 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-sky-600"
        />
        <input
          type="number"
          placeholder="Product Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
          className="block w-full p-2 mb-2 border border-sky-600 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-sky-600"
        />
        <input
          type="text"
          placeholder="Brand"
          value={newProduct.brand}
          onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
          className="block w-full p-2 mb-2 border border-sky-600 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-sky-600"
        />
        <input
          type="text"
          placeholder="Supplier"
          value={newProduct.supplier}
          onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
          className="block w-full p-2 mb-2 border border-sky-600 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-sky-600"
        />
        <input
          type="number"
          placeholder="Old Stock"
          value={newProduct.oldStock}
          onChange={(e) => setNewProduct({ ...newProduct, oldStock: parseInt(e.target.value) })}
          className="block w-full p-2 mb-2 border border-sky-600 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-sky-600"
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="block w-full p-2 mb-4 border border-sky-600 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-sky-600"
        />
        <button 
          onClick={addProduct} 
          className="w-full p-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition duration-200"
        >
          Save
        </button>
      </div>

      <h3 className="text-lg mb-2">Product List</h3>
      
      {/* Table to display products */}
      <table className="w-full table-auto border-collapse border border-sky-600 text-center">
        <thead>
          <tr className="bg-sky-600">
            <th className="border border-sky-600 p-2">Product Name</th>
            <th className="border border-sky-600 p-2">Price ($)</th>
            <th className="border border-sky-600 p-2">Quantity</th>
            <th className="border border-sky-600 p-2">Brand</th>
            <th className="border border-sky-600 p-2">Supplier</th>
            <th className="border border-sky-600 p-2">Old Stock</th>
            <th className="border border-sky-600 p-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="bg-gray-800">
              <td className="border border-sky-600 p-2">{product.name}</td>
              <td className="border border-sky-600 p-2">${product.price.toFixed(2)}</td>
              <td className="border border-sky-600 p-2">{product.quantity}</td>
              <td className="border border-sky-600 p-2">{product.brand}</td>
              <td className="border border-sky-600 p-2">{product.supplier}</td>
              <td className="border border-sky-600 p-2">{product.oldStock}</td>
              <td className="border border-sky-600 p-2">{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagement;
