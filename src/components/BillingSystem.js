import React, { useState, useEffect } from 'react';
import axios from 'axios';


const BillingSystem = () => {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [previousBillings, setPreviousBillings] = useState([]);
    const [editingBilling, setEditingBilling] = useState(null);

    // Fetch customers
    const fetchCustomers = () => {
        axios.get('https://inventory-management-api-vfn1.onrender.com/api/v1/getCustomer')
            .then((response) => setCustomers(response.data))
            .catch((error) => console.error(error));
    };

    // Fetch products
    const fetchProducts = () => {
        axios.get('https://inventory-management-api-vfn1.onrender.com/api/v1/getProduct')
            .then((response) => setProducts(response.data))
            .catch((error) => console.error(error));
    };

    // Fetch previous billings
    const fetchPreviousBillings = () => {
        axios.get('https://inventory-management-api-vfn1.onrender.com/api/v1/getBilling')
            .then((response) => setPreviousBillings(response.data))
            .catch((error) => console.error(error));
    };

    // Add products to the billing
    const addProductToBilling = (product, quantity) => {
        if (quantity > 0) {
            const updatedProducts = [...selectedProducts, { product, quantity }];
            setSelectedProducts(updatedProducts);

            const total = updatedProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
            setTotalAmount(total);
        }
    };

    // Save or update billing
    const saveBilling = () => {
        const request = editingBilling
            ? axios.put(`https://inventory-management-api-vfn1.onrender.com/api/v1/Billing/${editingBilling._id}`, {
                customer: selectedCustomer,
                products: selectedProducts,
                totalAmount
            })
            : axios.post('https://inventory-management-api-vfn1.onrender.com/api/v1/createBilling', {
                customer: selectedCustomer,
                products: selectedProducts,
                totalAmount
            });

        request.then(() => {
            resetForm();
            fetchPreviousBillings();
        }).catch((error) => console.error(error));
    };

    // Reset form
    const resetForm = () => {
        setSelectedCustomer('');
        setSelectedProducts([]);
        setTotalAmount(0);
        setEditingBilling(null);
    };

    // Edit billing
    const editBilling = (billing) => {
        setSelectedCustomer(billing.customer._id);
        setSelectedProducts(billing.products);
        setTotalAmount(billing.totalAmount);
        setEditingBilling(billing);
    };

    // Delete billing
    const deleteBilling = (billingId) => {
        axios.delete(`https://inventory-management-api-vfn1.onrender.com/api/v1/Billing/${billingId}`)
            .then(() => fetchPreviousBillings())
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchCustomers();
        fetchProducts();
        fetchPreviousBillings();
    }, []);
    return (
        <div className="billing-system p-4 bg-gray-900 text-white">
            <h2 className="text-center text-sky-600 text-2xl mb-4">Billing System</h2>

            <div className="mb-4">
                <label className="block mb-2">Select Customer</label>
                <select
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                    className="block w-full p-2 border border-sky-600 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-sky-600"
                >
                    <option value="">Select Customer</option>
                    {customers.map((customer) => (
                        <option key={customer._id} value={customer._id}>{customer.name}</option>
                    ))}
                </select>
            </div>

            <h3 className="text-lg mb-2">Select Products</h3>
            {products.map((product) => (
                <div key={product._id} className="flex items-center mb-2">
                    <span className="flex-1">{product.name}</span>
                    <input
                        type="number"
                        placeholder="Quantity"
                        onChange={(e) => addProductToBilling(product, parseInt(e.target.value))}
                        className="w-24 p-1 border border-sky-600 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-sky-600"
                    />
                </div>
            ))}

            <h3 className="text-lg mb-2">Selected Products</h3>
            <ul className="mb-4 list-disc list-inside">
                {selectedProducts.map((item, index) => (
                    <li key={index} className="mb-1">
                        {item.product.name} - {item.quantity} units - ₹{(item.product.price * item.quantity).toFixed(2)}
                    </li>
                ))}
            </ul>

            <h3 className="text-lg mb-2">Total Amount: ₹{totalAmount.toFixed(2)}</h3>

            <button
                onClick={saveBilling}
                className="w-full p-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition duration-200"
            >
                {editingBilling ? "Update Billing" : "Complete Billing"}
            </button>

            <h3 className="text-lg mb-2 mt-6">Previous Billings</h3>
            <table className="min-w-full bg-gray-800 border border-gray-700 mb-4">
                <thead>
                    <tr className="bg-gray-700">
                        <th className="py-2 px-4 border-b">Customer</th>
                        <th className="py-2 px-4 border-b">Products</th>
                        <th className="py-2 px-4 border-b">Total Amount</th>
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {previousBillings.map((billing) => (
                        <tr key={billing._id} className="border-b">
                            <td className="py-2 px-4">{billing.customer.name}</td>
                            <td className="py-2 px-4">
                                {billing.products.map((item) => (
                                    <div key={item.product._id}>
                                        {item.product.name} ({item.quantity} units)
                                    </div>
                                ))}
                            </td>
                            <td className="py-2 px-4">₹{billing.totalAmount.toFixed(2)}</td>
                            <td className="py-2 px-4">{new Date(billing.createdAt).toLocaleDateString()}</td>
                            <td className="py-2 px-4 flex space-x-2">
                                <button
                                    onClick={() => editBilling(billing)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteBilling(billing._id)}
                                    className="bg-red-600 hover:bg-red-700 text-white p-1 rounded"
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

export default BillingSystem;
