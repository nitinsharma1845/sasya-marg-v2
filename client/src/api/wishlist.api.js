import { api } from "../lib/axios"

export const getMyWishlist = async (params) => {
    const { data } = await api.get("/buyer/wishlist", { params })
    return data
}