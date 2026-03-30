import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileUp, Scissors, Search, ArrowRight, ChevronLeft } from "lucide-react";

const steps = [
  {
    icon: FileUp,
    step: "01",
    title: "Strategic Knowledge Ingestion",
    description: "Upload specific Playbooks and Reports to fuel the AI's core logic. PDFs are parsed and stored securely.",
  },
  {
    icon: Scissors,
    step: "02",
    title: "Knowledge Segmenting",
    description: "Process documents into optimized strategic units (400-word chunks) for precise Golden Equilibrium analysis.",
  },
  {
    icon: Search,
    step: "03",
    title: "Search Engine Setup",
    description: "Initialize real-time strategy retrieval with vector search for context-aware AI responses.",
  },
];

export default function PipelinePage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 pt-10 pb-14 md:pt-14 md:pb-20">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="-ml-2 text-muted-foreground mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" /> Home
          </Button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
              Technical Overview
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              How It Works: <span className="text-primary">RAG Pipeline</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Retrieval-Augmented Generation grounds AI advice in your specific
              Business Play Rules and Data Science Reports — eliminating hallucination
              and providing strategies that respect your constraints.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pipeline Steps */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-black text-foreground mb-8">Pipeline Steps</h2>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-glass flex gap-5 items-start"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center shrink-0">
                <step.icon className="h-5 w-5 text-primary mb-0.5" />
                <span className="text-[10px] font-black text-primary">{step.step}</span>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Knowledge Assets */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-black text-foreground mb-8">Reference & Collaboration</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="card-glass">
              <h4 className="text-lg font-bold text-primary mb-2">💼 The Business Adviser</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Author of the Business Play Rules containing Rule 1.1-1.4 and
                the Golden Equilibrium framework.
              </p>
              <Button variant="outline" asChild className="w-full">
                <a href="https://www.powerladder.net/make-right-choice/dithanon-khrutmuang" target="_blank" rel="noopener noreferrer">
                  View Profile
                </a>
              </Button>
            </div>
            <div className="card-glass">
              <h4 className="text-lg font-bold text-foreground mb-2">🧪 The Data Scientist</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Creator of the Quantitative Engine — ML forecasting, ROI
                optimization models, and data accuracy.
              </p>
              <Button variant="outline" asChild className="w-full">
                <a href="https://www.powerladder.net/make-right-choice/khin-thandar-kyaw" target="_blank" rel="noopener noreferrer">
                  View Profile
                </a>
              </Button>
            </div>
          </div>

          <div className="card-glass border-l-4 border-l-primary">
            <h3 className="font-bold text-foreground mb-2">Required Knowledge Assets</h3>
            <p className="text-sm text-muted-foreground mb-3">
              A "Business Play" is the synergy between expert advice and hard science.
            </p>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li><strong className="text-foreground">Business Play Rules:</strong> Strategic frameworks from the Business Adviser.</li>
              <li><strong className="text-foreground">Business Play Reports:</strong> Forecasting and analytics from the Data Scientist.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-12 pb-16">
        <div className="card-glass text-center py-10 px-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <h2 className="text-2xl font-black text-foreground mb-2">Ready to try it?</h2>
          <p className="text-muted-foreground mb-5">Experience the power of AI-driven consulting.</p>
          <Button
            onClick={() => navigate("/context")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            size="lg"
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
