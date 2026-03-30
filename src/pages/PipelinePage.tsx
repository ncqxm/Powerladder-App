import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileUp, Scissors, Search } from "lucide-react";

const steps = [
  {
    icon: FileUp,
    step: "Step 1",
    title: "Strategic Knowledge Ingestion",
    description: "Upload the specific Playbooks and Reports to fuel the AI's core logic. PDFs are parsed and stored securely.",
  },
  {
    icon: Scissors,
    step: "Step 2",
    title: "Knowledge Segmenting",
    description: "Process documents into optimized strategic units (400-word chunks) for precise Golden Equilibrium analysis.",
  },
  {
    icon: Search,
    step: "Step 3",
    title: "Search Engine Setup",
    description: "Initialize real-time strategy retrieval with vector search for context-aware AI responses.",
  },
];

export default function PipelinePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate("/")}>
          ← Back Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            Strategic Pipeline
          </h1>
          <p className="text-muted-foreground mb-8">
            Technical Workflow: Document Ingestion → Segmentation → Search Configuration
          </p>

          {/* RAG Info Card */}
          <div className="card-glass mb-10">
            <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              🛰️ Powered by RAG Architecture
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              To transform static documents into a dynamic consulting partner,
              this system utilizes <strong className="text-foreground">Retrieval-Augmented Generation (RAG)</strong>.
              Standard AI models can hallucinate; however, by grounding the AI's
              intelligence in your specific Business Play Rules and Data Science
              Reports, every piece of advice is retrieved directly from your
              secured environment.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This eliminates generic answers and provides strategic responses
              that respect your unique budget constraints and efficiency frontier.
            </p>
          </div>

          {/* Authorship */}
          <h2 className="section-header mb-8">Reference & Collaboration Assets</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="card-glass">
              <h4 className="text-lg font-bold text-primary mb-2">💼 The Business Adviser</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Author of the <strong>Business Play Rules</strong>. This document
                contains the logic for Rule 1.1-1.4 and the Golden Equilibrium
                framework.
              </p>
              <Button variant="outline" asChild className="w-full">
                <a href="https://www.powerladder.net/make-right-choice/dithanon-khrutmuang" target="_blank" rel="noopener noreferrer">
                  ℹ️ Adviser Profile
                </a>
              </Button>
            </div>
            <div className="card-glass">
              <h4 className="text-lg font-bold text-foreground mb-2">🧪 The Data Scientist</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Creator of the <strong>Quantitative Engine</strong>. Responsible
                for ML forecasting, ROI optimization models, and data accuracy.
              </p>
              <Button variant="outline" asChild className="w-full">
                <a href="https://www.powerladder.net/make-right-choice/khin-thandar-kyaw" target="_blank" rel="noopener noreferrer">
                  ℹ️ Scientist Profile
                </a>
              </Button>
            </div>
          </div>

          {/* Knowledge Assets */}
          <div className="card-glass border-l-4 border-l-primary mb-10">
            <h3 className="font-bold text-foreground mb-2">Required Knowledge Assets</h3>
            <p className="text-sm text-muted-foreground mb-3">
              <strong>Business Play: The Fusion of Data Science & Strategy</strong>
              <br />
              <em>Why it works:</em> A "Business Play" is not a guess—it's the
              synergy between expert advice and hard science.
            </p>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li><strong className="text-foreground">1. Business Play Rules:</strong> Strategic frameworks from the Business Adviser.</li>
              <li><strong className="text-foreground">2. Business Play Reports:</strong> Forecasting and analytics from the Data Scientist.</li>
            </ul>
          </div>

          {/* Pipeline Steps */}
          <h2 className="section-header mb-8">RAG Pipeline Steps</h2>
          <div className="grid gap-6 mb-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card-glass flex gap-5 items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-primary uppercase mb-1">{step.step}</div>
                  <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Nav */}
          <hr className="border-border mb-6" />
          <div className="flex gap-4 flex-wrap pb-8">
            <Button
              onClick={() => navigate("/")}
              className="flex-1 bg-emerald text-emerald-foreground hover:bg-emerald/90"
            >
              ← Back to Home
            </Button>
            <Button
              onClick={() => navigate("/canvas")}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Explore our Business Play →
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
