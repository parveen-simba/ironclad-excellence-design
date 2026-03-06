import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import galleryCnc from "@/assets/gallery-cnc.jpg";
import galleryDoors from "@/assets/gallery-doors.jpg";
import galleryFrames from "@/assets/gallery-frames.jpg";
import galleryWorkshop from "@/assets/gallery-workshop.jpg";
import galleryCustomDoor from "@/assets/gallery-custom-door.jpg";
import galleryFinished from "@/assets/gallery-finished.jpg";

const galleryItems = [
  { title: "Iron Sheet Door", category: "Doors", image: galleryDoors },
  { title: "CNC Machine at Work", category: "Manufacturing", image: galleryCnc },
  { title: "Window Frames", category: "Frames", image: galleryFrames },
  { title: "Workshop Overview", category: "Facility", image: galleryWorkshop },
  { title: "Custom Door Design", category: "Doors", image: galleryCustomDoor },
  { title: "Finished Products", category: "Products", image: galleryFinished },
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
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-colors duration-300 flex items-end justify-start p-4">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-heading text-sm text-foreground font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
