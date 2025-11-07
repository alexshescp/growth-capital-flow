import { useFundingCalculator } from "@/hooks/use-funding-calculator";
import { Link } from "react-router-dom";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ProjectionTable from "@/components/calculator/ProjectionTable";
import FundingMetricCard from "@/components/calculator/FundingMetricCard";
import SensitivityGrid from "@/components/calculator/SensitivityGrid";
import {
  ArrowRight,
  Calculator as CalculatorIcon,
  TrendingUp,
  AlertTriangle,
  Wallet,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const SliderNote = ({ min, max }: { min: string; max: string }) => (
  <div className="flex justify-between text-xs text-muted-foreground">
    <span>{min}</span>
    <span>{max}</span>
  </div>
);

const Calculator = () => {
  const { metrics, fundingModel, sensitivity, updateField, reset } = useFundingCalculator();

  const { summary, projection, breakEvenMonth } = fundingModel;

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto">
            <CalculatorIcon className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="font-heading font-bold text-4xl lg:text-5xl text-foreground">
            Funding Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Model the impact of routing subscription payments to unlock upfront capital. Adjust churn, recovery, and advance
            periods to stress-test the financing plan in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* Input Form */}
          <Card className="p-8 bg-gradient-card border-0 shadow-card xl:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading font-semibold text-2xl text-foreground">
                Your subscription metrics
              </h2>
              <EnhancedButton variant="ghost" onClick={reset}>
                Reset to defaults
              </EnhancedButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Active Subscribers */}
              <div className="space-y-3">
                <Label htmlFor="subscribers" className="text-base font-medium">
                  Active subscribers
                </Label>
                <Input
                  id="subscribers"
                  type="number"
                  value={metrics.subscribers}
                  onChange={(e) => updateField("subscribers", Number(e.target.value))}
                  className="text-lg h-12"
                />
              </div>

              {/* ARPU */}
              <div className="space-y-3">
                <Label htmlFor="arpu" className="text-base font-medium">
                  Average revenue per user (EUR/month)
                </Label>
                <Input
                  id="arpu"
                  type="number"
                  value={metrics.averageRevenuePerUser}
                  onChange={(e) => updateField("averageRevenuePerUser", Number(e.target.value))}
                  className="text-lg h-12"
                />
              </div>

              {/* History */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Subscription history: {metrics.subscriptionHistoryMonths} months
                </Label>
                <Slider
                  value={[metrics.subscriptionHistoryMonths]}
                  onValueChange={(value) => updateField("subscriptionHistoryMonths", value[0])}
                  max={36}
                  min={12}
                  step={1}
                  className="w-full"
                />
                <SliderNote min="12 months" max="36 months" />
              </div>

              {/* Churn Rate */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Monthly churn rate: {metrics.churnRate.toFixed(1)}%
                </Label>
                <Slider
                  value={[metrics.churnRate]}
                  onValueChange={(value) => updateField("churnRate", Number(value[0].toFixed(1)))}
                  max={10}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
                <SliderNote min="0.5%" max="10%" />
              </div>

              {/* Recovery Rate */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Churn recovery rate: {metrics.recoveryRate}%
                </Label>
                <Slider
                  value={[metrics.recoveryRate]}
                  onValueChange={(value) => updateField("recoveryRate", value[0])}
                  max={80}
                  min={20}
                  step={5}
                  className="w-full"
                />
                <SliderNote min="20%" max="80%" />
              </div>

              {/* Advance Period */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Advance period: {metrics.advancePeriodMonths} months
                </Label>
                <Slider
                  value={[metrics.advancePeriodMonths]}
                  onValueChange={(value) => updateField("advancePeriodMonths", value[0])}
                  max={18}
                  min={6}
                  step={1}
                  className="w-full"
                />
                <SliderNote min="6 months" max="18 months" />
              </div>
            </div>
          </Card>

          {/* Summary Card */}
          <Card className="p-8 bg-gradient-primary text-primary-foreground border-0 shadow-elevated space-y-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6" />
              <h2 className="font-heading font-semibold text-2xl">Your funding estimate</h2>
            </div>

            <div className="space-y-6">
              <div className="border-b border-primary-foreground/20 pb-4">
                <p className="text-sm opacity-80 mb-1">Upfront payment</p>
                <p className="font-heading font-bold text-3xl">
                  €{summary.upfrontPayment.toLocaleString()}
                </p>
              </div>

              <FundingMetricCard
                label="Total routed"
                value={`€${summary.totalRevenueRouted.toLocaleString()}`}
                description="Subscription revenue collected across the full 14-month routing covenant."
                icon={<Wallet className="w-5 h-5" />}
              />

              <FundingMetricCard
                label="Net after operations"
                value={`€${summary.netAfterOperations.toLocaleString()}`}
                description="Expected total return once churn impact and operational costs are accounted for."
                icon={<BarChart3 className="w-5 h-5" />}
              />

              <FundingMetricCard
                label="Recovered churn"
                value={`€${summary.recoveryEffect.toLocaleString()}`}
                description="Projected amount clawed back through win-back and retention programmes."
                icon={<ShieldCheck className="w-5 h-5" />}
              />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 space-y-8">
            <ProjectionTable projection={projection} />

            {/* Break-even insight */}
            <Card className="p-6 bg-muted border-0">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Break-even insight</h3>
              <p className="text-sm text-muted-foreground">
                {breakEvenMonth
                  ? `The upfront advance is fully recovered by month ${breakEvenMonth}. Each month afterwards generates net positive cash.`
                  : "Based on the current assumptions the routed period does not fully repay the upfront advance. Reduce churn or increase recovery to reach break-even sooner."}
              </p>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="p-6 bg-background border border-border/60">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Scenario sensitivity</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Quickly compare conservative and upside outcomes to understand risk tolerance and underwriting headroom.
              </p>
              <SensitivityGrid scenarios={sensitivity} />
            </Card>

            <Card className="p-6 bg-warning/10 border border-warning/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-medium text-warning">Important disclaimer</h3>
                  <p className="text-sm text-muted-foreground">
                    These figures are illustrative and subject to underwriting review, collection performance, and bank routing
                    terms. Engage with our team for bespoke pricing once real transaction data is verified.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-8 bg-gradient-primary text-primary-foreground border-0 shadow-elevated">
            <h3 className="font-heading text-2xl font-semibold">Ready to capitalise on your MRR?</h3>
            <p className="mt-3 text-primary-foreground/80">
              Submit a pre-qualification application to receive a tailored underwriting checklist and legal documentation
              preview within 24 hours.
            </p>
            <EnhancedButton asChild variant="hero" size="lg" className="mt-6">
              <Link to="/apply">
                Apply for this amount <ArrowRight className="ml-2" />
              </Link>
            </EnhancedButton>
          </Card>

          <Card className="p-8 bg-muted border-0">
            <h3 className="font-heading text-2xl font-semibold text-foreground">Need help interpreting the model?</h3>
            <p className="mt-3 text-muted-foreground">
              Our capital specialists can walk through underwriting criteria, eligible payment processors, and hedging options to
              keep your cash flow predictable.
            </p>
            <EnhancedButton asChild variant="minimal" size="lg" className="mt-6">
              <Link to="/how-it-works">Speak with an expert</Link>
            </EnhancedButton>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
