import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./app/routes/AppRoutes";
import AuthProvider from "./app/auth/AuthProvider";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "sonner";
import AppLoader from "@/components/common/AppLoader";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { useThemeStore } from "./store/useThemeStrore";

export const RootShell = () => {
  const loading = useAuthStore((s) => s.loading);
  const { theme } = useThemeStore();


  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <>
      {loading && <AppLoader />}
      <RouterProvider router={router} />
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RootShell />
      <Toaster position="bottom-left" richColors closeButton />
    </QueryClientProvider>
  </AuthProvider>
);
