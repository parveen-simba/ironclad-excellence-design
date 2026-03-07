import { MessageCircle } from "lucide-react";

const PHONE = "919889603560";
const MESSAGE = encodeURIComponent("Hello! I'm interested in your iron doors and frames. Can you help me?");

const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200"
  >
    <MessageCircle className="w-7 h-7 fill-white stroke-white" />
  </a>
);

export default WhatsAppButton;
