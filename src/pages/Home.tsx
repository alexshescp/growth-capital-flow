import { Link } from "react-router-dom";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Card } from "@/components/ui/card";
import { CheckCircle, TrendingUp, Clock, Shield, ArrowRight, DollarSign } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.jpg";
import trustLogos from "@/assets/trust-logos.jpg";

const Home = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Immediate Capital Without Dilution",
      description: "Get 6-12 months of subscriber revenue upfront while keeping full ownership of your business."
    },
    {
      icon: TrendingUp,
      title: "Predictable Cash Flow",
      description: "Plan with confidence knowing exactly what capital you'll receive based on your subscriber metrics."
    },
    {
      icon: Clock,
      title: "Faster Scaling & Hiring",
      description: "Fund growth initiatives immediately instead of waiting months for traditional financing."
    },
    {
      icon: Shield,
      title: "Operational Offload",
      description: "We handle payment collection and churn management, so you can focus on your product."
    }
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
            <div className="flex justify-center items-center gap-8 text-xs text-muted-foreground">
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
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8 bg-gradient-card border-0 shadow-card hover:shadow-elevated transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary-lighter rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            ))}
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
              Join hundreds of subscription businesses that have accelerated their growth with u2c. 
              Get approved in minutes, not weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton asChild variant="hero" size="xl">
                <Link to="/apply">
                  Start Your Application <ArrowRight className="ml-2" />
                </Link>
              </EnhancedButton>
              <EnhancedButton asChild variant="minimal" size="xl" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
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