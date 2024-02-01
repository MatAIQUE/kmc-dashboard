"use client";
import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  return (
    <div>
      <Doughnut
        data={{
          datasets: [
            {
              label: "# of Votes",
              data: [30, 20, 7],
              backgroundColor: [
                "rgba(243, 115, 79)",
                "rgba(0, 168, 255)",
                "rgba(255, 227, 233)",
              ],

              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};

export default DoughnutChart;
