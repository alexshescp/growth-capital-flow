import { useState } from "react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, FileText, Clock, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Apply = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    applicantType: "",
    country: "",
    company: "",
    website: "",
    contactPerson: "",
    email: "",
    phone: "",
    subscribers: "",
    arpu: "",
    history: "",
    churn: "",
    desiredAmount: "",
    advancePeriod: "",
    comments: "",
    consent: false
  });

  const supportedCountries = [
    "USA", "Canada", "Germany", "Netherlands", "France", "Spain", "Switzerland", 
    "Estonia", "Finland", "Sweden", "Norway", "Denmark", "Iceland", "UAE", 
    "Israel", "United Kingdom", "Kuwait", "Oman", "Qatar", "Japan", "Singapore", 
    "Australia", "New Zealand"
  ];

  const providers = [
    "Stripe", "PayPal", "Adyen", "Square", "Braintree", "Chargebee", 
    "Recurly", "Zuora", "Apple App Store", "Google Play Store", "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Application Submitted Successfully!",
      description: "We'll review your application and get back to you within 24 hours.",
    });
    
    setIsSubmitting(false);
  };

  const steps = [
    {
      icon: FileText,
      title: "Fill out a short form",
      description: "Provide your business details and subscription metrics"
    },
    {
      icon: Upload,
      title: "Attach statements",
      description: "Upload statements from your payment systems"
    },
    {
      icon: CheckCircle,
      title: "Specify amount",
      description: "Tell us how much funding you need"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="font-heading font-bold text-4xl lg:text-5xl text-foreground">
            Apply for Funding
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Just three steps to funding: fill out the form, attach statements, specify your amount
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Steps Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <Card className="p-6 bg-gradient-card border-0 shadow-card">
                <h2 className="font-heading font-semibold text-xl mb-6">Three Steps to Funding</h2>
                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary-lighter rounded-lg flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{step.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-muted border-0">
                <h3 className="font-heading font-medium text-lg mb-4">Why not a bank?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>Days vs weeks/months approval</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-accent" />
                    <span>Subscription-focused vs collateral-based</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>Integrates with existing payments</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-gradient-card border-0 shadow-card">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Applicant Type */}
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Applicant Type</Label>
                  <RadioGroup
                    value={formData.applicantType}
                    onValueChange={(value) => setFormData({...formData, applicantType: value})}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="company" id="company" />
                      <Label htmlFor="company">Company</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sole-proprietor" id="sole-proprietor" />
                      <Label htmlFor="sole-proprietor">Sole Proprietor</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <Label htmlFor="country">Country of Registration</Label>
                  <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedCountries.map((country) => (
                        <SelectItem key={country} value={country.toLowerCase()}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Note: Other countries are not supported yet.
                  </p>
                </div>

                {/* Company Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Project Name</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Your company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      placeholder="https://your-website.com"
                    />
                  </div>
                </div>

                {/* Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact-person">Contact Person</Label>
                    <Input
                      id="contact-person"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                      placeholder="Full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+1234567890"
                    />
                  </div>
                </div>

                {/* Subscription Metrics */}
                <div className="space-y-6">
                  <h3 className="font-heading font-semibold text-xl">Subscription Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="subscribers">Active Subscribers</Label>
                      <Input
                        id="subscribers"
                        type="number"
                        value={formData.subscribers}
                        onChange={(e) => setFormData({...formData, subscribers: e.target.value})}
                        placeholder="1000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="arpu">ARPU (EUR/month)</Label>
                      <Input
                        id="arpu"
                        type="number"
                        value={formData.arpu}
                        onChange={(e) => setFormData({...formData, arpu: e.target.value})}
                        placeholder="120"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="history">History (months)</Label>
                      <Input
                        id="history"
                        type="number"
                        value={formData.history}
                        onChange={(e) => setFormData({...formData, history: e.target.value})}
                        placeholder="18"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="churn">Latest Churn (%)</Label>
                      <Input
                        id="churn"
                        type="number"
                        step="0.1"
                        value={formData.churn}
                        onChange={(e) => setFormData({...formData, churn: e.target.value})}
                        placeholder="2.5"
                      />
                    </div>
                  </div>
                </div>

                {/* Funding Details */}
                <div className="space-y-6">
                  <h3 className="font-heading font-semibold text-xl">Funding Request</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="desired-amount">Desired Amount (EUR)</Label>
                      <Input
                        id="desired-amount"
                        type="number"
                        value={formData.desiredAmount}
                        onChange={(e) => setFormData({...formData, desiredAmount: e.target.value})}
                        placeholder="1080000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="advance-period">Advance Period</Label>
                      <Select value={formData.advancePeriod} onValueChange={(value) => setFormData({...formData, advancePeriod: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 months</SelectItem>
                          <SelectItem value="9">9 months</SelectItem>
                          <SelectItem value="12">12 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-4">
                  <Label>Upload Statements</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">
                      Upload CSV, XLSX, or PDF files from your payment systems
                    </p>
                    <EnhancedButton variant="minimal" size="sm">
                      Choose Files
                    </EnhancedButton>
                  </div>
                </div>

                {/* Comments */}
                <div className="space-y-2">
                  <Label htmlFor="comments">Comments (Optional)</Label>
                  <Textarea
                    id="comments"
                    value={formData.comments}
                    onChange={(e) => setFormData({...formData, comments: e.target.value})}
                    placeholder="Any additional information you'd like to share..."
                    rows={4}
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => setFormData({...formData, consent: !!checked})}
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed">
                    I agree to the Terms & Privacy Policy and consent to u2c processing my data 
                    for the purpose of evaluating my funding application. I understand that covenant rules 
                    may apply and temporary NDA read-only access to my admin panel may be requested.
                  </Label>
                </div>

                {/* Submit Button */}
                <EnhancedButton
                  type="submit"
                  variant="cta"
                  size="xl"
                  className="w-full"
                  disabled={isSubmitting || !formData.consent}
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Application"}
                </EnhancedButton>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;