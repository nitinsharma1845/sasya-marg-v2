import { useQuery } from "@tanstack/react-query"
import { superAdminDashboard } from "../api/superAdmin.api"

export const useGetSuperAdminDashboard = ()=>{
    return useQuery({
        queryKey : ['dashboard', 'super-admin'],
        queryFn : superAdminDashboard
    })
}