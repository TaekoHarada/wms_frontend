"use client";
import useSWR from "swr";
import { fetchLowStockItems } from "@/app/lib/api";

export default function StockAlerts() {
  const { data, error } = useSWR("/low-stock", fetchLowStockItems);

  if (error)
    return <div className="text-red-500">データの取得に失敗しました</div>;
  if (!data) return <div>データを読み込み中...</div>;

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        ⚠️ 在庫アラート
      </h2>
      <ul className="space-y-2">
        {data.map((item: { id: number; name: string; quantity: number }) => (
          <li
            key={item.id}
            className="flex justify-between p-2 bg-gray-100 rounded-md"
          >
            <span>{item.name}</span>
            <span className="text-red-600 font-semibold">
              {item.quantity} 個
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
