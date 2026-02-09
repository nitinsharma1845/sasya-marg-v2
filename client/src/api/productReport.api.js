import { api } from "@/lib/axios"


export const reportProduct = async (payload) => {
    const { data } = await api.post("/product-report/", payload)
    return data
}
