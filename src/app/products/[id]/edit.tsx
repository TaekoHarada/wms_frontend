"use client";
import { useState } from "react";

export default function ProductEdit({ params }: { params: { id: string } }) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">✏️ 商品編集</h1>
      <label>商品名</label>
      <input
        type="text"
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>在庫数</label>
      <input
        type="number"
        className="border p-2 w-full"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded-md mt-4">
        保存
      </button>
    </div>
  );
}
