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
import Computer from "./computer";
import Intro from "./intro";
import SiteHeader from "./site-header";
import { TechChips } from "./tech-chip";
import { techGroups } from "./tech-data";

// ---------- EDIT YOUR CONTENT HERE ----------
const NAME = "Dave Dacillo";
const EMAIL = "you@example.com";
const GITHUB = "https://github.com/DAVE173234";
const GITHUB_HANDLE = "@DAVE173234";
const LINKEDIN = "#"; // replace with your LinkedIn link
const PHOTO = "/dave.png"; // your photo, saved in the public folder (used in About me)

// About Me (one paragraph)
const aboutText = `I’m ${NAME}, currently pursuing a Bachelor of Science in Information Technology. I’m interested in full-stack web development and mobile application development, and I have experience building academic and personal software projects, including a learning management system with separate student and faculty portals built with React and Laravel.`;

// Projects / My Works
const projects = [
  {
    title: "Learning Management System",
    stack: "React, Laravel, MySQL",
    description:
      "Student and faculty portals for managing courses, lessons, and records. My capstone project.",
    href: "#", // replace with your live demo or GitHub repo
    image: "", // optional screenshot, e.g. "/lms.png" in the public folder
  },
  {
    title: "Project two",
    stack: "Next.js, Tailwind CSS",
    description: "Replace this with a short description of what it does.",
    href: "#",
    image: "",
  },
  {
    title: "Project three",
    stack: "PHP, MySQL",
    description: "Replace this with a short description of what it does.",
    href: "#",
    image: "",
  },
];

// Education
const education = [
  {
    degree: "Bachelor of Science in Information Technology",
    school: "Your school name",
    period: "20XX - Present",
    details: ["Add your major, relevant coursework, or honors."],
  },
];

// Experience
const experience = [
  {
    role: "Full-stack developer",
    org: "Capstone project: Learning Management System",
    period: "2026",
    points: ["Building student and faculty portals with React and Laravel."],
  },
  {
    role: "Your role",
    org: "Company or organization",
    period: "20XX - 20XX",
    points: ["Add what you did and the result."],
  },
];
// --------------------------------------------

// Short summary of the tech stack for the home page (edit the full list in tech-data.ts)
const allTech = techGroups.flatMap((group) => group.items);
const featuredTech = allTech.filter((tech) => tech.featured);
const moreTechCount = allTech.length - featuredTech.length;

const label = "text-xs font-medium uppercase tracking-[0.3em]";
const sectionTitle =
  "text-3xl font-bold uppercase leading-none tracking-tighter sm:text-4xl lg:text-5xl";
const buttonDark =
  "inline-block bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-chalk transition-opacity hover:opacity-80";
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

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
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

