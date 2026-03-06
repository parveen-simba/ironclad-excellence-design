import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PenTool, Scissors, Hammer, Paintbrush, Truck } from "lucide-react";

const steps = [
  { icon: PenTool, title: "Design", desc: "Custom design based on your specifications" },
  { icon: Scissors, title: "CNC Cutting", desc: "Precision cutting with automatic CNC machines" },
  { icon: Hammer, title: "Fabrication", desc: "Expert assembly and welding by skilled craftsmen" },
  { icon: Paintbrush, title: "Finishing", desc: "Surface treatment and quality inspection" },
  { icon: Truck, title: "Delivery", desc: "Safe packaging and timely delivery to your site" },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="process" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-primary font-heading text-xs sm:text-sm tracking-[0.2em] uppercase mb-2 sm:mb-3">Our Process</p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Manufacturing <span className="text-gradient">Process</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            From design to delivery — a streamlined process ensuring quality at every stage.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-px bg-border" />
          
          {/* Connection line - mobile vertical */}
          <div className="lg:hidden absolute top-8 bottom-8 left-[1.85rem] sm:left-[2.1rem] w-px bg-border" />

          {/* Desktop: horizontal, Mobile: vertical list */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="relative flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0 py-4 lg:py-0 lg:text-center"
              >
                <div className="relative z-10 flex-shrink-0 inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 border-2 border-primary/30 lg:mb-4">
                  <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold flex items-center justify-center font-heading">
                    {i + 1}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-base sm:text-lg font-semibold mb-0.5 sm:mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
