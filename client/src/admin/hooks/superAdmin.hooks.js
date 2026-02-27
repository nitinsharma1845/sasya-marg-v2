import { useQuery } from "@tanstack/react-query"
import { getAdminById, getAllAdmins, getAllBuyer, getAllFarmers, getBuyerById, getFarmerById, getLogs, superAdminDashboard } from "../api/superAdmin.api"
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

export const useGetAdminById = (adminId) => {
    return useQuery({
        queryKey: ['admin', adminId],
        queryFn: () => getAdminById(adminId)
    })
}

export const useGetBuyerById = (buyerId) => {
    return useQuery({
        queryKey: ['buyer', buyerId],
        queryFn: () => getBuyerById(buyerId)
    })
}


export const useGetFarmerById = (farmerId) => {
    return useQuery({
        queryKey: ['farmer', farmerId],
        queryFn: () => getFarmerById(farmerId)
    })
}


export const useGetLogs = () => {
    const [searchParams] = useSearchParams()
    return useQuery({
        queryKey: ['logs', Object.fromEntries(searchParams.entries())],
        queryFn: () => getLogs(searchParams)
    })
}
