import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, Building2, Briefcase } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const INDUSTRIES: Record<string, string[]> = {
  "Retail & Wholesale": [
    "End-to-end inventory management",
    "Retail price monitoring (Coming Soon)",
  ],
  "Wellness & Hospitality (Coming Soon)": [
    "Predicting Guest Numbers from CDP (Coming Soon)",
  ],
};

export default function ContextPage() {
  const navigate = useNavigate();
  const [industry, setIndustry] = useState("");
  const [useCase, setUseCase] = useState("");

  const useCases = industry ? INDUSTRIES[industry] || [] : [];
  const canContinue = industry && useCase && !useCase.includes("Coming Soon");

  const handleContinue = () => {
    sessionStorage.setItem("bp_industry", industry);
    sessionStorage.setItem("bp_useCase", useCase);
    navigate("/main");
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Back */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/canvas")}
            className="text-muted-foreground mb-6 -ml-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>

          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
              Step 1 of 2
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              Select Your Business Context
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Tell us your industry and use case so we can generate the right Business Play for you.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="card-glass">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
                <label className="text-sm font-bold text-foreground">Industry</label>
              </div>
              <Select
                value={industry}
                onValueChange={(val) => {
                  setIndustry(val);
                  setUseCase("");
                }}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(INDUSTRIES).map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="card-glass">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <label className="text-sm font-bold text-foreground">Business Use Case</label>
              </div>
              <Select
                value={useCase}
                onValueChange={setUseCase}
                disabled={!industry}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={industry ? "Select use case" : "Choose an industry first"} />
                </SelectTrigger>
                <SelectContent>
                  {useCases.map((uc) => (
                    <SelectItem key={uc} value={uc}>
                      {uc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Coming Soon State */}
          {useCase && useCase.includes("Coming Soon") && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-glass text-center py-12 border-2 border-dashed border-border mt-8"
            >
              <div className="text-5xl mb-4">⏳</div>
              <h2 className="text-lg font-extrabold text-foreground mb-2">{useCase}</h2>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                We're fine-tuning the Magical Creature logic for this industry. Available soon.
              </p>
              <span className="inline-block mt-4 bg-secondary text-muted-foreground text-xs font-semibold px-4 py-1.5 rounded-full">
                UNDER DEVELOPMENT
              </span>
            </motion.div>
          )}

          {/* Continue Button */}
          <div className="mt-8">
            <Button
              onClick={handleContinue}
              disabled={!canContinue}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base"
            >
              Continue to Strategy Generator <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
