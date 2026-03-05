import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const galleryItems = [
  { title: "Iron Sheet Door", category: "Doors" },
  { title: "CNC Machine at Work", category: "Manufacturing" },
  { title: "Window Frame", category: "Frames" },
  { title: "Workshop Overview", category: "Facility" },
  { title: "Custom Door Design", category: "Doors" },
  { title: "Finished Products", category: "Products" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="section-padding bg-secondary/50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3">Gallery</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A glimpse of our manufacturing facility, products, and craftsmanship.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative aspect-square bg-card border border-border rounded-lg overflow-hidden cursor-pointer"
            >
              {/* Placeholder industrial pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded bg-primary/10 flex items-center justify-center">
                    <span className="font-heading text-primary text-lg font-bold">{item.title.charAt(0)}</span>
                  </div>
                  <p className="font-heading text-sm text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity font-heading text-primary-foreground text-sm bg-primary/80 px-4 py-2 rounded">
                  View
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
