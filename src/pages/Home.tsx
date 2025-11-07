import { Link } from "react-router-dom";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  TrendingUp,
  Clock,
  Shield,
  ArrowRight,
  DollarSign,
  BarChart3,
  LineChart,
  PieChart,
  Users,
} from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.jpg";
import trustLogos from "@/assets/trust-logos.jpg";

const Home = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Immediate Capital Without Dilution",
      description: "Get 6-12 months of subscriber revenue upfront while keeping full ownership of your business.",
    },
    {
      icon: TrendingUp,
      title: "Predictable Cash Flow",
      description: "Plan with confidence knowing exactly what capital you'll receive based on your subscriber metrics.",
    },
    {
      icon: Clock,
      title: "Faster Scaling & Hiring",
      description: "Fund growth initiatives immediately instead of waiting months for traditional financing.",
    },
    {
      icon: Shield,
      title: "Operational Offload",
      description: "We handle payment collection and churn management, so you can focus on your product.",
    },
  ];

  const useCases = [
    {
      icon: BarChart3,
      title: "Marketing expansion",
      description: "Acquire customers ahead of schedule with campaign funding tied directly to ARR performance.",
    },
    {
      icon: LineChart,
      title: "Product acceleration",
      description: "Bring forward roadmap milestones by hiring engineers with non-dilutive capital.",
    },
    {
      icon: PieChart,
      title: "M&A dry powder",
      description: "Leverage predictable subscriptions to finance bolt-on acquisitions or buyouts.",
    },
    {
      icon: Users,
      title: "Customer success automation",
      description: "Invest in retention programs and tooling that stabilise net revenue retention.",
    },
  ];

  const operatingPrinciples = [
    {
      heading: "Bank-grade partnerships",
      content:
        "Regulated banking partners route subscription payments, ensuring treasury controls remain enterprise-ready.",
    },
    {
      heading: "Underwriting transparency",
      content:
        "Weekly reporting dashboards show performance triggers, covenant headroom, and stress testing guidance.",
    },
    {
      heading: "Dedicated portfolio team",
      content: "Specialist operators assist with revenue operations, churn mitigation, and international payment setups.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="font-heading font-bold text-4xl lg:text-6xl text-foreground leading-tight">
                  Turn your subscriptions into
                  <span className="bg-gradient-accent bg-clip-text text-transparent"> upfront growth capital</span>
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground font-body leading-relaxed">
                  Get 6–12 months of subscriber revenue today. Customers keep paying monthly; you get cash now.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <EnhancedButton asChild variant="hero" size="xl">
                  <Link to="/apply">
                    Apply Now <ArrowRight className="ml-2" />
                  </Link>
                </EnhancedButton>
                <EnhancedButton asChild variant="minimal" size="xl">
                  <Link to="/how-it-works">How It Works</Link>
                </EnhancedButton>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>No equity dilution</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Quick approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>24/7 support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src={heroIllustration}
                alt="Digital factoring illustration showing subscription flow and growth capital"
                className="w-full h-auto rounded-2xl shadow-hero"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Trusted by leading financial institutions
            </p>
            <img
              src={trustLogos}
              alt="Partner financial institutions and security certifications"
              className="mx-auto max-w-4xl w-full h-auto opacity-60"
            />
            <div className="flex flex-wrap justify-center items-center gap-8 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Bank-grade security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>SOC 2 compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>GDPR compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Global treasury partners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">
              Why subscription businesses choose u2c
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your predictable revenue into immediate growth opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <Card
                key={benefit.title}
                className="p-8 bg-gradient-card border-0 shadow-card hover:shadow-elevated transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary-lighter rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">Deploy capital with conviction</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Each advance is tied to a measurable business outcome. We help you prioritise the highest-impact initiatives and
              set KPI guardrails before funds arrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase) => (
              <Card key={useCase.title} className="p-6 bg-background border border-border/60 shadow-sm">
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-primary-lighter rounded-lg flex items-center justify-center">
                    <useCase.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{useCase.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Principles */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-heading font-bold text-3xl text-foreground">
                Built for finance and revenue leaders
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Align treasury, revenue operations, and customer success around a single capital partner. Every cohort is
                monitored, modelled, and de-risked by our internal team.
              </p>
              <ul className="space-y-3">
                {operatingPrinciples.map((principle) => (
                  <li key={principle.heading} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{principle.heading}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{principle.content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="p-10 bg-gradient-card border-0 shadow-elevated">
              <div className="space-y-6">
                <h3 className="font-heading text-2xl font-semibold text-foreground">Control tower reporting</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Receive weekly underwriting updates, stress test dashboards, and risk alerts to keep leadership aligned.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="space-y-2">
                    <span className="font-medium text-foreground">Live revenue monitoring</span>
                    <p>Integrations with Stripe, Chargebee, Recurly, App Stores, and direct bank feeds.</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium text-foreground">Covenant alerts</span>
                    <p>Immediate notifications when churn, retention, or utilisation trigger threshold reviews.</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium text-foreground">Scenario modelling</span>
                    <p>Share live models with finance stakeholders to align on cash runway decisions.</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-medium text-foreground">Portfolio support</span>
                    <p>On-demand specialists for collections, win-back campaigns, and reporting automation.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl">
              Ready to unlock your growth capital?
            </h2>
            <p className="text-lg opacity-90">
              Join hundreds of subscription businesses that have accelerated their growth with u2c. Get approved in minutes,
              not weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton asChild variant="hero" size="xl">
                <Link to="/apply">
                  Start Your Application <ArrowRight className="ml-2" />
                </Link>
              </EnhancedButton>
              <EnhancedButton
                asChild
                variant="minimal"
                size="xl"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <Link to="/calculator">Calculate Your Capital</Link>
              </EnhancedButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
