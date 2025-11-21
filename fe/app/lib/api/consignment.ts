import { api } from "./fetcher";

export const createConsignment = async (data: {
  name: string;
  phone_number: string;
}) => {
  const res = await api.post("/consignment", data);

  if (res.status !== 201) throw new Error("Failed to create consignment");
 
  return res.data;
};

export const editConsignment = async (id: string, data: {
  name: string;
  phone_number: string;
}) => {
  const res = await api.put(`/consignment/${id}`, data);

  if (res.status !== 200) throw new Error("Failed to update consignment");
 
  return res.data;
}
export const getConsignments = async () => {
  const res = await api.get("/consignments");

  if (res.status !== 200) throw new Error("Failed to fetch");
  const data = await res.data;
  return data;
};
