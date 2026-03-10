import { addPreviousCrop, changeEmail, changeIsContactVisisble, createFarmland, farmerDashboard, fetchFarmer, fetchFarmlands, fetchSingleFarmland, getCropSuggestion, getFarmerDetails, getSingleSuggestion, getSuggestionHisory, toggleFarmActiveStatus, updateFarmerData, updateFarmland } from "@/api/farmer.api"
import { queryClient } from "@/lib/queryClient"
import { useAuthStore } from "@/store/useAuthStore"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"


export const useFetchFarmer = () => {
    return useQuery({
        queryKey: ["farmer-profile"],
        queryFn: getFarmerDetails
    })
}

export const useChangeContactVisibility = () => {
    return useMutation({
        mutationFn: changeIsContactVisisble,

    })
}

export const useUpdateFarmerData = () => {
    const { user, setUser } = useAuthStore()
    return useMutation({
        mutationFn: updateFarmerData,
        onSuccess: (data) => {
            const updatedName = data?.data?.fullname
            const updatedEmail = data?.data?.email
            setUser(
                {
                    ...user,
                    fullname: updatedName,
                    email: updatedEmail
                }
            )
            queryClient.invalidateQueries(["farmer-profile"])
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update farmland");
        },

    })
}

export const useChangeEmail = () => {
    const { user, setUser } = useAuthStore()
    return useMutation({
        mutationFn: changeEmail,
        onSuccess: (data) => {
            const updatedEmail = data?.data?.email
            setUser(
                {
                    ...user,
                    email: updatedEmail
                }
            )
            queryClient.invalidateQueries(["farmer-profile"])
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update farmland");
        },
    })
}

export const useFetchFarmlands = (params) => {
    return useQuery({
        queryKey: ["farmlands", params],
        queryFn: () => fetchFarmlands(params)
    })
}

export const useFetchSingleFarmland = (farmlandId) => {
    return useQuery({
        queryKey: ["farmland", farmlandId],
        queryFn: () => fetchSingleFarmland(farmlandId),
        enabled: !!farmlandId,
    })
}

export const useCreateFarmland = () => {
    return useMutation({
        mutationFn: createFarmland,
    })
}

export const useAddPreviousCrop = () => {
    return useMutation({
        mutationFn: ({ farmlandId, payload }) => addPreviousCrop({ farmlandId, payload })
    })
}

export const useUpdateFarmland = () => {
    return useMutation({
        mutationFn: updateFarmland,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["farmland", variables._id]);
            queryClient.invalidateQueries(["farmlands"]);
            toast.success("Farmland updated successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update farmland");
        },
    })
}

export const useToggleFarmActiveSataus = () => {
    return useMutation({
        mutationFn: toggleFarmActiveStatus,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['farmland', variables._id])
            queryClient.invalidateQueries(["farmlands"])
        },
    })
}

export const useGetCropSUggestion = () => {
    return useMutation({
        mutationFn: getCropSuggestion,
        onSuccess: (res) => {
            queryClient.invalidateQueries(["suggestion-history"])
            queryClient.invalidateQueries(["suggestion-history", res.data._id])
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update farmland");
        }
    })
}


export const useGetSuggestionHisory = () => {
    return useQuery({
        queryKey: ["suggestion-history"],
        queryFn: getSuggestionHisory
    })
}

export const useGetSingleSuggestion = (id) => {
    return useQuery({
        queryKey: ["suggestion-history", id],
        queryFn: () => getSingleSuggestion(id)
    })
}

export const useFarmerDashboard = () => {
    return useQuery({
        queryKey: ["farmer-dashboard"],
        queryFn: farmerDashboard
    })
}

export const useGetFarmer = () => {
    return useQuery(
        {
            queryKey: ["farmer"],
            queryFn: fetchFarmer
        }
    )
}