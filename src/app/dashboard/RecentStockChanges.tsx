export default function RecentStockChanges() {
  const stockData = [
    { id: 1, item: "ノートPC", type: "入庫", quantity: 10, date: "2025-02-15" },
    { id: 2, item: "スマホ", type: "出庫", quantity: 5, date: "2025-02-14" },
    {
      id: 3,
      item: "ヘッドフォン",
      type: "入庫",
      quantity: 8,
      date: "2025-02-13",
    },
  ];

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        📋 最近の入庫・出庫
      </h2>
      <ul className="space-y-2">
        {stockData.map((entry) => (
          <li
            key={entry.id}
            className="flex justify-between p-2 bg-gray-100 rounded-md"
          >
            <span>{entry.item}</span>
            <span
              className={`font-semibold ${
                entry.type === "入庫" ? "text-green-600" : "text-red-600"
              }`}
            >
              {entry.type} ({entry.quantity})
            </span>
            <span className="text-gray-500">{entry.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
