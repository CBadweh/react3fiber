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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// PositionChart component receives `data` prop with arrays of times and positions
const PositionChart = ({ data }) => {
  // Convert times and positions arrays into array of {x, y} objects for Chart.js
  const chartData = {
    datasets: [
      {
        label: "X Position",                // Label for legend and tooltip
        data: data.times.map((t, i) => ({  // Map times to x and positions to y
          x: t,
          y: data.positions[i],
        })),
        borderColor: "blue",                // Line color
        fill: false,                       // No fill under line
        tension: 0.3,                      // Smooth curve tension (0 = straight)
        showLine: true,                    // Show connecting line
        pointRadius: 2,                    // Radius of points
        pointHoverRadius: 6,               // Hover radius of points
      },
    ],
  };

  // Chart configuration options
  const options = {
    responsive: true,                    // Make chart responsive
    animation: false,                    // Disable animation for live updates
    interaction: {
      mode: "nearest",                  // Tooltip activates for nearest point
      intersect: false,                 // Tooltip shows even if not directly over point
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: false,
        callbacks: {
          // Customize tooltip text to show time and position with 2 decimal places
          label: (context) => {
            const x = context.parsed.x;
            const y = context.parsed.y;
            return `Time: ${x.toFixed(2)} s, Position: ${y.toFixed(2)}`;
          },
        },
      },
      legend: {
        display: true,                 // Show legend at top
        position: "top",
      },
      title: {
        display: true,                 // Show chart title
        text: "Position vs Time",
      },
    },
    scales: {
      x: {
        type: "linear",                // Use linear scale for numeric x-axis (time)
        title: { display: true, text: "Time (s)" }, // Label for x-axis
        min: 0,                       // Fix minimum x-axis value to 0 seconds
        max: 30,                     // Fix maximum x-axis value to 30 seconds
        ticks: { maxTicksLimit: 15 }, // Limit max number of tick labels to 15
      },
      y: {
        title: { display: true, text: "Position (x)" }, // Label for y-axis
      },
    },
    hover: {
      mode: "nearest",                // Highlight nearest point on hover
      intersect: false,               // Same hover behavior as interaction
    },
  };

  // Render the Line chart with configured data and options
  return <Line data={chartData} options={options} />;
};

export default PositionChart;
