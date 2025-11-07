/**
 * Number of months subscription payments are routed to recover the upfront advance.
 */
export const ROUTING_PERIOD_MONTHS = 14;

/**
 * Percentage of routed revenue reserved to cover operational handling costs.
 */
export const OPERATIONAL_COST_RATIO = 0.02;

/**
 * Utility to clamp numbers between a minimum and maximum value.
 */
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Shape of the metrics that power the calculator UI.
 * All values are kept in the most human-readable units (EUR, percentage points, months, etc.).
 */
export interface FundingCalculatorMetrics {
  subscribers: number;
  averageRevenuePerUser: number;
  subscriptionHistoryMonths: number;
  churnRate: number;
  recoveryRate: number;
  advancePeriodMonths: number;
}

/**
 * Aggregate results shown in the summary card for the base scenario.
 */
export interface FundingSummary {
  upfrontPayment: number;
  totalRevenueRouted: number;
  netAfterOperations: number;
  churnImpact: number;
  recoveryEffect: number;
}

/**
 * Monthly breakdown of the routed subscription revenue.
 */
export interface MonthlyProjectionEntry {
  monthIndex: number;
  monthLabel: string;
  subscriptionsRouted: number;
  churnLoss: number;
  recoveredChurn: number;
  operationsCost: number;
  netCashFlow: number;
  cumulativeNet: number;
}

/**
 * Sensitivity scenarios let the user compare how conservative or aggressive assumptions change the results.
 */
export interface SensitivityScenario {
  label: string;
  churnRate: number;
  advancePeriodMonths: number;
  summary: FundingSummary;
}

/**
 * Create the base funding summary using the raw metrics from the user.
 */
export const calculateFundingSummary = (metrics: FundingCalculatorMetrics): FundingSummary => {
  const upfrontPayment = metrics.subscribers * metrics.averageRevenuePerUser * metrics.advancePeriodMonths;
  const totalRevenueRouted = metrics.subscribers * metrics.averageRevenuePerUser * ROUTING_PERIOD_MONTHS;
  const churnImpact = totalRevenueRouted * (metrics.churnRate / 100);
  const recoveryEffect = churnImpact * (metrics.recoveryRate / 100);
  const netChurn = churnImpact - recoveryEffect;
  const operationsCost = totalRevenueRouted * OPERATIONAL_COST_RATIO;
  const netAfterOperations = totalRevenueRouted - netChurn - operationsCost;

  return {
    upfrontPayment,
    totalRevenueRouted,
    netAfterOperations,
    churnImpact,
    recoveryEffect,
  };
};

/**
 * Build a month-by-month projection showing how routed subscriptions convert back into liquidity.
 *
 * We assume a constant subscriber base for the projection and distribute the total routed revenue evenly.
 */
export const buildMonthlyProjection = (
  metrics: FundingCalculatorMetrics,
  summary: FundingSummary,
): MonthlyProjectionEntry[] => {
  const monthlyRevenue = summary.totalRevenueRouted / ROUTING_PERIOD_MONTHS;
  const monthlyChurn = monthlyRevenue * (metrics.churnRate / 100);
  const monthlyRecovery = monthlyChurn * (metrics.recoveryRate / 100);
  const monthlyOpsCost = monthlyRevenue * OPERATIONAL_COST_RATIO;

  let cumulativeNet = -summary.upfrontPayment;

  return Array.from({ length: ROUTING_PERIOD_MONTHS }, (_, index) => {
    const monthIndex = index + 1;
    const netCashFlow = monthlyRevenue - monthlyChurn + monthlyRecovery - monthlyOpsCost;
    cumulativeNet += netCashFlow;

    return {
      monthIndex,
      monthLabel: `Month ${monthIndex}`,
      subscriptionsRouted: monthlyRevenue,
      churnLoss: monthlyChurn,
      recoveredChurn: monthlyRecovery,
      operationsCost: monthlyOpsCost,
      netCashFlow,
      cumulativeNet,
    };
  });
};

/**
 * Determine the first month where the upfront payment is fully recovered.
 * Returns null when the routing period does not fully offset the upfront payment.
 */
export const calculateBreakEvenMonth = (projection: MonthlyProjectionEntry[]): number | null => {
  const breakEvenMonth = projection.find((entry) => entry.cumulativeNet >= 0)?.monthIndex ?? null;
  return breakEvenMonth;
};

/**
 * Build three sensitivity scenarios covering conservative, base, and aggressive assumptions.
 */
export const buildSensitivityScenarios = (
  metrics: FundingCalculatorMetrics,
): SensitivityScenario[] => {
  const scenarios = [
    {
      label: "Conservative",
      churnRate: clamp(metrics.churnRate * 1.4, 0, 100),
      advancePeriodMonths: clamp(metrics.advancePeriodMonths - 2, 1, 36),
    },
    {
      label: "Expected",
      churnRate: metrics.churnRate,
      advancePeriodMonths: metrics.advancePeriodMonths,
    },
    {
      label: "Upside",
      churnRate: clamp(metrics.churnRate * 0.7, 0, 100),
      advancePeriodMonths: clamp(metrics.advancePeriodMonths + 2, 1, 36),
    },
  ];

  return scenarios.map((scenario) => {
    const summary = calculateFundingSummary({
      ...metrics,
      churnRate: scenario.churnRate,
      advancePeriodMonths: scenario.advancePeriodMonths,
    });

    return {
      label: scenario.label,
      churnRate: scenario.churnRate,
      advancePeriodMonths: scenario.advancePeriodMonths,
      summary,
    };
  });
};

/**
 * Create a friendly helper that exposes all derived calculator values in a single call.
 * Useful for memoised selectors or unit tests.
 */
export const buildFundingModel = (metrics: FundingCalculatorMetrics) => {
  const summary = calculateFundingSummary(metrics);
  const projection = buildMonthlyProjection(metrics, summary);
  const breakEvenMonth = calculateBreakEvenMonth(projection);
  const scenarios = buildSensitivityScenarios(metrics);

  return {
    summary,
    projection,
    breakEvenMonth,
    scenarios,
  };
};
