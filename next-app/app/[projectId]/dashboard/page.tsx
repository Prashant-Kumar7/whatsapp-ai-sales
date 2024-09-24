import React from "react";
import { Card } from "@/components/ui/card";
import { LineChart, BarChart } from "@/components/ui/chart";
import Link from "next/link";

export default function Dashboard() {
  // Sample data for the charts
  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const barChartData = {
    labels: ["Product A", "Product B", "Product C", "Product D"],
    datasets: [
      {
        label: "Top Products",
        data: [300, 450, 200, 600],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-full p-6 bg-background">
      <div className="flex justify-between items-center mx-auto">
        <h1 className="text-3xl font-bold text-primary-700 mb-6">Dashboard</h1>
        <Link href="/projects">
          <button className="flex items-center bg-primary-500 p-2 text-white rounded-xl mb-5 hover:bg-primary-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Projects
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-2 text-black">Total Sales</h2>
          <p className="text-3xl font-bold text-primary-600">$124,567</p>
        </Card>
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2 text-black">
            New Customers
          </h2>
          <p className="text-3xl font-bold text-secondary-600">+256</p>
        </Card>
        <Card className="p-4">
          <h2 className="text-sm font-medium text-gray-500">Conversion Rate</h2>
          <p className="text-3xl font-bold text-green-600">3.2%</p>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-black">Sales Trend</h2>
          <LineChart data={lineChartData} />
        </Card>
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4 text-black">Top Products</h2>
          <BarChart data={barChartData} />
        </Card>
      </div>
    </div>
  );
}
