import { useMutation, useQuery } from "@tanstack/react-query"
import { getAllFarmerQueries, getAllReports, getSingleQuery, getSIngleReport, replyQuery, replyToReport } from "../api/reports.api"
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

export const useGetAllReports = () => {
    const [searchParams] = useSearchParams()
    return useQuery({
        queryKey: ['reports', Object.fromEntries(searchParams.entries())],
        queryFn: () => getAllReports(searchParams)
    })
}

export const useGetSingleReport = (id) => {
    return useQuery({
        queryKey: ["reports", id],
        queryFn: () => getSIngleReport(id)
    })
}

export const useReplyReport = () => {
    return useMutation({
        mutationFn: replyToReport,
        onSuccess: (_, payload) => {
            queryClient.invalidateQueries(["reports", payload.id])
            toast.success("Reply sent for report")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to Reply report")
        }
    })
}
