import { api } from "../lib/axios"

export const getMyWishlist = async (params) => {
    const { data } = await api.get("/buyer/wishlist", {params : Object.fromEntries(params.entries())})
    return data
}

export const addToWishlist = async (payload) => {
    const { data } = await api.post("/buyer/wishlist/", payload)
    return data
}

export const deleteFromWishlist = async (listingId) => {
    const { data } = await api.delete(`/buyer/wishlist/${listingId}`)
    return data
}