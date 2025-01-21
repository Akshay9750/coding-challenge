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

  return <Pie data={chartData} />;
};

export default PieChart;
