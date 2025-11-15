import { fetcher } from "./fetcher";

export const getConsignments = async () => {
  const res = await fetcher("/consignments");

  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return data;
};
