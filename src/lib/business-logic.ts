// Business Play calculation logic ported from the Streamlit app

export interface SweetSpotResult {
  opportunity: number;
  financialRisk: number;
  sweetSpot: number;
  qr: number;
}

export function calculateSweetSpot(
  sales: number,
  inventory: number,
  cash: number,
  ar: number,
  currentLiabilities: number
): SweetSpotResult {
  // Opportunity Score (0–100)
  let opportunity = 0;
  if (sales > 0) {
    opportunity = 100 * (1 - Math.abs(sales - inventory) / sales);
  }
  opportunity = Math.max(0, Math.min(opportunity, 100));

  // Financial Risk Score (0–100)
  let financialRisk: number;
  let qr: number;

  if (currentLiabilities <= 0) {
    financialRisk = 100;
    qr = 999.0;
  } else {
    qr = (cash + ar) / currentLiabilities;
    financialRisk = qr >= 1 ? 100 : qr * 100;
    financialRisk = Math.max(0, Math.min(financialRisk, 100));
  }

  const sweetSpot = 0.5 * opportunity + 0.5 * financialRisk;

  return {
    opportunity: Math.round(opportunity * 100) / 100,
    financialRisk: Math.round(financialRisk * 100) / 100,
    sweetSpot: Math.round(sweetSpot * 100) / 100,
    qr: Math.round(qr * 100) / 100,
  };
}

export type BusinessPlay =
  | "Handle the Ski"
  | "Calculated Ambition"
  | "Unicorn Mistake Step"
  | "Dinosaur Hoping for Luck";

export function classifyBusinessPlay(
  opportunity: number,
  financialRisk: number,
  sweetSpot: number
): BusinessPlay {
  const diff = Math.abs(opportunity - financialRisk);
  const THRESHOLD = 20;

  if (sweetSpot >= 80) return "Handle the Ski";
  if (sweetSpot >= 60 && diff > THRESHOLD) return "Unicorn Mistake Step";
  if (sweetSpot >= 60 && diff <= THRESHOLD) return "Calculated Ambition";
  return "Dinosaur Hoping for Luck";
}

export const PLAY_ZONES: Record<BusinessPlay, {
  x0: number; y0: number; x1: number; y1: number;
  color: string; label: string; emoji: string;
}> = {
  "Dinosaur Hoping for Luck": {
    x0: 0, y0: 0, x1: 50, y1: 50,
    color: "rgba(248, 215, 218, 0.4)",
    label: "Dinosaur\nHigh Uncertainty",
    emoji: "🦕",
  },
  "Calculated Ambition": {
    x0: 0, y0: 50, x1: 50, y1: 100,
    color: "rgba(209, 236, 241, 0.4)",
    label: "Calculated Ambition",
    emoji: "🧠",
  },
  "Unicorn Mistake Step": {
    x0: 50, y0: 0, x1: 100, y1: 50,
    color: "rgba(255, 243, 205, 0.4)",
    label: "Unicorn Mistake Step",
    emoji: "🦄",
  },
  "Handle the Ski": {
    x0: 50, y0: 50, x1: 100, y1: 100,
    color: "rgba(212, 237, 218, 0.4)",
    label: "Handle the Ski",
    emoji: "🛡",
  },
};

export const BUSINESS_PLAY_DESCRIPTIONS: Record<BusinessPlay, {
  shortDesc: string;
  alertType: "error" | "warning" | "info" | "success";
  alertMsg: string;
}> = {
  "Dinosaur Hoping for Luck": {
    shortDesc: "High uncertainty detected. Data quality and financial risk controls must be fixed first.",
    alertType: "error",
    alertMsg: "⚠️ High uncertainty detected. Data quality and financial risk controls must be fixed first.",
  },
  "Unicorn Mistake Step": {
    shortDesc: "Strong demand but cash risk is too high. Growth may break the business.",
    alertType: "warning",
    alertMsg: "⚠️ Strong demand but cash risk is too high. Growth may break the business.",
  },
  "Handle the Ski": {
    shortDesc: "Risk is manageable with proper controls. Proceed carefully with inventory decisions.",
    alertType: "info",
    alertMsg: "🛡️ Risk is manageable with proper controls. Proceed carefully with inventory decisions.",
  },
  "Calculated Ambition": {
    shortDesc: "Strong financial position detected. You may pursue a more aggressive growth strategy.",
    alertType: "success",
    alertMsg: "🚀 Strong financial position detected. You may pursue a more aggressive growth strategy.",
  },
};
