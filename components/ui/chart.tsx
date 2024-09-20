import React from "react";

interface ChartProps {
  type: "line" | "bar";
  data: number[];
  labels: string[];
}

export const Chart: React.FC<ChartProps> = ({ type, data, labels }) => {
  // This is a placeholder. In a real application, you'd use a charting library.
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <p>{type.charAt(0).toUpperCase() + type.slice(1)} Chart</p>
      <ul>
        {data.map((value, index) => (
          <li key={index}>
            {labels[index]}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const LineChart: React.FC<Omit<ChartProps, "type">> = (props) => (
  <Chart type="line" {...props} />
);

export const BarChart: React.FC<Omit<ChartProps, "type">> = (props) => (
  <Chart type="bar" {...props} />
);
