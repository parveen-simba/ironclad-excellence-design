import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/98 backdrop-blur-lg shadow-lg shadow-background/20" : "bg-background/90 backdrop-blur-md"} border-b border-border`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          <a href="#home" className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded flex items-center justify-center flex-shrink-0">
              <span className="font-heading text-primary-foreground font-bold text-base sm:text-lg">MI</span>
            </div>
            <div className="hidden sm:block min-w-0">
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

          <div className="flex items-center gap-2 sm:gap-3">
            <a href="tel:+919889603560" className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              +91 9889-60356
            </a>
            <a href="#contact" className="hidden sm:block">
              <Button className="font-heading tracking-wide text-sm px-4 py-2">
                Get a Custom Order
              </Button>
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 -mr-1 text-foreground active:bg-secondary rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-background/98 backdrop-blur-lg border-t border-border overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1 max-h-[calc(100dvh-3.5rem)] overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center py-3.5 px-3 text-base text-muted-foreground hover:text-primary active:bg-secondary/60 rounded-lg transition-colors font-medium"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-2 pb-1 space-y-3">
                <a href="tel:+919889603560" onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-3 px-3 text-sm text-muted-foreground hover:text-primary active:bg-secondary/60 rounded-lg transition-colors">
                  <Phone className="w-4 h-4" />
                  +91 9889-60356
                </a>
                <a href="#contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full font-heading tracking-wide text-base py-6">Get a Custom Order</Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
