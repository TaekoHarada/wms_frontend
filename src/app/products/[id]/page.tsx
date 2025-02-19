"use client";
import useSWR from "swr";
import { fetchProductById } from "@/app/lib/api";
import { useParams } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ProductDetail() {
  const { id } = useParams();
  const { data, error } = useSWR(id ? `/products/${id}` : null, () =>
    id ? fetchProductById(id as string) : null
  );

  if (error)
    return <div className="text-red-500">データの取得に失敗しました</div>;
  if (!data) return <div>データを読み込み中...</div>;

  return (
    <div className="p-6">
      <Breadcrumbs />
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          📦 商品詳細
        </h2>
        <p>
          <span className="font-semibold">商品ID:</span> {data.id}
        </p>
        <p>
          <span className="font-semibold">商品名:</span> {data.name}
        </p>
        <p>
          <span className="font-semibold">SKU:</span> {data.sku}
        </p>
        <p>
          <span className="font-semibold">在庫数:</span> {data.quantity}
        </p>
        <p>
          <span className="font-semibold">カテゴリー:</span>{" "}
          {data.category || "未分類"} （ID: {data.category_id || "N/A"}）
        </p>
        <p>
          <span className="font-semibold">保管場所:</span>{" "}
          {data.location || "未設定"}
        </p>
      </div>

      {/* 商品編集ページへ遷移 */}
      <Link
        href={`/products/${id}/edit`}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        ✏️ 編集
      </Link>
    </div>
  );
}
