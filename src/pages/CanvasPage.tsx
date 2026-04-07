import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FlipCard from "@/components/FlipCard";
import ThreeTierCTA from "@/components/ThreeTierCTA";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, RadarChart, PolarGrid, PolarRadiusAxis, Radar, Legend } from "recharts";

import camelSki from "@/assets/camel-handle-ski.jpg";
import camelSmart from "@/assets/camel-smart.jpg";
import camelFire from "@/assets/camel-on-fire.jpg";
import camelCalc from "@/assets/camel-calculated.jpg";
import dinoBlind from "@/assets/dinosaur-blind.jpg";
import unicornBleed from "@/assets/unicorn-bleed.jpg";
import unicornMistake from "@/assets/unicorn-mistake.jpg";

const sections = [
  {
    label: "🐪 Camel",
    color: "border-emerald",
    description: "Sustainable growth. Adaptable. Cost-effective. Built to thrive in harsh conditions.",
    cards: [
      { img: camelSki, title: "Handle the Ski", desc: "A resilient organism built to traverse the Snow without thirst or fear." },
      { img: camelSmart, title: "Smart Camel", desc: "Cure strategic blindness by mastering your internal data." },
      { img: camelFire, title: "Camel on Fire", desc: "A risk-tolerant strategy using ML and cash flow to accelerate growth safely." },
      { img: camelCalc, title: "Calculated Ambition", desc: "Finding the right balance between opportunity and financial risk." },
    ],
  },
  {
    label: "🦕 Dinosaur",
    color: "border-rose",
    description: "Risks falling behind due to old-fashioned methods. Needs new technologies to stay competitive.",
    cards: [
      { img: dinoBlind, title: "Blind Dinosaur", desc: "Alert: You cannot automate what you cannot measure." },
    ],
  },
  {
    label: "🦄 Unicorn",
    color: "border-amber",
    description: "Requires substantial investment, which could be risky if growth isn't sustainable.",
    cards: [
      { img: unicornBleed, title: "Unicorn Bleed", desc: "Alert: Don't trade value for volume." },
      { img: unicornMistake, title: "Unicorn Mistake Step", desc: "Alert: Rapid expansion skips verification and drains cash." },
    ],
  },
];

// Demo data for dashboard
const demoScores = {
  opportunity: 80,
  financial: 70,
  sweetSpot: 75,
};

const gaugeData = (value: number, fill: string) => [
  { value, fill },
];

const radarData = [
  { metric: "Demand-Supply", score: 80, benchmark: 65 },
  { metric: "Liquidity", score: 70, benchmark: 60 },
  { metric: "Cash Resilience", score: 75, benchmark: 55 },
  { metric: "Growth Rate", score: 60, benchmark: 70 },
  { metric: "Risk Control", score: 85, benchmark: 60 },
];

function GaugeChart({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="card-glass flex flex-col items-center py-6">
      <ResponsiveContainer width={140} height={140}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          barSize={12}
          data={gaugeData(value, color)}
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background={{ fill: "hsl(var(--secondary))" }}
            dataKey="value"
            angleAxisId={0}
            cornerRadius={6}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="text-3xl font-black text-foreground -mt-4">{value}</div>
      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide mt-1">{label}</div>
    </div>
  );
}

export default function CanvasPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
                Strategy Framework
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-4">
                Why create a Unique <span className="text-primary">Business Play</span>?
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                No two businesses share the same DNA. We generate a proprietary
                Business Play that competitors cannot replicate by mapping your
                unique lifecycle stage to our <strong className="text-foreground">Magical Creature Model</strong>.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => navigate("/context")}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                >
                  Choose Your Context <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://www.powerladder.net/plstart" target="_blank" rel="noopener noreferrer">
                    PowerLadder Assessment
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Featured Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="card-glass"
            >
              <div className="flex gap-5 items-start">
                <img
                  src={camelSki}
                  alt="Handle the Ski"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-xl object-cover shadow-md shrink-0"
                  loading="lazy"
                  width={512}
                  height={512}
                />
                <div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-foreground mb-2">Handle the Ski</h3>
                  <blockquote className="text-sm italic text-muted-foreground border-l-4 border-primary bg-primary/5 px-3 py-2 rounded-r-lg mb-3">
                    "A resilient organism built to traverse the snow without thirst or fear."
                  </blockquote>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Validates safe wins — confirming heavy inventory is a profit
                    multiplier, not a liability.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────── Business Health Dashboard ──────── */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Interactive Dashboard</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mt-2">
              Business Health Scores
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Example scores showing Opportunity, Financial Readiness, and the combined Sweet Spot.
            </p>
          </div>

          {/* Gauge Charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <GaugeChart value={demoScores.opportunity} label="📊 Opportunity Score" color="hsl(152, 60%, 54%)" />
            <GaugeChart value={demoScores.financial} label="💵 Financial Readiness" color="hsl(38, 92%, 50%)" />
            <GaugeChart value={demoScores.sweetSpot} label="🎯 Sweet Spot Score" color="hsl(195, 78%, 53%)" />
          </div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass max-w-2xl mx-auto"
          >
            <h3 className="text-sm font-bold text-foreground text-center mb-4">Multi-Dimension Analysis</h3>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Your Score" dataKey="score" stroke="hsl(195, 78%, 53%)" fill="hsl(195, 78%, 53%)" fillOpacity={0.3} />
                <Radar name="Industry Avg" dataKey="benchmark" stroke="hsl(38, 92%, 50%)" fill="hsl(38, 92%, 50%)" fillOpacity={0.15} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* Model Sections */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground">
            Magical Creature Models
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Hover or tap each card to discover the strategy behind each creature.
          </p>
        </div>

        <div className="space-y-16">
          {sections.map((section, sIdx) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sIdx * 0.1 }}
            >
              {/* Section Header */}
              <div className={`border-l-4 ${section.color} pl-4 mb-6`}>
                <h3 className="text-2xl font-extrabold text-foreground">{section.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {section.cards.map((card) => (
                  <FlipCard
                    key={card.title}
                    imageSrc={card.img}
                    title={card.title}
                    description={card.desc}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ──────── Three-Tier CTA ──────── */}
      <ThreeTierCTA />

      {/* CTA */}
      <section className="container mx-auto px-4 py-12 pb-16">
        <div className="card-glass text-center py-10 px-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <h2 className="text-2xl font-black text-foreground mb-2">Find your Business Play</h2>
          <p className="text-muted-foreground mb-5">Select your industry and let AI map your strategy.</p>
          <Button
            onClick={() => navigate("/context")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            size="lg"
          >
            Choose Your Business Context <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
