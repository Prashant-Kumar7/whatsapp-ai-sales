"use client";
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  type: "line" | "bar";
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
      fill?: boolean;
    }[];
  };
}

export const Chart: React.FC<ChartProps> = ({ type, data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`,
      },
    },
  };

  return (
    <div className="bg-black-100 p-4 rounded-lg">
      {type === "line" ? (
        <Line data={data} options={options} />
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export const LineChart: React.FC<Omit<ChartProps, "type">> = (props) => (
  <Chart type="line" {...props} />
);

export const BarChart: React.FC<Omit<ChartProps, "type">> = (props) => (
  <Chart type="bar" {...props} />
);
