import { api } from "@/lib/axios"


export const buyerLoginWithPassword = async ({ identifier, password }) => {
    const { data } = await api.post("/buyer/auth/login/password", { identifier, password })
    return data
}

export const buyerLoginWithOtp = async ({ phone, otp }) => {
    const { data } = await api.post("/buyer/auth/login/otp", { phone, otp })
    return data
}

export const buyerSignup = async (payload) => {
    const { data } = await api.post("/buyer/auth/register", payload)
    return data
}

export const forgotBuyerPassword = async (payload) => {
    const { data } = await api.put("/buyer/auth/forgot-password", payload)
    return data
}

export const getBuyerProfile = async () => {
    const { data } = await api.get("/buyer/me")
    return data
}
export const updateBuyerProfile = async (payload) => {
    const { data } = await api.put("/buyer/update-profile", payload)
    return data
}

export const updateBuyerAddress = async (payload) => {
    const { data } = await api.patch("/buyer/address", { address: payload })
    return data
}

export const getDashboard = async () => {
    const { data } = await api.get('/buyer/dashboard')
    return data
}

export const logoutBuyer = async () => {
    const { data } = await api.post("/buyer/logout")
    return data
}