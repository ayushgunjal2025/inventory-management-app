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
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products from the API
  const fetchProducts = () => {
    axios.get('https://inventory-management-api-vfn1.onrender.com/api/v1/getProduct')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  };

  // Add a new product
  const addProduct = () => {
    axios.post('https://inventory-management-api-vfn1.onrender.com/api/v1/createProduct', newProduct, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      fetchProducts();
      resetForm();
    })
    .catch((error) => console.error('Error adding product:', error));
  };

  // Update an existing product
  const updateProduct = () => {
    axios.put(`https://inventory-management-api-vfn1.onrender.com/api/v1/product/${editingProduct._id}`, newProduct, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      fetchProducts();
      resetForm();
    })
    .catch((error) => console.error('Error updating product:', error));
  };

  // Delete a product
  const deleteProduct = (id) => {
    axios.delete(`https://inventory-management-api-vfn1.onrender.com/api/v1/product/${id}`)
      .then(() => fetchProducts())
      .catch((error) => console.error('Error deleting product:', error));
  };

  // Handle editing a product
  const editProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  // Reset form to default
  const resetForm = () => {
    setEditingProduct(null);
    setNewProduct({ name: '', price: 0, quantity: 0, brand: '', supplier: '', oldStock: 0, category: '' });
  };

  // Fetch products when the component is mounted
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="inventory-management p-4 bg-gray-900 text-white">
      <h2 className="text-center text-sky-600 text-2xl mb-4">Inventory Management</h2>

      {/* Form to create or edit product */}
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
          onClick={editingProduct ? updateProduct : addProduct} 
          className="w-full p-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition duration-200"
        >
          {editingProduct ? 'Update' : 'Save'}
        </button>

        {editingProduct && (
          <button 
            onClick={resetForm} 
            className="mt-2 w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Product List */}
      <h3 className="text-lg mb-2">Product List</h3>
      <table className="min-w-full border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-700 p-2 text-left">Product Name</th>
            <th className="border border-gray-700 p-2 text-left">Price</th>
            <th className="border border-gray-700 p-2 text-left">Quantity</th>
            <th className="border border-gray-700 p-2 text-left">Brand</th>
            <th className="border border-gray-700 p-2 text-left">Supplier</th>
            <th className="border border-gray-700 p-2 text-left">Old Stock</th>
            <th className="border border-gray-700 p-2 text-left">Category</th>
            <th className="border border-gray-700 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="bg-gray-900">
              <td className="border border-gray-700 p-2">{product.name}</td>
              <td className="border border-gray-700 p-2">${product.price.toFixed(2)}</td>
              <td className="border border-gray-700 p-2">{product.quantity}</td>
              <td className="border border-gray-700 p-2">{product.brand}</td>
              <td className="border border-gray-700 p-2">{product.supplier}</td>
              <td className="border border-gray-700 p-2">{product.oldStock}</td>
              <td className="border border-gray-700 p-2">{product.category}</td>
              <td className="border border-gray-700 p-2">
                <button 
                  onClick={() => editProduct(product)} 
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteProduct(product._id)} 
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagement;
