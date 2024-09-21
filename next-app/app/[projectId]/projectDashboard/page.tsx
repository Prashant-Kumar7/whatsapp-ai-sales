import React from "react";
import { Card } from "@/components/ui/card";
import { LineChart, BarChart } from "@/components/ui/chart";

export default function Dashboard() {
  return (
    <div className="w-full h-full p-6 bg-background">
      <h1 className="text-3xl font-bold text-primary-700 mb-6 ">Dashboard</h1>
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
          <LineChart
            data={
              [
                /* your data array */
              ]
            }
            labels={
              [
                /* your labels array */
              ]
            }
          />
        </Card>
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4 text-black">Top Products</h2>
          <BarChart
            data={[300, 450, 200, 600]}
            labels={["Product A", "Product B", "Product C", "Product D"]}
          />
        </Card>
      </div>
    </div>
  );
}
