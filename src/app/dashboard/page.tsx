"use client";

import StockSummary from "./StockSummary";
import StockAlerts from "./StockAlerts";
import RecentStockChanges from "./RecentStockChanges";
import StockTrends from "./StockTrends";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* 在庫サマリー & アラート */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StockSummary />
        <StockAlerts />
      </div>

      {/* 最近の入庫・出庫 & グラフ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentStockChanges />
        <StockTrends />
      </div>
    </div>
  );
}
