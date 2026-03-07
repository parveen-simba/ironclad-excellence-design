import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded flex items-center justify-center">
                <span className="font-heading text-primary-foreground font-bold text-base sm:text-lg">MI</span>
              </div>
              <div>
                <p className="font-heading text-foreground font-semibold text-sm sm:text-base">MI Enterprises</p>
                <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Est. 1984</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Trusted manufacturer of rust-proof iron doors and window frames since 1984. Precision CNC manufacturing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4">Quick Links</h4>
            <div className="space-y-1.5 sm:space-y-2">
              {["Home", "About", "Products", "Process", "Gallery", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-xs sm:text-sm text-muted-foreground hover:text-primary active:text-primary transition-colors py-0.5"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4">Products</h4>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <p>Iron Sheet Doors</p>
              <p>Window Frames</p>
              <p>Custom Fabrication</p>
              <p>CNC Manufacturing</p>
            </div>
          </div>

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4">Contact</h4>
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex gap-2 text-xs sm:text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Gill Road, Ludhiana, Punjab, India</span>
              </div>
              <a href="tel:+918699960356" className="flex gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary active:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                +91 86999-60356
              </a>
              <a href="mailto:mienterprises1984@gmail.com" className="flex gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary active:text-primary transition-colors break-all">
                <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                mienterprises1984@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 sm:mt-10 pt-5 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            © {new Date().getFullYear()} MI Enterprises. All rights reserved.
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            Manufacturing Excellence Since 1984
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
