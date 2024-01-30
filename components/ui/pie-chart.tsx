"use client";
import React from "react";
import {
  Chart as ChartJS,
  PieController,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  PieController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ArcElement
);

const PieChart = () => {
  return (
    <div>
      <Pie
        data={{
          labels: ["Orange", "Blue", "Gray"],
          datasets: [
            {
              data: [40, 10, 7],
              backgroundColor: ["orange", "blue", "Gray"],
            },
          ],
        }}
      />
    </div>
  );
};

export default PieChart;
