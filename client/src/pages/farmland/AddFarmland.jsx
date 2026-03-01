import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FarmlandForm from "./components/FarmlandForm";
import PreviousCropForm from "./components/PreviousCropForm";
import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";

const AddFarmland = () => {
  const [step, setStep] = useState(1);
  const [createdFarmId, setCreatedFarmId] = useState(null);
  const navigate = useNavigate();

  const handleFarmlandSuccess = (id) => {
    setCreatedFarmId(id);
    setStep(2);
  };

  const handleCropSuccess = () => {
    queryClient.invalidateQueries(["farmlands"]);
    toast.success("Farmland and crop details saved successfully.");
    navigate("/farmer/farmland");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className={"cursor-pointer"}>
          <ArrowLeft className="h-6 w-6 text-muted-foreground" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {step === 1 ? "Add New Land" : "Add Previous Crop"}
          </h1>
          <p className="text-sm text-muted-foreground">Step {step} of 2</p>
        </div>
      </div>

      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>

      {step === 1 ? (
        <FarmlandForm onSuccess={handleFarmlandSuccess} />
      ) : (
        <PreviousCropForm
          farmlandId={createdFarmId}
          onComplete={handleCropSuccess}
        />
      )}
    </div>
  );
};

export default AddFarmland;
