import { api } from "@/lib/axios"


export const getFarmerDetails = async () => {
    const { data } = await api.get("/farmer/me")
    return data
}

export const changeIsContactVisisble = async () => {
    const { data } = await api.put("/farmer/change/contact-visibility")
    return data
}
export const updateFarmerData = async (payload) => {
    const { data } = await api.put("/farmer/change/farmer-data", payload)
    return data
}

export const fetchFarmlands = async (params) => {
    const { data } = await api.get("/farmland/", { params: params })
    return data
}

export const fetchSingleFarmland = async (farmlandId) => {
    const { data } = await api.get(`/farmland/${farmlandId}`)
    return data
}

export const createFarmland = async (payload) => {
    const { data } = await api.post("/farmland/create", payload)
    return data
}

export const addPreviousCrop = async ({ farmlandId, payload }) => {
    const farmLandId = farmlandId
    const { data } = await api.post(`/previous-crop/${farmLandId}`, payload)
    return data
}

export const updateFarmland = async ({ farmlandId, payload }) => {
    const { data } = await api.patch(`/farmland/${farmlandId}`, payload)
    return data
}

export const toggleFarmActiveStatus = async (farmlandId) => {
    const { data } = await api.patch(`/farmland/active-status/${farmlandId}`)
    return data
}

export const getCropSuggestion = async (farmlandId) => {
    const { data } = await api.get(`/crop-suggestion/${farmlandId}`)
    return data
}

export const getSuggestionHisory = async () => {
    const { data } = await api.get("/suggestion/history/")
    return data
}

export const getSingleSuggestion = async (id) => {
    const { data } = await api.get(`/suggestion/history/${id}`)
    return data
}

export const farmerDashboard = async () => {
    const { data } = await api.get('/farmer/dashboard')
    return data
}

export const fetchFarmer = async () => {
    const { data } = await api.get("/farmer/me")
    return data
}

export const changeEmail = async (payload) => {
    const { data } = await api.put("/farmer/change/email", payload)
    return data
}