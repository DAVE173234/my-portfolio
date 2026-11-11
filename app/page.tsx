"use client";

import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import Computer from "./computer";
import Intro from "./intro";

// ---------- EDIT YOUR CONTENT HERE ----------
const NAME = "Dave Dacillo";
const EMAIL = "you@example.com";
const GITHUB = "https://github.com/DAVE173234";
const GITHUB_HANDLE = "@DAVE173234";
const LINKEDIN = "#"; // replace with your LinkedIn link
const PHOTO = "/dave.png"; // your photo, saved in the public folder (used in About me)

// About Me (one paragraph)
const aboutText = `I’m ${NAME}, currently pursuing a Bachelor of Science in Information Technology. I’m interested in full-stack web development and mobile application development, and I have experience building academic and personal software projects, including a learning management system with separate student and faculty portals built with React and Laravel.`;

// Technical Skills
const skillGroups = [
  {
    title: "Frontend",
    text: "Fast, responsive interfaces.",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    text: "Solid logic behind the screen.",
    items: ["PHP", "Laravel", "MySQL"],
  },
  {
    title: "Tools",
    text: "Shipping and collaboration.",
    items: ["Git & GitHub", "VS Code", "Vercel"],
  },
];

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
    points: [
      "Building student and faculty portals with React and Laravel.",
    ],
  },
  {
    role: "Your role",
    org: "Company or organization",
    period: "20XX - 20XX",
    points: ["Add what you did and the result."],
  },
];
// --------------------------------------------

const label = "text-xs font-medium uppercase tracking-[0.3em]";
const sectionTitle =
  "text-4xl font-bold uppercase leading-none tracking-tighter sm:text-6xl";
const buttonDark =
  "inline-block bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-chalk transition-colors hover:bg-ink/80";
const linkLine =
  "border-b border-current pb-1 text-xs font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-60";

