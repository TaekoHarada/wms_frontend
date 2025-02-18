export default function StockSummary() {
  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        📦 在庫サマリー
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {/* 総商品数 */}
        <div className="flex justify-between">
          <span className="text-gray-600">総商品数</span>
          <span className="text-xl font-bold text-gray-900">1,230</span>
        </div>
        {/* 在庫切れ商品数 */}
        <div className="flex justify-between">
          <span className="text-gray-600">在庫切れ商品数</span>
          <span className="text-xl font-bold text-red-600">8</span>
        </div>
        {/* 最近の入庫・出庫 */}
        <div className="flex justify-between">
          <span className="text-gray-600">最近の入庫・出庫</span>
          <span className="text-xl font-bold text-gray-900">32 件</span>
        </div>
      </div>
    </div>
  );
}
