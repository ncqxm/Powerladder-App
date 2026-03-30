import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-header mb-4">Start with your business</h1>
          <p className="text-base text-muted-foreground mb-10 mt-6">
            Tell us what kind of business you're working on.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Industry
              </label>
              <Select
                value={industry}
                onValueChange={(val) => {
                  setIndustry(val);
                  setUseCase("");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
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

            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Business Use Case
              </label>
              <Select
                value={useCase}
                onValueChange={setUseCase}
                disabled={!industry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select use case" />
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

          {useCase && useCase.includes("Coming Soon") && (
            <div className="card-glass text-center py-16 border-2 border-dashed border-border mb-8">
              <div className="text-6xl mb-4">⏳</div>
              <h2 className="text-xl font-extrabold text-foreground mb-3">{useCase}</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                We are currently fine-tuning the <strong>Magical Creature</strong> logic
                for this specific industry. Available in the next update.
              </p>
              <span className="inline-block mt-6 bg-secondary text-muted-foreground text-xs font-semibold px-5 py-2 rounded-full">
                STATUS: UNDER DEVELOPMENT
              </span>
            </div>
          )}

          <hr className="border-border my-8" />

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate("/canvas")} className="flex-1">
              ← Back to Business Play
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!canContinue}
              className="flex-1 bg-primary text-primary-foreground"
            >
              Continue →
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
