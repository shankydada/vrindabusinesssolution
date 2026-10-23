"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import type { Faq as FaqItem } from "@/lib/catalog";

export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className="faq-item" key={item.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {item.q}
                <span className="faq-icon" aria-hidden="true">
                  <motion.svg width="12" height="12" viewBox="0 0 12 12" animate={{ rotate: isOpen ? 45 : 0 }}>
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </motion.svg>
                </span>
              </button>
            </h3>
            {/* Answers stay in the DOM when closed so search engines and assistants can read them. */}
              <motion.div
                id={`${id}-${i}`}
                className="faq-answer"
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden={!isOpen}
              >
                <p>{item.a}</p>
              </motion.div>
          </div>
        );
      })}
    </div>
  );
}
