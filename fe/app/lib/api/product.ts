import api from "./fetcher"

export const getAllProducts = async () => {
  const res = await api.get("/products")
  if (res.status !== 200) {
    throw new Error("Failed to fetch products")
  }
  return res.data
}

