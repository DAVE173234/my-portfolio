"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useState, type ReactNode } from "react";
import type { Certification } from "./certifications-data";

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

// Opens the full certificate in a new tab (plain text if there is no link)
function Open({
  cert,
  className,
  children,
}: {
  cert: Certification;
  className?: string;
  children: ReactNode;
}) {
  if (cert.href === "") {
    return <span className={className}>{children}</span>;
  }
  return (
    <a
      href={cert.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

// Certificate picture on top, then the details. Only the picture, the title
// and the button are links. The skill chips are not links.
export default function CertificationCard({ cert }: { cert: Certification }) {
  const reduce = useReducedMotion() ?? false;
  const [imageOk, setImageOk] = useState(cert.image !== "");
  const clickable = cert.href !== "";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink/25 bg-gradient-to-br from-ink/[0.07] to-ink/[0.02]">
      {imageOk && (
        <div className="border-b border-ink/15 bg-ink/[0.04] p-4 sm:p-6">
          {/* the certificate settles into place like a sheet of paper */}
          <motion.div
            initial={
              reduce ? false : { opacity: 0, y: 28, scale: 0.96, rotate: -1.5 }
            }
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Open
              cert={cert}
              className="group/cert relative block overflow-hidden rounded-md bg-white shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cert.image}
                alt={`${cert.title} certificate`}
                onError={() => setImageOk(false)}
                className="block h-auto w-full transition-transform duration-700 group-hover/cert:scale-[1.03]"
              />

              {/* on hover the picture darkens and a button appears */}
              {clickable && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 grid place-items-center bg-black/0 transition-colors duration-500 group-hover/cert:bg-black/45"
                >
                  <span className="translate-y-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-black opacity-0 transition-all duration-500 group-hover/cert:translate-y-0 group-hover/cert:opacity-100">
                    View certificate ↗
                  </span>
                </span>
              )}
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
          {cert.type}
        </motion.p>

        <motion.h3
          variants={item}
          className="mt-3 text-xl font-semibold sm:text-2xl"
        >
          <Open cert={cert} className="underline-offset-4 hover:underline">
            {cert.title}
          </Open>
        </motion.h3>

        <motion.p variants={item} className="mt-1 text-sm text-ash">
          {cert.issuer} · {cert.date}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-3 max-w-prose leading-relaxed text-ink/75"
        >
          {cert.description}
        </motion.p>

        {cert.skills.length > 0 && (
          <>
            <motion.p
              variants={item}
              className="mt-6 text-[11px] font-semibold uppercase tracking-[0.15em] text-ash"
            >
              Skills gained
            </motion.p>

            {/* plain chips: not links, no hover effect */}
            <motion.ul variants={item} className="mt-3 flex flex-wrap gap-2">
              {cert.skills.map((skill) => (
                <li
                  key={skill}
                  className="inline-flex items-center rounded-md border border-ink/30 bg-ink/5 px-4 py-2 text-sm font-medium text-ink"
                >
                  {skill}
                </li>
              ))}
            </motion.ul>
          </>
        )}

        {clickable && (
          <motion.div variants={item} className="mt-6">
            <Open
              cert={cert}
              className="group/btn inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-chalk transition-opacity hover:opacity-85"
            >
              View certificate
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