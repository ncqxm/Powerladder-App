import type { BusinessPlay } from "@/lib/business-logic";

interface Props {
  basePlay: string;
  derivedPlay: BusinessPlay;
  sweetSpot: number;
  opportunityScore: number;
  financialRiskScore: number;
}

export default function BusinessPlaySummaryCard({
  basePlay,
  derivedPlay,
  sweetSpot,
  opportunityScore,
  financialRiskScore,
}: Props) {
  return (
    <div className="card-glass">
      <div className="flex items-center gap-2 text-lg font-bold text-foreground mb-5">
        <span className="text-xl">🧭</span> Business Play Summary
      </div>

      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Base Play
        </div>
        <div className="text-sm font-semibold text-foreground">{basePlay}</div>

        <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Derived Strategy
        </div>
        <div className="text-base font-bold text-primary border-l-4 border-primary pl-3">
          {derivedPlay}
        </div>
      </div>

      <hr className="border-border my-5" />

      <div className="text-center bg-secondary rounded-xl p-5 mb-5 border border-border">
        <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Sweet Spot Score
        </div>
        <div className="text-5xl font-black text-foreground leading-none mt-1">
          {sweetSpot.toFixed(0)}
          <span className="text-lg font-normal text-muted-foreground">/100</span>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="metric-card-green flex-1">
          <div className="text-[0.65rem] font-bold text-emerald">
            Opportunity Score
          </div>
          <div className="text-xl font-extrabold text-emerald">
            {opportunityScore.toFixed(0)}
          </div>
        </div>
        <div className="metric-card-amber flex-1">
          <div className="text-[0.65rem] font-bold text-amber">
            Financial Readiness
          </div>
          <div className="text-xl font-extrabold text-amber">
            {financialRiskScore.toFixed(0)}
          </div>
        </div>
      </div>
    </div>
  );
}
