import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import camelCalculated from "@/assets/camel-calculated.jpg";

const demoData = {
  opp: 80,
  risk: 70,
  sweet: 75,
  investment: 32000,
  qr: 1.3,
  balance: 10.0,
};

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight mb-6">
              Complex Data. Simple Decisions.
              <br />
              This is <span className="text-primary">Business Play</span>.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Great decisions require two things: <strong className="text-foreground">Data Science</strong> to
              identify opportunities, and <strong className="text-foreground">Financial Expertise</strong> to
              mitigate risk. We have fused these disciplines into a powerful AI engine
              we call Business Play.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Forget drowning in complex analytics reports. With Business Play, your
              AI-driven consulting team is always ready. Simply enter your numbers or
              ask a strategic question to receive a clear{" "}
              <strong className="text-foreground">Business Health Score</strong> and
              actionable advice.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button
              onClick={() => navigate("/canvas")}
              className="btn-cta text-lg px-12 py-4"
            >
              Explore our Business Play <ArrowRight className="inline ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="container mx-auto px-4 pb-8"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={heroBg}
              alt="Business Play Analytics Dashboard"
              className="w-full h-auto object-cover"
              width={1200}
              height={600}
            />
          </div>
        </motion.div>
      </section>

      {/* Case Study Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="section-header mb-8">
          📂 Case Study: Optimizing Retail & Wholesale Strategy
        </h2>

        <div className="card-glass p-8 border-l-4 border-l-primary mb-10">
          <p className="text-base text-foreground leading-relaxed mb-4">
            As a premier supplier of tents to Thailand's resort industry,{" "}
            <strong>Belly Thailand</strong> faces a critical B2B challenge:
            balancing growth with liquidity. To maximize{" "}
            <strong>Net Profit</strong> and{" "}
            <strong>Capital Efficiency (ROI)</strong>, the company must decide
            how aggressively to stock inventory to meet rising tourism demand,
            without exposing the business to the{" "}
            <strong>Financial Risk</strong> of a cash flow shortage.
          </p>
          <div className="flex gap-3 flex-wrap">
            {["#InventoryManagement", "#RetailStrategy", "#CashFlow"].map(
              (tag) => (
                <span
                  key={tag}
                  className="bg-secondary text-muted-foreground text-xs font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Demo Dashboard */}
        <div className="bg-primary/5 rounded-2xl p-4 mb-6 border border-primary/10">
          <p className="text-sm text-muted-foreground">
            ℹ️ Simulated example of how Business Play evaluates the Golden Equilibrium
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <img
              src={camelCalculated}
              alt="Calculated Ambition"
              className="w-full max-w-xs rounded-2xl shadow-lg"
              loading="lazy"
              width={512}
              height={512}
            />
            <p className="text-sm text-muted-foreground mt-3 italic font-semibold text-center">
              "Calculated Ambition: Balancing Offense & Defense"
            </p>
          </motion.div>

          {/* Summary Card */}
          <div className="card-glass">
            <div className="flex items-center gap-2 font-bold text-foreground mb-5">
              <Compass className="h-5 w-5 text-primary" /> Business Play Summary
            </div>
            <div className="mb-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Business Play</div>
              <div className="text-base font-bold text-primary border-l-4 border-primary pl-3 mt-1">
                Calculated Ambition
              </div>
            </div>
            <div className="text-center bg-secondary rounded-xl p-5 mb-4 border border-border">
              <div className="text-xs font-bold uppercase text-muted-foreground">Sweet Spot Score</div>
              <div className="text-5xl font-black text-foreground leading-none mt-1">
                {demoData.sweet}<span className="text-lg font-normal text-muted-foreground">/100</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="metric-card-green flex-1">
                <div className="text-[0.65rem] font-bold text-emerald">Opportunity</div>
                <div className="text-xl font-extrabold text-emerald">{demoData.opp}</div>
              </div>
              <div className="metric-card-amber flex-1">
                <div className="text-[0.65rem] font-bold text-amber">Financial Readiness</div>
                <div className="text-xl font-extrabold text-amber">{demoData.risk}</div>
              </div>
            </div>
          </div>

          {/* Strategy Position */}
          <div className="card-glass flex flex-col items-center justify-center">
            <div className="relative w-full aspect-square max-w-[280px]">
              {/* Grid zones */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 rounded-xl overflow-hidden border border-border">
                <div className="bg-primary/10" />
                <div className="bg-emerald/10" />
                <div className="bg-rose/10" />
                <div className="bg-amber/10" />
              </div>
              {/* Dashed lines */}
              <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-muted-foreground/30" />
              <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-muted-foreground/30" />
              {/* Position dot */}
              <div
                className="absolute w-4 h-4 bg-foreground rounded-full border-2 border-background shadow-lg animate-pulse-glow"
                style={{
                  left: `${demoData.opp}%`,
                  bottom: `${demoData.risk}%`,
                  transform: "translate(-50%, 50%)",
                }}
              />
              {/* Labels */}
              <div className="absolute bottom-0 left-0 right-0 text-center text-[10px] text-muted-foreground translate-y-5">Opportunity Score</div>
              <div className="absolute left-0 top-0 bottom-0 flex items-center -translate-x-5">
                <span className="text-[10px] text-muted-foreground -rotate-90 whitespace-nowrap">Financial Readiness</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="card-glass text-center">
            <TrendingUp className="h-5 w-5 text-primary mx-auto mb-2" />
            <div className="text-xs text-muted-foreground font-medium">Investment Required</div>
            <div className="text-2xl font-bold text-foreground">${demoData.investment.toLocaleString()}</div>
          </div>
          <div className="card-glass text-center">
            <Shield className="h-5 w-5 text-primary mx-auto mb-2" />
            <div className="text-xs text-muted-foreground font-medium">Quick Ratio (QR)</div>
            <div className="text-2xl font-bold text-foreground">{demoData.qr.toFixed(2)}</div>
          </div>
          <div className="card-glass text-center">
            <Compass className="h-5 w-5 text-primary mx-auto mb-2" />
            <div className="text-xs text-muted-foreground font-medium">Balance</div>
            <div className="text-2xl font-bold text-foreground">{demoData.balance.toFixed(1)}</div>
          </div>
        </div>
      </section>

      {/* CTA Buttons */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex gap-4 flex-wrap">
          <Button
            onClick={() => navigate("/pipeline")}
            className="flex-1 bg-emerald text-emerald-foreground hover:bg-emerald/90"
          >
            How It Works: RAG Pipeline
          </Button>
          <Button
            onClick={() => navigate("/context")}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            It's Your Turn →
          </Button>
        </div>
      </section>
    </div>
  );
}
