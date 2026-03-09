import { useMutation, useQuery } from "@tanstack/react-query"
import { createCampaign, getCampaign } from "../api/emailCampaign.api"
import { useSearchParams } from "react-router-dom"

export const useCreateCampaign = () => {
    return useMutation({
        mutationFn: createCampaign
    })
}

export const useGetCampaign = () => {
    const [searchParams] = useSearchParams()
    return useQuery({
        queryKey: ["campaign", Object.fromEntries(searchParams.entries())],
        queryFn: () => getCampaign(searchParams)
    })
}