import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  if (!data) return null;

  const chartData = {
    labels: data.categoryStats.map((item) => item.category),
    datasets: [
      {
        label: "Category Count",
        data: data.categoryStats.map((item) => item.itemCount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mb-6 w-full sm:w-[48%] lg:w-[48%] h-[400px] flex flex-col items-center">
      {/* Center the heading */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
        Category Distribution Pie Chart
      </h2>
      {/* Center the chart */}
      <div className="w-full h-[300px]">
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;
