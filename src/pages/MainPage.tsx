import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BusinessPlaySummaryCard from "@/components/BusinessPlaySummaryCard";
import StrategyMap from "@/components/StrategyMap";
import ChatInterface from "@/components/ChatInterface";
import {
  calculateSweetSpot,
  classifyBusinessPlay,
  BUSINESS_PLAY_DESCRIPTIONS,
  PLAY_ZONES,
} from "@/lib/business-logic";
import {
  TrendingUp, Shield, Compass, AlertTriangle, CheckCircle, Info,
  XCircle, ChevronLeft, Search, ThumbsUp, AlertCircle, Rocket, Lightbulb,
} from "lucide-react";
import {
  RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from "recharts";

interface StoredFormData {
  marketSize: number;
  customerBase: number;
  revenue: number;
  cashOnHand: number;
  accountsReceivable: number;
  currentLiabilities: number;
  inventoryUnits: number;
  unitCost: number;
  salesVelocity: number;
  growthTarget: number;
  riskTolerance: string;
}

function GaugeScore({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width={120} height={120}>
        <RadialBarChart
          cx="50%" cy="50%"
          innerRadius="70%" outerRadius="100%"
          barSize={10}
          data={[{ value, fill: color }]}
          startAngle={180} endAngle={0}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background={{ fill: "hsl(var(--secondary))" }} dataKey="value" angleAxisId={0} cornerRadius={6} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="text-2xl font-black text-foreground -mt-3">{value.toFixed(0)}</div>
      <div className="text-[0.65rem] font-bold text-muted-foreground uppercase mt-0.5">{label}</div>
    </div>
  );
}

function getActionPlan(play: string, industry: string, riskTolerance: string) {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const nextSteps: string[] = [];
  const industryTips: string[] = [];

  if (play === "Handle the Ski") {
    strengths.push("Strong demand-supply alignment", "Healthy liquidity position", "Risk is manageable with current controls");
    weaknesses.push("May become complacent with current success", "Opportunity to optimize further");
    nextSteps.push("Consider batch procurement for volume discounts", "Explore high-margin SKU expansion", "Set up automated reorder alerts");
  } else if (play === "Calculated Ambition") {
    strengths.push("Strong financial position", "Good cash reserves for expansion", "Balanced risk-reward profile");
    weaknesses.push("Opportunity score could be higher", "May be too conservative in growth");
    nextSteps.push("Increase inventory for high-velocity items", "Test new market segments cautiously", "Invest in ML-based demand forecasting");
  } else if (play === "Unicorn Mistake Step") {
    strengths.push("High market demand detected", "Growth potential is strong");
    weaknesses.push("Cash risk is dangerously high", "Liquidity cannot support current growth rate", "Quick Ratio below safety threshold");
    nextSteps.push("Reduce inventory commitments immediately", "Negotiate longer payment terms with suppliers", "Focus on cash collection speed");
  } else {
    strengths.push("Awareness of current position is the first step");
    weaknesses.push("Low data quality limits decision-making", "Financial controls need significant improvement", "Demand forecasting is unreliable");
    nextSteps.push("Implement basic data collection systems", "Build emergency cash reserve", "Start with small, validated inventory bets");
  }

  if (industry.includes("Retail")) {
    industryTips.push("Focus on seasonal demand patterns for inventory planning", "Monitor competitor pricing weekly", "Consider omnichannel inventory visibility");
  } else if (industry.includes("Wellness") || industry.includes("Hospitality")) {
    industryTips.push("Use CDP data to predict guest patterns", "Optimize staff scheduling based on forecasts", "Build loyalty programs to reduce acquisition cost");
  }

  if (riskTolerance === "conservative") {
    industryTips.push("With conservative risk tolerance, prioritize liquidity over growth");
  } else if (riskTolerance === "aggressive") {
    industryTips.push("With aggressive risk tolerance, ensure cash reserves cover 3+ months of liabilities");
  }

  return { strengths, weaknesses, nextSteps, industryTips };
}

export default function MainPage() {
  const navigate = useNavigate();
  const [industry, setIndustry] = useState("");
  const [useCase, setUseCase] = useState("");
  const [formData, setFormData] = useState<StoredFormData | null>(null);
  const [analyzed, setAnalyzed] = useState(false);

  useEffect(() => {
    const ind = sessionStorage.getItem("bp_industry");
    const uc = sessionStorage.getItem("bp_useCase");
    const fd = sessionStorage.getItem("bp_formData");
    if (!ind || !uc) {
      navigate("/context");
      return;
    }
    setIndustry(ind);
    setUseCase(uc);
    if (fd) {
      try { setFormData(JSON.parse(fd)); } catch { /* ignore */ }
    }
  }, [navigate]);

  if (!industry || !formData) return null;

  const investmentNeeded = formData.inventoryUnits * formData.unitCost;
  const cashAfter = Math.max(formData.cashOnHand - investmentNeeded, 0);
  const result = calculateSweetSpot(formData.salesVelocity, formData.inventoryUnits, cashAfter, formData.accountsReceivable, formData.currentLiabilities);
  const derivedPlay = classifyBusinessPlay(result.opportunity, result.financialRisk, result.sweetSpot);
  const diff = result.opportunity - result.financialRisk;
  const playInfo = BUSINESS_PLAY_DESCRIPTIONS[derivedPlay];
  const playZone = PLAY_ZONES[derivedPlay];
  const actionPlan = getActionPlan(derivedPlay, industry, formData.riskTolerance);

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

  const breakdownData = [
    { name: "Opportunity", score: result.opportunity, fill: "hsl(152, 60%, 54%)" },
    { name: "Readiness", score: result.financialRisk, fill: "hsl(38, 92%, 50%)" },
    { name: "Sweet Spot", score: result.sweetSpot, fill: "hsl(195, 78%, 53%)" },
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

        {/* Analyze Button */}
        <div className="flex justify-center mb-10">
          <button onClick={() => setAnalyzed(true)} className="btn-cta text-base px-10 py-3.5 flex items-center gap-2">
            <Search className="h-4 w-4" /> Analyze My Strategy
          </button>
        </div>

        {formData.currentLiabilities <= 0 && (
          <div className="bg-rose/10 border border-rose/30 rounded-xl p-4 mb-6 text-rose font-medium text-sm">
            ⚠️ Current Liabilities cannot be zero
          </div>
        )}

        {formData.currentLiabilities > 0 && (
          <>
            {/* Business Play Recommendation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-glass mb-8 text-center py-8"
            >
              <div className="text-6xl mb-3">{playZone.emoji}</div>
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">{derivedPlay}</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">{playInfo.shortDesc}</p>
            </motion.div>

            {/* Scores Gauges */}
            <section className="card-glass mb-8">
              <div className="flex flex-wrap justify-center gap-8">
                <GaugeScore value={result.opportunity} label="Opportunity" color="hsl(152, 60%, 54%)" />
                <GaugeScore value={result.financialRisk} label="Financial Readiness" color="hsl(38, 92%, 50%)" />
                <GaugeScore value={result.sweetSpot} label="Sweet Spot" color="hsl(195, 78%, 53%)" />
              </div>
            </section>

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

            {/* Score Breakdown Chart */}
            <section className="card-glass mb-8">
              <h3 className="font-bold text-foreground mb-4 text-center">Score Breakdown</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={breakdownData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                    {breakdownData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
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

            {/* ──────── Action Plan ──────── */}
            <section className="mb-10">
              <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-primary" /> Action Plan
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {/* Strengths */}
                <div className="card-glass border-l-4 border-emerald">
                  <div className="flex items-center gap-2 mb-4">
                    <ThumbsUp className="h-5 w-5 text-emerald" />
                    <h3 className="font-bold text-foreground">✓ Strengths</h3>
                  </div>
                  <ul className="space-y-2">
                    {actionPlan.strengths.map((s) => (
                      <li key={s} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="card-glass border-l-4 border-amber">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-5 w-5 text-amber" />
                    <h3 className="font-bold text-foreground">⚠️ Weaknesses</h3>
                  </div>
                  <ul className="space-y-2">
                    {actionPlan.weaknesses.map((w) => (
                      <li key={w} className="text-sm text-muted-foreground flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber shrink-0 mt-0.5" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Steps */}
                <div className="card-glass border-l-4 border-primary">
                  <div className="flex items-center gap-2 mb-4">
                    <Rocket className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-foreground">🚀 Next Steps</h3>
                  </div>
                  <ul className="space-y-2">
                    {actionPlan.nextSteps.map((n, i) => (
                      <li key={n} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-xs font-bold text-primary bg-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Industry Tips */}
                {actionPlan.industryTips.length > 0 && (
                  <div className="card-glass border-l-4 border-sky">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="h-5 w-5 text-sky" />
                      <h3 className="font-bold text-foreground">💡 Industry Tips</h3>
                    </div>
                    <ul className="space-y-2">
                      {actionPlan.industryTips.map((t) => (
                        <li key={t} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Info className="h-4 w-4 text-sky shrink-0 mt-0.5" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

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
