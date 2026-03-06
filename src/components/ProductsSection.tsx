import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import productDoor from "@/assets/product-door.jpg";
import productWindow from "@/assets/product-window.jpg";
import productFabrication from "@/assets/product-fabrication.jpg";

const products = [
  {
    image: productDoor,
    title: "Iron Sheet Doors",
    description: "Heavy-duty rust-proof GP base iron sheet doors manufactured with CNC precision. Built for security and longevity.",
    features: ["100% Rust Proof", "CNC Cut Precision", "Imported Iron Sheets", "Custom Sizes"],
    badge: "Best Seller",
  },
  {
    image: productWindow,
    title: "Window Frames",
    description: "Durable rust-proof window frames crafted from premium GP base material. Designed for perfect fit and lasting strength.",
    features: ["GP Base Material", "Weather Resistant", "Perfect Finish", "Custom Designs"],
    badge: "Popular",
  },
  {
    image: productFabrication,
    title: "Custom Fabrication",
    description: "Bespoke iron fabrication services for specialized requirements. From design to delivery, precision at every step.",
    features: ["Made to Order", "Design Consultation", "Quality Assured", "Timely Delivery"],
    badge: "On Order",
  },
];

const ProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="products" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-primary font-heading text-xs sm:text-sm tracking-[0.2em] uppercase mb-2 sm:mb-3">Our Products</p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Premium Iron <span className="text-gradient">Products</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            All products are custom-manufactured using imported GP base iron sheets and automatic CNC machines
            for unmatched quality and durability.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3">
                  <Badge className="bg-primary text-primary-foreground font-heading text-[10px] sm:text-xs">{product.badge}</Badge>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="font-heading text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{product.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">{product.description}</p>
                <div className="space-y-1.5 sm:space-y-2">
                  {product.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs sm:text-sm">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
