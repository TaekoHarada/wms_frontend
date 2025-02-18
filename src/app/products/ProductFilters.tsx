"use client";
import { useState } from "react";

export default function ProductFilters({
  onFilter,
}: {
  onFilter: (query: string, category: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div className="flex gap-4">
      {/* 商品名検索 */}
      <input
        type="text"
        placeholder="商品名で検索"
        className="border p-2 rounded-md w-1/2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* カテゴリー検索 */}
      <select
        className="border p-2 rounded-md w-1/3"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">全カテゴリー</option>
        <option value="electronics">電子機器</option>
        <option value="furniture">家具</option>
      </select>
      {/* フィルター適用ボタン */}
      <button
        className="bg-gray-600 text-white px-4 py-2 rounded-md"
        onClick={() => onFilter(query, category)}
      >
        フィルター適用
      </button>
    </div>
  );
}
