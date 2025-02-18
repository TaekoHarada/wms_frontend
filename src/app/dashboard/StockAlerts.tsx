export default function StockAlerts() {
  const lowStockItems = [
    { id: 1, name: "ノートPC", quantity: 2 },
    { id: 2, name: "スマホ", quantity: 1 },
    { id: 3, name: "ヘッドフォン", quantity: 5 },
  ];

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        ⚠️ 在庫アラート
      </h2>
      <ul className="space-y-2">
        {lowStockItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between p-2 bg-gray-100 rounded-md"
          >
            <span>{item.name}</span>
            <span className="text-red-600 font-semibold">
              {item.quantity} 個
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
