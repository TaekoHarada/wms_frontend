"use client";

import ProductList from "./ProductList";
import ProductFilters from "./ProductFilters";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">🛍️ 商品管理</h1>
        <Link
          href="/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-500"
        >
          + 商品を追加
        </Link>
      </div>

      {/* 検索 & フィルター */}
      <ProductFilters
        onFilter={(query, category) => {
          // Implement your filter logic here
          console.log(
            `Filtering with query: ${query} and category: ${category}`
          );
        }}
      />

      {/* 商品一覧 */}
      <ProductList />
    </div>
  );
}
