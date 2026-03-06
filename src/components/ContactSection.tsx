import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", phone: "", message: "", requirement: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Enquiry Sent!",
      description: "We'll get back to you shortly. Thank you for contacting MI Enterprises.",
    });
    setFormData({ name: "", phone: "", message: "", requirement: "" });
  };

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-primary font-heading text-xs sm:text-sm tracking-[0.2em] uppercase mb-2 sm:mb-3">Contact Us</p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Ready to place a custom order? Contact us today for a quote.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5 sm:space-y-6"
          >
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">MI Enterprises</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Get in touch with us for custom iron doors, window frames, and fabrication work.
                We're here to help with your requirements.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div className="flex gap-3 sm:gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base mb-1">Office Address</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Near Nankana Sahib Public School,<br />
                    Opp. Jasdev Nagar, Gill Road,<br />
                    Ludhiana, Punjab, India
                  </p>
                </div>
              </div>

              <a href="tel:+919889603560" className="flex gap-3 sm:gap-4 items-start active:bg-secondary/40 -mx-2 px-2 py-1.5 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base mb-1">Phone</p>
                  <p className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                    +91 9889-60356
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Contact: Manpreet Singh Ubhi</p>
                </div>
              </a>

              <a href="mailto:mienterprises1984@gmail.com" className="flex gap-3 sm:gap-4 items-start active:bg-secondary/40 -mx-2 px-2 py-1.5 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base mb-1">Email</p>
                  <p className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                    mienterprises1984@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex gap-3 sm:gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base mb-1">Working Hours</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Mon - Sat: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-5">
              <div>
                <label className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 block">Your Name</label>
                <Input
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-11 sm:h-10 text-base sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 block">Phone Number</label>
                <Input
                  placeholder="Enter your phone number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="h-11 sm:h-10 text-base sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 block">Order Requirement</label>
                <Input
                  placeholder="e.g., Iron doors, Window frames, Custom size..."
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  className="h-11 sm:h-10 text-base sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 block">Message</label>
                <Textarea
                  placeholder="Describe your requirements in detail..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="text-base sm:text-sm"
                />
              </div>
              <Button type="submit" size="lg" className="w-full font-heading tracking-wide text-base sm:text-lg py-5 sm:py-6 active:scale-[0.98] transition-transform">
                <Send className="w-5 h-5 mr-2" />
                Send Enquiry
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
