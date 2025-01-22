import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ data }) => {
  if (!data) return null;

  const chartData = {
    labels: data.itemCounts.map((item) => item.range),
    datasets: [
      {
        label: "Item Count",
        data: data.itemCounts.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6 w-full sm:w-full md:w-[48%] lg:w-[48%] h-[400px]">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Item Count Bar Chart
      </h2>
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default BarChart;
