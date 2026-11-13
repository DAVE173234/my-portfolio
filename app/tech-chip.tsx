"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { Tech, TechGroup } from "./tech-data";

const LOGO_COLOR = "0f0f0f"; // same near-black as the rest of the site

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const chipClass =
  "group inline-flex items-center gap-2 rounded-md border border-ink/30 bg-ink/5 px-4 py-2 font-mono text-sm font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-chalk";

// Plain </> icon, used when a technology has no logo
function CodeGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </svg>
  );
}

// Logo in the site's black. If one name fails to load, the next is tried,
// and finally the plain </> icon is shown.
function Logo({ slugs }: { slugs: string[] }) {
  const [index, setIndex] = useState(0);
  const slug = slugs[index];

  if (!slug) return <CodeGlyph />;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${slug}/${LOGO_COLOR}`}
      alt=""
      width={16}
      height={16}
      loading="lazy"
      onError={() => setIndex((i) => i + 1)}
      className="h-4 w-4 transition [filter:var(--logo-filter)] group-hover:[filter:var(--logo-filter-hover)]"
    />
  );
}

function TechChip({ tech }: { tech: Tech }) {
  return (
    <span className={chipClass}>
      <Logo slugs={tech.slugs ?? []} />
      {tech.name}
    </span>
  );
}

// A row of chips that pop in one after another
export function TechChips({
  items,
  moreCount = 0,
}: {
  items: Tech[];
  moreCount?: number; // shows a "+N more" link to the full page
}) {
  return (
    <motion.ul
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="flex flex-wrap gap-3"
    >
      {items.map((tech) => (
        <motion.li key={tech.name} variants={item}>
          <TechChip tech={tech} />
        </motion.li>
      ))}
      {moreCount > 0 && (
        <motion.li variants={item}>
          <Link
            href="/tech-stack"
            className="inline-flex items-center rounded-md border border-dashed border-ink/50 px-4 py-2 font-mono text-sm font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-chalk"
          >
            +{moreCount} more
          </Link>
        </motion.li>
      )}
    </motion.ul>
  );
}

// The full page: every group with its label and chips
export function TechGroups({ groups }: { groups: TechGroup[] }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="mt-14 space-y-14">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-ash">
              {group.title}
            </h2>
            <TechChips items={group.items} />
          </section>
        ))}
      </div>
    </MotionConfig>
  );
}