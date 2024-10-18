import React from "react";
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import CustomerManagement from "./components/CustomerManagement";
import InventoryManagement from "./components/InventoryManagement";
import BillingSystem from "./components/BillingSystem";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <div className="flex justify-center items-start mt-10">
        <div className="w-full max-w-5xl px-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<CustomerManagement />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/billing" element={<BillingSystem />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
