"use client";

import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import CertificationCard from "./certification-card";
import { certifications } from "./certifications-data";
import Computer from "./computer";
import Intro from "./intro";
import ProjectCard from "./project-card";
import { projects } from "./projects-data";
import SiteHeader from "./site-header";
import { TechChips } from "./tech-chip";
import { GITHUB, GITHUB_HANDLE, LINKEDIN } from "./site-config";
import { techGroups } from "./tech-data";

// ---------- EDIT YOUR CONTENT HERE ----------
const NAME = "Dave Dacillo";
const PHOTOS = ["/dave.jpg", "/dave.png", "/dave.jpeg", "/dave.webp"]; // save your photo in the public folder as dave.jpg (or one of these names)

// About Me (one paragraph)
const aboutText = `I’m ${NAME}, an aspiring full-stack web developer dedicated to building efficient, user-focused web applications. Alongside honing my skills in end-to-end web technologies, I actively explore the field of cybersecurity as an enthusiast.`;

// --------------------------------------------

// Short summary of the tech stack for the home page (edit the full list in tech-data.ts)
const allTech = techGroups.flatMap((group) => group.items);
const featuredTech = allTech.filter((tech) => tech.featured);
const moreTechCount = allTech.length - featuredTech.length;

const label = "text-xs font-medium uppercase tracking-[0.3em]";
const sectionTitle =
  "text-2xl font-bold uppercase leading-tight tracking-tight sm:text-3xl";
const linkLine =
  "border-b border-current pb-1 text-xs font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-60";

const clouds = [
  { w: 380, h: 160, left: "-10%", top: "30%", o: 0.7, dur: 20, x: 40 },
  { w: 440, h: 180, left: "50%", top: "14%", o: 0.65, dur: 24, x: -50 },
  { w: 360, h: 160, left: "25%", top: "64%", o: 0.6, dur: 22, x: 30 },
];

// Fine paper grain for the hero
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

// Thin vertical lines down the left edge of the hero (top and height in %)
const heroLines = [
  { top: "0%", height: "26%" },
  { top: "56%", height: "19%" },
  { top: "91%", height: "9%" },
];

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <span
      aria-hidden="true"
      className="grid h-4 w-4 place-items-center rounded-[3px] bg-current"
    >
      <span className="text-[9px] font-bold leading-none text-hero-to">in</span>
    </span>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Text that slides up from behind a mask. The scroll trigger sits on the outer
// (unclipped) element, so it fires reliably.
const maskUp: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const maskUpLate: Variants = {
  hidden: { y: "110%" },
  show: {
    y: 0,
    transition: { duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] },
  },
};

function Title({ children }: { children: ReactNode }) {
  return (
    <motion.h2
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={sectionTitle}
    >
      <span className="block overflow-hidden pb-[0.1em]">
        <motion.span variants={maskUp} className="block">
          {children}
        </motion.span>
      </span>
    </motion.h2>
  );
}

function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const [photoIndex, setPhotoIndex] = useState(0);
  const photo = PHOTOS[photoIndex];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.5"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.88, 1]);
  const shift = useTransform(scrollYProgress, [0.05, 0.5], [0, 12]);

  return (
    <section
      id="about"
      ref={ref}
      className="scroll-mt-4 border-t border-ink/20 py-16"
    >
      <Title>About me</Title>

      <div className="mt-8 grid items-start gap-8 md:grid-cols-[200px_1fr] md:items-stretch">
        {/* picture holder: the frame grows and an outline slides out as you scroll */}
        <div className="relative mx-auto w-full max-w-[200px] md:mx-0 md:h-full">
          <motion.div
            aria-hidden="true"
            style={{ x: reduce ? 12 : shift, y: reduce ? 12 : shift }}
            className="absolute inset-0 rounded-xl border border-ink"
          />
          <motion.div
            style={{ scale: reduce ? 1 : scale }}
            className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-[#d9d8d4] to-[#b9b8b4] md:aspect-auto md:h-full"
          >
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={photo}
                ref={(el) => {
                  if (el && el.complete && el.naturalWidth === 0) {
                    setPhotoIndex((i) => (PHOTOS[i] === photo ? i + 1 : i));
                  }
                }}
                src={photo}
                alt={NAME}
                onError={() =>
                  setPhotoIndex((i) => (PHOTOS[i] === photo ? i + 1 : i))
                }
                className="h-full w-full object-cover object-top contrast-[1.05] grayscale"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-[#55554f]">
                Your photo here
              </div>
            )}
          </motion.div>
        </div>

        {/* a computer rises into view and types the paragraph */}
        <Computer text={aboutText} />
      </div>
    </section>
  );
}

