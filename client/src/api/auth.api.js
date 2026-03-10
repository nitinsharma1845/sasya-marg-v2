import { api } from "@/lib/axios";

export const sendOtp = async ({ phone, email, purpose }) => {
    const payload = phone ? { phone } : { email }

    const { data } = await api.post(`/otp/send?purpose=${purpose}`, payload)

    return data
}

export const registerFarmer = async (payload) => {
    const { data } = await api.post("/farmer/auth/register", payload)
    return data
}

export const logoutFarmer = async () => {
    const { data } = await api.post("/farmer/logout")
    return data
}

export const loginFarmerWithOtp = async ({ phone, otp }) => {
    const { data } = await api.post("/farmer/auth/login/otp", { phone, otp })
    return data
}

export const loginFarmerWithPasword = async ({ phone, password }) => {
    const { data } = await api.post("/farmer/auth/login/password", { phone, password })
    return data
}

export const forgotPassword = async (payload) => {
    const { data } = await api.put("/farmer/auth/forgot-password", payload)
    return data
}