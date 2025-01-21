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
  console.log(data);

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

  return <Bar data={chartData} />;
};

export default BarChart;
