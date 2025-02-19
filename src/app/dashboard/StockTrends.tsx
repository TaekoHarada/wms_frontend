"use client";
import useSWR from "swr";
import { fetchStockTrends } from "@/app/lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StockTrends() {
  const { data, error } = useSWR("/stock-trends", fetchStockTrends);
  console.log("recent-stock", data); // デバッグ用

  if (error)
    return <div className="text-red-500">データの取得に失敗しました</div>;
  if (!data) return <div>データを読み込み中...</div>;

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        📈 月ごとの在庫推移
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis domain={[0, 500]} /> {/* Y軸の範囲を0〜500に固定 */}
          <Tooltip />
          <Line
            type="monotone"
            dataKey="stock_in"
            stroke="#34D399"
            strokeWidth={2}
            name="入庫"
          />
          <Line
            type="monotone"
            dataKey="stock_out"
            stroke="#F87171"
            strokeWidth={2}
            name="出庫"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
