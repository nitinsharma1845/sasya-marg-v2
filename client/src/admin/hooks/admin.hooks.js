import { useMutation, useQuery } from "@tanstack/react-query"
import { blockBuyer, blockFarmer, getAdminDasboard, getInvites, revokeInvite, unblockBuyer, unBlockFarmer } from "../api/admin.api"
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

export const useBlockFarmer = () => {
    return useMutation({
        mutationFn: blockFarmer,
        onSuccess: () => {
            toast.success("User blocked Successfully")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to block Farmer");
        }
    })
}


export const useUnBlockFarmer = () => {
    return useMutation({
        mutationFn: unBlockFarmer,
        onSuccess: (_, farmerId) => {
            queryClient.invalidateQueries(['farmer', farmerId])
            toast.success("User unblocked Successfully")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to unblock Farmer")
        }
    })
}


export const useGetAdminDashboard = () => {
    return useQuery({
        queryKey: ['admin', 'dashbaord'],
        queryFn: getAdminDasboard
    })
}


export const useBlockBuyer = () => {
    return useMutation({
        mutationFn: blockBuyer,
        onSuccess: () => {
            toast.success("User blocked Successfully")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to block Buyer");
        }
    })
}



export const useUnBlockBuyer = () => {
    return useMutation({
        mutationFn: unblockBuyer,
        onSuccess: (_, buyerId) => {
            queryClient.invalidateQueries(['farmer', buyerId])
            toast.success("User unblocked Successfully")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to unblock Buyer")
        }
    })
}

