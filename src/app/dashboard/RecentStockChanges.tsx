"use client";
import useSWR from "swr";
import { fetchRecentStockChanges } from "@/app/lib/api";

export default function RecentStockChanges() {
  const { data, error } = useSWR("/recent-stock", fetchRecentStockChanges);

  if (error)
    return <div className="text-red-500">データの取得に失敗しました</div>;
  if (!data) return <div>データを読み込み中...</div>;

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        📋 最近の入庫・出庫
      </h2>
      <ul className="space-y-2">
        {data.map(
          (entry: {
            id: string;
            product_name: string;
            type: string;
            quantity: number;
            transaction_date: string;
          }) => (
            <li
              key={entry.id}
              className="flex justify-between p-2 bg-gray-100 rounded-md"
            >
              <span>{entry.product_name}</span>
              <span
                className={`font-semibold ${
                  entry.type === "IN" ? "text-green-600" : "text-red-600"
                }`}
              >
                {entry.type} ({entry.quantity})
              </span>
              <span className="text-gray-500">
                {new Date(entry.transaction_date).toLocaleDateString()}
              </span>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
