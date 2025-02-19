"use client";

import StockHistory from "./StockHistory";
import Link from "next/link";

export default function StockPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Link
          href="/stock/edit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-500"
        >
          + 在庫更新
        </Link>
      </div>

      {/* 入出庫履歴一覧 */}
      <StockHistory />
    </div>
  );
}
