"use client";
import useSWR from "swr";
import { fetchProducts } from "@/app/lib/api";
import Link from "next/link";

export default function ProductList() {
  const { data, error } = useSWR("/products", fetchProducts);

  if (error)
    return <div className="text-red-500">データの取得に失敗しました</div>;
  if (!data) return <div>データを読み込み中...</div>;

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">📦 商品一覧</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">商品名</th>
            <th className="text-left p-2">SKU</th>
            <th className="text-right p-2">在庫数</th>
            <th className="text-left p-2">カテゴリー</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product: any) => (
            <tr key={product.id} className="border-b hover:bg-gray-100">
              <td className="p-2">
                <Link
                  href={`/products/${product.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {product.name}
                </Link>
              </td>
              <td className="p-2">{product.sku}</td>
              <td className="p-2 text-right">{product.stock}</td>
              <td className="p-2">{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
