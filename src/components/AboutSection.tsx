import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Factory, Cpu, ShieldCheck, Hammer } from "lucide-react";

const features = [
  { icon: Factory, title: "Since 1984", desc: "Over four decades of trusted iron fabrication expertise" },
  { icon: Cpu, title: "CNC Precision", desc: "Automatic CNC machines for unmatched accuracy" },
  { icon: ShieldCheck, title: "Rust Proof", desc: "100% GP base material for lifetime durability" },
  { icon: Hammer, title: "Custom Made", desc: "Every product built to your exact specifications" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="about" className="section-padding bg-secondary/50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-heading text-xs sm:text-sm tracking-[0.2em] uppercase mb-2 sm:mb-3">About Us</p>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Crafting Excellence in
              <span className="text-gradient"> Iron Manufacturing</span>
            </h2>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Established in 1984, <strong className="text-foreground">MI Enterprises</strong> has been at the forefront
                of iron fabrication for over 40 years. Based in Ludhiana, Punjab — India's industrial heartland — we
                specialize in manufacturing rust-proof iron doors and window frames.
              </p>
              <p>
                Our facility is equipped with modern automatic CNC machines, ensuring every product meets the highest
                standards of precision and durability. We use only imported, GP base iron sheets that are 100% rust-proof,
                guaranteeing products that stand the test of time.
              </p>
              <p>
                Every product is custom-manufactured on order, ensuring perfect fit and quality craftsmanship tailored
                to your exact requirements.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:border-primary/50 active:bg-secondary/50 transition-colors group"
              >
                <f.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading text-base sm:text-lg font-semibold mb-1 sm:mb-2">{f.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
