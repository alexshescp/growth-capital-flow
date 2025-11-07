import { Card } from "@/components/ui/card";
import type { SensitivityScenario } from "@/lib/calculator";

interface SensitivityGridProps {
  scenarios: SensitivityScenario[];
}

/**
 * Compare conservative/base/aggressive scenarios side-by-side.
 */
const SensitivityGrid = ({ scenarios }: SensitivityGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {scenarios.map((scenario) => (
      <Card key={scenario.label} className="p-6 bg-background border border-border/60">
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{scenario.label} scenario</p>
            <h3 className="font-heading text-xl font-semibold text-foreground">€{Math.round(scenario.summary.upfrontPayment).toLocaleString()}</h3>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><span className="font-medium text-foreground">Churn:</span> {scenario.churnRate.toFixed(1)}%</p>
            <p>
              <span className="font-medium text-foreground">Advance period:</span> {scenario.advancePeriodMonths} months
            </p>
            <p>
              <span className="font-medium text-foreground">Net after ops:</span> €{Math.round(scenario.summary.netAfterOperations).toLocaleString()}
            </p>
          </div>
        </div>
      </Card>
    ))}
  </div>
);

export default SensitivityGrid;
