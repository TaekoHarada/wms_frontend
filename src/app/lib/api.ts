import axiosInstance from "./axiosInstance";

// ✅ 商品一覧取得
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
  stock: number;
  category: string;
}) {
  try {
    const response = await axiosInstance.post("/products", product);
    return response.data;
  } catch (error) {
    console.error("商品追加に失敗:", error);
    throw error;
  }
}

// ✅ 商品更新 API
export async function updateProduct(
  id: string,
  updatedData: { name: string; sku: string; stock: number; category: string }
) {
  try {
    const response = await axiosInstance.put(
      `/products/${id}/edit`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error(`商品 ${id} の更新に失敗:`, error);
    throw error;
  }
}
