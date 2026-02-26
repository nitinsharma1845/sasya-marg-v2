import { useMutation, useQuery } from "@tanstack/react-query"
import { blockBuyer, blockFarmer, changeEmail, changeName, changePassword, changePhone, getAdminDasboard, getInvites, getProfile, revokeInvite, unblockBuyer, unBlockFarmer } from "../api/admin.api"
import { useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import { queryClient } from "@/lib/queryClient"
import { useAuthStore } from "@/store/useAuthStore"

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


export const useGetAdminProfile = () => {
    return useQuery({
        queryKey: ['admin'],
        queryFn: getProfile
    })
}


export const useChangePassword = () => {
    return useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            queryClient.invalidateQueries(['admin'])
            toast.success("Password changed Successfully")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to change password")
        }
    })
}

export const useChangName = () => {
    const { setUser, user } = useAuthStore()
    return useMutation({
        mutationFn: changeName,
        onSuccess: (res) => {
            const updatedName = res.data.fullname;
            queryClient.invalidateQueries(['admin'])
            setUser({
                ...user,
                fullname: updatedName,
            });
            toast.success("Fullname changed Successfully")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to change name")
        }
    })
}

export const useChangPhone = () => {
    const { setUser, user } = useAuthStore()
    return useMutation({
        mutationFn: changePhone,
        onSuccess: (res) => {
            const updatedPhone = res.data.phone;
            queryClient.invalidateQueries(['admin'])
            setUser({
                ...user,
                phone: updatedPhone,
            });
            toast.success("Phone Number changed Successfully")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to change Phone number")
        }
    })
}


export const useChangEmail = () => {
    const { setUser, user } = useAuthStore()
    return useMutation({
        mutationFn: changeEmail,
        onSuccess: (res) => {
            const updatedEmail = res.data.email;
            queryClient.invalidateQueries(['admin'])
            setUser({
                ...user,
                email: updatedEmail,
            });
            toast.success("Email changed Successfully")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to change email")
        }
    })
}