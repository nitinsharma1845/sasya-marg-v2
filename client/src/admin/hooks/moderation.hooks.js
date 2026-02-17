import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { getHarvestedProducts, getPreHarvestedProducts } from "../api/moderation.api"


export const useGetAllHarvestedProducts = () => {
    const [searchParams] = useSearchParams()

    return useQuery({
        queryKey: ['product', 'harvested', Object.fromEntries(searchParams.entries())],
        queryFn: () => getHarvestedProducts(searchParams)
    })
}


export const useGetAllPreHarvestedProducts = () => {
    const [searchParams] = useSearchParams()

    return useQuery({
        queryKey: ['product', 'pre-harvested', Object.fromEntries(searchParams.entries())],
        queryFn: () => getPreHarvestedProducts(searchParams)
    })
}