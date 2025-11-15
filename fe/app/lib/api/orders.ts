import { fetcher } from "./fetcher";

export const getOrders = async () => {
  const res = await fetcher("/consignment-orders");
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return data;
};
