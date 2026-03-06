import { useEffect } from "react";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";

const AuthProvider = ({ children }) => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);
  const startLoading = useAuthStore((s) => s.startLoading);

  useEffect(() => {
    startLoading();

    api
      .get("/auth/me", {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-store",
        },
      })
      .then((res) => {
        const payload = res.data.data;
        console.log("AUTH PROVIDER : ", payload)
        setUser(payload);
      })
      .catch(() => {
        clearUser();
      });
  }, []);

  return children;
};

export default AuthProvider;
