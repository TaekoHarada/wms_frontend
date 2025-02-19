"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addProduct, fetchCategories } from "@/app/lib/api";
import useSWR from "swr";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ProductCreate() {
  const router = useRouter();

  // ✅ カテゴリー一覧を取得
  const { data: categories, error: categoryError } = useSWR(
    "/categories",
    fetchCategories
  );

  // ✅ フォームの状態を管理
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    quantity: 0,
    category_id: 0, // 初期値を "未分類" (0) に設定
    location: "",
  });

  // ✅ フォーム入力の変更処理
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ 商品追加処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProduct({
        ...formData,
        category_id: formData.category_id ? Number(formData.category_id) : 0,
      });
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
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">カテゴリー</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
            required
          >
            <option value="0">未分類</option>
            {categories &&
              categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold">保管場所</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
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
