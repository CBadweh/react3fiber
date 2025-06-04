import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PositionChart = ({ data }) => {
  const chartData = {
    labels: data.times,
    datasets: [
      {
        label: "X Position",
        data: data.positions,
        borderColor: "blue",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: false, // Disable animation for live updates
    scales: {
      x: { title: { display: true, text: "Time (s)" } },
      y: { title: { display: true, text: "Position (x)" } },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default PositionChart;
