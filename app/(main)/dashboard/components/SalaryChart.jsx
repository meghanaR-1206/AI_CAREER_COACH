"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// ✅ REGISTER REQUIRED CHART COMPONENTS
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SalaryChart = ({ salaryRanges }) => {
  const data = {
    labels: salaryRanges.map((s) => s.role),
    datasets: [
      {
        label: "Min",
        data: salaryRanges.map((s) => s.min),
        backgroundColor: "#F3A26D", // Creamy Orange
      },
      {
        label: "Median",
        data: salaryRanges.map((s) => s.median),
        backgroundColor: "#00809D", // Blue
      },
      {
        label: "Max",
        data: salaryRanges.map((s) => s.max),
        backgroundColor: "#FF7601", // Bright Orange
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#00809D", // Legend text color
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#333" }, // X axis labels
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#333" }, // Y axis labels
      },
    },
  };

  return (
    <Card className="bg-white border border-[#FF7601]/30 shadow-sm">
      <CardHeader className="text-[#00809D] font-semibold text-lg">
        Salary Ranges by Role
      </CardHeader>
      <CardContent>
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default SalaryChart;