function Portfolio() {
  // Thin progress line across the top of the page
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-white mix-blend-difference"
      />

      <div className="min-h-screen text-ink">
        {/* everything lives in one centered column with wide side margins */}
        <div className="mx-auto w-full max-w-[720px] px-5 sm:px-6">
          <SiteHeader href="#top" />

          {/* ============ HOME / INTRODUCTION ============ */}
          <section id="top" className="scroll-mt-4 pb-16">
            <div className="@container relative isolate h-[min(84svh,760px)] min-h-[540px] overflow-hidden rounded-2xl border border-ink/15 bg-gradient-to-b from-hero-from to-hero-to font-mono text-ash">
              {/* paper grain */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 mix-blend-multiply"
                style={{ backgroundImage: GRAIN, opacity: "var(--hero-grain)" }}
              />

              {/* soft white clouds drifting in the background */}
              {clouds.map((cloud, i) => (
                <motion.div
                  key={i}
                  aria-hidden="true"
                  className="absolute z-0 rounded-full bg-white blur-[70px]"
                  style={{
                    width: cloud.w,
                    height: cloud.h,
                    left: cloud.left,
                    top: cloud.top,
                    opacity: `calc(${cloud.o} * var(--cloud-o))`,
                  }}
                  animate={{ x: [0, cloud.x, 0] }}
                  transition={{
                    duration: cloud.dur,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* thin vertical lines that draw themselves down the left edge */}
              {heroLines.map((line, i) => (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.2 + i * 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute left-[6%] z-10 w-[2px] origin-top bg-ink"
                  style={{ top: line.top, height: line.height }}
                />
              ))}

              {/* favorite verse, top right */}
              <motion.figure
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 1.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute right-[6%] top-[8%] z-20 max-w-[80%] @md:max-w-[420px] @md:text-right"
              >
                <blockquote className="text-xs leading-relaxed text-ink/90 @md:text-sm @3xl:text-base">
                  “A little one shall become a thousand, and a small one a
                  strong nation: I the LORD will hasten it in his time.”
                </blockquote>
                <figcaption className="mt-3 text-[11px] uppercase tracking-[0.2em]">
                  Isaiah 60:22 · KJV
                </figcaption>
              </motion.figure>

              {/* your name as the title */}
              <div className="absolute left-[6%] top-[38%] z-20">
                <h1 className="text-[9.5cqw] font-bold leading-none tracking-tight text-ink">
                  <span className="sr-only">{NAME}</span>
                  <span aria-hidden="true">
                    {NAME.split(" ").map((word, wi, words) => {
                      const offset = words.slice(0, wi).join("").length;
                      return (
                        <span key={wi}>
                          <span className="inline-block whitespace-nowrap">
                            {word.split("").map((letter, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                  duration: 0.01,
                                  delay: 0.4 + (offset + i) * 0.09,
                                }}
                              >
                                {letter}
                              </motion.span>
                            ))}
                            {wi === words.length - 1 && (
                              <span className="ml-1 inline-block h-[0.75em] w-[0.4em] translate-y-[0.05em] animate-pulse bg-ink motion-reduce:animate-none" />
                            )}
                          </span>
                          {wi < words.length - 1 ? " " : null}
                        </span>
                      );
                    })}
                  </span>
                </h1>
              </div>

              {/* link to work and social links, bottom right */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute bottom-[7%] right-[6%] z-20 flex flex-col items-end gap-5"
              >
                <a
                  href="#projects"
                  className="text-sm uppercase tracking-[0.1em] transition-opacity hover:opacity-60"
                >
                  <span className="border-b border-current pb-0.5">
                    View work
                  </span>{" "}
                  →
                </a>

                <ul className="flex flex-col items-end gap-2 text-[11px] @md:flex-row @md:gap-6 @md:text-xs">
                  <li>
                    <a
                      href={GITHUB}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 transition-opacity hover:opacity-60"
                    >
                      <GitHubIcon />
                      {GITHUB_HANDLE}
                    </a>
                  </li>
                  <li>
                    <a
                      href={LINKEDIN}
                      className="flex items-center gap-2 transition-opacity hover:opacity-60"
                    >
                      <LinkedInIcon />
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </motion.div>
            </div>
          </section>

          {/* ============ ABOUT ME ============ */}
          <About />

          {/* ============ TECHNICAL SKILLS (summary) ============ */}
          <section
            id="skills"
            className="scroll-mt-4 border-t border-ink/20 py-16"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Title>Technical skills</Title>
              <Link href="/tech-stack" className={linkLine}>
                View full tech stack →
              </Link>
            </div>

            <div className="mt-8">
              <TechChips items={featuredTech} moreCount={moreTechCount} />
            </div>
          </section>

          {/* ============ PROJECTS / MY WORKS ============ */}
          <section
            id="projects"
            className="scroll-mt-4 border-t border-ink/20 py-16"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Title>Projects / My works</Title>
                <Reveal delay={0.2}>
                  <p className="mt-4 max-w-lg text-balance text-ink/75">
                    Selected projects, from academic work to personal builds.
                  </p>
                </Reveal>
              </div>
              <Link href="/projects" className={linkLine}>
                View all →
              </Link>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {projects.map((project, i) => (
                <li key={project.title} className={i === 0 ? "sm:col-span-2" : ""}>
                  <Reveal delay={i * 0.1}>
                    <ProjectCard project={project} index={i} wide={i === 0} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>

          {/* ============ CERTIFICATIONS ============ */}
          <section
            id="certifications"
            className="scroll-mt-4 border-t border-ink/20 py-16"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Title>Certifications</Title>
              <Link href="/certifications" className={linkLine}>
                View all →
              </Link>
            </div>

            <div className="mt-8 space-y-4">
              {certifications.map((cert) => (
                <CertificationCard key={cert.title} cert={cert} />
              ))}
            </div>
          </section>

          {/* ============ CONTACT ME ============ */}
          <section
            id="contact"
            className="scroll-mt-4 border-t border-ink/20 py-16"
          >
            <p className={label}>Contact me</p>

            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-4 text-3xl font-bold uppercase leading-[1.1] tracking-tight sm:text-4xl"
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={maskUp} className="block">
                  Let&apos;s work
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={maskUpLate} className="block">
                  together
                </motion.span>
              </span>
            </motion.h2>

            <Reveal delay={0.3}>
              <p className="mt-4 max-w-md text-ink/75">
                Have a project, an opportunity, or a question? Send me a
                message and I&apos;ll get back to you as soon as possible.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <Link
                href="/contact"
                className="group mt-8 flex items-center justify-between gap-6 border-y border-ink/40 py-5 text-base font-medium transition-colors hover:bg-ink/5 sm:text-xl"
              >
                <span>Send me an email</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-3"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </section>

        </div>
      </div>
    </MotionConfig>
  );
}

export default function Home() {
  const [revealKey, setRevealKey] = useState(0);
  const [phase, setPhase] = useState<"checking" | "show" | "done">("checking");

  // Show the intro once per visit, so coming back from the Tech Stack page skips it
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("introSeen") === "1";
    } catch {
      // storage can be blocked; just show the intro
    }
    if (seen) {
      setPhase("done");
      setRevealKey((k) => k + 1);
    } else {
      setPhase("show");
    }
  }, []);

  const finishIntro = () => {
    try {
      sessionStorage.setItem("introSeen", "1");
    } catch {
      // ignore
    }
    setPhase("done");
  };

  return (
    <>
      {/* The key restarts the hero animations when the page is revealed */}
      <div inert={phase !== "done"}>
        <Portfolio key={revealKey} />
      </div>

      {phase === "checking" && (
        <div aria-hidden="true" className="fixed inset-0 z-[100] bg-paper" />
      )}

      {phase === "show" && (
        <Intro
          onReveal={() => setRevealKey((k) => k + 1)}
          onDone={finishIntro}
        />
      )}
    </>
  );
}