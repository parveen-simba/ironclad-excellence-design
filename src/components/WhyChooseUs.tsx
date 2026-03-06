import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Shield, Globe, Cpu, Settings, Zap } from "lucide-react";

const reasons = [
  { icon: Award, title: "40+ Years Experience", desc: "Trusted since 1984 with decades of manufacturing expertise" },
  { icon: Shield, title: "Rust Proof GP Base", desc: "100% rust-resistant material for lifetime durability" },
  { icon: Globe, title: "Imported Iron Sheets", desc: "Premium quality imported materials for superior strength" },
  { icon: Cpu, title: "CNC Machine Precision", desc: "Automatic CNC cutting for flawless accuracy every time" },
  { icon: Settings, title: "Custom Orders", desc: "Every product made to your exact specifications on order" },
  { icon: Zap, title: "Strong & Durable", desc: "Built to withstand harsh conditions and last for decades" },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="why-us" className="section-padding bg-secondary/50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-primary font-heading text-xs sm:text-sm tracking-[0.2em] uppercase mb-2 sm:mb-3">Why Choose Us</p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Built on <span className="text-gradient">Trust & Quality</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Here's what sets MI Enterprises apart from the rest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex gap-3 sm:gap-4 p-4 sm:p-6 rounded-lg bg-card border border-border hover:border-primary/40 active:bg-secondary/50 transition-colors group"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <r.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-heading text-base sm:text-lg font-semibold mb-0.5 sm:mb-1">{r.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
