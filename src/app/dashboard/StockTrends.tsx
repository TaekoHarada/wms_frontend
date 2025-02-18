"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "1月", 入庫: 400, 出庫: 300 },
  { month: "2月", 入庫: 500, 出庫: 350 },
  { month: "3月", 入庫: 450, 出庫: 400 },
  { month: "4月", 入庫: 600, 出庫: 500 },
];

export default function StockTrends() {
  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        📈 月ごとの在庫推移
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="入庫"
            stroke="#34D399"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="出庫"
            stroke="#F87171"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
