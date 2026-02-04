import { Link } from "react-router-dom";
import { 
  Leaf, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter,
  Heart
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-secondary/50 to-secondary pt-20 pb-8 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container-luxury relative px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-display font-bold text-foreground">
                Prasanna<span className="text-primary">Farm</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-body-sm leading-relaxed">
              Bringing fresh, organic produce directly from our family farm to your table. 
              Committed to sustainable agriculture and your health.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-display text-lg font-semibold text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-body-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="font-display text-lg font-semibold text-foreground">
              Categories
            </h4>
            <ul className="space-y-3">
              {[
                "Fresh Vegetables",
                "Organic Fruits",
                "Dairy Products",
                "Grains & Pulses",
                "Leafy Greens",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/products"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-body-sm"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-display text-lg font-semibold text-foreground">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-body-sm">
                  Prasanna Farm, Village Road,<br />
                  Maharashtra, India 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-muted-foreground hover:text-primary transition-colors text-body-sm"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:hello@prasannafarm.com"
                  className="text-muted-foreground hover:text-primary transition-colors text-body-sm"
                >
                  hello@prasannafarm.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              © {currentYear} Prasanna Farm. Made with{" "}
              <Heart className="w-4 h-4 text-destructive fill-destructive" /> in India
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
