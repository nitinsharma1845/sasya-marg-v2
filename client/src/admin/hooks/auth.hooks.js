import { useMutation } from "@tanstack/react-query"
import { loginAdmin, logoutAdmin } from "../api/auth.api"
import { useAuthStore } from "@/store/useAuthStore"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useLoginAdmin = () => {
    const { setUser } = useAuthStore()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: loginAdmin,
        onSuccess: (data) => {
            setUser(data.data)
            toast.success("Login successfully")
            navigate(`/admin/dashboard`)
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to Login");
        }
    })
}


export const useLogoutAdmin = () => {
    const { clearUser } = useAuthStore()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: logoutAdmin,
        onSuccess: () => {
            clearUser()
            toast.success("Logout successfully")
            navigate(`/`)
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to Logout");
        }
    })
}