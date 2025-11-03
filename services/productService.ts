import { IProduct } from "@/types/product";
import { API_BASE_URL } from "@/config";

export const getProducts = async (): Promise<IProduct[]> => {
  const res = await fetch(`${API_BASE_URL}/products`, { cache: "no-store" });
  return res.json();
};

export const getProductById = async (id: string): Promise<IProduct> => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, { cache: "no-store" });
  return res.json();
};

export const createProduct = async (product: Partial<IProduct>) => {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const updateProduct = async (id: number, product: Partial<IProduct>) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const deleteProduct = async (id: number) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  return true;
};
