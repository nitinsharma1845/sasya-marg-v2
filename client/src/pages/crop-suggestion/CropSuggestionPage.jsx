import React, { useState } from "react";
import { BrainCircuit, Loader2, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useFetchFarmlands,
  useGetCropSUggestion,
  useGetSuggestionHisory,
} from "@/hooks/farmer.hooks";
import ProcessSteps from "./components/ProcessStep";
import EmptyFarmlandState from "./components/EmptyFarmlandState";
import AppLoader from "@/components/common/AppLoader";
import { toast } from "sonner";
import SuggestionResults from "./components/SuggestionCard";
import SuggestionHistory from "./components/SuggestionHistory";

const DAILY_LIMIT = 2;

const CropSuggestionPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestion] = useState(null);
  const [selectedFarmId, setSelectedFarmId] = useState("");

  const getSuggestion = useGetCropSUggestion();
 
  const { data, isLoading: fetchingFarms, isPending } = useFetchFarmlands({status : "active"});
  const { data: historyData, refetch: refetchHistory } =
    useGetSuggestionHisory();

  if (isLoading || isPending || fetchingFarms) {
    return <AppLoader />;
  }

  const farmlands = data.data.farmland

  if (!farmlands || farmlands.length === 0) {
    return <EmptyFarmlandState />;
  }

  const todayUsage =
    historyData?.data?.filter((item) => {
      const itemDate = new Date(item.createdAt).setHours(0, 0, 0, 0);
      const today = new Date().setHours(0, 0, 0, 0);
      return itemDate === today;
    }).length || 0;

  const remainingCredits = Math.max(0, DAILY_LIMIT - todayUsage);
  const isLimitReached = remainingCredits === 0;

  const handleGetSuggestion = () => {
    if (!selectedFarmId) return;

    if (isLimitReached) {
      toast.error("Daily limit reached. Please try again tomorrow.");
      return;
    }

    getSuggestion.mutate(selectedFarmId, {
      onSuccess: (data) => {
        setSuggestion(data.data);
        toast.success(data.message);
        setIsLoading(false);
        refetchHistory();
      },
      onError: (error) => {
        if (error.response?.status === 429) {
          toast.error("Daily limit reached! (2/day)");
        }
      },
    });
  };

  return (
    <div className="min-h-screen w-full bg-background p-4 md:p-8 text-foreground animate-in fade-in duration-500">
      <div className="mx-auto container space-y-8">
        <div className="text-center space-y-4">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm uppercase tracking-widest">
            Sasya Marg AI
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            Smart Crop Advisor
          </h1>

          <div className="flex justify-center mt-2">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
                isLimitReached
                  ? "bg-muted text-muted-foreground border-border"
                  : "bg-accent/10 text-accent-foreground border-accent/20"
              }`}
            >
              {isLimitReached ? (
                <Lock className="h-4 w-4 dark:text-foreground/50" />
              ) : (
                <Zap className="h-4 w-4 fill-current dark:text-foreground/50"  />
              )}
              <span className="text-sm dark:text-foreground/50 font-semibold">
                {isLimitReached
                  ? "Daily Limit Reached"
                  : `${remainingCredits}/${DAILY_LIMIT} Daily Analyses Left`}
              </span>
            </div>
          </div>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Select a farmland below to get personalized, science-backed crop
            recommendations.
          </p>
        </div>

        {!suggestions && !isLoading && !getSuggestion.isPending && (
          <div className="mx-auto max-w-md space-y-4 rounded-2xl bg-card p-6 shadow-lg border border-border relative overflow-hidden">
            {isLimitReached && (
              <div className="absolute inset-0 z-10 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
                <div className="bg-card border border-border p-4 rounded-lg shadow-xl text-center">
                  <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="font-semibold text-foreground">
                    Quota Exceeded
                  </p>
                  <p className="text-xs text-muted-foreground">
                    You can only generate 2 suggestions per day.
                  </p>
                </div>
              </div>
            )}

            <label className="text-sm font-medium text-muted-foreground ml-1">
              Select Your Farmland
            </label>
            <Select onValueChange={setSelectedFarmId} disabled={isLimitReached}>
              <SelectTrigger className="w-full h-12 text-base border-input bg-background focus:ring-primary">
                <SelectValue placeholder="Choose a farm..." />
              </SelectTrigger>
              <SelectContent>
                {farmlands.map((farm) => (
                  <SelectItem key={farm._id} value={farm._id}>
                    {farm.name} ({farm.location.district})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              size="lg"
              onClick={handleGetSuggestion}
              disabled={!selectedFarmId || isLimitReached}
              className={`w-full h-12 shadow-md transition-all ${
                isLimitReached
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02]"
              }`}
            >
              {isLimitReached ? (
                <span className="flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Limit Reached
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <BrainCircuit className="mr-2 h-5 w-5" /> Analyze & Suggest
                </span>
              )}
            </Button>
          </div>
        )}

        {getSuggestion.isPending && (
          <div className="w-full max-w-md mx-auto mt-12 space-y-6 text-center">
            <div className="relative mx-auto h-24 w-24">
              <div className="absolute inset-0 rounded-full border-4 border-muted opacity-30"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              <BrainCircuit className="absolute inset-0 m-auto h-10 w-10 text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                Analyzing Soil & Market...
              </h3>
              <p className="text-muted-foreground">
                AI is checking optimal conditions for{" "}
                {farmlands.find((f) => f._id === selectedFarmId)?.name}...
              </p>
            </div>
          </div>
        )}

        {suggestions && (
          <div className="animate-in slide-in-from-bottom-10 duration-700">
            <SuggestionResults
              data={suggestions}
              onReset={() => setSuggestion(null)}
            />
          </div>
        )}

        <div className="pt-8 border-t border-border/40">
          <SuggestionHistory />
        </div>

        {!suggestions && !getSuggestion.isPending && !isLoading && (
          <ProcessSteps />
        )}
      </div>
    </div>
  );
};

export default CropSuggestionPage;
