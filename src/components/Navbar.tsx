import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Why Us", href: "#why-us" },
  { label: "Process", href: "#process" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
              <span className="font-heading text-primary-foreground font-bold text-lg">MI</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-heading text-foreground text-lg font-semibold leading-tight">MI Enterprises</p>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Est. 1984</p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:+919889603560" className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              +91 9889-60356
            </a>
            <a href="#contact">
              <Button className="hidden sm:inline-flex font-heading tracking-wide">
                Get a Custom Order
              </Button>
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsOpen(false)}>
              <Button className="w-full mt-2 font-heading tracking-wide">Get a Custom Order</Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
