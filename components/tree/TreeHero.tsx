"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { offeringHref, products } from "@/lib/catalog";

function Poster() {
  return (
    <div className="tree-poster">
      <Image src="/tree.png" alt="" width={256} height={256} priority />
    </div>
  );
}

const TreeScene = dynamic(() => import("./TreeScene"), { ssr: false, loading: Poster });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function TreeHero() {
  const [active, setActive] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [compact, setCompact] = useState(false);
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    setCanRender(hasWebGL());
    const mq = window.matchMedia("(max-width: 600px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // On first load, walk through each branch once so visitors see that the tree is interactive.
  useEffect(() => {
    if (!canRender || reduce || touched) return;
    let i = -1;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const start = setTimeout(function next() {
      i += 1;
      setActive(i < products.length ? i : null);
      if (i < products.length) timers.push(setTimeout(next, 2200));
    }, 2000);
    return () => {
      clearTimeout(start);
      timers.forEach(clearTimeout);
    };
  }, [canRender, reduce, touched]);

  const choose = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  const current = active !== null ? products[active] : null;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <motion.div
          className="hero-text"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 id="hero-title">Business software that grows with you</h1>
          <p className="lede">
            Vrinda Business Solution builds and sets up the systems growing businesses run on: SMARA CRM, BeeWhat
            WhatsApp CRM, ERP setup, payroll and attendance, workflow automation, AI agents and agentic AI.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">
              Book a Free Demo
            </Link>
            <Link href="/products" className="btn btn-secondary">
              Compare Products
            </Link>
          </div>
        </motion.div>

        <div className="hero-tree">
          <div className="tree-stage">
            {canRender ? (
              <TreeScene
                branches={products.map((p) => ({ label: p.short }))}
                active={active}
                onActivate={choose}
                reducedMotion={reduce}
                compact={compact}
              />
            ) : (
              <Poster />
            )}
          </div>
          <div className="tree-caption-static" aria-live={touched ? "polite" : "off"}>
            <AnimatePresence mode="wait" initial={false}>
              {current ? (
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  <strong>{current.name}</strong>
                  <span>{current.summary} </span>
                  <a className="text-link" href={offeringHref(current)}>
                    Open {current.name}
                  </a>
                </motion.div>
              ) : (
                <motion.p key="hint" className="muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Each branch is a product. Point at one, or tap it, to see what it does and how data flows to it.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
        <ul className="branch-picker hero-chips" aria-label="Products">
          {products.map((p, i) => (
            <li key={p.slug}>
              <a
                href={offeringHref(p)}
                data-active={active === i}
                onMouseEnter={() => choose(i)}
                onFocus={() => choose(i)}
              >
                {p.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
