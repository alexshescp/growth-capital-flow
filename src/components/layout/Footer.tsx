import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl">FlowCapital</h3>
            <p className="text-sm opacity-90">
              Unlock capital for the subscription economy. Turn your subscriptions into upfront growth capital.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold">Product</h4>
            <div className="space-y-2 text-sm">
              <Link to="/how-it-works" className="block hover:opacity-80">How It Works</Link>
              <Link to="/calculator" className="block hover:opacity-80">Calculator</Link>
              <Link to="/use-cases" className="block hover:opacity-80">Use Cases</Link>
              <Link to="/pricing" className="block hover:opacity-80">Pricing</Link>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold">Company</h4>
            <div className="space-y-2 text-sm">
              <Link to="/about" className="block hover:opacity-80">About</Link>
              <Link to="/faq" className="block hover:opacity-80">FAQ</Link>
              <a href="mailto:contact@flowcapital.com" className="block hover:opacity-80">Contact</a>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold">Legal</h4>
            <div className="space-y-2 text-sm">
              <Link to="/privacy" className="block hover:opacity-80">Privacy Policy</Link>
              <Link to="/terms" className="block hover:opacity-80">Terms of Service</Link>
              <Link to="/security" className="block hover:opacity-80">Security</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-80">
            © 2024 FlowCapital. All rights reserved. | Licensed financial services provider.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;