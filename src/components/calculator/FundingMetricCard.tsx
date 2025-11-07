import { Card } from "@/components/ui/card";
import type { ReactNode } from "react";

interface FundingMetricCardProps {
  label: string;
  value: string;
  description: string;
  icon: ReactNode;
}

/**
 * Present a single metric in a consistent card layout.
 */
const FundingMetricCard = ({ label, value, description, icon }: FundingMetricCardProps) => (
  <Card className="p-6 bg-background border border-border/60 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start gap-4">
      <div className="mt-1 text-primary">{icon}</div>
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="font-heading text-2xl font-semibold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  </Card>
);

export default FundingMetricCard;
