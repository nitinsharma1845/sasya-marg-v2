import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Sprout, Ruler, IndianRupee, Power } from "lucide-react";
import {
  useToggleFarmActiveSataus,
  useUpdateFarmland,
} from "@/hooks/farmer.hooks";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const EditFarmlandSheet = ({ isOpen, onClose, farmland }) => {
  const updateMutation = useUpdateFarmland();
  const toggleMutation = useToggleFarmActiveSataus();
  const [isActive, setIsActive] = useState(farmland.isActive);
  const isPending = updateMutation.isPending;

  const isToggling = toggleMutation.isPending;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      size: { value: "", unit: "beegha" },
      soilType: "",
      water: { source: "", type: "normal" },
      budget: "",
    },
  });

  useEffect(() => {
    if (isOpen && farmland) {
      setValue("name", farmland.name);
      setValue("size.value", farmland.size?.value);
      setValue("size.unit", farmland.size?.unit || "beegha");
      setValue("soilType", farmland.soilType);
      setValue("water.source", farmland.water?.source);
      setValue("water.type", farmland.water?.type || "normal");
      setValue("budget", farmland.budget);
    }
  }, [isOpen, farmland, setValue]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      size: { ...data.size, value: Number(data.size.value) },
      budget: Number(data.budget),
    };

    updateMutation.mutate(
      { farmlandId: farmland._id, payload },
      {
        onSuccess: () => {
          onClose();
          reset();
        },
      }
    );
  };

  const handleStatusChange = () => {
    setIsActive((prev) => !prev);
    toggleMutation.mutate(farmland._id, {
      onError: (err) => {
        setIsActive((prev) => !prev);
        toast.error(err.response?.data?.message || "Failed to change password");
      },
      onSuccess: (res) => {
        if (res?.data?.isActive !== undefined) {
          setIsActive(res.data.isActive);
          toast.success(res.message);
        }
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="h-full w-full overflow-y-auto border-l-border bg-background sm:max-w-md p-4"
      >
        <SheetHeader className="mb-6 text-left">
          <SheetTitle className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <Sprout className="h-6 w-6 text-primary" />
            Edit Farmland
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Update the key details of your land. Location cannot be changed.
          </SheetDescription>
        </SheetHeader>

        <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4 shadow-sm">
          <div className="space-y-0.5">
            <Label className="text-base font-medium text-foreground flex items-center gap-2">
              <Power
                className={`h-4 w-4 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
              Farmland Status
            </Label>
            <p className="text-xs text-muted-foreground">
              {isActive ? "Active & Visible" : "Inactive (Hidden)"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isToggling && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
            <Switch
              checked={isActive}
              onCheckedChange={handleStatusChange}
              disabled={isToggling}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-8">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Farm Name
            </label>
            <Input
              {...register("name", { required: "Name is required" })}
              placeholder="e.g. My Mango Farm"
              className="bg-background border-input focus-visible:ring-primary"
            />
            {errors.name && (
              <span className="text-xs text-destructive">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Size
              </label>
              <div className="relative">
                <Ruler className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("size.value", { required: true, min: 0.1 })}
                  type="number"
                  step="0.1"
                  className="pl-9 bg-background"
                  placeholder="0.0"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Unit
              </label>
              <Controller
                name="size.unit"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acre">Acre</SelectItem>
                      <SelectItem value="hectare">Hectare</SelectItem>
                      <SelectItem value="beegha">Beegha</SelectItem>
                      <SelectItem value="sqft">Sq. Ft</SelectItem>
                      <SelectItem value="sqm">Sq. Ft</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Soil Type
            </label>
            <Controller
              name="soilType"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Soil Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alluvial">Alluvial Soil</SelectItem>
                    <SelectItem value="black">Black Soil (Kali)</SelectItem>
                    <SelectItem value="red">Red Soil (Lal)</SelectItem>
                    <SelectItem value="clay">Clay Soil</SelectItem>
                    <SelectItem value="sandy">Sandy Soil</SelectItem>
                    <SelectItem value="loamy">Loamy Soil</SelectItem>
                    <SelectItem value="silty">Silty Soil</SelectItem>
                    <SelectItem value="laterite">Laterite Soil</SelectItem>
                    <SelectItem value="arid">Arid Soil</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Water Source
            </label>
            <Controller
              name="water.source"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ground Water">
                      Ground Water (Tube Well)
                    </SelectItem>
                    <SelectItem value="Canal">Canal (Nahar)</SelectItem>
                    <SelectItem value="Rainfed">Rainfed (Barish)</SelectItem>
                    <SelectItem value="Pond">Pond/Lake</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Estimated Budget (₹)
            </label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                {...register("budget", { required: true, min: 0 })}
                type="number"
                className="pl-9 bg-background"
                placeholder="50000"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary py-6 text-primary-foreground shadow-lg hover:bg-primary/90 cursor-pointer"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditFarmlandSheet;
