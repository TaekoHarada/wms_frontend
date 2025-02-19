"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import useSWR from "swr";
import {
  fetchProductById,
  updateProduct,
  fetchCategories,
} from "@/app/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ProductEdit() {
  const { id } = useParams();
  const router = useRouter();

  // ✅ 商品データを取得
  const { data: product, error } = useSWR(id ? `/products/${id}` : null, () =>
    id ? fetchProductById(id as string) : null
  );

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
    category_id: 0, // 初期値は "未分類"
    location: "",
  });

  // ✅ 商品データが取得できたら、フォームの初期値をセット
  useEffect(() => {
    if (product) {
      console.log("Product Data:", product); // デバッグ用
      setFormData((prev) => ({
        ...prev,
        name: product.name || "",
        sku: product.sku || "",
        quantity: product.quantity || 0,
        category_id: product.category_id ? Number(product.category_id) : 0,
        location: product.location || "",
      }));
    }
  }, [product]);

  // ✅ カテゴリー一覧が取得できた後、`category_id` を更新
  useEffect(() => {
    if (categories && product) {
      const categoryExists = categories.some(
        (cat: { id: number }) => cat.id === product.category_id
      );

      setFormData((prev) => ({
        ...prev,
        category_id: categoryExists ? Number(product.category_id) : 0,
      }));
    }
  }, [categories, product]);

  // ✅ フォーム入力の変更処理
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "category_id" ? Number(value) : value, // category_id は数値に変換
    }));
  };

  // ✅ 商品更新処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProduct(id as string, {
        ...formData,
        category_id: Number(formData.category_id) || 0, // 確実に数値
      });

      alert("商品情報を更新しました");
      router.push(`/products/${id}`);
    } catch (error) {
      console.error("Product update error:", error);
    }
  };

  if (error || categoryError)
    return <div className="text-red-500">データの取得に失敗しました</div>;
  if (!product || !categories) return <div>データを読み込み中...</div>;

  return (
    <div className="p-6">
      <Breadcrumbs />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg space-y-4"
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          ✏️ 商品編集
        </h2>

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
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">カテゴリー</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          >
            <option value="0">未分類</option>
            {categories.map((category: { id: number; name: string }) => (
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
          保存
        </button>
      </form>
    </div>
  );
}
