"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useSWR from "swr";
import { fetchProductById, updateProduct } from "@/app/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ProductEdit() {
  const { id } = useParams();
  const router = useRouter();

  // ✅ 商品データを取得
  const { data, error } = useSWR(id ? `/products/${id}` : null, () =>
    id ? fetchProductById(id as string) : null
  );

  // ✅ フォームの状態を管理
  const [formData, setFormData] = useState({
    name: data?.name || "",
    sku: data?.sku || "",
    stock: data?.stock || 0,
    category: data?.category || "",
  });

  // ✅ フォーム入力の変更処理
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ 商品更新処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProduct(id as string, formData);
      alert("商品情報を更新しました");
      router.push(`/products/${id}`);
    } catch (error) {
      alert("商品更新に失敗しました");
    }
  };

  if (error)
    return <div className="text-red-500">データの取得に失敗しました</div>;
  if (!data) return <div>データを読み込み中...</div>;

  return (
    <div className="p-6">
      <Breadcrumbs />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg space-y-4"
      >
        <div>
          <label className="block font-semibold">商品名</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">在庫数</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">カテゴリー</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          >
            <option value="電子機器">電子機器</option>
            <option value="家具">家具</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          保存
        </button>
      </form>
    </div>
  );
}
