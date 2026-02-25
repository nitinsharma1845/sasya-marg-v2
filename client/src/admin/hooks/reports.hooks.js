import { useMutation, useQuery } from "@tanstack/react-query"
import { getAllFarmerQueries, getSingleQuery, replyQuery } from "../api/reports.api"
import { useSearchParams } from "react-router-dom"
import { queryClient } from "@/lib/queryClient"
import { toast } from "sonner"

export const useGetAllQueries = () => {
    const [searchParams] = useSearchParams()
    return useQuery({
        queryKey: ['queries', Object.fromEntries(searchParams.entries())],
        queryFn: () => getAllFarmerQueries(searchParams)
    })
}

export const useGetSingleQuery = (id) => {
    return useQuery({
        queryKey: ['queries', id],
        queryFn: () => getSingleQuery(id)
    })
}

export const useReplyQuery = () => {
    return useMutation({
        mutationFn: replyQuery,
        onSuccess: (_, payload) => {
            queryClient.invalidateQueries(["queries", payload.id])
            toast.success("Reply sent for query")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to Reply query")
        }
    })
}