import { useCallback, useMemo, useReducer } from "react";
import {
  buildFundingModel,
  buildSensitivityScenarios,
  calculateFundingSummary,
  FundingCalculatorMetrics,
} from "@/lib/calculator";

type CalculatorField = keyof FundingCalculatorMetrics;

type Action =
  | { type: "update"; field: CalculatorField; value: number }
  | { type: "reset" };

const initialMetrics: FundingCalculatorMetrics = {
  subscribers: 1000,
  averageRevenuePerUser: 120,
  subscriptionHistoryMonths: 18,
  churnRate: 2,
  recoveryRate: 50,
  advancePeriodMonths: 9,
};

const reducer = (state: FundingCalculatorMetrics, action: Action): FundingCalculatorMetrics => {
  switch (action.type) {
    case "update": {
      const value = Number.isFinite(action.value) ? action.value : 0;
      return {
        ...state,
        [action.field]: value,
      };
    }
    case "reset":
      return initialMetrics;
    default:
      return state;
  }
};

/**
 * Encapsulates all calculator state management and derived values.
 * Keeping this logic outside of the component makes the view easier to read and unit-testable.
 */
export const useFundingCalculator = () => {
  const [metrics, dispatch] = useReducer(reducer, initialMetrics);

  const summary = useMemo(() => calculateFundingSummary(metrics), [metrics]);
  const fundingModel = useMemo(() => buildFundingModel(metrics), [metrics]);
  const sensitivity = useMemo(() => buildSensitivityScenarios(metrics), [metrics]);

  const updateField = useCallback((field: CalculatorField, value: number) => {
    dispatch({ type: "update", field, value });
  }, []);

  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  return {
    metrics,
    summary,
    fundingModel,
    sensitivity,
    updateField,
    reset,
  };
};
