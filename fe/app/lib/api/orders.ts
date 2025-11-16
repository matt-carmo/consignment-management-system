import { api } from "./fetcher";

export const getOrders = async () => {
  const res = await api.get("/consignment-orders");
  if (res.status !== 200) throw new Error("Failed to fetch");
  const data = await res.data
  return data;
};
