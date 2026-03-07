import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import galleryCnc from "@/assets/gallery-cnc.jpg";
import galleryDoors from "@/assets/gallery-doors.jpg";
import galleryFrames from "@/assets/gallery-frames.jpg";
import galleryWorkshop from "@/assets/gallery-workshop.jpg";
import galleryCustomDoor from "@/assets/gallery-custom-door.jpg";
import galleryFinished from "@/assets/gallery-finished.jpg";
import galleryDoorFrame from "@/assets/gallery-door-frame.jpg";
import galleryManvikFrames from "@/assets/gallery-manvik-frames.jpg";
import galleryWarehouse from "@/assets/gallery-warehouse.jpg";
import galleryWindowFrame from "@/assets/gallery-window-frame.jpg";
import galleryColorOptions from "@/assets/gallery-color-options.jpg";

const galleryItems = [
  { title: "Sliding Door Frame", category: "Door Frames", image: galleryDoorFrame },
  { title: "Color Options Display", category: "Products", image: galleryColorOptions },
  { title: "Window Frame Design", category: "Window Frames", image: galleryWindowFrame },
  { title: "Iron Sheet Door", category: "Doors", image: galleryDoors },
  { title: "Manvik Door Frames", category: "Door Frames", image: galleryManvikFrames },
  { title: "CNC Machine at Work", category: "Manufacturing", image: galleryCnc },
  { title: "Warehouse Stock", category: "Facility", image: galleryWarehouse },
  { title: "Window Frames", category: "Frames", image: galleryFrames },
  { title: "Workshop Overview", category: "Facility", image: galleryWorkshop },
  { title: "Custom Door Design", category: "Doors", image: galleryCustomDoor },
  { title: "Finished Products", category: "Products", image: galleryFinished },
];

const videoItems = [
  { title: "Manufacturing Process", src: "/videos/product-video-1.mp4" },
  { title: "Product Showcase", src: "/videos/product-video-2.mp4" },
  { title: "Workshop Tour", src: "/videos/product-video-3.mp4" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => {
    setLightboxIndex(i);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + dir + galleryItems.length) % galleryItems.length : null
    );
  }, []);

  return (
    <>
      <section id="gallery" className="section-padding bg-secondary/50" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-16"
          >
            <p className="text-primary font-heading text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">Gallery</p>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              Our <span className="text-gradient">Work</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              A glimpse of our manufacturing facility, products, and craftsmanship.
            </p>
          </motion.div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer active:scale-95 transition-transform"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-colors duration-300 flex items-end p-2.5 sm:p-4">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-heading text-xs sm:text-sm text-foreground font-semibold">{item.title}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 sm:mt-16"
          >
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
              Product <span className="text-gradient">Videos</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {videoItems.map((video, i) => (
                <motion.div
                  key={video.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="rounded-lg overflow-hidden bg-background border border-border"
                >
                  <div className="relative aspect-video">
                    <video
                      className="w-full h-full object-cover"
                      preload="metadata"
                      controls
                      playsInline
                      muted
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                  </div>
                  <div className="p-3 flex items-center gap-2">
                    <Play className="w-4 h-4 text-primary flex-shrink-0" />
                    <p className="font-heading text-sm font-medium truncate">{video.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-2 sm:left-4 z-10 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-2 sm:right-4 z-10 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryItems[lightboxIndex].image}
                alt={galleryItems[lightboxIndex].title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
              <div className="mt-3 text-center">
                <p className="font-heading text-sm sm:text-base font-semibold">{galleryItems[lightboxIndex].title}</p>
                <p className="text-xs text-muted-foreground">{galleryItems[lightboxIndex].category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GallerySection;
