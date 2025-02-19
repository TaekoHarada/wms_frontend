"use client";
import { useState } from "react";
import useSWR from "swr";
import { fetchCategories } from "@/app/lib/api";

export default function ProductFilters({
  onFilter,
}: {
  onFilter: (query: string, categoryId: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  // ✅ カテゴリー一覧を取得
  const { data: categories, error } = useSWR("/categories", fetchCategories);

  if (error)
    return <div className="text-red-500">カテゴリーの取得に失敗しました</div>;

  return (
    <div className="flex gap-4">
      {/* 商品名またはSKU検索 */}
      <input
        type="text"
        placeholder="商品名またはSKUで検索"
        className="border p-2 rounded-md w-1/2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* カテゴリー検索 (ユーザーはカテゴリー名で選択する) */}
      <select
        className="border p-2 rounded-md w-1/3"
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
      >
        <option value={0}>全カテゴリー</option>
        {categories?.map((cat: any) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* フィルター適用ボタン */}
      <button
        className="bg-gray-600 text-white px-4 py-2 rounded-md"
        onClick={() => onFilter(query, categoryId)}
      >
        検索
      </button>
    </div>
  );
}
