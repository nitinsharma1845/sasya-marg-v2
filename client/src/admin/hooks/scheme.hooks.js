import { useMutation, useQuery } from "@tanstack/react-query"
import { createScheme, getAllSchemes, getSingleScheme, toggleSchemeStatus, updateScheme } from "../api/schemes.api"
import { useSearchParams } from "react-router-dom"
import { queryClient } from "@/lib/queryClient"
import { toast } from "sonner"

export const useGetAllSchemes = () => {
    const [searchParams] = useSearchParams()
    return useQuery({
        queryKey: ['schemes', Object.fromEntries(searchParams.entries())],
        queryFn: () => getAllSchemes(searchParams)
    })
}

export const useGetSingleScheme = (schemeId) => {
    return useQuery({
        queryKey: ["schemes", schemeId],
        queryFn: () => getSingleScheme(schemeId)
    })
}

export const useToggleSchemeStatus = () => {
    return useMutation({
        mutationFn: toggleSchemeStatus,
        onSuccess: (_, schemeId) => {
            queryClient.invalidateQueries(["schemes", schemeId])
            toast.success('Scheme status changed')
        },
        onError: error => {
            toast.error(
                error.response?.data?.message ||
                'Failed to moderate product'
            )
        }
    })
}

export const useCreateScheme = () => {
    return useMutation({
        mutationFn: createScheme,
        onSuccess: () => {
            queryClient.invalidateQueries(["schemes"])
            toast.success('Scheme Posted successfully')
        },
        onError: error => {
            toast.error(
                error.response?.data?.message ||
                'Failed to Create Scheme'
            )
        }

    })
}

export const useUpdateScheme = () => {
    return useMutation({
        mutationFn: updateScheme,
        onSuccess: () => {
            queryClient.invalidateQueries(["schemes"])
            toast.success('Scheme Updated successfully')
        },
        onError: error => {
            toast.error(
                error.response?.data?.message ||
                'Failed to update Scheme'
            )
        }

    })
}