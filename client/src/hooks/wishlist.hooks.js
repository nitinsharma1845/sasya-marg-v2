import { addToWishlist, deleteFromWishlist, getMyWishlist } from "@/api/wishlist.api"
import { queryClient } from "@/lib/queryClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"


export const useGetWishlist = () => {
    return useQuery({
        queryKey: ["wishlist"],
        queryFn: getMyWishlist
    })
}

export const useAddToWishlist = () => {
    return useMutation({
        mutationFn: addToWishlist,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["wishlist"]),
                toast.success(data?.message || "Added to wishlist")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to add product");
        },
    })
}

export const useDeleteFromWishlist = () => {
    return useMutation({
        mutationFn: deleteFromWishlist,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["wishlist"])
            toast.success(data?.message || "removed from wishlist")
        },
        onError: (err) => {
            toast.err(err?.response?.data?.message || "Failed to remove from wishlist")
        }
    })
}