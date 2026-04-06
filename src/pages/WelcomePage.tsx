import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Compass, Shield, TrendingUp, Sparkles, BarChart3, Brain, ChevronDown, UserPlus, Users, Target, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

const plays = [
  {
    emoji: "🛡️",
    name: "Handle the Ski",
    tagline: "High scores on both dimensions",
    desc: "Risk is manageable with proper controls. Proceed carefully with inventory decisions.",
    color: "bg-emerald/10 border-emerald/30 text-emerald",
    score: "80+",
  },
  {
    emoji: "🧠",
    name: "Calculated Ambition",
    tagline: "Strong financial, moderate opportunity",
    desc: "Strong financial position detected. You may pursue a more aggressive growth strategy.",
    color: "bg-primary/10 border-primary/30 text-primary",
    score: "60-79",
  },
  {
    emoji: "🦄",
    name: "Unicorn Mistake Step",
    tagline: "High demand, cash risk too high",
    desc: "Strong demand but cash risk is too high. Growth may break the business.",
    color: "bg-amber/10 border-amber/30 text-amber",
    score: "60-79",
  },
  {
    emoji: "🦕",
    name: "Dinosaur Hoping for Luck",
    tagline: "High uncertainty, low readiness",
    desc: "Data quality and financial risk controls must be fixed first.",
    color: "bg-rose/10 border-rose/30 text-rose",
    score: "<60",
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

const stats = [
  { icon: Users, label: "ผู้ใช้งาน", value: 1200, suffix: "+", color: "text-primary" },
  { icon: Target, label: "ความแม่นยำ AI", value: 94, suffix: "%", color: "text-emerald" },
  { icon: Zap, label: "Business Play สร้างแล้ว", value: 3500, suffix: "+", color: "text-amber" },
  { icon: BarChart3, label: "อุตสาหกรรมรองรับ", value: 12, suffix: "+", color: "text-primary" },
];

function AnimatedCounter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as any, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const stepTime = Math.max(duration * 1000 / end, 10);
    const increment = Math.max(Math.floor(end / (duration * 1000 / 16)), 1);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function WelcomePage() {
  const { user } = useAuth();
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
                Golden Equilibrium Framework
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
                {user ? (
                  <button
                    onClick={() => navigate("/context")}
                    className="btn-cta text-base px-8 py-3.5 flex items-center gap-2"
                  >
                    <Compass className="h-4 w-4" /> Start Analysis
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/register")}
                    className="btn-cta text-base px-8 py-3.5 flex items-center gap-2"
                  >
                    <UserPlus className="h-4 w-4" /> Sign Up Free
                  </button>
                )}
                {!user && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate("/context")}
                    className="font-semibold"
                  >
                    Try Demo <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => document.getElementById("plays")?.scrollIntoView({ behavior: "smooth" })}
                  className="font-semibold text-muted-foreground"
                >
                  Learn More
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
          {/* Scroll-down arrow */}
          <motion.button
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ delay: 1, y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}
            className="mx-auto mt-8 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll to features"
          >
            <span className="text-xs font-medium">Explore</span>
            <ChevronDown className="h-5 w-5" />
          </motion.button>
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

      {/* ──────── 4 Business Play Classifications ──────── */}
      <section id="plays" className="bg-card border-y border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Strategy Classification</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mt-2">
              4 Business Play Classifications
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Based on your <strong className="text-foreground">Opportunity Score</strong> and{" "}
              <strong className="text-foreground">Financial Readiness</strong>, we classify your business
              into one of four strategic archetypes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {plays.map((play, i) => (
              <motion.div
                key={play.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl border p-6 ${play.color} flex flex-col`}
              >
                <div className="text-4xl mb-3">{play.emoji}</div>
                <h3 className="text-lg font-extrabold mb-1">{play.name}</h3>
                <p className="text-xs font-semibold opacity-80 mb-3">{play.tagline}</p>
                <p className="text-sm leading-relaxed flex-1">{play.desc}</p>
                <div className="mt-4 pt-3 border-t border-current/20">
                  <span className="text-xs font-bold uppercase">Sweet Spot: {play.score}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── Before vs After ──────── */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Transformation</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-2">
            ก่อน vs หลังใช้ Business Play
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            ดูว่าธุรกิจเปลี่ยนไปอย่างไรเมื่อมี <strong className="text-foreground">Golden Equilibrium Framework</strong> เป็นเข็มทิศ
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-glass border-destructive/30 bg-destructive/5"
          >
            <h3 className="font-bold text-destructive mb-4 text-lg">❌ ก่อนใช้ Business Play</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">✗</span>
                <span>ไม่รู้ว่าจะสั่งสินค้าเท่าไหร่ — สั่งตามสัญชาตญาณ</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">✗</span>
                <span>ความเสี่ยง <strong className="text-foreground">40% cash shortfall</strong> ทุกไตรมาส</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">✗</span>
                <span>สั่งซื้อเกินหรือขาดตลอด — สูญเสียโอกาสและทุน</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">✗</span>
                <span>ไม่มี strategy ที่วัดผลได้ — ตัดสินใจแบบไร้ข้อมูล</span>
              </li>
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-glass border-emerald/30 bg-emerald/5"
          >
            <h3 className="font-bold text-emerald mb-4 text-lg">✅ หลังใช้ Business Play</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-emerald mt-0.5">✓</span>
                <span>กรอกข้อมูล → <strong className="text-foreground">ได้คำแนะนำชัดเจน</strong>ทันที</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald mt-0.5">✓</span>
                <span>Risk ลดลง <strong className="text-foreground">60%</strong> ด้วย Quick Ratio Analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald mt-0.5">✓</span>
                <span><strong className="text-foreground">Optimal inventory level</strong> ชัดเจนจาก ML Forecast</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald mt-0.5">✓</span>
                <span><strong className="text-foreground">Golden Equilibrium Framework</strong> — กลยุทธ์ที่วัดได้</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      </section>

      {/* ──────── Animated Stats ──────── */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Trusted by Businesses</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mt-2">ตัวเลขพูดแทนเรา</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-glass text-center"
              >
                <s.icon className={`h-8 w-8 ${s.color} mx-auto mb-3`} />
                <div className={`text-3xl md:text-4xl font-black ${s.color}`}>
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm text-muted-foreground font-medium mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── Demo Results Screenshot ──────── */}
      <section id="case-study" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Case Study</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-2">
            Example: Business Health Score
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
              onClick={() => navigate("/register")}
              className="btn-cta text-base px-10 py-3.5 flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" /> Sign Up Free
            </button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/context")}
              className="font-semibold"
            >
              Try Demo <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate("/pipeline")}
              className="font-semibold text-muted-foreground"
            >
              How It Works
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
