"use client";
import useSWR from "swr";
import { fetchStockHistory } from "@/app/lib/api";
import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function StockHistory() {
  const { data: stockHistory, error } = useSWR(
    "/stock/history",
    fetchStockHistory
  );

  const [filterType, setFilterType] = useState<string | null>(null); // "IN" または "OUT"
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  if (error)
    return <div className="text-red-500">データの取得に失敗しました</div>;
  if (!stockHistory) return <div>データを読み込み中...</div>;

  // ✅ `YYYY-MM-DD` を `Date` オブジェクトに変換（タイムゾーンの影響を防ぐ）
  const parseDate = (dateString: string, isEndDate = false) => {
    const date = new Date(dateString + "T00:00:00"); // UTC基準で変換
    if (isEndDate) {
      date.setHours(23, 59, 59, 999); // `23:59:59.999` に設定（1日の終わり）
    } else {
      date.setHours(0, 0, 0, 0); // `00:00:00` に設定（1日の開始）
    }
    return date;
  };

  // ✅ フィルタリング処理
  const filteredHistory = stockHistory.filter(
    (entry: {
      type: string;
      product_name?: string;
      sku?: string;
      transaction_date: string;
    }) => {
      const matchType = filterType ? entry.type === filterType : true;
      const matchKeyword =
        entry.product_name
          ?.toLowerCase()
          .includes(searchKeyword.toLowerCase()) ||
        entry.sku?.toLowerCase().includes(searchKeyword.toLowerCase());

      const entryDate = new Date(entry.transaction_date);
      entryDate.setHours(0, 0, 0, 0); // `00:00:00` にリセットして比較しやすくする

      const matchStartDate = startDate
        ? entryDate >= parseDate(startDate)
        : true;
      const matchEndDate = endDate
        ? entryDate <= parseDate(endDate, true)
        : true;

      return matchType && matchKeyword && matchStartDate && matchEndDate;
    }
  );

  return (
    <div>
      {/* ✅ フィルターエリア */}
      <div className="bg-white p-4 shadow-md rounded-lg mb-4 flex space-x-4">
        <select
          className="border p-2 rounded-md"
          value={filterType || ""}
          onChange={(e) => setFilterType(e.target.value || null)}
        >
          <option value="">すべて</option>
          <option value="IN">入庫のみ</option>
          <option value="OUT">出庫のみ</option>
        </select>
        <input
          type="text"
          placeholder="商品名またはSKUで検索"
          className="border p-2 rounded-md flex-grow"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded-md"
        />
      </div>

      {/* ✅ 在庫履歴一覧 */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">入出庫一覧</h2>
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="text-left p-2">商品名</th>
              <th className="text-left p-2">SKU</th>
              <th className="text-left p-2">種別</th>
              <th className="text-right p-2">数量</th>
              <th className="text-left p-2">日付</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map(
              (entry: {
                id: string;
                product_name?: string;
                sku?: string;
                type: string;
                quantity: number;
                transaction_date: string;
              }) => (
                <tr key={entry.id} className="border-b hover:bg-gray-100">
                  <td className="p-2">{entry.product_name || "不明"}</td>
                  <td className="p-2">{entry.sku || "不明"}</td>
                  <td
                    className={`p-2 font-bold ${
                      entry.type === "IN" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {entry.type === "IN" ? "入庫" : "出庫"}
                  </td>
                  <td className="p-2 text-right">{entry.quantity}</td>
                  <td className="p-2">
                    {new Date(entry.transaction_date).toLocaleString()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
