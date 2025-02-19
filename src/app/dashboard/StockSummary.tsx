"use client";
import useSWR from "swr";
import { fetchStockSummary } from "@/app/lib/api";

export default function StockSummary() {
  const { data, error } = useSWR("/summary", fetchStockSummary);

  if (error)
    return <div className="text-red-500">データの取得に失敗しました</div>;
  if (!data) return <div>データを読み込み中...</div>;

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        📦 在庫サマリー
      </h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-between">
          <span className="text-gray-600">総商品数</span>
          <span className="text-xl font-bold text-gray-900">
            {data.totalProducts}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">在庫切れ商品数</span>
          <span className="text-xl font-bold text-red-600">
            {data.lowStockCount}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">最近の入庫・出庫</span>
          <span className="text-xl font-bold text-gray-900">
            {data.recentTransactions} 件
          </span>
        </div>
      </div>
    </div>
  );
}
