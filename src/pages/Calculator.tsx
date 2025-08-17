import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Calculator as CalculatorIcon, TrendingUp, AlertTriangle } from "lucide-react";

const Calculator = () => {
  const [subscribers, setSubscribers] = useState(1000);
  const [arpu, setArpu] = useState(120);
  const [history, setHistory] = useState(18);
  const [churn, setChurn] = useState(2);
  const [recovery, setRecovery] = useState(50);
  const [advancePeriod, setAdvancePeriod] = useState(9);
  
  const [results, setResults] = useState({
    upfrontPayment: 0,
    totalRouted: 0,
    netAfterOps: 0
  });

  useEffect(() => {
    // Calculate results
    const opsCost = 0.02; // 2% operational cost
    const routingPeriod = 14; // months
    
    const upfrontPayment = subscribers * arpu * advancePeriod;
    const totalRouted = subscribers * arpu * routingPeriod;
    const churnImpact = totalRouted * (churn / 100);
    const recoveryAmount = churnImpact * (recovery / 100);
    const netChurnImpact = churnImpact - recoveryAmount;
    const operationalCosts = totalRouted * opsCost;
    const netAfterOps = totalRouted - netChurnImpact - operationalCosts;

    setResults({
      upfrontPayment: Math.round(upfrontPayment),
      totalRouted: Math.round(totalRouted), 
      netAfterOps: Math.round(netAfterOps)
    });
  }, [subscribers, arpu, history, churn, recovery, advancePeriod]);

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
            Estimate how much upfront capital you could receive based on your subscription metrics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <Card className="p-8 bg-gradient-card border-0 shadow-card">
            <div className="space-y-8">
              <h2 className="font-heading font-semibold text-2xl text-foreground">
                Your Subscription Metrics
              </h2>

              {/* Active Subscribers */}
              <div className="space-y-3">
                <Label htmlFor="subscribers" className="text-base font-medium">
                  Active Subscribers
                </Label>
                <Input
                  id="subscribers"
                  type="number"
                  value={subscribers}
                  onChange={(e) => setSubscribers(Number(e.target.value))}
                  className="text-lg h-12"
                />
              </div>

              {/* ARPU */}
              <div className="space-y-3">
                <Label htmlFor="arpu" className="text-base font-medium">
                  Average Revenue Per User (EUR/month)
                </Label>
                <Input
                  id="arpu"
                  type="number"
                  value={arpu}
                  onChange={(e) => setArpu(Number(e.target.value))}
                  className="text-lg h-12"
                />
              </div>

              {/* History */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Subscription History: {history} months
                </Label>
                <Slider
                  value={[history]}
                  onValueChange={(value) => setHistory(value[0])}
                  max={36}
                  min={12}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>12 months</span>
                  <span>36 months</span>
                </div>
              </div>

              {/* Churn Rate */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Monthly Churn Rate: {churn}%
                </Label>
                <Slider
                  value={[churn]}
                  onValueChange={(value) => setChurn(value[0])}
                  max={10}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0.5%</span>
                  <span>10%</span>
                </div>
              </div>

              {/* Recovery Rate */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Churn Recovery Rate: {recovery}%
                </Label>
                <Slider
                  value={[recovery]}
                  onValueChange={(value) => setRecovery(value[0])}
                  max={80}
                  min={20}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>20%</span>
                  <span>80%</span>
                </div>
              </div>

              {/* Advance Period */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Advance Period: {advancePeriod} months
                </Label>
                <Slider
                  value={[advancePeriod]}
                  onValueChange={(value) => setAdvancePeriod(value[0])}
                  max={12}
                  min={6}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>6 months</span>
                  <span>12 months</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Results */}
          <div className="space-y-8">
            <Card className="p-8 bg-gradient-primary text-primary-foreground border-0 shadow-elevated">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6" />
                  <h2 className="font-heading font-semibold text-2xl">
                    Your Funding Estimate
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="border-b border-primary-foreground/20 pb-4">
                    <div className="text-sm opacity-80 mb-1">Upfront Payment</div>
                    <div className="font-heading font-bold text-3xl">
                      €{results.upfrontPayment.toLocaleString()}
                    </div>
                  </div>

                  <div className="border-b border-primary-foreground/20 pb-4">
                    <div className="text-sm opacity-80 mb-1">Total Routed (14 months)</div>
                    <div className="font-heading font-semibold text-xl">
                      €{results.totalRouted.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm opacity-80 mb-1">Net After Operations</div>
                    <div className="font-heading font-semibold text-xl">
                      €{results.netAfterOps.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Disclaimer */}
            <Card className="p-6 bg-warning/10 border border-warning/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-medium text-warning">Important Disclaimer</h3>
                  <p className="text-sm text-muted-foreground">
                    These figures are illustrative and subject to underwriting review and final contract terms. 
                    Actual amounts may vary based on risk assessment, payment history, and other factors.
                  </p>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <div className="space-y-4">
              <EnhancedButton asChild variant="cta" size="lg" className="w-full">
                <Link to="/apply">
                  Apply for This Amount <ArrowRight className="ml-2" />
                </Link>
              </EnhancedButton>
              <EnhancedButton asChild variant="minimal" size="lg" className="w-full">
                <Link to="/how-it-works">Learn How It Works</Link>
              </EnhancedButton>
            </div>
          </div>
        </div>

        {/* Key Assumptions */}
        <Card className="mt-16 p-8 bg-muted border-0">
          <h3 className="font-heading font-semibold text-xl mb-4">Calculation Methodology</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <strong>Upfront Payment:</strong> Active subscribers × ARPU × advance period
            </div>
            <div>
              <strong>Routing Period:</strong> 14 months of subscription payments
            </div>
            <div>
              <strong>Operational Costs:</strong> 2% of total routed amount
            </div>
            <div>
              <strong>Churn Management:</strong> Recovery efforts on churned subscriptions
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Calculator;