import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Shield, TrendingUp, Sparkles, BarChart3, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import camelCalculated from "@/assets/camel-calculated.jpg";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    desc: "ML forecasting combined with financial expertise for smarter decisions.",
  },
  {
    icon: BarChart3,
    title: "Golden Equilibrium",
    desc: "Find the perfect balance between opportunity and financial risk.",
  },
  {
    icon: Sparkles,
    title: "Custom Business Play",
    desc: "Get a proprietary strategy that competitors cannot replicate.",
  },
];

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
    <div>
      {/* ──────── Hero ──────── */}
      <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5">
                AI-Driven Consulting
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] mb-6">
                Complex Data.
                <br />
                Simple{" "}
                <span className="text-primary">Decisions</span>.
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Fusing <strong className="text-foreground">Data Science</strong> with{" "}
                <strong className="text-foreground">Financial Expertise</strong> into a
                powerful AI engine that delivers clear Business Health Scores and
                actionable strategy.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/context")}
                  className="btn-cta text-base px-8 py-3.5"
                >
                  Get Started <ArrowRight className="inline ml-2 h-4 w-4" />
                </button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/canvas")}
                  className="font-semibold"
                >
                  Explore Models
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
                <img
                  src={heroBg}
                  alt="Business Play Analytics Dashboard"
                  className="w-full h-auto object-cover"
                  width={1200}
                  height={600}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────── Features ──────── */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-glass flex flex-col items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ──────── Case Study ──────── */}
      <section id="case-study" className="bg-card border-y border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Case Study</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mt-2">
              Optimizing Retail & Wholesale Strategy
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              See how <strong className="text-foreground">Belly Thailand</strong> uses Business Play to
              balance growth with liquidity in the resort tent industry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
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
                className="w-full max-w-[280px] rounded-2xl shadow-lg"
                loading="lazy"
                width={512}
                height={512}
              />
              <p className="text-sm text-muted-foreground mt-3 italic font-medium text-center">
                "Calculated Ambition"
              </p>
            </motion.div>

            {/* Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-glass"
            >
              <div className="flex items-center gap-2 font-bold text-foreground mb-5">
                <Compass className="h-5 w-5 text-primary" /> Business Play Summary
              </div>
              <div className="mb-4">
                <div className="text-xs font-semibold uppercase text-muted-foreground">Derived Strategy</div>
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
                  <div className="text-[0.65rem] font-bold text-amber">Readiness</div>
                  <div className="text-xl font-extrabold text-amber">{demoData.risk}</div>
                </div>
              </div>
            </motion.div>

            {/* Strategy Map mini */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-glass flex flex-col items-center justify-center"
            >
              <p className="text-xs font-bold uppercase text-muted-foreground mb-4">Strategy Position</p>
              <div className="relative w-full aspect-square max-w-[240px]">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 rounded-xl overflow-hidden border border-border">
                  <div className="bg-primary/10" />
                  <div className="bg-emerald/10" />
                  <div className="bg-rose/10" />
                  <div className="bg-amber/10" />
                </div>
                <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-muted-foreground/30" />
                <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-muted-foreground/30" />
                <div
                  className="absolute w-4 h-4 bg-primary rounded-full border-2 border-background shadow-lg"
                  style={{
                    left: `${demoData.opp}%`,
                    bottom: `${demoData.risk}%`,
                    transform: "translate(-50%, 50%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 text-center text-[10px] text-muted-foreground translate-y-5">
                  Opportunity →
                </div>
                <div className="absolute left-0 top-0 bottom-0 flex items-center -translate-x-5">
                  <span className="text-[10px] text-muted-foreground -rotate-90 whitespace-nowrap">
                    Readiness →
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            <div className="card-glass text-center">
              <TrendingUp className="h-5 w-5 text-primary mx-auto mb-2" />
              <div className="text-xs text-muted-foreground font-medium">Investment</div>
              <div className="text-2xl font-bold text-foreground">${demoData.investment.toLocaleString()}</div>
            </div>
            <div className="card-glass text-center">
              <Shield className="h-5 w-5 text-primary mx-auto mb-2" />
              <div className="text-xs text-muted-foreground font-medium">Quick Ratio</div>
              <div className="text-2xl font-bold text-foreground">{demoData.qr.toFixed(2)}</div>
            </div>
            <div className="card-glass text-center">
              <Compass className="h-5 w-5 text-primary mx-auto mb-2" />
              <div className="text-xs text-muted-foreground font-medium">Balance</div>
              <div className="text-2xl font-bold text-foreground">{demoData.balance.toFixed(1)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── CTA ──────── */}
      <section id="cta" className="container mx-auto px-4 py-16">
        <div className="card-glass text-center py-12 px-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-3">
            Ready to find your Golden Equilibrium?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Enter your business data and let AI generate your custom Business Play strategy.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate("/context")}
              className="btn-cta text-base px-10 py-3.5"
            >
              It's Your Turn <ArrowRight className="inline ml-2 h-4 w-4" />
            </button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/pipeline")}
              className="font-semibold"
            >
              How It Works
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
