import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ChevronLeft, Building2, Briefcase, BarChart3, DollarSign, Package, Target, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const INDUSTRIES: Record<string, string[]> = {
  "Retail & Wholesale": [
    "End-to-end inventory management",
    "Retail price monitoring (Coming Soon)",
  ],
  "Wellness & Hospitality (Coming Soon)": [
    "Predicting Guest Numbers from CDP (Coming Soon)",
  ],
};

interface FormData {
  industry: string;
  useCase: string;
  // Market
  marketSize: number;
  customerBase: number;
  // Financial
  revenue: number;
  cashOnHand: number;
  accountsReceivable: number;
  currentLiabilities: number;
  // Product
  inventoryUnits: number;
  unitCost: number;
  salesVelocity: number;
  // Goals
  growthTarget: number;
  riskTolerance: string;
}

const initialForm: FormData = {
  industry: "",
  useCase: "",
  marketSize: 500000,
  customerBase: 200,
  revenue: 120000,
  cashOnHand: 15000,
  accountsReceivable: 5000,
  currentLiabilities: 12000,
  inventoryUnits: 40,
  unitCost: 250,
  salesVelocity: 35,
  growthTarget: 20,
  riskTolerance: "moderate",
};

const inputSections = [
  {
    icon: BarChart3,
    title: "Market Data",
    emoji: "📊",
    fields: [
      { key: "marketSize" as const, label: "Market Size (USD)", min: 0, tip: "มูลค่ารวมของตลาดที่ธุรกิจของคุณแข่งขันอยู่ (Total Addressable Market)" },
      { key: "customerBase" as const, label: "Customer Base", min: 0, tip: "จำนวนลูกค้าที่ซื้อสินค้าหรือบริการของคุณในปัจจุบัน" },
    ],
  },
  {
    icon: DollarSign,
    title: "Financial Data",
    emoji: "💰",
    fields: [
      { key: "revenue" as const, label: "Monthly Revenue (USD)", min: 0, tip: "รายได้ต่อเดือนของธุรกิจ ก่อนหักค่าใช้จ่าย" },
      { key: "cashOnHand" as const, label: "Cash on Hand (USD)", min: 0, tip: "เงินสดที่มีอยู่ในบัญชี พร้อมใช้จ่ายได้ทันที" },
      { key: "accountsReceivable" as const, label: "Accounts Receivable (USD)", min: 0, tip: "เงินที่ลูกค้าค้างชำระ ใช้คำนวณ Quick Ratio" },
      { key: "currentLiabilities" as const, label: "Current Liabilities (USD)", min: 1, tip: "หนี้สินระยะสั้นที่ต้องชำระภายใน 1 ปี เช่น ค่าเช่า เจ้าหนี้การค้า" },
    ],
  },
  {
    icon: Package,
    title: "Product & Inventory",
    emoji: "📈",
    fields: [
      { key: "inventoryUnits" as const, label: "Inventory to Purchase (Units)", min: 0, tip: "จำนวนหน่วยสินค้าที่ต้องการสั่งซื้อเพิ่ม" },
      { key: "unitCost" as const, label: "Unit Cost (USD)", min: 0, tip: "ต้นทุนต่อหน่วยของสินค้า รวมค่าผลิตและค่าขนส่ง" },
      { key: "salesVelocity" as const, label: "ML Forecast (Units Needed)", min: 0, tip: "จำนวนหน่วยที่คาดว่าจะขายได้ จาก ML หรือใช้ยอดขายเฉลี่ยต่อเดือน" },
    ],
  },
  {
    icon: Target,
    title: "Business Goals",
    emoji: "🎯",
    fields: [
      { key: "growthTarget" as const, label: "Growth Target (%)", min: 0, tip: "เปอร์เซ็นต์การเติบโตที่ต้องการ เช่น 20% หมายถึงต้องการโตขึ้น 20%" },
    ],
  },
];

