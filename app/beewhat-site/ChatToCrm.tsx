"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

const messages = [
  { dir: "in", text: "Hi, is the 2BHK in Baner still available?", time: "10:02" },
  { dir: "out", text: "Yes, it is. Would you like to visit this weekend?", time: "10:04" },
  { dir: "in", text: "Saturday 11 am works for me.", time: "10:05" },
  { dir: "out", text: "Booked. Sharing the location now.", time: "10:05" },
] as const;

// One step per message, plus the contact card first and the follow-up task last.
const LAST_STEP = messages.length + 1;

export function ChatToCrm() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStep(LAST_STEP);
      return;
    }
    if (!inView || step >= LAST_STEP) return;
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 500 : 1300);
    return () => clearTimeout(t);
  }, [inView, step, reduce]);

  const shown = messages.slice(0, Math.min(step, messages.length));
  const enter = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } };

  return (
    <figure className="bw-demo" ref={ref} aria-label="Example: WhatsApp messages saved to a CRM contact automatically">
      <div className="bw-phone">
        <div className="bw-phone-head">
          <strong>+91 98200 41721</strong>
          <span>WhatsApp</span>
        </div>
        <div className="bw-chat" aria-live="polite">
          <AnimatePresence initial={false}>
            {shown.map((m) => (
              <motion.p key={m.text} className={`bw-bubble bw-${m.dir}`} {...enter}>
                {m.text}
                <time>{m.time}</time>
              </motion.p>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="bw-crm">
        <div className="bw-crm-head">
          <span>CRM contact</span>
          <small>Example screen</small>
        </div>
        <AnimatePresence initial={false}>
          {step >= 1 && (
            <motion.div className="bw-contact" {...enter}>
              <strong>New lead from WhatsApp</strong>
              <span>+91 98200 41721 · Created automatically</span>
            </motion.div>
          )}
        </AnimatePresence>
        <ol className="bw-timeline">
          <AnimatePresence initial={false}>
            {shown.map((m) => (
              <motion.li key={m.text} {...enter} transition={{ duration: 0.35, delay: reduce ? 0 : 0.35 }}>
                <span className="bw-dot" data-dir={m.dir} aria-hidden="true" />
                <span>
                  <em>{m.dir === "in" ? "Received" : "Sent"} {m.time}</em> {m.text}
                </span>
              </motion.li>
            ))}
            {step >= LAST_STEP && (
              <motion.li key="task" className="bw-task" {...enter}>
                <span className="bw-dot" data-dir="task" aria-hidden="true" />
                <span>
                  <em>Follow-up created</em> Site visit, Saturday 11:00
                </span>
              </motion.li>
            )}
          </AnimatePresence>
        </ol>
        {step >= LAST_STEP && !reduce && (
          <button type="button" className="bw-replay" onClick={() => setStep(0)}>
            Replay Example
          </button>
        )}
      </div>
      <figcaption className="visually-hidden">
        A customer messages on WhatsApp. BeeWhat creates the contact, saves each message to its timeline and adds a
        follow-up, with no manual entry.
      </figcaption>
    </figure>
  );
}
