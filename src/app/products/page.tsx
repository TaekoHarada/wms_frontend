"use client";

import ProductList from "./ProductList";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Link
          href="/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-500"
        >
          + 商品を追加
        </Link>
      </div>

      {/* 商品一覧 */}
      <ProductList />
    </div>
  );
}
