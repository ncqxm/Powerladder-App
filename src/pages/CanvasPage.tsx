import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FlipCard from "@/components/FlipCard";

import camelSki from "@/assets/camel-handle-ski.jpg";
import camelSmart from "@/assets/camel-smart.jpg";
import camelFire from "@/assets/camel-on-fire.jpg";
import camelCalc from "@/assets/camel-calculated.jpg";
import dinoBlind from "@/assets/dinosaur-blind.jpg";
import unicornBleed from "@/assets/unicorn-bleed.jpg";
import unicornMistake from "@/assets/unicorn-mistake.jpg";

const sections = [
  {
    label: "Camel",
    description: "Focuses on sustainable growth, adaptable and cost-effective.",
    cards: [
      { img: camelSki, title: "Handle the Ski", desc: "A resilient organism built to traverse the Snow without thirst or fear." },
      { img: camelSmart, title: "Smart Camel", desc: "Cure strategic blindness by mastering your internal data." },
      { img: camelFire, title: "Camel on Fire", desc: "A risk-tolerant strategy using ML and cash flow to accelerate growth safely." },
      { img: camelCalc, title: "Calculated Ambition", desc: "Finding the right balance between opportunity and financial risk." },
    ],
  },
  {
    label: "Dinosaur",
    description: "Risks falling behind due to old-fashioned methods. Needs to adopt new technologies to stay competitive.",
    cards: [
      { img: dinoBlind, title: "Blind Dinosaur", desc: "Alert: You cannot automate what you cannot measure." },
    ],
  },
  {
    label: "Unicorn",
    description: "Requires substantial investment, which could be risky if growth isn't sustainable.",
    cards: [
      { img: unicornBleed, title: "Unicorn Bleed", desc: "Alert: Don't trade value for volume." },
      { img: unicornMistake, title: "Unicorn Mistake Step", desc: "Alert: Rapid expansion skips verification and drains cash." },
    ],
  },
];

export default function CanvasPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Nav */}
        <Button variant="outline" onClick={() => navigate("/")}>
          🏠 Return Home
        </Button>
        <hr className="border-border my-6" />

        {/* Intro */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-4">
              Why create a Unique Business Play?
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              No two businesses share the same DNA. Whether you are a scrappy
              Startup, a Profitable scaler, a Mature giant, or facing Decline,
              your strategy must be custom-built to your reality. We generate a
              proprietary Business Play that competitors cannot replicate by
              first mapping your unique lifecycle stage to our Magical Creature
              Model.
            </p>
          </motion.div>
          <div className="flex flex-col gap-3 shrink-0">
            <Button onClick={() => navigate("/context")} className="bg-primary text-primary-foreground">
              🚀 Choose Your Business Context
            </Button>
            <Button variant="outline" asChild>
              <a href="https://www.powerladder.net/plstart" target="_blank" rel="noopener noreferrer">
                Start PowerLadder Assessment
              </a>
            </Button>
          </div>
        </div>

        <hr className="border-border my-8" />

        {/* Featured */}
        <h2 className="section-header mb-10">Business Play</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="card-glass flex flex-col justify-center">
            <h3 className="text-3xl font-extrabold text-foreground mb-4">Handle the Ski</h3>
            <blockquote className="text-base italic text-muted-foreground border-l-4 border-primary bg-primary/5 px-4 py-3 rounded-r-lg mb-4">
              "A resilient organism built to traverse the snow without thirst or fear."
            </blockquote>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The business play that reveals the Risk vs Reward stats for
              specific units. Stack this play to validate safe wins — like
              confirming that your heavy inventory is actually a profit
              multiplier, not a liability.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={camelSki}
              alt="Handle the Ski"
              className="w-3/4 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform"
              loading="lazy"
              width={512}
              height={512}
            />
          </div>
        </div>

        <hr className="border-border my-8" />

        {/* Card Sections */}
        {sections.map((section, sIdx) => (
          <motion.div
            key={section.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: sIdx * 0.1 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/5 shrink-0">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-2xl font-extrabold text-foreground">{section.label}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{section.description}</p>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                {section.cards.map((card) => (
                  <FlipCard
                    key={card.title}
                    imageSrc={card.img}
                    title={card.title}
                    description={card.desc}
                  />
                ))}
              </div>
            </div>
            <hr className="border-border mt-8" />
          </motion.div>
        ))}

        {/* Footer Nav */}
        <div className="flex gap-4 flex-wrap pb-8">
          <Button variant="outline" onClick={() => navigate("/")} className="flex-1">
            Back to Home
          </Button>
          <Button onClick={() => navigate("/context")} className="flex-1 bg-primary text-primary-foreground">
            Choose Your Business Context →
          </Button>
        </div>
      </div>
    </div>
  );
}
