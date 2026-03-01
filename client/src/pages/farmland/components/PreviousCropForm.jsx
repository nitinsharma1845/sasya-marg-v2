import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAddPreviousCrop } from "@/hooks/farmer.hooks";
import { Calendar, CheckCircle2, Leaf, Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PreviousCropForm = ({ farmlandId, onComplete }) => {
  const { mutate, isPending } = useAddPreviousCrop();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      season: "",
      year: new Date().getFullYear(),
    },
  });

  const watchedSeason = watch("season");


  const handleAddPreviouCrop = (payload) => {
    mutate(
      { farmlandId, payload },
      {
        onSuccess: () => onComplete(),
        onError: (err) => {
          toast.error(
            err.response?.data?.message || "Error while saving previous crop"
          );
        },
      }
    );
  };

  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-500">
      <div className="bg-primary/10 border border-primary text-primary p-4 rounded-lg flex items-center gap-3">
        <CheckCircle2 className="h-6 w-6" />
        <div>
          <h3 className="font-bold">Land Registered Successfully!</h3>
          <p className="text-xs opacity-90">
            Please add the last crop harvested on this land.
          </p>
        </div>
      </div>

      <Card className="border-border shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6 text-primary">
            <Leaf className="h-5 w-5" />
            <h2 className="font-bold text-lg text-foreground">
              Previous Crop History
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(handleAddPreviouCrop)}
            className="space-y-5"
          >
            {/* Crop Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Crop Name
              </label>
              <Input
                {...register("name", { required: "Crop name is required" })}
                placeholder="e.g. Wheat, Rice, Sugarcane"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <span className="text-xs text-destructive">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Year */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Year
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  {...register("year", {
                    valueAsNumber: true,
                    required: "Year is required",
                    min: 1900,
                    max: new Date().getFullYear(),
                  })}
                  className={`pl-9 ${errors.year ? "border-destructive" : ""}`}
                />
              </div>
              {errors.year && (
                <span className="text-xs text-destructive">
                  {errors.year.message}
                </span>
              )}
            </div>

            {/* Season */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Season <span className="text-destructive">*</span>
              </label>
              <input
                type="hidden"
                {...register("season", { required: "Select a season" })}
              />
              <div className="grid grid-cols-2 gap-3">
                {["summer", "winter", "monsoon", "post-monsoon"].map((s) => (
                  <div
                    key={s}
                    onClick={() =>
                      setValue("season", s, { shouldValidate: true })
                    }
                    className={`
                       cursor-pointer border rounded-lg p-3 text-center capitalize text-sm font-medium transition-all
                       ${
                         watchedSeason === s
                           ? "bg-primary text-primary-foreground border-primary shadow-md"
                           : "bg-background text-muted-foreground border-border hover:border-primary/50"
                       }
                     `}
                  >
                    {s}
                  </div>
                ))}
              </div>
              {errors.season && (
                <span className="text-xs text-destructive">
                  {errors.season.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4 cursor-pointer"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="mr-2 h-4 w-4" />
              )}
              Save Crop History
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviousCropForm;
