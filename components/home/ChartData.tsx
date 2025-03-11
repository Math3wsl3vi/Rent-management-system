import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue2024: 75000, revenue2023: 65000 },
  { month: "Feb", revenue2024: 85000, revenue2023: 70000 },
  { month: "Mar", revenue2024: 90000, revenue2023: 72000 },
  { month: "Apr", revenue2024: 70000, revenue2023: 68000 },
];

const RevenueComparisonChart = () => {
  return (
    <div className="mt-10 p-4 h-full">
      <h2 className="text-xl font-semibold text-gray-700">Revenue Comparison (2023 vs 2024)</h2>
      <ResponsiveContainer width="100%" height={300} className={'mt-10'}>
        <BarChart data={data}>
          <XAxis dataKey="month" tick={{ fill: "#4B5563" }} />
          <YAxis tick={{ fill: "#4B5563" }} />
          <Tooltip />
          <Legend />
          {/* 2024 Revenue */}
          <Bar dataKey="revenue2024" fill="#4CAF50" radius={[8, 8, 0, 0]} name="2024 Revenue" />
          {/* 2023 Revenue */}
          <Bar dataKey="revenue2023" fill="#15803D" radius={[8, 8, 0, 0]} name="2023 Revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueComparisonChart;
