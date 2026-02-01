import { api } from "@/lib/axios"

export const getHarvestedProducts = async (searchParams) => {
  const { data } = await api.get("/buyer/listing", {
    params: Object.fromEntries(searchParams.entries())
  })
  return data
}

export const getSingleHarvestedProduct = async (productId) => {
  const { data } = await api.get(`/buyer/listing/${productId}`)
  return data
}

export const getPreHarvestProducts = async (searchParams) => {
  const { data } = await api.get("/buyer/listing/pre-harvest", {
    params: Object.fromEntries(searchParams.entries())
  })
  return data
}

export const getSinglePreHarvestProduct = async (productId)=>{
  const {data} = await api.get(`/buyer/listing/pre-harvest/${productId}`)
  return data
}