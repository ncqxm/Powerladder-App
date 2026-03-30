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
import { TrendingUp, Shield, Compass, AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

export default function MainPage() {
  const navigate = useNavigate();
  const [industry, setIndustry] = useState("");
  const [useCase, setUseCase] = useState("");

  // Inputs
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

  // Calculations
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

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-5xl font-black text-foreground mb-2">
            🦄 Business Play
          </h1>
          <p className="text-muted-foreground mb-6">
            {industry} → {useCase}
          </p>

          <hr className="border-border mb-8" />

          {/* Explore section */}
          <h2 className="section-header mb-6">🏜 Explore Business Play</h2>
          <div className="card-glass mb-8">
            <h3 className="font-bold text-foreground mb-3">{useCase}</h3>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
              <li><strong className="text-foreground">Calculated Ambition:</strong> Finding the right balance between opportunities and financial risks.</li>
              <li><strong className="text-foreground">Handle the Ski:</strong> Score more than 80/100 points combining opportunities with risk mitigation.</li>
              <li><strong className="text-foreground">Dinosaur Hoping for Luck:</strong> Based on Standard Deviation from actual business data.</li>
              <li><strong className="text-foreground">Unicorn Mistake Step:</strong> When growth outpaces financial readiness.</li>
            </ul>
          </div>

          {/* Generator */}
          <h2 className="section-header mb-6">🛡️ Business Play Generator</h2>

          <div className="card-glass mb-6">
            <h3 className="font-semibold text-foreground mb-4">Step 1: ML Forecast & Cost Inputs</h3>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-1">
                <Label>ML Forecast (Units Needed)</Label>
                <Input type="number" value={fUnits} onChange={(e) => setFUnits(+e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Current Cash on Hand</Label>
                <Input type="number" value={cCash} onChange={(e) => setCCash(+e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Inventory to Purchase (Units)</Label>
                <Input type="number" value={iBuy} onChange={(e) => setIBuy(+e.target.value)} min={0} />
              </div>
              <div className="space-y-1">
                <Label>Accounts Receivable</Label>
                <Input type="number" value={aAr} onChange={(e) => setAAr(+e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Unit Cost (USD)</Label>
                <Input type="number" value={uCost} onChange={(e) => setUCost(+e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Current Liabilities</Label>
                <Input type="number" value={cLiab} onChange={(e) => setCLiab(+e.target.value)} />
              </div>
            </div>
          </div>

          {cLiab <= 0 && (
            <div className="bg-rose/10 border border-rose/30 rounded-xl p-4 mb-6 text-rose font-medium">
              Current Liabilities cannot be zero
            </div>
          )}

          {cLiab > 0 && (
            <>
              <div className="flex justify-center mb-8">
                <Button
                  onClick={() => setAnalyzed(true)}
                  className="btn-cta text-base px-10"
                >
                  🔍 Analyze My Strategy
                </Button>
              </div>

              {/* Dashboard */}
              <div className="grid md:grid-cols-[1fr_1.5fr] gap-6 mb-8">
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
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="card-glass text-center">
                  <TrendingUp className="h-5 w-5 text-primary mx-auto mb-2" />
                  <div className="text-xs text-muted-foreground font-medium">Investment Required</div>
                  <div className="text-2xl font-bold text-foreground">${investmentNeeded.toLocaleString()}</div>
                </div>
                <div className="card-glass text-center">
                  <Shield className="h-5 w-5 text-primary mx-auto mb-2" />
                  <div className="text-xs text-muted-foreground font-medium">Quick Ratio</div>
                  <div className="text-2xl font-bold text-foreground">{result.qr.toFixed(2)}</div>
                </div>
                <div className="card-glass text-center">
                  <Compass className="h-5 w-5 text-primary mx-auto mb-2" />
                  <div className="text-xs text-muted-foreground font-medium">Balance (Off - Def)</div>
                  <div className="text-2xl font-bold text-foreground">{diff.toFixed(1)}</div>
                </div>
              </div>

              {/* Alert */}
              <div className={`rounded-xl border p-4 mb-8 flex items-start gap-3 ${alertColor}`}>
                <AlertIcon className="h-5 w-5 shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{playInfo.alertMsg}</span>
              </div>

              {/* Chat */}
              {analyzed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <ChatInterface />
                </motion.div>
              )}
            </>
          )}

          <hr className="border-border my-8" />

          <div className="flex gap-4 flex-wrap pb-8">
            <Button variant="outline" onClick={() => navigate("/context")} className="flex-1">
              Back to Selection
            </Button>
            <Button onClick={() => navigate("/")} className="flex-1 bg-primary text-primary-foreground">
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
