import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useFetchSingleFarmland } from "@/hooks/farmer.hooks";
import FarmlandHeader from "./components/FarmlandHeader";
import WeatherCurrentCard from "./components/WeatherCurrentCard";
import ForecastList from "./components/ForecastList";
import FarmlandStatsGrid from "./components/FarmlandStatGrid";
import EditFarmlandSheet from "./components/EditFarmlandSheet";

const FarmlandDetailsPage = () => {
  const { farmlandId } = useParams();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data, isLoading, isError, error } =
    useFetchSingleFarmland(farmlandId);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-primary">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background text-destructive">
        <AlertCircle className="h-12 w-12" />
        <p className="text-lg font-medium">
          Error loading farmland: {error.message}
        </p>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="border-destructive text-destructive hover:bg-destructive/10 cursor-pointer"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  const farmland = data?.data;

  return (
    <div className="min-h-screen space-y-8 bg-background p-4 md:p-8 md:container md:mx-auto">
      <FarmlandHeader farmland={farmland} onEdit={() => setIsEditOpen(true)} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-1">
          <WeatherCurrentCard weather={farmland.weather?.current} />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ForecastList forecast={farmland.weather?.forecast} />
        </div>
      </div>

      <FarmlandStatsGrid data={farmland} />

      <EditFarmlandSheet
        onClose={() => setIsEditOpen(false)}
        farmland={farmland}
        isOpen={isEditOpen}
      />
    </div>
  );
};

export default FarmlandDetailsPage;
