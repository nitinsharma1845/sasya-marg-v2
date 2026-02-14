import { useQuery } from "@tanstack/react-query"
import { getAllAdmins, getAllBuyer, getAllFarmers, superAdminDashboard } from "../api/superAdmin.api"
import { useSearchParams } from "react-router-dom"

export const useGetSuperAdminDashboard = () => {
    return useQuery({
        queryKey: ['dashboard', 'super-admin'],
        queryFn: superAdminDashboard
    })
}

export const useGetAllAdmins = () => {
    const [searchParams] = useSearchParams()
    return useQuery({
        queryKey: ['admins', Object.fromEntries(searchParams.entries())],
        queryFn: () => getAllAdmins(searchParams)
    })
}

export const useGetAllFarmers = () => {
    const [searchParams] = useSearchParams()
    return useQuery({
        queryKey: ['farmers', Object.fromEntries(searchParams.entries())],
        queryFn: () => getAllFarmers(searchParams)
    })
}

export const useGetAllBuyers = () => {
    const [searchParams] = useSearchParams()
    return useQuery({
        queryKey: ['buyers', Object.fromEntries(searchParams.entries())],
        queryFn: () => getAllBuyer(searchParams)
    })
}