import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
} from "recharts";
import type { BusinessPlay } from "@/lib/business-logic";
import { PLAY_ZONES } from "@/lib/business-logic";

interface Props {
  opportunity: number;
  financialRisk: number;
  sweetSpot: number;
  derivedPlay: BusinessPlay;
}

export default function StrategyMap({ opportunity, financialRisk, derivedPlay }: Props) {
  const data = [{ x: opportunity, y: financialRisk }];

  return (
    <div className="card-glass p-4">
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />

          {/* Zone backgrounds */}
          {Object.entries(PLAY_ZONES).map(([key, zone]) => (
            <ReferenceArea
              key={key}
              x1={zone.x0}
              x2={zone.x1}
              y1={zone.y0}
              y2={zone.y1}
              fill={zone.color}
              fillOpacity={1}
              strokeOpacity={0}
            />
          ))}

          <ReferenceLine x={50} stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />
          <ReferenceLine y={50} stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />

          <XAxis
            type="number"
            dataKey="x"
            domain={[0, 100]}
            name="Opportunity"
            label={{ value: "Opportunity Score", position: "insideBottom", offset: -10, style: { fill: 'hsl(var(--muted-foreground))' } }}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis
            type="number"
            dataKey="y"
            domain={[0, 100]}
            name="Financial Readiness"
            label={{ value: "Financial Readiness", angle: -90, position: "insideLeft", style: { fill: 'hsl(var(--muted-foreground))' } }}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />

          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="card-glass text-sm p-3">
                  <p className="font-bold text-foreground">{derivedPlay}</p>
                  <p className="text-muted-foreground">
                    Opportunity: {payload[0].value}
                  </p>
                  <p className="text-muted-foreground">
                    Financial Readiness: {payload[1]?.value}
                  </p>
                </div>
              );
            }}
          />

          <Scatter data={data} fill="hsl(var(--foreground))">
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <p className="text-xs text-muted-foreground text-center mt-2">
        Your position is shown by the dot. Background reflects your Business Play zone.
      </p>
    </div>
  );
}
