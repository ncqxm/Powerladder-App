import { motion } from "framer-motion";
import { HelpCircle, BarChart3, DollarSign, Target, Sparkles, BookOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const glossary = [
  {
    term: "Opportunity Score",
    icon: "📊",
    definition:
      "คะแนนที่วัดความสามารถในการตอบสนองความต้องการของตลาด โดยเปรียบเทียบ Supply (สินค้าคงคลัง) กับ Demand (ความต้องการ) ยิ่งสมดุลมาก คะแนนยิ่งสูง แสดงว่าธุรกิจมีโอกาสทำกำไรสูง",
    formula: "Demand-Supply Alignment = min(Inventory ÷ ML Forecast, 1) × 100",
  },
  {
    term: "Financial Readiness Score",
    icon: "💵",
    definition:
      "คะแนนที่วัดความพร้อมทางการเงิน (Liquidity) โดยใช้ Quick Ratio เป็นตัวชี้วัดหลัก ดูจากสภาพคล่องและความสามารถในการรองรับค่าใช้จ่ายระยะสั้น ยิ่งสูงยิ่งแข็งแกร่ง",
    formula: "Quick Ratio = (Cash + AR) ÷ Current Liabilities → ปรับเป็นคะแนน 0-100",
  },
  {
    term: "Sweet Spot Score",
    icon: "🎯",
    definition:
      "คะแนนรวมจาก Opportunity Score และ Financial Readiness Score ใช้ตัดสินว่าธุรกิจของคุณอยู่ในจุดสมดุลทองคำ (Golden Equilibrium) หรือไม่ คะแนนยิ่งสูงยิ่งมีศักยภาพ",
    formula: "Sweet Spot = (Opportunity × 0.5) + (Financial × 0.5)",
  },
  {
    term: "Quick Ratio",
    icon: "⚡",
    definition:
      "สัดส่วนสภาพคล่องที่วัดความสามารถในการชำระหนี้ระยะสั้น ค่า > 1 หมายความว่าธุรกิจมีสินทรัพย์สภาพคล่องเพียงพอ ถือว่าปลอดภัย ค่า < 1 อาจเสี่ยงต่อปัญหาสภาพคล่อง",
    formula: "Quick Ratio = (Cash on Hand + Accounts Receivable) ÷ Current Liabilities",
  },
  {
    term: "Inventory Velocity",
    icon: "🚀",
    definition:
      "ความเร็วในการขายสินค้าคงคลัง ยิ่งสูงแสดงว่าสินค้าหมุนเวียนเร็ว ลดความเสี่ยงจากสต็อกค้าง เป็นตัวชี้วัดสำคัญสำหรับธุรกิจ Retail",
    formula: "Inventory Velocity = Sales Velocity ÷ Inventory Units",
  },
];

const plays = [
  {
    emoji: "🛡️",
    name: "Handle the Ski",
    condition: "Opportunity ≥ 60 & Financial ≥ 60",
    description: "ธุรกิจมีทั้งโอกาสและความพร้อมทางการเงิน — รักษาสมดุลและขยายอย่างมั่นคง",
  },
  {
    emoji: "🧠",
    name: "Calculated Ambition",
    condition: "Opportunity ≥ 60 & Financial < 60",
    description: "โอกาสตลาดดี แต่การเงินยังไม่แข็งแกร่ง — ต้องวางแผนระดมทุนก่อนขยาย",
  },
  {
    emoji: "🦄",
    name: "Unicorn",
    condition: "Opportunity < 60 & Financial ≥ 60",
    description: "การเงินแข็งแกร่ง แต่ตลาดยังไม่ชัด — ใช้เงินทุนสร้างโอกาสใหม่",
  },
  {
    emoji: "🦕",
    name: "Dinosaur",
    condition: "Opportunity < 60 & Financial < 60",
    description: "ทั้งสองมิติต่ำ — ต้อง pivot หรือลดความเสี่ยงเร่งด่วน",
  },
];

const faqs = [
  {
    q: "ข้อมูลที่กรอกจะถูกเก็บไว้ที่ไหน?",
    a: "ข้อมูลการวิเคราะห์จะถูกบันทึกในบัญชีของคุณโดยอัตโนมัติ คุณสามารถดูประวัติย้อนหลังได้ในหน้า Profile",
  },
  {
    q: "ML Forecast (Units Needed) คืออะไร?",
    a: "คือจำนวนหน่วยสินค้าที่คาดการณ์ว่าจะขายได้ โดยอ้างอิงจากโมเดล Machine Learning หากยังไม่มี ให้ใช้ยอดขายเฉลี่ยต่อเดือนแทน",
  },
  {
    q: "ทำไมต้องกรอก Accounts Receivable?",
    a: "AR คือเงินที่ลูกค้าค้างชำระ ถือเป็นสินทรัพย์สภาพคล่องที่ใช้คำนวณ Quick Ratio ซึ่งเป็นส่วนสำคัญของ Financial Readiness Score",
  },
  {
    q: "Risk Tolerance มีผลอย่างไร?",
    a: "ระดับความเสี่ยงที่ยอมรับได้จะส่งผลต่อคำแนะนำ Action Plan เช่น Conservative จะเน้นรักษาเงินสด ส่วน Aggressive จะแนะนำให้ลงทุนมากขึ้น",
  },
  {
    q: "สามารถ Export ผลวิเคราะห์ได้ไหม?",
    a: "ได้ครับ! ไปที่หน้า Profile → แท็บประวัติการวิเคราะห์ → เลือก Export CSV หรือ JSON ได้เลย",
  },
];

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <HelpCircle className="h-3.5 w-3.5" /> Help Center
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-3">
            Help & Documentation
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            เรียนรู้วิธีใช้งาน Golden Equilibrium Framework และทำความเข้าใจคะแนนต่าง ๆ
          </p>
        </div>

        {/* Glossary */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Glossary — คำศัพท์สำคัญ</h2>
          </div>
          <div className="space-y-4">
            {glossary.map((item) => (
              <div key={item.term} className="card-glass">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{item.term}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.definition}</p>
                    <code className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded">
                      {item.formula}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Business Play Classifications */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">4 Business Play Classifications</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {plays.map((play) => (
              <div key={play.name} className="card-glass">
                <div className="text-3xl mb-2">{play.emoji}</div>
                <h3 className="font-bold text-foreground mb-1">{play.name}</h3>
                <p className="text-xs text-primary font-semibold mb-2">{play.condition}</p>
                <p className="text-sm text-muted-foreground">{play.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">คำถามที่พบบ่อย (FAQ)</h2>
          </div>
          <Accordion type="single" collapsible className="card-glass">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm font-semibold text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </motion.div>
    </div>
  );
}
