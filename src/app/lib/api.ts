import axiosInstance from "./axiosInstance";

// ✅ 商品一覧取得（カテゴリ名を取得する）
export async function fetchProducts() {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    console.error("商品データの取得に失敗:", error);
    throw error;
  }
}

// ✅ 商品詳細取得
export async function fetchProductById(id: string) {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`商品 ${id} の取得に失敗:`, error);
    throw error;
  }
}

// ✅ 商品追加
export async function addProduct(product: {
  name: string;
  sku: string;
  category_id: number;
  quantity: number;
  location?: string;
}) {
  try {
    const response = await axiosInstance.post("/products", product);
    return response.data;
  } catch (error) {
    console.error("商品追加に失敗:", error);
    throw error;
  }
}

// ✅ 商品更新
export async function updateProduct(
  id: string,
  updatedData: {
    name: string;
    sku: string;
    category_id: number;
    quantity: number;
    location?: string;
  }
) {
  try {
    const response = await axiosInstance.put(`/products/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`商品 ${id} の更新に失敗:`, error);
    throw error;
  }
}

// ✅ カテゴリ一覧取得
export async function fetchCategories() {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error) {
    console.error("カテゴリ一覧の取得に失敗:", error);
    throw error;
  }
}

// ✅ 新しいカテゴリを追加
export async function addCategory(category: {
  name: string;
  description?: string;
}) {
  try {
    const response = await axiosInstance.post("/categories", category);
    return response.data;
  } catch (error) {
    console.error("カテゴリの追加に失敗:", error);
    throw error;
  }
}

// ✅ 在庫更新 API
export async function updateStock(
  product_id: number,
  type: "IN" | "OUT",
  quantity: number
) {
  try {
    const response = await axiosInstance.post("/stock/update", {
      product_id,
      type,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("在庫更新に失敗:", error);
    throw error;
  }
}

// ✅ 在庫履歴取得 API
export async function fetchStockHistory() {
  try {
    const response = await axiosInstance.get("/stock/history");
    return response.data;
  } catch (error) {
    console.error("在庫履歴の取得に失敗:", error);
    throw error;
  }
}

// ✅ 在庫サマリー取得 API
export async function fetchStockSummary() {
  try {
    const response = await axiosInstance.get("/summary");
    return response.data;
  } catch (error) {
    console.error("在庫サマリーの取得に失敗:", error);
    throw error;
  }
}

// ✅ 在庫切れ商品取得 API
export async function fetchLowStockItems() {
  try {
    const response = await axiosInstance.get("/summary/low-stock");
    return response.data;
  } catch (error) {
    console.error("在庫切れ商品の取得に失敗:", error);
    throw error;
  }
}

// ✅ 最近の入庫・出庫履歴取得 API
export async function fetchRecentStockChanges() {
  try {
    const response = await axiosInstance.get("/summary/recent-stock");
    return response.data;
  } catch (error) {
    console.error("最近の在庫履歴の取得に失敗:", error);
    throw error;
  }
}

// ✅ 月ごとの在庫推移取得 API
export async function fetchStockTrends() {
  try {
    const response = await axiosInstance.get("/summary/stock-trends");
    return response.data;
  } catch (error) {
    console.error("在庫推移データの取得に失敗:", error);
    throw error;
  }
}
