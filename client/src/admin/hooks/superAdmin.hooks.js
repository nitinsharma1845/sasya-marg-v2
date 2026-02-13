import { useQuery } from "@tanstack/react-query"
import { getAllAdmins, superAdminDashboard } from "../api/superAdmin.api"

export const useGetSuperAdminDashboard = () => {
    return useQuery({
        queryKey: ['dashboard', 'super-admin'],
        queryFn: superAdminDashboard
    })
}

export const useGetAllAdmins = () => {
    return useQuery({
        queryKey: ['admins'],
        queryFn: getAllAdmins
    })
}