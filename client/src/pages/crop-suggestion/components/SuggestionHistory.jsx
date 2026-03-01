import React from "react";
import { History, Calendar, ArrowUpRight, Sprout } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useGetSuggestionHisory } from "@/hooks/farmer.hooks";
import { useNavigate } from "react-router-dom";

const SuggestionHistory = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetSuggestionHisory();
  const history = data?.data || [];

  if (isLoading) return null;
  if (history.length === 0) return null;

  return (
    <div className="mt-16 space-y-6">
      <div className="flex items-center gap-2">
        <History className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">
          Recent Suggestions
        </h2>
      </div>

      <ScrollArea className="w-full whitespace-nowrap rounded-md border border-border/40 bg-background/50 p-4">
        <div className="flex w-max space-x-4 pb-4">
          {history.map((item) => (
            <HistoryCard
              key={item._id}
              item={item}
              redirectTo={() => navigate(`/farmer/get-suggestion/${item._id}`)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

const HistoryCard = ({ item, redirectTo }) => {
  const topResult = item.result?.[0] || {};

  const farmName = item.farmLandSnapshot?.name || "Unknown Land";

  const date = new Date(item.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const score = topResult.score || 0;

  const cropName =
    topResult.cropId?.name || topResult.name || "Crop Suggestion";

  return (
    <Card className="w-70 shrink-0 border-border bg-card hover:border-primary/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge
            variant="outline"
            className="bg-secondary text-primary border-transparent text-xs"
          >
            {date}
          </Badge>
          <Sprout className="h-4 w-4 text-muted-foreground" />
        </div>

        <CardTitle className="text-lg font-bold pt-2 truncate" title={cropName}>
          {cropName}
        </CardTitle>

        <p className="text-xs text-muted-foreground truncate" title={farmName}>
          {farmName}
        </p>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-muted-foreground">Match Score</span>
          <span className="font-semibold text-foreground">{score}%</span>
        </div>

        <Button
          variant="outline"
          className="w-full mt-4 h-8 text-xs text-primary hover:text-primary hover:bg-primary/5 cursor-pointer"
          onClick={redirectTo}
        >
          View Details <ArrowUpRight className="ml-1 h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuggestionHistory;
