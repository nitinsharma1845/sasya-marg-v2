import { api } from "@/lib/axios";

export const reportProduct = async (payload) => {
  const { data } = await api.post("/product-report/", payload);
  return data;
};

export const getProductReports = async (params) => {
  const { data } = await api.get("/product-report/", {params : Object.fromEntries(params.entries())});
  return data;
};
