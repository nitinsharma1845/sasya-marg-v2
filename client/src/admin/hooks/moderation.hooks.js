import { useMutation, useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { getHarvestedProducts, getPreHarvestedProducts, getSingleHarvestedProduct, getSinglePreHarvestedProduct, moderateHravestedProduct } from "../api/moderation.api"
import { queryClient } from "@/lib/queryClient"
import { toast } from "sonner"


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

export const useGetSingleHarvetsedProduct = (productId) => {
    return useQuery({
        queryKey: ["product", "harvested", productId],
        queryFn: () => getSingleHarvestedProduct(productId)
    })
}

export const useGetSinglePreHarvetsedProduct = (productId) => {
    return useQuery({
        queryKey: ["product", "pre-harvested", productId],
        queryFn: () => getSinglePreHarvestedProduct(productId)
    })
}

export const useModerateHarvestedListing = () => {
    return useMutation({
        mutationFn: moderateHravestedProduct,
        onSuccess: (data, payload) => {
            queryClient.setQueryData(
                ['product', 'harvested', payload?.listingId],
                old => {
                    if (!old) return old
                    return {
                        ...old,
                        data: {
                            ...old.data,
                            moderation: payload.action,
                            rejectionReason:
                                payload.action === 'rejected'
                                    ? payload.reason
                                    : null
                        }
                    }
                }
            )

            toast.success('Product status changed to ' + payload?.action)
        },
        onError: error => {
            toast.error(
                error.response?.data?.message ||
                'Failed to moderate product'
            )
        }
    })
}