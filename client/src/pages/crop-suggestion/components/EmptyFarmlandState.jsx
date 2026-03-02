import React from "react";
import { Sprout, MapPinPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const EmptyFarmlandState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 text-center border-dashed border-2 border-border/60 bg-muted/20 shadow-none">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-primary shadow-sm">
          <Sprout className="h-10 w-10" />
        </div>
        
        <h2 className="mb-3 text-2xl font-bold text-foreground">
          No Farmland Registered
        </h2>
        
        <p className="mb-8 text-muted-foreground leading-relaxed">
          To give you an accurate crop suggestion, our AI needs to know about your soil type and location. Please register your land to get started.
        </p>

        <Button 
          onClick={() => navigate("/farmer/farmland/add")}
          className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-primary-foreground group cursor-pointer"
        >
          <MapPinPlus className="mr-2 h-5 w-5" />
          Register New Farmland
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        
        <p className="mt-6 text-xs text-muted-foreground/60">
          Takes less than 2 minutes to setup.
        </p>
      </Card>
    </div>
  );
};

export default EmptyFarmlandState;