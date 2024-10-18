import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Dashboard.js
useEffect(() => {
  axios.get('https://inventory-management-api-vfn1.onrender.com/api/v1/getBilling')  // Updated the API URL
    .then((response) => {
      const salesData = response.data;
      let salesCount = 0;
      let revenueCount = 0;

      salesData.forEach((bill) => {
        salesCount += bill.products.length;
        revenueCount += bill.totalAmount;
      });

      setTotalSales(salesCount);
      setTotalRevenue(revenueCount);
    })
    .catch((error) => console.error(error));
}, []);


  const chartData = {
    labels: ['Total Sales', 'Total Revenue'],
    datasets: [
      {
        label: 'Amount',
        data: [totalSales, totalRevenue],
        backgroundColor: ['#1D4ED8', '#0EA5E9'],
        borderColor: ['#1D4ED8', '#0EA5E9'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          fontColor: 'white',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white',
        },
      },
      x: {
        ticks: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="dashboard p-4">
      <h2 className="text-center text-sky-600 text-2xl">Dashboard</h2>
      <div className="stats mt-8 mb-4">
        <div className="text-center text-white">Total Sales: {totalSales}</div>
        <div className="text-center text-white">Total Revenue: ₹{totalRevenue}</div>
      </div>

      <div className="chart-container mt-4">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