function ProjectCard({
  project,
  index,
  wide = false,
}: {
  project: (typeof projects)[number];
  index: number;
  wide?: boolean;
}) {
  return (
    <a href={project.href} className="group block">
      <div
        className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#d9d8d4] to-[#b9b8b4] ${
          wide ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3]" : "aspect-[4/3]"
        }`}
      >
        {project.image ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.image})` }}
          />
        ) : null}

        {/* dark cover that fades in on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[#0f0f0f] opacity-0 transition-opacity duration-500 group-hover:opacity-90"
        />

        <span
          aria-hidden="true"
          className="absolute left-4 top-2 text-6xl font-bold tracking-tighter text-black/20 transition-colors duration-500 group-hover:text-white/30"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {project.image ? null : (
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-xs uppercase tracking-[0.3em] text-[#55554f] transition-colors duration-500 group-hover:text-[#b9b9b6]">
            Add a screenshot
          </span>
        )}

        <span className="absolute inset-x-4 bottom-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.15em] text-black transition-colors duration-500 group-hover:text-white">
          View project
          <span
            aria-hidden="true"
            className="text-lg transition-transform duration-500 group-hover:translate-x-2"
          >
            →
          </span>
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold">{project.title}</h3>
      <p className="mt-1 text-sm text-ash">{project.stack}</p>
      <p className="mt-2 text-sm text-ink/80">{project.description}</p>
    </a>
  );
}

function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const [photoOk, setPhotoOk] = useState(true);

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

      <div className="mt-10 grid items-start gap-8 md:grid-cols-[260px_1fr]">
        {/* picture holder: the frame grows and an outline slides out as you scroll */}
        <div className="relative mx-auto w-full max-w-[260px] md:mx-0">
          <motion.div
            aria-hidden="true"
            style={{ x: reduce ? 12 : shift, y: reduce ? 12 : shift }}
            className="absolute inset-0 rounded-xl border border-ink"
          />
          <motion.div
            style={{ scale: reduce ? 1 : scale }}
            className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-[#d9d8d4] to-[#b9b8b4]"
          >
            {photoOk ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={(el) => {
                  if (el && el.complete && el.naturalWidth === 0) {
                    setPhotoOk(false);
                  }
                }}
                src={PHOTO}
                alt={NAME}
                onError={() => setPhotoOk(false)}
                className="h-full w-full object-contain object-bottom contrast-[1.05] grayscale"
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
        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:w-[max(65vw,880px)] lg:px-0">
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
                <h1 className="text-[11cqw] font-bold leading-none tracking-tight text-ink">
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
                  <li>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="flex items-center gap-2 transition-opacity hover:opacity-60"
                    >
                      <MailIcon />
                      {EMAIL}
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
              <div>
                <Reveal delay={0.1}>
                  <p className="mt-2  text-ink/70">
                    The technologies I use to build web applications, from the
                    interface to the database.
                  </p>
                </Reveal>
              </div>
              <Link href="/tech-stack" className={linkLine}>
                View full →
              </Link>
            </div>

            <div className="mt-10">
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
                  <p className="mt-4 max-w-md text-ink/80">
                    Selected projects, from academic work to personal builds.
                  </p>
                </Reveal>
              </div>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className={linkLine}
              >
                View all →
              </a>
            </div>

            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <li
                  key={project.title}
                  className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}
                >
                  <Reveal delay={i * 0.12}>
                    <ProjectCard project={project} index={i} wide={i === 0} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>

          {/* ============ EDUCATION ============ */}
          <section
            id="education"
            className="scroll-mt-4 border-t border-ink/20 py-16"
          >
            <Title>Education</Title>

            <ul className="mt-10">
              {education.map((item) => (
                <li key={item.degree} className="border-t border-ink/40">
                  <Reveal>
                    <div className="group -mx-4 grid gap-3 px-4 py-8 transition-colors duration-300 hover:bg-ink hover:text-chalk sm:grid-cols-[200px_1fr]">
                      <p className="text-sm font-semibold uppercase tracking-[0.1em]">
                        {item.period}
                      </p>
                      <div>
                        <h3 className="text-xl font-semibold sm:text-2xl">
                          {item.degree}
                        </h3>
                        <p className="mt-2 text-ash transition-colors duration-300 group-hover:text-smoke">
                          {item.school}
                        </p>
                        <ul className="mt-3 space-y-1 text-sm text-ink/80 transition-colors duration-300 group-hover:text-chalk/80">
                          {item.details.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>

          {/* ============ EXPERIENCE ============ */}
          <section
            id="experience"
            className="scroll-mt-4 border-t border-ink/20 py-16"
          >
            <Title>Experience</Title>

            <ul className="mt-10 border-b border-ink/40">
              {experience.map((item) => (
                <li
                  key={`${item.role}-${item.org}`}
                  className="border-t border-ink/40"
                >
                  <Reveal>
                    <div className="group -mx-4 grid gap-3 px-4 py-8 transition-colors duration-300 hover:bg-ink hover:text-chalk sm:grid-cols-[200px_1fr]">
                      <p className="text-sm font-semibold uppercase tracking-[0.1em]">
                        {item.period}
                      </p>
                      <div>
                        <h3 className="text-xl font-semibold sm:text-2xl">
                          {item.role}
                        </h3>
                        <p className="mt-2 text-ash transition-colors duration-300 group-hover:text-smoke">
                          {item.org}
                        </p>
                        <ul className="mt-3 space-y-1 text-sm text-ink/80 transition-colors duration-300 group-hover:text-chalk/80">
                          {item.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
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
              className="mt-5 text-4xl font-bold uppercase leading-[0.95] tracking-tighter sm:text-6xl lg:text-7xl"
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

            <Reveal delay={0.2}>
              <a
                href={`mailto:${EMAIL}`}
                className="group mt-10 flex items-center justify-between gap-6 border-y border-ink/40 py-5 text-lg font-medium transition-colors hover:bg-ink/5 sm:text-3xl"
              >
                <span className="break-all">{EMAIL}</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-3"
                >
                  →
                </span>
              </a>
            </Reveal>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonDark}
              >
                GitHub
              </a>
              <a href={LINKEDIN} className={linkLine}>
                LinkedIn
              </a>
            </div>
          </section>

          <footer className="border-t border-ink/20 py-8 text-xs uppercase tracking-[0.15em] text-ash">
            © 2026 {NAME}. Built with Next.js.
          </footer>
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