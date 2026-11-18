"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useState, type ReactNode } from "react";
import { TechChip } from "./tech-chip";
import { techGroups } from "./tech-data";
import type { Project } from "./projects-data";

// The text inside the card appears one line after another
const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardClass =
  "group relative block overflow-hidden rounded-2xl border border-ink/25 bg-gradient-to-br from-ink/[0.07] to-ink/[0.02] transition-colors duration-300";

const allTech = techGroups.flatMap((group) => group.items);

// Finds a technology by name so it shows with its logo (falls back to a plain chip)
function findTech(name: string) {
  return (
    allTech.find((tech) => tech.name.toLowerCase() === name.toLowerCase()) ?? {
      name,
    }
  );
}

function linkProps(href: string) {
  return href.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

// A link to the live site (or plain text when the project has no link)
function Open({
  project,
  className,
  children,
}: {
  project: Project;
  className?: string;
  children: ReactNode;
}) {
  if (project.href === "") {
    return <span className={className}>{children}</span>;
  }
  return (
    <a href={project.href} {...linkProps(project.href)} className={className}>
      {children}
    </a>
  );
}

// Large card: browser-style screenshot on top, then the full explanation.
// Only the screenshot, the title and the button open the live site.
// The description and the tech stack chips are not links.
function FeaturedCard({ project }: { project: Project }) {
  const reduce = useReducedMotion() ?? false;
  const [imageOk, setImageOk] = useState(project.image !== "");

  const clickable = project.href !== "";
  const host = project.href.replace(/^https?:\/\//, "").split("/")[0];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink/25 bg-gradient-to-br from-ink/[0.07] to-ink/[0.02]">
      {imageOk && (
        <div className="border-b border-ink/15 bg-ink/[0.04] px-4 pt-4 sm:px-6 sm:pt-6">
          {/* the browser window fades and grows into place */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-t-xl border border-b-0 border-white/15 bg-[#0f0f0f] shadow-2xl"
          >
            <div
              aria-hidden="true"
              className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5"
            >
              <span className="h-2 w-2 rounded-full bg-white/40" />
              <span className="h-2 w-2 rounded-full bg-white/25" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              {host && (
                <span className="ml-3 truncate rounded bg-white/10 px-2 py-0.5 text-[10px] text-[#b9b9b6]">
                  {host}
                </span>
              )}
            </div>

            {/* the whole screenshot is shown, and it opens the live site */}
            <Open project={project} className="group/shot block overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                onError={() => setImageOk(false)}
                className="block h-auto w-full transition-transform duration-700 group-hover/shot:scale-[1.03]"
              />
            </Open>
          </motion.div>
        </div>
      )}

      <motion.div
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="p-6 sm:p-7"
      >
        <motion.p
          variants={item}
          className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ash"
        >
          {project.category}
        </motion.p>

        <motion.h3
          variants={item}
          className="mt-3 text-xl font-semibold sm:text-2xl"
        >
          <Open
            project={project}
            className="underline-offset-4 hover:underline"
          >
            {project.title}
          </Open>
        </motion.h3>

        <motion.p
          variants={item}
          className="mt-3 max-w-prose leading-relaxed text-ink/75"
        >
          {project.description}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 text-[11px] font-semibold uppercase tracking-[0.15em] text-ash"
        >
          Tech stack
        </motion.p>

        {/* plain chips: not links, no hover effect */}
        <motion.ul variants={item} className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((name) => (
            <li key={name}>
              <TechChip tech={findTech(name)} plain />
            </li>
          ))}
        </motion.ul>

        {clickable && (
          <motion.div variants={item} className="mt-6">
            <Open
              project={project}
              className="group/btn inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-chalk transition-opacity hover:opacity-85"
            >
              Visit live site
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-1"
              >
                ↗
              </span>
            </Open>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// Small card, for when you add more projects later
function CompactCard({ project, index }: { project: Project; index: number }) {
  const clickable = project.href !== "";

  const content = (
    <div className="relative flex min-h-[230px] flex-col justify-between p-6">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-4 text-6xl font-bold tracking-tight text-ink/[0.07] transition-transform duration-500 group-hover:scale-110"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <p className="relative text-[11px] font-semibold uppercase tracking-[0.15em] text-ash">
        {project.category}
      </p>

      <div className="relative mt-8 pr-12">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ash">
          {project.description}
        </p>
        <p className="mt-3 text-xs font-medium text-ink/70">
          {project.stack.join(", ")}
        </p>
      </div>

      {clickable && (
        <span
          aria-hidden="true"
          className="absolute bottom-5 right-5 grid h-9 w-9 place-items-center rounded-full bg-ink text-chalk transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        >
          ↗
        </span>
      )}
    </div>
  );

  return clickable ? (
    <a
      href={project.href}
      {...linkProps(project.href)}
      className={`${cardClass} hover:border-ink/60`}
    >
      {content}
    </a>
  ) : (
    <div className={cardClass}>{content}</div>
  );
}

export default function ProjectCard({
  project,
  index,
  wide = false,
}: {
  project: Project;
  index: number;
  wide?: boolean;
}) {
  return wide ? (
    <FeaturedCard project={project} />
  ) : (
    <CompactCard project={project} index={index} />
  );
}