export default function ContextPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<string[]>([]);

  const useCases = form.industry ? INDUSTRIES[form.industry] || [] : [];
  const canContinue = form.industry && form.useCase && !form.useCase.includes("Coming Soon");

  const updateField = (key: keyof FormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleContinue = () => {
    const validationErrors: string[] = [];
    if (form.currentLiabilities <= 0) validationErrors.push("Current Liabilities must be greater than 0");
    if (form.salesVelocity <= 0) validationErrors.push("ML Forecast (Units Needed) must be greater than 0");
    if (form.unitCost <= 0) validationErrors.push("Unit Cost must be greater than 0");

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);

    // Store data for MainPage
    sessionStorage.setItem("bp_industry", form.industry);
    sessionStorage.setItem("bp_useCase", form.useCase);
    sessionStorage.setItem("bp_formData", JSON.stringify({
      marketSize: form.marketSize,
      customerBase: form.customerBase,
      revenue: form.revenue,
      cashOnHand: form.cashOnHand,
      accountsReceivable: form.accountsReceivable,
      currentLiabilities: form.currentLiabilities,
      inventoryUnits: form.inventoryUnits,
      unitCost: form.unitCost,
      salesVelocity: form.salesVelocity,
      growthTarget: form.growthTarget,
      riskTolerance: form.riskTolerance,
    }));
    navigate("/main");
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Back */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/canvas")}
            className="text-muted-foreground mb-6 -ml-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>

          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
              Step 1 of 2
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              Enter Your Business Data
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Provide your industry context, financial data, and business goals to generate a personalized Business Play strategy.
            </p>
          </div>

          {/* Industry & Use Case */}
          <div className="space-y-6 mb-8">
            <div className="card-glass">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
                <label className="text-sm font-bold text-foreground">Industry</label>
              </div>
              <Select
                value={form.industry}
                onValueChange={(val) => {
                  updateField("industry", val);
                  updateField("useCase", "");
                }}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(INDUSTRIES).map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="card-glass">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <label className="text-sm font-bold text-foreground">Business Use Case</label>
              </div>
              <Select
                value={form.useCase}
                onValueChange={(val) => updateField("useCase", val)}
                disabled={!form.industry}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={form.industry ? "Select use case" : "Choose an industry first"} />
                </SelectTrigger>
                <SelectContent>
                  {useCases.map((uc) => (
                    <SelectItem key={uc} value={uc}>
                      {uc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Coming Soon State */}
          {form.useCase && form.useCase.includes("Coming Soon") && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-glass text-center py-12 border-2 border-dashed border-border mb-8"
            >
              <div className="text-5xl mb-4">⏳</div>
              <h2 className="text-lg font-extrabold text-foreground mb-2">{form.useCase}</h2>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                We're fine-tuning the Magical Creature logic for this industry. Available soon.
              </p>
              <span className="inline-block mt-4 bg-secondary text-muted-foreground text-xs font-semibold px-4 py-1.5 rounded-full">
                UNDER DEVELOPMENT
              </span>
            </motion.div>
          )}

          {/* Data Input Sections */}
          {form.industry && form.useCase && !form.useCase.includes("Coming Soon") && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {inputSections.map((section) => (
                <div key={section.title} className="card-glass">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <section.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground">
                      {section.emoji} {section.title}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {section.fields.map((field) => (
                      <div key={field.key} className="space-y-1.5">
                        <Label className="text-xs">{field.label}</Label>
                        <Input
                          type="number"
                          value={form[field.key] as number}
                          onChange={(e) => updateField(field.key, +e.target.value)}
                          min={field.min}
                          className="h-10"
                        />
                      </div>
                    ))}
                    {section.title === "Business Goals" && (
                      <div className="space-y-1.5">
                        <Label className="text-xs">Risk Tolerance</Label>
                        <Select
                          value={form.riskTolerance}
                          onValueChange={(val) => updateField("riskTolerance", val)}
                        >
                          <SelectTrigger className="h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conservative">Conservative</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="aggressive">Aggressive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Validation Errors */}
          {errors.length > 0 && (
            <div className="bg-rose/10 border border-rose/30 rounded-xl p-4 mt-6 space-y-1">
              {errors.map((err) => (
                <p key={err} className="text-rose text-sm font-medium">⚠️ {err}</p>
              ))}
            </div>
          )}

          {/* Continue Button */}
          <div className="mt-8">
            <Button
              onClick={handleContinue}
              disabled={!canContinue}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base"
            >
              Continue to Strategy Generator <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
