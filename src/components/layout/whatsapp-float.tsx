"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

import { GENERAL_ENQUIRY, waLink } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={waLink(GENERAL_ENQUIRY)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-ink text-gold ring-1 ring-gold/40 transition-colors duration-300 hover:bg-gold hover:text-ink md:bottom-8 md:right-8"
        >
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-gold/20 blur-md transition-opacity duration-500 group-hover:opacity-0"
          />
          <FaWhatsapp className="size-6" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
