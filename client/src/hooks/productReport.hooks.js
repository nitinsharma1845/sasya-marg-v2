import { getProductReports, reportProduct } from "@/api/productReport.api";
import { queryClient } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useReportProduct = () => {
  return useMutation({
    mutationFn: reportProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["reports"]);
      toast.success(
        data?.message ||
          "Your dispute is under review by admin, wait for action.",
      );
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to post dispute");
    },
  });
};

export const useGetReports = () => {
  return useQuery({
    queryKey: ["reports"],
    queryFn: getProductReports,
  });
};
