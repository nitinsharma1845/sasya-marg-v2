import { getHarvestedProducts, getSingleHarvestedProduct } from "@/api/product.api"
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

export const useGetSingleProduct = (productId)=>{
  return useQuery({
    queryKey : ["Product" , productId],
    queryFn : ()=>getSingleHarvestedProduct(productId)
  })
}