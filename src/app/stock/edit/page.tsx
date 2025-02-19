"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetchProducts, updateStock } from "@/app/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function StockEdit() {
  const router = useRouter();
  const { data: products, error } = useSWR("/products", fetchProducts);

  const [formData, setFormData] = useState({
    product_id: "",
    type: "IN",
    quantity: 1,
  });

  const [currentStock, setCurrentStock] = useState<number | null>(null);

  if (error)
    return <div className="text-red-500">データの取得に失敗しました</div>;
  if (!products) return <div>データを読み込み中...</div>;

  // ✅ 商品選択時に在庫数をセット
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = products.find(
      (p: any) => p.id === Number(e.target.value)
    );
    setFormData({ ...formData, product_id: e.target.value });
    setCurrentStock(selectedProduct ? selectedProduct.quantity : null);
  };

  // ✅ フォームの変更処理
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ 在庫更新処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.type === "OUT" &&
      currentStock !== null &&
      Number(formData.quantity) > currentStock
    ) {
      alert("❌ 在庫が不足しています");
      return;
    }

    try {
      await updateStock(
        Number(formData.product_id),
        formData.type as "IN" | "OUT",
        Number(formData.quantity)
      );
      alert("✅ 在庫を更新しました");
      router.push("/stock");
    } catch (error) {
      alert("❌ 在庫更新に失敗しました");
    }
  };

  return (
    <div className="p-6">
      <Breadcrumbs />
      <h1 className="text-2xl font-bold">在庫更新</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg space-y-4"
      >
        <div>
          <label className="block font-semibold">商品を選択</label>
          <select
            name="product_id"
            value={formData.product_id}
            onChange={handleProductChange}
            className="border p-2 w-full rounded-md"
            required
          >
            <option value="">商品を選択</option>
            {products &&
              products.map((product: any) => (
                <option key={product.id} value={product.id}>
                  {product.name} (SKU: {product.sku}) - 在庫: {product.quantity}
                </option>
              ))}
          </select>
        </div>
        {currentStock !== null && (
          <p className="text-sm text-gray-600">現在の在庫: {currentStock}</p>
        )}
        <div>
          <label className="block font-semibold">入庫 / 出庫</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          >
            <option value="IN">入庫</option>
            <option value="OUT">出庫</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">数量</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            className="border p-2 w-full rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          更新
        </button>
      </form>
    </div>
  );
}
