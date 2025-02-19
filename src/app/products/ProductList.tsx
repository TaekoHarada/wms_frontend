"use client";
import useSWR from "swr";
import { fetchProducts } from "@/app/lib/api";
import Link from "next/link";
import { useState } from "react";
import ProductFilters from "./ProductFilters";

export default function ProductList() {
  const { data, error } = useSWR("/products", fetchProducts);
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  if (error)
    return <div className="text-red-500">データの取得に失敗しました</div>;
  if (!data) return <div>データを読み込み中...</div>;

  // ✅ フィルタリング処理
  const filteredProducts = data.filter(
    (product: {
      id: number;
      name: string;
      sku: string;
      quantity: number;
      category_id: number;
      category?: string;
      location?: string;
    }) => {
      const matchesQuery =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.sku.toLowerCase().includes(query.toLowerCase());

      const matchesCategory =
        categoryId > 0 ? product.category_id === categoryId : true;

      return matchesQuery && matchesCategory;
    }
  );

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      {/* 🔍 検索フィルター */}
      <ProductFilters
        onFilter={(q, c) => {
          setQuery(q);
          setCategoryId(c);
        }}
      />
      <h2 className="text-lg font-semibold text-gray-700 my-4">📦 商品一覧</h2>

      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="text-left p-2">商品名</th>
            <th className="text-left p-2">SKU</th>
            <th className="text-right p-2">在庫数</th>
            <th className="text-left p-2">カテゴリー</th>
            <th className="text-left p-2">保管場所</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(
              (product: {
                id: number;
                name: string;
                sku: string;
                quantity: number;
                category_id: number;
                category?: string;
                location?: string;
              }) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td className="p-2">{product.sku}</td>
                  <td className="p-2 text-right">{product.quantity}</td>
                  <td className="p-2">{product.category || "未分類"}</td>
                  <td className="p-2">{product.location || "未設定"}</td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                検索結果がありません
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
