import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                <span className="font-heading text-primary-foreground font-bold text-lg">MI</span>
              </div>
              <div>
                <p className="font-heading text-foreground font-semibold">MI Enterprises</p>
                <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Est. 1984</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Trusted manufacturer of rust-proof iron doors and window frames since 1984. Precision CNC manufacturing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["Home", "About", "Products", "Process", "Gallery", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4">Products</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Iron Sheet Doors</p>
              <p>Window Frames</p>
              <p>Custom Fabrication</p>
              <p>CNC Manufacturing</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Gill Road, Ludhiana, Punjab, India</span>
              </div>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+919889603560" className="hover:text-primary transition-colors">+91 9889-60356</a>
              </div>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:mienterprises1984@gmail.com" className="hover:text-primary transition-colors">mienterprises1984@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MI Enterprises. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Manufacturing Excellence Since 1984
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
