import type {
  Order,
  OrderPayload,
  Product
} from "../types";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {})
      },
      ...options
    }
  );

  const data = await response
    .json()
    .catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "The server request failed."
    );
  }

  return data as T;
}

export function getProducts(): Promise<Product[]> {
  return request<Product[]>("/products");
}

export function getProductById(
  id: number
): Promise<Product> {
  return request<Product>(
    `/products/${id}`
  );
}

export function createOrder(
  order: OrderPayload
): Promise<Order> {
  return request<Order>("/orders", {
    method: "POST",
    body: JSON.stringify(order)
  });
}

export function getOrders(
  email: string
): Promise<Order[]> {
  return request<Order[]>(
    `/orders?email=${encodeURIComponent(email)}`
  );
}