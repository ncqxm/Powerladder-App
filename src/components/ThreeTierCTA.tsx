import { motion } from "framer-motion";
import { Github, GraduationCap, Building2, Check, ArrowRight, Star, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

type CellValue = boolean | string;

const comparisonRows: { feature: string; tier1: CellValue; tier2: CellValue; tier3: CellValue }[] = [
  { feature: "คะแนน Golden Equilibrium", tier1: true, tier2: true, tier3: true },
  { feature: "Magical Creature 9 อุตสาหกรรม", tier1: true, tier2: true, tier3: true },
  { feature: "คำแนะนำกลยุทธ์จาก AI", tier1: true, tier2: true, tier3: true },
  { feature: "สิทธิ์รับ Feedback Credit", tier1: true, tier2: false, tier3: false },
  { feature: "Workshop เต็มวัน (Onsite)", tier1: false, tier2: true, tier3: true },
  { feature: "วิเคราะห์ข้อมูลเฉพาะธุรกิจ", tier1: false, tier2: true, tier3: true },
  { feature: "เปรียบเทียบคู่แข่ง", tier1: "เบื้องต้น", tier2: "เชิงลึก", tier3: "ระดับองค์กร" },
  { feature: "ติดตั้ง Snowflake", tier1: false, tier2: "สาธิตเท่านั้น", tier3: true },
  { feature: "Dashboard และรายงานเฉพาะ", tier1: false, tier2: false, tier3: true },
  { feature: "บัญชี Snowflake ภายใต้ Power Ladder", tier1: false, tier2: false, tier3: true },
  { feature: "ผู้ดูแลบัญชีเฉพาะ", tier1: false, tier2: false, tier3: true },
  { feature: "ระยะเวลาอัพพอร์ต", tier1: "ชุมชน", tier2: "อีเมล 30 วัน", tier3: "4 เดือน + ต่อเนื่อง" },
];

function renderCell(value: CellValue) {
  if (value === true) return <Check className="h-4 w-4 text-primary mx-auto" />;
  if (value === false) return <Minus className="h-4 w-4 text-muted-foreground/40 mx-auto" />;
  return <span className="text-xs text-muted-foreground">{value}</span>;
}

const tiers = [
  {
    step: "ขั้นที่ 1",
    title: "สำรวจ",
    subtitle: "Business Play Plugin",
    price: "ฟรี",
    priceNote: "ตลอดไป",
    icon: Github,
    color: "border-border",
    highlight: false,
    cta: "ดาวน์โหลดจาก GitHub",
    ctaVariant: "outline" as const,
    href: "https://github.com/powerladder",
    features: [
      "ให้คะแนน Golden Equilibrium (OS + FRS)",
      "Magical Creature 9 อุตสาหกรรม",
      "เปรียบเทียบคู่แข่งเบื้องต้น",
      "คำแนะนำกลยุทธ์จาก AI",
      "ชุมชนผู้ใช้งาน",
      "รับ Feedback Credit สำหรับ Step 2 หรือ 3",
    ],
  },
  {
    step: "ขั้นที่ 2",
    title: "เรียนรู้",
    subtitle: "Workshop เต็มวัน (Onsite)",
    price: "25,000",
    priceNote: "บาท",
    icon: GraduationCap,
    color: "border-primary",
    highlight: true,
    badge: "แนะนำ",
    cta: "สมัคร Workshop",
    ctaVariant: "default" as const,
    href: "https://www.powerladder.net/plstart",
    features: [
      "เรียนเต็มวันกับผู้ก่อตั้ง Power Ladder",
      "ให้คะแนน Golden Equilibrium กับข้อมูลจริงของคุณ",
      "วิเคราะห์คู่แข่ง + แผนกลยุทธ์ที่ใช้ได้จริง",
      "สาธิต Snowflake แบบ Hands-on",
      "ใบรับรองการเข้าร่วม",
      "อัพพอร์ตทางอีเมล 30 วันหลัง Workshop",
      "ใช้สิทธิ์ Feedback Credit ลด 3,500 บาท",
    ],
  },
  {
    step: "ขั้นที่ 3",
    title: "ลงมือทำ",
    subtitle: "ที่ปรึกษา Data Strategy + Snowflake",
    price: "350,000",
    priceNote: "บาท",
    icon: Building2,
    color: "border-amber",
    highlight: false,
    cta: "นัดพูดคุยเบื้องต้น",
    ctaVariant: "outline" as const,
    href: "https://www.powerladder.net/plstart",
    features: [
      "วิเคราะห์ธุรกิจและวางกลยุทธ์ข้อมูลครบวงจร",
      "ติดตั้งและย้ายข้อมูลสู่ Snowflake",
      "ปรับแต่ง Golden Equilibrium เฉพาะธุรกิจคุณ",
      "วางระบบข้อมูลครบวงจร + ฝึกอบรมทีม",
      "บัญชี Snowflake ภายใต้การดูแลของ Power Ladder",
      "รีวิวผลลัพธ์รายเดือน",
      "ผู้ดูแลบัญชีเฉพาะ (Account Manager)",
      "สิทธิ์ Feedback Credit ลดค่า Snowflake 17,500 บาท",
    ],
    extra: "+ Snowflake 15,000 บาท/เดือน",
  },
];

export default function ThreeTierCTA() {
  return (
    <section className="bg-card border-y border-border">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">เลือกเส้นทางการเติบโตของคุณ</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-2">
            3 ขั้นตอนสู่ <span className="text-primary">Golden Equilibrium</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            จาก AI วิเคราะห์ธุรกิจฟรี สู่ที่ปรึกษา Snowflake ครบวงจร — บันไดสามขั้นที่ออกแบบมาเพื่อ CEO ค้าปลีกและค้าส่งไทย
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {[1, 2, 3].map((step, i) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                step === 2
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground border border-border"
              }`}>
                {step}
              </div>
              {i < 2 && <div className="w-16 md:w-24 h-0.5 bg-border" />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-16 md:gap-28 mb-10 text-xs text-muted-foreground">
          <span>ทดลองฟรี</span>
          <span>เรียนรู้</span>
          <span>ลงมือทำ</span>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border-2 ${tier.color} p-6 flex flex-col bg-background ${
                tier.highlight ? "shadow-lg shadow-primary/10 scale-[1.02]" : ""
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {tier.badge}
                </span>
              )}

              <div className="mb-4">
                <span className="text-xs font-bold text-primary">{tier.step}</span>
                <h3 className="text-2xl font-black text-foreground">{tier.title}</h3>
                <p className="text-sm text-muted-foreground">{tier.subtitle}</p>
              </div>

              <div className="mb-5">
                <span className="text-4xl font-black text-foreground">{tier.price}</span>
                <span className="text-sm text-muted-foreground ml-1">{tier.priceNote}</span>
                {tier.extra && (
                  <p className="text-xs text-primary mt-1">❄️ {tier.extra}</p>
                )}
              </div>

              <Button
                variant={tier.highlight ? "default" : "outline"}
                className={`w-full font-semibold mb-5 ${tier.highlight ? "bg-primary text-primary-foreground" : ""}`}
                asChild
              >
                <a href={tier.href} target="_blank" rel="noopener noreferrer">
                  {tier.cta} {tier.highlight && <ArrowRight className="ml-1 h-4 w-4" />}
                </a>
              </Button>

              <div className="flex-1">
                {i > 0 && (
                  <p className="text-xs font-semibold text-muted-foreground mb-3">
                    ทุกอย่างใน Step {i} รวมถึง:
                  </p>
                )}
                <ul className="space-y-2">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ──────── Feature Comparison Table ──────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-black text-foreground text-center mb-8">
            เปรียบเทียบแพ็กเกจ
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-muted-foreground font-medium w-[40%]">คุณสมบัติ</th>
                  <th className="text-center py-4 px-4 font-bold text-foreground">
                    <div>ขั้นที่ 1</div>
                    <div className="text-xs text-muted-foreground font-normal">ฟรี</div>
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-primary">
                    <div>ขั้นที่ 2</div>
                    <div className="text-xs text-muted-foreground font-normal">25,000 บาท</div>
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-amber">
                    <div>ขั้นที่ 3</div>
                    <div className="text-xs text-muted-foreground font-normal">350,000 บาท</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                    <td className="py-3.5 px-4 text-muted-foreground">{row.feature}</td>
                    <td className="py-3.5 px-4 text-center">{renderCell(row.tier1)}</td>
                    <td className="py-3.5 px-4 text-center">{renderCell(row.tier2)}</td>
                    <td className="py-3.5 px-4 text-center">{renderCell(row.tier3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ──────── Why Power Ladder? ──────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-black text-foreground text-center mb-3">
            ทำไมต้อง Power Ladder?
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {[
              { icon: "❄️", title: "Snowflake Partner", desc: "พันธมิตรรับรอง" },
              { icon: "🤖", title: "ขับเคลื่อนด้วย AI", desc: "Claude + Snowflake" },
              { icon: "🇹🇭", title: "เข้าใจตลาดไทย", desc: "ทีมงานคนไทย" },
              { icon: "🏆", title: "Golden Equilibrium", desc: "กรอบวิเคราะห์เฉพาะ" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-background p-6 text-center hover:border-primary/40 transition-colors"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Value Props */}
          <div className="mt-8 rounded-2xl bg-secondary border border-border p-8 text-center">
            <p className="text-sm font-semibold text-primary mb-4">ความคุ้มค่าที่คุณจะได้รับ</p>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl md:text-4xl font-black text-foreground">0.01%</div>
                <p className="text-xs text-muted-foreground mt-1">ค่า Workshop เทียบกับรายได้ต่อปี</p>
                <p className="text-[10px] text-muted-foreground/60">(Tier B: 25,000 / 200M)</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-foreground">2-5%</div>
                <p className="text-xs text-muted-foreground mt-1">ลดต้นทุนจากการจัดการ สต็อกอัจฉริยะ</p>
                <p className="text-[10px] text-muted-foreground/60">ค้าปลีก & ค้าส่ง</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-foreground">10-50x</div>
                <p className="text-xs text-muted-foreground mt-1">ผลตอบแทนจากการลงทุน Snowflake</p>
                <p className="text-[10px] text-muted-foreground/60">ภายในปีแรก</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feedback Credit Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-2xl bg-secondary border border-border p-8 text-center"
        >
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber text-amber" />
            ))}
          </div>
          <h3 className="text-xl font-black text-foreground mb-2">โปรแกรม Feedback Credit</h3>
          <p className="text-sm text-muted-foreground mb-4">
            ใช้ Plugin ฟรีอย่างน้อย 7 วัน แล้วส่ง Feedback ให้เรา
          </p>
          <p className="text-sm text-primary font-semibold">
            รับเครดิตส่วนลด <span className="text-foreground font-black">3,500 บาท</span> สำหรับ Workshop หรือ <span className="text-foreground font-black">17,500 บาท</span> สำหรับค่า Snowflake
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <div className="rounded-xl bg-background border border-border px-5 py-3 text-center">
              <div className="text-xs text-muted-foreground">Workshop</div>
              <div className="text-2xl font-black text-primary">3,500 <span className="text-xs text-muted-foreground">บาท</span></div>
            </div>
            <div className="text-muted-foreground self-center text-sm">หรือ</div>
            <div className="rounded-xl bg-background border border-border px-5 py-3 text-center">
              <div className="text-xs text-muted-foreground">ค่า Snowflake</div>
              <div className="text-2xl font-black text-amber">17,500 <span className="text-xs text-muted-foreground">บาท</span></div>
            </div>
          </div>
        </motion.div>

        {/* ──────── FAQ ──────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-black text-foreground text-center mb-8">
            คำถามที่พบบ่อย
          </h3>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqItems.map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
