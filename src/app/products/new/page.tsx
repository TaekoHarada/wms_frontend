"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProduct } from "@/app/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ProductCreate() {
  const router = useRouter();

  // ✅ フォームの状態を管理
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    stock: 0,
    category: "",
  });

  // ✅ フォーム入力の変更処理
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ 商品追加処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProduct(formData);
      alert("✅ 商品を追加しました");
      router.push("/products"); // 商品一覧へ遷移
    } catch (error) {
      alert("❌ 商品追加に失敗しました");
    }
  };

  return (
    <div className="p-6">
      {/* ✅ パンくずリストを追加 */}
      <Breadcrumbs />

      <h1 className="text-2xl font-bold">➕ 新しい商品を追加</h1>
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
            required
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
            required
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
            required
          />
        </div>
        <div>
          <label className="block font-semibold">カテゴリー</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
            required
          >
            <option value="">選択してください</option>
            <option value="電子機器">電子機器</option>
            <option value="家具">家具</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          追加
        </button>
      </form>
    </div>
  );
}
