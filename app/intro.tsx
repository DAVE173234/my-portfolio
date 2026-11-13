"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const LINE_1 = 'console.log("Hello, World!");';
const LINE_2 = "Hello, World!";

export default function Intro({
  onReveal,
  onDone,
}: {
  onReveal: () => void; // called while the monitor zooms in, so the portfolio can start animating
  onDone: () => void; // called when the intro has fully faded out
}) {
  const reduce = useReducedMotion() ?? false;
  const [typed1, setTyped1] = useState("");
  const [typed2, setTyped2] = useState("");
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Lock page scroll and focus the screen while the intro is open
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    buttonRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (reduce) {
      setTyped1(LINE_1);
      setTyped2(LINE_2);
      setReady(true);
      return;
    }

    let i = 0;
    let j = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeLine2 = () => {
      j += 1;
      setTyped2(LINE_2.slice(0, j));
      if (j < LINE_2.length) {
        timer = setTimeout(typeLine2, 70);
      } else {
        timer = setTimeout(() => setReady(true), 400);
      }
    };

    const typeLine1 = () => {
      i += 1;
      setTyped1(LINE_1.slice(0, i));
      if (i < LINE_1.length) {
        timer = setTimeout(typeLine1, 45);
      } else {
        timer = setTimeout(typeLine2, 450);
      }
    };

    timer = setTimeout(typeLine1, 600);
    return () => clearTimeout(timer);
  }, [reduce]);

  const handleContinue = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(onReveal, reduce ? 0 : 500);
  };

  const line1Done = typed1.length === LINE_1.length;
  const cursor = (
    <span
      aria-hidden="true"
      className="ml-1 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] animate-pulse bg-white motion-reduce:animate-none"
    />
  );

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={handleContinue}
      aria-label="Tap to continue to the portfolio"
      className="fixed inset-0 z-[100] flex w-full cursor-pointer flex-col items-center justify-center bg-paper px-4"
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{
        duration: reduce ? 0.25 : 0.5,
        delay: leaving && !reduce ? 0.6 : 0,
      }}
      onAnimationComplete={() => {
        if (leaving) onDone();
      }}
    >
      {/* Monitor: zooms into the screen when tapped */}
      <motion.div
        className="relative w-[min(90vw,760px)]"
        style={{ transformOrigin: "50% 36%" }}
        initial={{ opacity: 0, y: 20 }}
        animate={
          leaving && !reduce
            ? { opacity: 1, y: 0, scale: 8 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={
          leaving && !reduce
            ? { duration: 1, ease: [0.7, 0, 0.84, 0] }
            : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
      >
        {/* bezel */}
        <div className="rounded-[1.5rem] border border-black/10 bg-gradient-to-b from-[#f4f4f2] to-[#c9c8c4] p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] sm:p-4">
          {/* screen */}
          <div className="relative flex aspect-[16/10] flex-col justify-center overflow-hidden rounded-xl bg-[#0f0f0f] p-6 text-left font-mono shadow-[inset_0_0_40px_rgba(255,255,255,0.06)] sm:p-10">
            {/* scanlines */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
              }}
            />

            <p className="relative min-h-[1.5em] text-xs text-[#b9b9b6] sm:text-base">
              <span aria-hidden="true">$ </span>
              {typed1}
              {!line1Done && cursor}
            </p>

            <p className="relative mt-4 min-h-[1.2em] text-3xl font-bold tracking-tight text-white sm:text-6xl">
              {typed2}
              {line1Done && !ready && cursor}
            </p>

            <p
              className={`relative mt-8 text-xs uppercase tracking-[0.3em] text-[#b9b9b6] sm:text-sm ${
                ready && !leaving
                  ? "animate-pulse motion-reduce:animate-none"
                  : "opacity-0"
              }`}
            >
              Tap to continue
            </p>
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
        <div className="mx-auto h-12 w-24 bg-gradient-to-b from-[#bdbcb8] to-[#d7d6d2] [clip-path:polygon(15%_0,85%_0,100%_100%,0_100%)]" />
        <div className="mx-auto h-3 w-56 rounded-full bg-gradient-to-b from-[#d7d6d2] to-[#a9a8a4] shadow-lg" />
      </motion.div>
    </motion.button>
  );
}