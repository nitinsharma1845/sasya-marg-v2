import { useMutation, useQuery } from "@tanstack/react-query"
import { getInvites, revokeInvite } from "../api/admin.api"
import { useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import { queryClient } from "@/lib/queryClient"

export const useGetInvites = () => {
    const [searchParams] = useSearchParams()
    return useQuery({
        queryKey: ["invites", Object.fromEntries(searchParams.entries())],
        queryFn: () => getInvites(searchParams)
    })
}

export const useRevokeInvite = () => {
    return useMutation({
        mutationFn: revokeInvite,
        onSuccess: () => {
            toast.success("Invite Link Revoked!")
            queryClient.invalidateQueries(["invites"])
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to revoke invite");
        }
    })
}