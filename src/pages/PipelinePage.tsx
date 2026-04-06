import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Factory, ClipboardList, Brain, BarChart3, ArrowRight, ChevronLeft, ArrowDown } from "lucide-react";

const steps = [
  {
    icon: Factory,
    step: "01",
    title: "เลือกอุตสาหกรรม",
    subtitle: "Select Industry",
    description: "เลือกประเภทธุรกิจของคุณ เช่น Retail หรือ Wellness เพื่อให้ AI ปรับคำแนะนำเฉพาะทาง",
    color: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/30",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "กรอกข้อมูลธุรกิจ",
    subtitle: "Input Business Data",
    description: "กรอกข้อมูล Financial & Operational เช่น Revenue, Inventory, Cash on Hand, Accounts Receivable",
    color: "from-emerald-500/20 to-emerald-600/20",
    borderColor: "border-emerald-500/30",
  },
  {
    icon: Brain,
    step: "03",
    title: "AI วิเคราะห์ผล",
    subtitle: "AI Analysis",
    description: "ระบบคำนวณ Opportunity Score, Financial Readiness Score และ Sweet Spot Score ด้วย Golden Equilibrium Framework",
    color: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-500/30",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "ได้ผลลัพธ์ & คำแนะนำ",
    subtitle: "Results & Recommendations",
    description: "รับ Business Play Classification (🛡️🧠🦄🦕) พร้อม Action Plan, จุดแข็ง, จุดอ่อน และ Next Steps",
    color: "from-amber-500/20 to-amber-600/20",
    borderColor: "border-amber-500/30",
  },
];

const flowParticle = {
  animate: {
    y: [0, 8, 0],
    opacity: [0.3, 1, 0.3],
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

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
              Process Flow
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              ขั้นตอนการวิเคราะห์ <span className="text-primary">Business Play</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              เพียง 4 ขั้นตอน จากข้อมูลธุรกิจของคุณสู่คำแนะนำเชิงกลยุทธ์ที่แม่นยำ
              ด้วย Golden Equilibrium Framework และ AI-Powered Analysis
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pipeline Steps */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-black text-foreground mb-10 text-center">4 ขั้นตอนสู่กลยุทธ์ที่ใช่</h2>

        <div className="max-w-xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.step}>
              {/* Step Card */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`card-glass border ${step.borderColor} bg-gradient-to-r ${step.color} relative`}
              >
                <div className="flex gap-4 items-start">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center shrink-0">
                    <step.icon className="h-5 w-5 text-primary mb-0.5" />
                    <span className="text-[10px] font-black text-primary">{step.step}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-0.5">{step.title}</h3>
                    <p className="text-xs text-primary font-semibold mb-1.5">{step.subtitle}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>

              {/* Flow Arrow between steps */}
              {i < steps.length - 1 && (
                <div className="flex justify-center py-3">
                  <motion.div
                    animate={flowParticle.animate}
                    transition={{ ...flowParticle.transition, delay: i * 0.3 }}
                  >
                    <ArrowDown className="h-6 w-6 text-primary/60" />
                  </motion.div>
                </div>
              )}
            </div>
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
          <h2 className="text-2xl font-black text-foreground mb-2">พร้อมเริ่มวิเคราะห์แล้วหรือยัง?</h2>
          <p className="text-muted-foreground mb-5">ลองใช้ AI-Driven Consulting เพื่อค้นหากลยุทธ์ที่เหมาะกับธุรกิจของคุณ</p>
          <Button
            onClick={() => navigate("/context")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            size="lg"
          >
            เริ่มวิเคราะห์ <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
