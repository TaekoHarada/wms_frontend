import Link from "next/link";

export default function ProductDetail({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🛍️ 商品詳細</h1>
      <p>商品ID: {params.id}</p>
      <p>商品名: ノートPC</p>
      <p>SKU: P001</p>
      <p>在庫数: 5</p>
      <p>カテゴリー: 電子機器</p>

      <Link
        href={`/products/${params.id}/edit`}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        ✏️ 編集
      </Link>
    </div>
  );
}
