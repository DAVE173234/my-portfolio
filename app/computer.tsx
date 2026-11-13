"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// A desktop computer that rises into view as you scroll to it.
// The screen switches on, then types out the text you give it.
export default function Computer({
  text,
  fileName = "about.md",
}: {
  text: string;
  fileName?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const [typed, setTyped] = useState("");

  // Typewriter: starts after the screen has switched on
  useEffect(() => {
    if (reduce) {
      setTyped(text);
      return;
    }
    if (!inView) return;

    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 2;
        setTyped(text.slice(0, i));
        if (i >= text.length && interval) clearInterval(interval);
      }, 24);
    }, 1700);

    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [inView, reduce, text]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 90, scale: 0.9 }}
      animate={inView || reduce ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ type: "spring", stiffness: 70, damping: 16 }}
      className="w-full"
    >
      {/* bezel */}
      <div className="rounded-[1.25rem] border border-black/10 bg-gradient-to-b from-[#f4f4f2] to-[#c9c8c4] p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] sm:p-4">
        {/* screen: switches on like an old monitor */}
        <div className="overflow-hidden rounded-lg bg-black">
          <motion.div
            initial={reduce ? false : { scaleY: 0.02, opacity: 0 }}
            animate={inView || reduce ? { scaleY: 1, opacity: 1 } : undefined}
            transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative origin-center bg-[#0f0f0f] font-mono shadow-[inset_0_0_40px_rgba(255,255,255,0.06)]"
          >
            {/* scanlines */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
              }}
            />

            {/* window title bar */}
            <div
              aria-hidden="true"
              className="relative flex items-center gap-2 border-b border-white/10 px-4 py-2"
            >
              <span className="h-2 w-2 rounded-full bg-white/50" />
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="ml-3 text-[11px] text-[#b9b9b6]">{fileName}</span>
            </div>

            {/* content */}
            <div className="relative p-5 text-[13px] leading-relaxed text-white sm:p-6 sm:text-[13px]">
              <p aria-hidden="true" className="text-[#b9b9b6]">
                $ cat {fileName}
              </p>

              <p className="mt-4">
                <span className="sr-only">{text}</span>
                {/* the full text is invisible so the screen never changes size while typing */}
                <span aria-hidden="true" className="relative block">
                  <span className="invisible">{text}</span>
                  <span className="absolute inset-0">
                    {typed}
                    <span className="ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] animate-pulse bg-white motion-reduce:animate-none" />
                  </span>
                </span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* chin */}
        <div className="mt-3 flex items-center justify-between px-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/50">
            Dacillo
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-black/70" />
        </div>
      </div>

      {/* neck and base */}
      <div className="mx-auto h-10 w-20 bg-gradient-to-b from-[#bdbcb8] to-[#d7d6d2] [clip-path:polygon(15%_0,85%_0,100%_100%,0_100%)]" />
      <div className="mx-auto h-3 w-48 rounded-full bg-gradient-to-b from-[#d7d6d2] to-[#a9a8a4] shadow-lg" />
    </motion.div>
  );
}