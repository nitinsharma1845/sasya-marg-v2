import { api } from "@/lib/axios"

export const getHarvestedProducts = async (searchParams) => {
    const { data } = await api.get("/admin/listings/harvested", { params: Object.fromEntries(searchParams.entries()) })
    return data
}



export const getPreHarvestedProducts = async (searchParams) => {
    const { data } = await api.get("/admin/listings/pre-harvested", { params: Object.fromEntries(searchParams.entries()) })
    return data
}

export const getSingleHarvestedProduct = async (productId) => {
    const { data } = await api.get(`/admin/listings/harvested/${productId}`)
    return data
}

export const getSinglePreHarvestedProduct = async (productId) => {
    const { data } = await api.patch(`/admin/listings/pre-harvested/${productId}`)
    return data
}

export const moderateHravestedProduct = async (payload) => {
    const { data } = await api.patch(
        `/admin/listings/harvested/${payload.listingId}/moderate`,
        {
            action: payload.action,
            reason: payload.reason
        }
    )
    return data
}