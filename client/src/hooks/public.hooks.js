import { subscribeToNewsletter, unSubscribeToNewsletter } from "@/api/public.api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

export const useSubscribeToNewsletter = () => {
    return useMutation({
        mutationFn: subscribeToNewsletter,
        onSuccess: () => {
            toast.success("You have successfully subscribe to SasyaMarg newsletter! ")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to Subscribe to newsleter");
        },
    })
}

export const useUnSubscribeToNewsletter = (token) => {
    return useQuery({
        queryKey: ['newsletter', 'unsubscribe'],
        queryFn: () => unSubscribeToNewsletter(token)
    })
}