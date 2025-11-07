import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { MonthlyProjectionEntry } from "@/lib/calculator";

interface ProjectionTableProps {
  projection: MonthlyProjectionEntry[];
}

/**
 * Render the month-by-month projection in a scrollable table to avoid overflowing on smaller screens.
 */
const ProjectionTable = ({ projection }: ProjectionTableProps) => (
  <Card className="p-6 bg-background border border-border/60">
    <div className="space-y-4">
      <div>
        <h3 className="font-heading text-xl font-semibold text-foreground">Monthly cash recovery</h3>
        <p className="text-sm text-muted-foreground">
          Shows how the routed subscriptions perform after churn, recovery efforts and operational costs. Values are rounded
          to the nearest euro.
        </p>
      </div>
      <ScrollArea className="h-[320px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>Gross revenue</TableHead>
              <TableHead>Churn loss</TableHead>
              <TableHead>Recovered</TableHead>
              <TableHead>Ops cost</TableHead>
              <TableHead>Net cash</TableHead>
              <TableHead>Cumulative</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projection.map((month) => (
              <TableRow key={month.monthIndex}>
                <TableCell className="font-medium">{month.monthLabel}</TableCell>
                <TableCell>€{Math.round(month.subscriptionsRouted).toLocaleString()}</TableCell>
                <TableCell className="text-destructive">-€{Math.round(month.churnLoss).toLocaleString()}</TableCell>
                <TableCell className="text-success">€{Math.round(month.recoveredChurn).toLocaleString()}</TableCell>
                <TableCell className="text-warning">-€{Math.round(month.operationsCost).toLocaleString()}</TableCell>
                <TableCell className="font-medium">€{Math.round(month.netCashFlow).toLocaleString()}</TableCell>
                <TableCell className={month.cumulativeNet >= 0 ? "text-success" : "text-muted-foreground"}>
                  €{Math.round(month.cumulativeNet).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  </Card>
);

export default ProjectionTable;
