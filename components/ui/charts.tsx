"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const Charts = () => {
  return (
    <div>
      <Line
        data={{
          labels: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          datasets: [
            {
              label: "Orange Curve",
              data: [4, 6, 9, 5, 3, 5, 1, 4],
              fill: true, // Enable fill
              backgroundColor: "rgba(255, 165, 0, 0.2)", // Fill color for the area below the curve
              borderColor: "orange",
              pointBackgroundColor: "orange",
              cubicInterpolationMode: "monotone",
            },
          ],
        }}
      />
    </div>
  );
};

export default Charts;
