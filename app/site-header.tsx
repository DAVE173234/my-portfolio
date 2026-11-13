"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // The page script has already set the theme, so just read it
  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === "light" ? "light" : "dark",
    );
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage can be blocked; the switch still works for this visit
    }
    setTheme(next);
  };

  const dark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      onClick={toggle}
      className={`flex h-7 w-12 items-center rounded-full border border-ink/30 bg-ink/10 px-0.5 ${
        dark ? "justify-start" : "justify-end"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="grid h-5 w-5 place-items-center rounded-full bg-ink text-chalk"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {dark ? (
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          ) : (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </>
          )}
        </svg>
      </motion.span>
    </button>
  );
}

export default function SiteHeader({ href = "/" }: { href?: string }) {
  return (
    <header className="flex items-center justify-between py-6">
      <Link
        href={href}
        className="flex items-center gap-3 font-mono transition-opacity hover:opacity-60"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full border border-ink text-xs font-semibold">
          DD
        </span>
        <span className="text-sm font-semibold">Dave Dacillo</span>
      </Link>
      <ThemeToggle />
    </header>
  );
}