const clouds = [
  { w: 520, h: 200, left: "-8%", top: "30%", o: 0.7, dur: 20, x: 50 },
  { w: 620, h: 240, left: "55%", top: "18%", o: 0.65, dur: 24, x: -60 },
  { w: 480, h: 200, left: "30%", top: "62%", o: 0.6, dur: 22, x: 40 },
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
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
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
      <span className="text-[9px] font-bold leading-none text-[#c4c4c4]">in</span>
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

// Section title that slides up from behind a mask when it scrolls into view
function Title({ children }: { children: ReactNode }) {
  return (
    <h2 className={sectionTitle}>
      <span className="block overflow-hidden pb-[0.1em]">
        <motion.span
          initial={{ y: "110%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="block"
        >
          {children}
        </motion.span>
      </span>
    </h2>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <a href={project.href} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#d9d8d4] to-[#b9b8b4]">
        {project.image ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.image})` }}
          />
        ) : null}

        {/* dark cover that fades in on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-ink opacity-0 transition-opacity duration-500 group-hover:opacity-90"
        />

        <span
          aria-hidden="true"
          className="absolute left-5 top-3 text-7xl font-bold tracking-tighter text-ink/20 transition-colors duration-500 group-hover:text-chalk/30 sm:text-8xl"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {project.image ? null : (
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-xs uppercase tracking-[0.3em] text-ash transition-colors duration-500 group-hover:text-smoke">
            Add a screenshot
          </span>
        )}

        <span className="absolute inset-x-5 bottom-5 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.15em] text-ink transition-colors duration-500 group-hover:text-chalk">
          View project
          <span
            aria-hidden="true"
            className="text-lg transition-transform duration-500 group-hover:translate-x-2"
          >
            →
          </span>
        </span>
      </div>

      <h3 className="mt-4 text-xl font-semibold">{project.title}</h3>
      <p className="mt-1 text-sm text-ash">{project.stack}</p>
      <p className="mt-2 text-ink/80">{project.description}</p>
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
  const shift = useTransform(scrollYProgress, [0.05, 0.5], [0, 14]);

  return (
    <section
      id="about"
      ref={ref}
      className="scroll-mt-4 px-6 py-24 sm:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <Title>About me</Title>

        <div className="mt-14 grid items-center gap-14 md:grid-cols-[minmax(0,360px)_1fr]">
          {/* picture holder: the frame grows and an outline slides out as you scroll */}
          <div className="relative mx-auto w-full max-w-[360px] md:mx-0">
            <motion.div
              aria-hidden="true"
              style={{ x: reduce ? 14 : shift, y: reduce ? 14 : shift }}
              className="absolute inset-0 border border-ink"
            />
            <motion.div
              style={{ scale: reduce ? 1 : scale }}
              className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#d9d8d4] to-[#b9b8b4]"
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
                <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-ash">
                  Your photo here
                </div>
              )}
            </motion.div>
          </div>

          {/* a computer rises into view and types the paragraph */}
          <Computer text={aboutText} />
        </div>
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
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-chalk mix-blend-difference"
      />

      <div className="min-h-screen text-ink">
        {/* ============ HOME / INTRODUCTION ============ */}
        <section id="top" className="bg-ink p-3 sm:p-5">
          <div className="relative isolate h-[calc(100svh-1.5rem)] min-h-[620px] overflow-hidden bg-gradient-to-b from-[#d8d8d8] to-[#b3b3b3] font-mono text-ash sm:h-[calc(100svh-2.5rem)]">
            {/* paper grain */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 opacity-50 mix-blend-multiply"
              style={{ backgroundImage: GRAIN }}
            />

            {/* soft white clouds drifting in the background */}
            {clouds.map((cloud, i) => (
              <motion.div
                key={i}
                aria-hidden="true"
                className="absolute z-0 rounded-full bg-white blur-[80px]"
                style={{
                  width: cloud.w,
                  height: cloud.h,
                  left: cloud.left,
                  top: cloud.top,
                  opacity: cloud.o * 0.6,
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
                className="absolute left-8 z-10 w-[2px] origin-top bg-ink sm:left-[6%]"
                style={{ top: line.top, height: line.height }}
              />
            ))}

            {/* favorite verse, top right */}
            <motion.figure
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-8 top-[8%] z-20 max-w-[300px] sm:right-[6%] sm:max-w-[380px] sm:text-right"
            >
              <blockquote className="text-sm leading-relaxed text-ink/80 sm:text-base">
                “A little one shall become a thousand, and a small one a strong
                nation: I the LORD will hasten it in his time.”
              </blockquote>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.2em]">
                Isaiah 60:22 · KJV
              </figcaption>
            </motion.figure>

            {/* your name as the title */}
            <div className="absolute left-8 top-[34%] z-20 sm:left-[6%]">
              <h1 className="text-[14vw] font-bold leading-[1.05] tracking-tight sm:text-[11.5vw] sm:leading-none">
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
                            <span className="ml-1 inline-block h-[0.75em] w-[0.4em] translate-y-[0.05em] animate-pulse bg-ash motion-reduce:animate-none" />
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
              transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[9%] right-8 z-20 flex flex-col items-end gap-6 sm:right-[6%]"
            >
              <a
                href="#projects"
                className="text-sm uppercase tracking-[0.1em] transition-opacity hover:opacity-60"
              >
                <span className="border-b border-current pb-0.5">View work</span>{" "}
                →
              </a>

              <ul className="flex flex-col items-end gap-2 text-[11px] sm:flex-row sm:gap-8 sm:text-xs">
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

        {/* ============ TECHNICAL SKILLS (black band) ============ */}
        <section
          id="skills"
          className="scroll-mt-4 bg-black/10 px-6 py-24 sm:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <Title>Technical skills</Title>

            <div className="mt-14 grid gap-12 sm:grid-cols-3">
              {skillGroups.map((group, i) => (
                <Reveal key={group.title} delay={i * 0.12}>
                  <p className="text-sm text-ash">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold uppercase tracking-wide sm:text-4xl">
                    {group.title}
                  </h3>
                  <p className="mt-2 text-ash">{group.text}</p>
                  <ul className="mt-8 border-t border-ink/25">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="border-b border-ink/25 py-4 text-xl font-medium uppercase tracking-[0.08em] text-ink/80 transition-all duration-300 hover:pl-4 hover:text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PROJECTS / MY WORKS ============ */}
        <section
          id="projects"
          className="scroll-mt-4 px-6 py-24 sm:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Title>Projects / My works</Title>
                <Reveal delay={0.2}>
                  <p className="mt-4 max-w-md text-lg text-ink/80">
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
                View all
              </a>
            </div>

            <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <li key={project.title}>
                  <Reveal delay={i * 0.12}>
                    <ProjectCard project={project} index={i} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ EDUCATION ============ */}
        <section
          id="education"
          className="scroll-mt-4 bg-black/5 px-6 py-24 sm:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <Title>Education</Title>

            <ul className="mt-14">
              {education.map((item) => (
                <li key={item.degree} className="border-t border-ink">
                  <Reveal>
                    <div className="group -mx-6 grid gap-4 px-6 py-10 transition-colors duration-300 hover:bg-ink hover:text-chalk sm:grid-cols-[1fr_3fr]">
                      <p className="text-lg font-semibold uppercase tracking-[0.1em]">
                        {item.period}
                      </p>
                      <div>
                        <h3 className="text-2xl font-semibold sm:text-4xl">
                          {item.degree}
                        </h3>
                        <p className="mt-2 text-lg text-ash transition-colors duration-300 group-hover:text-smoke">
                          {item.school}
                        </p>
                        <ul className="mt-4 space-y-1 text-ink/80 transition-colors duration-300 group-hover:text-chalk/80">
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
          </div>
        </section>

        {/* ============ EXPERIENCE ============ */}
        <section
          id="experience"
          className="scroll-mt-4 px-6 py-24 sm:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <Title>Experience</Title>

            <ul className="mt-14 border-b border-ink">
              {experience.map((item) => (
                <li
                  key={`${item.role}-${item.org}`}
                  className="border-t border-ink"
                >
                  <Reveal>
                    <div className="group -mx-6 grid gap-4 px-6 py-10 transition-colors duration-300 hover:bg-ink hover:text-chalk sm:grid-cols-[1fr_3fr]">
                      <p className="text-lg font-semibold uppercase tracking-[0.1em]">
                        {item.period}
                      </p>
                      <div>
                        <h3 className="text-2xl font-semibold sm:text-4xl">
                          {item.role}
                        </h3>
                        <p className="mt-2 text-lg text-ash transition-colors duration-300 group-hover:text-smoke">
                          {item.org}
                        </p>
                        <ul className="mt-4 space-y-1 text-ink/80 transition-colors duration-300 group-hover:text-chalk/80">
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
          </div>
        </section>

        {/* ============ CONTACT ME (black) ============ */}
        <section
          id="contact"
          className="scroll-mt-4 bg-black/10 px-6 py-24 sm:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <p className={label}>Contact me</p>
            <h2 className="mt-6 text-5xl font-bold uppercase leading-[0.95] tracking-tighter sm:text-8xl">
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  initial={{ y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Let&apos;s work
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  initial={{ y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block"
                >
                  together
                </motion.span>
              </span>
            </h2>

            <Reveal delay={0.2}>
              <a
                href={`mailto:${EMAIL}`}
                className="group mt-12 flex items-center justify-between gap-6 border-y border-ink/40 py-6 text-2xl font-medium transition-colors hover:bg-black/5 sm:text-5xl"
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

            <div className="mt-10 flex flex-wrap items-center gap-6">
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

            <p className="mt-20 border-t border-ink/25 pt-6 text-xs uppercase tracking-[0.15em] text-ash">
              © {new Date().getFullYear()} {NAME}. Built with Next.js.
            </p>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}

export default function Home() {
  const [revealKey, setRevealKey] = useState(0);
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {/* The key restarts the hero animations when the visitor taps to continue */}
      <div inert={!introDone}>
        <Portfolio key={revealKey} />
      </div>

      {!introDone && (
        <Intro
          onReveal={() => setRevealKey((k) => k + 1)}
          onDone={() => setIntroDone(true)}
        />
      )}
    </>
  );
}