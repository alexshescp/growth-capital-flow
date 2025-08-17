import { Link } from "react-router-dom";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BarChart3, DollarSign, Repeat, Shield } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: BarChart3,
      title: "Share Your Metrics",
      description: "Provide your active subscriber count, ARPU, and 12-24 months of subscription history. We analyze your churn rate and customer acquisition patterns.",
      details: [
        "Active subscriber count",
        "Average revenue per user (ARPU)",
        "12-24 months subscription history",
        "Historical churn analysis"
      ]
    },
    {
      number: "02", 
      icon: DollarSign,
      title: "We Prepay Your Revenue",
      description: "Based on your metrics, we provide 6-12 months of subscriber revenue upfront. For example: €120 ARPU × 1,000 users = €120,000 immediate capital.",
      details: [
        "6-12 months revenue advance",
        "Calculated per active subscriber",
        "Immediate capital transfer",
        "No equity dilution required"
      ]
    },
    {
      number: "03",
      icon: Repeat,
      title: "Bank Routes Payments",
      description: "Your bank routes monthly subscription payments to us for 14 months through a simple covenant arrangement. Your customers experience no changes.",
      details: [
        "14-month payment routing",
        "Bank-facilitated transfers",
        "No customer experience changes",
        "Automatic payment processing"
      ]
    },
    {
      number: "04",
      icon: Shield,
      title: "We Handle Operations",
      description: "We manage churn impacts (typically 2%) with recovery efforts (typically 50%) and handle all collection operations, so you can focus on growth.",
      details: [
        "Churn impact management",
        "Recovery operations (≈50%)",
        "Collection handling",
        "Operational cost coverage (≈2%)"
      ]
    }
  ];

  const assumptions = [
    "12-24 months of stable subscription history",
    "Predictable churn rates below industry averages", 
    "Reliable payment processing infrastructure",
    "Compliance with banking and financial regulations",
    "Geographic coverage in supported jurisdictions"
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <h1 className="font-heading font-bold text-4xl lg:text-5xl text-foreground">
            How FlowCapital Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A simple 4-step process to transform your subscription revenue into immediate growth capital
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <div className="text-6xl font-heading font-bold text-primary/20">
                    {step.number}
                  </div>
                </div>
                
                <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
                  {step.title}
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <Card className="p-8 bg-gradient-card border-0 shadow-elevated">
                  <div className="aspect-video bg-gradient-hero rounded-lg flex items-center justify-center">
                    <step.icon className="w-16 h-16 text-primary/40" />
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Assumptions Section */}
        <Card className="p-8 lg:p-12 bg-muted border-0 mb-16">
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-2xl text-foreground">
              What We Evaluate
            </h2>
            <p className="text-lg text-muted-foreground">
              Our underwriting process focuses on these key factors to ensure a successful partnership:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assumptions.map((assumption, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{assumption}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center space-y-8">
          <h2 className="font-heading font-bold text-3xl text-foreground">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how much capital you could unlock with our funding calculator, or start your application today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EnhancedButton asChild variant="cta" size="xl">
              <Link to="/apply">
                Start Application <ArrowRight className="ml-2" />
              </Link>
            </EnhancedButton>
            <EnhancedButton asChild variant="minimal" size="xl">
              <Link to="/calculator">Calculate Funding</Link>
            </EnhancedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;