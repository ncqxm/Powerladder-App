import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BusinessPlaySummaryCard from "@/components/BusinessPlaySummaryCard";
import StrategyMap from "@/components/StrategyMap";
import ChatInterface from "@/components/ChatInterface";
import {
  calculateSweetSpot,
  classifyBusinessPlay,
  BUSINESS_PLAY_DESCRIPTIONS,
} from "@/lib/business-logic";
import { TrendingUp, Shield, Compass, AlertTriangle, CheckCircle, Info, XCircle, ChevronLeft, Search } from "lucide-react";

export default function MainPage() {
  const navigate = useNavigate();
  const [industry, setIndustry] = useState("");
  const [useCase, setUseCase] = useState("");

  const [fUnits, setFUnits] = useState(40);
  const [iBuy, setIBuy] = useState(40);
  const [uCost, setUCost] = useState(250);
  const [cCash, setCCash] = useState(15000);
  const [aAr, setAAr] = useState(5000);
  const [cLiab, setCLiab] = useState(12000);

  const [analyzed, setAnalyzed] = useState(false);

  useEffect(() => {
    const ind = sessionStorage.getItem("bp_industry");
    const uc = sessionStorage.getItem("bp_useCase");
    if (!ind || !uc) {
      navigate("/context");
      return;
    }
    setIndustry(ind);
    setUseCase(uc);
  }, [navigate]);

  const investmentNeeded = iBuy * uCost;
  const cashAfter = Math.max(cCash - investmentNeeded, 0);
  const result = calculateSweetSpot(fUnits, iBuy, cashAfter, aAr, cLiab);
  const derivedPlay = classifyBusinessPlay(result.opportunity, result.financialRisk, result.sweetSpot);
  const diff = result.opportunity - result.financialRisk;
  const playInfo = BUSINESS_PLAY_DESCRIPTIONS[derivedPlay];

  const AlertIcon = {
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
    success: CheckCircle,
  }[playInfo.alertType];

  const alertColor = {
    error: "bg-rose/10 border-rose/30 text-rose",
    warning: "bg-amber/10 border-amber/30 text-amber",
    info: "bg-primary/10 border-primary/30 text-primary",
    success: "bg-emerald/10 border-emerald/30 text-emerald",
  }[playInfo.alertType];

  if (!industry) return null;

  const inputFields = [
    { label: "ML Forecast (Units Needed)", value: fUnits, setter: setFUnits },
    { label: "Inventory to Purchase (Units)", value: iBuy, setter: setIBuy, min: 0 },
    { label: "Unit Cost (USD)", value: uCost, setter: setUCost },
    { label: "Current Cash on Hand", value: cCash, setter: setCCash },
    { label: "Accounts Receivable", value: aAr, setter: setAAr },
    { label: "Current Liabilities", value: cLiab, setter: setCLiab },
  ];

  return (
    <div>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate("/context")} className="-ml-2 text-muted-foreground">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div className="h-5 w-px bg-border" />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Step 2 of 2</span>
            <h1 className="text-2xl md:text-3xl font-black text-foreground leading-tight">
              Strategy Generator
            </h1>
          </div>
        </div>

        {/* Context Badge */}
        <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-1.5 mb-8 text-sm">
          <span className="text-muted-foreground">{industry}</span>
          <span className="text-muted-foreground">→</span>
          <span className="font-semibold text-foreground">{useCase}</span>
        </div>

        {/* Input Form */}
        <section className="card-glass mb-8">
          <h3 className="font-bold text-foreground mb-5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            ML Forecast & Financial Inputs
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
            {inputFields.map((field) => (
              <div key={field.label} className="space-y-1.5">
                <Label className="text-xs">{field.label}</Label>
                <Input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.setter(+e.target.value)}
                  min={field.min}
                  className="h-10"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Validation */}
        {cLiab <= 0 && (
          <div className="bg-rose/10 border border-rose/30 rounded-xl p-4 mb-6 text-rose font-medium text-sm">
            ⚠️ Current Liabilities cannot be zero
          </div>
        )}

        {cLiab > 0 && (
          <>
            {/* Analyze Button */}
            <div className="flex justify-center mb-10">
              <button onClick={() => setAnalyzed(true)} className="btn-cta text-base px-10 py-3.5 flex items-center gap-2">
                <Search className="h-4 w-4" /> Analyze My Strategy
              </button>
            </div>

            {/* Results Dashboard */}
            <section className="grid lg:grid-cols-[1fr_1.5fr] gap-6 mb-8">
              <BusinessPlaySummaryCard
                basePlay="Dinosaur Hoping for Luck"
                derivedPlay={derivedPlay}
                sweetSpot={result.sweetSpot}
                opportunityScore={result.opportunity}
                financialRiskScore={result.financialRisk}
              />
              <StrategyMap
                opportunity={result.opportunity}
                financialRisk={result.financialRisk}
                sweetSpot={result.sweetSpot}
                derivedPlay={derivedPlay}
              />
            </section>

            {/* Key Metrics */}
            <section className="grid grid-cols-3 gap-4 mb-6">
              {[
                { icon: TrendingUp, label: "Investment Required", value: `$${investmentNeeded.toLocaleString()}` },
                { icon: Shield, label: "Quick Ratio", value: result.qr.toFixed(2) },
                { icon: Compass, label: "Balance (Off - Def)", value: diff.toFixed(1) },
              ].map((m) => (
                <div key={m.label} className="card-glass text-center">
                  <m.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                  <div className="text-xs text-muted-foreground font-medium">{m.label}</div>
                  <div className="text-2xl font-bold text-foreground">{m.value}</div>
                </div>
              ))}
            </section>

            {/* Alert */}
            <div className={`rounded-xl border p-4 mb-10 flex items-start gap-3 ${alertColor}`}>
              <AlertIcon className="h-5 w-5 shrink-0 mt-0.5" />
              <span className="text-sm font-medium">{playInfo.alertMsg}</span>
            </div>

            {/* Chat */}
            {analyzed && (
              <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <ChatInterface />
              </motion.section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
