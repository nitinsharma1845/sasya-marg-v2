import { getHarvestedProducts, getPreHarvestProducts, getSingleHarvestedProduct, getSinglePreHarvestProduct } from "@/api/product.api"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

export const useGetProducts = () => {
  const [searchParams] = useSearchParams()

  return useQuery({
    queryKey: ["products", Object.fromEntries(searchParams.entries())],
    queryFn: () => getHarvestedProducts(searchParams),
    placeholderData: keepPreviousData
  })
}

export const useGetSingleProduct = (productId) => {
  return useQuery({
    queryKey: ["Product", productId],
    queryFn: () => getSingleHarvestedProduct(productId)
  })
}

export const useGetPreHarvestProducts = () => {
  const [searchParams] = useSearchParams()

  return useQuery({
    queryKey: ["pre-harvest-products", Object.fromEntries(searchParams.entries())],
    queryFn: () => getPreHarvestProducts(searchParams),
    placeholderData: keepPreviousData
  })
}

export const useGetSinglePreHarvestProduct = (productId) => {
  return useQuery({
    queryKey: ["pre-harvest-product", productId],
    queryFn: () => getSinglePreHarvestProduct(productId)
  })
}