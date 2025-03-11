"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
   { month: "Feb", income2024: 85000, income2023: 70000, expense2024: 42000, expense2023: 37000 },
  { month: "Mar", income2024: 90000, income2023: 72000, expense2024: 45000, expense2023: 39000 },
  { month: "Apr", income2024: 70000, income2023: 68000, expense2024: 38000, expense2023: 36000 },
  { month: "May", income2024: 88000, income2023: 71000, expense2024: 40000, expense2023: 38000 },
  { month: "Jun", income2024: 92000, income2023: 74000, expense2024: 43000, expense2023: 40000 },
  { month: "Jul", income2024: 98000, income2023: 78000, expense2024: 46000, expense2023: 42000 },
  { month: "Aug", income2024: 102000, income2023: 80000, expense2024: 48000, expense2023: 44000 },
  { month: "Sep", income2024: 110000, income2023: 85000, expense2024: 50000, expense2023: 46000 },
  { month: "Oct", income2024: 115000, income2023: 88000, expense2024: 52000, expense2023: 48000 },
  { month: "Nov", income2024: 120000, income2023: 92000, expense2024: 54000, expense2023: 50000 },
  { month: "Dec", income2024: 125000, income2023: 95000, expense2024: 57000, expense2023: 52000 },
  { month: "Jan", income2025: 130000, income2024: 100000, expense2025: 60000, expense2024: 54000 },
  { month: "Feb", income2025: 135000, income2024: 105000, expense2025: 62000, expense2024: 56000 },
];

const TrendAnalysis = () => {
  return (
    <div className="border rounded-md mt-10 p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Revenue & Expense Trends (2023 vs 2024)</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fill: "#374151", fontSize: 12 }} />
          <YAxis tick={{ fill: "#374151", fontSize: 12 }} />
          <Tooltip />
          <Legend />

          {/* Income Lines */}
          <Line type="monotone" dataKey="income2024" stroke="#15803D" strokeWidth={3} name="2024 Income" dot={false} animationDuration={1000} />
          <Line type="monotone" dataKey="income2023" stroke="#3B82F6" strokeWidth={3} name="2023 Income" dot={false} animationDuration={1000} />

          {/* Expense Lines */}
          <Line type="monotone" dataKey="expense2024" stroke="#EF4444" strokeWidth={3} name="2024 Expenses" dot={false} animationDuration={1000} />
          <Line type="monotone" dataKey="expense2023" stroke="#F97316" strokeWidth={3} name="2023 Expenses" dot={false} animationDuration={1000} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendAnalysis;
