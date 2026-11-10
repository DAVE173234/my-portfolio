"use client";

import { motion, MotionConfig } from "framer-motion";
import { useState, type ReactNode } from "react";
import Intro from "./intro";

// ---------- EDIT YOUR CONTENT HERE ----------
const NAME = "Dave Dacillo";
const EMAIL = "you@example.com";
const GITHUB = "https://github.com/DAVE173234";
const LINKEDIN = "#"; // replace with your LinkedIn link
const PHOTO = "/dave.png"; // your cutout photo, saved in the public folder
const PHOTO_IN_FRONT = true; // true: photo overlaps the name (needs a cutout). false: name sits on top.

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

const services = [
  {
    title: "Web applications",
    text: "Full systems from database to interface.",
  },
  {
    title: "Responsive design",
    text: "Works on phones, tablets, and desktops.",
  },
  {
    title: "Backend and APIs",
    text: "Laravel and PHP services that stay organized.",
  },
  {
    title: "Animations",
    text: "Smooth motion that stays fast.",
  },
];

const projects = [
  {
    title: "Learning Management System",
    stack: "React, Laravel, MySQL",
    href: "#", // replace with your live demo or GitHub repo
    image: "", // optional screenshot, e.g. "/lms.png" in the public folder
  },
  {
    title: "Project two",
    stack: "Next.js, Tailwind CSS",
    href: "#",
    image: "",
  },
  {
    title: "Project three",
    stack: "PHP, MySQL",
    href: "#",
    image: "",
  },
];
// --------------------------------------------

const label = "text-xs font-medium uppercase tracking-[0.3em]";
const buttonDark =
  "inline-block bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-chalk transition-colors hover:bg-ink/80";
const buttonLight =
  "inline-block bg-chalk px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-chalk/80";
const linkLine =
  "border-b border-current pb-1 text-xs font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-60";

const clouds = [
  { w: 520, h: 200, left: "-8%", top: "30%", o: 0.7, dur: 20, x: 50 },
  { w: 620, h: 240, left: "55%", top: "18%", o: 0.65, dur: 24, x: -60 },
  { w: 480, h: 200, left: "30%", top: "62%", o: 0.6, dur: 22, x: 40 },
];

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

function BrowserMock() {
  return (
    <div
      aria-hidden="true"
      className="bg-ink p-4 shadow-2xl"
    >
      <div className="mb-4 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/50" />
        <span className="h-2 w-2 rounded-full bg-white/30" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
      </div>
      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <div className="space-y-2.5">
          <div className="h-2 w-3/4 bg-white/40" />
          <div className="h-2 w-full bg-white/20" />
          <div className="h-2 w-5/6 bg-white/20" />
          <div className="h-2 w-2/3 bg-white/20" />
        </div>
        <div className="space-y-3">
          <div className="h-24 bg-white/20" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-16 bg-white/10" />
            <div className="h-16 bg-white/10" />
          </div>
          <div className="h-2 w-1/2 bg-white/30" />
        </div>
      </div>
    </div>
  );
}

function Portfolio() {
  const [lms] = projects;

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen text-ink">
        {/* ============ TOP BAR ============ */}
        <div className="flex items-center justify-between bg-ink px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-chalk sm:px-10">
          <p>Open to internships and freelance work</p>
          <p className="flex gap-4">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <span aria-hidden="true">|</span>
            <a href={`mailto:${EMAIL}`}>Email</a>
          </p>
        </div>

        {/* ============ HERO ============ */}
        <section
          id="top"
          className="relative isolate min-h-[680px] h-[calc(100svh-2.5rem)] overflow-hidden bg-paper"
        >
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
                opacity: cloud.o,
              }}
              animate={{ x: [0, cloud.x, 0] }}
              transition={{
                duration: cloud.dur,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* navigation */}
          <nav
            aria-label="Main"
            className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 text-xs font-medium uppercase tracking-[0.15em] sm:grid sm:grid-cols-3 sm:px-10"
          >
            <ul className="hidden gap-8 sm:flex">
              <li>
                <a href="#about" className="hover:opacity-60">
                  About
                </a>
              </li>
              <li>
                <a href="#work" className="hover:opacity-60">
                  Work
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:opacity-60">
                  Contact
                </a>
              </li>
            </ul>

            <a
              href="#top"
              className="text-lg font-semibold tracking-tight sm:text-center sm:text-3xl"
            >
              {NAME.toUpperCase()}
            </a>

            <ul className="hidden gap-8 sm:flex sm:justify-end">
              <li>
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="hover:opacity-60">
                  Email
                </a>
              </li>
            </ul>

            <ul className="flex gap-5 sm:hidden">
              <li>
                <a href="#work">Work</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>

          {/* small tagline, top left */}
          <div className="absolute left-6 top-[18%] z-20 sm:left-20 sm:top-[22%]">
            <p className="text-xs uppercase leading-7 tracking-[0.3em] sm:text-sm">
              Full-stack
              <br />
              web development
              <br />
              portfolio 2026
            </p>
            <span className="mt-2 block h-px w-10 bg-ink" />
          </div>

          {/* giant name */}
          <h1
            aria-label={NAME}
            className="absolute inset-x-0 top-[38%] z-20 flex flex-col items-center font-bold uppercase leading-[0.9] tracking-tighter text-[24vw] sm:top-[36%] sm:flex-row sm:justify-center sm:gap-[0.22em] sm:text-[11.5vw]"
          >
            {NAME.split(" ").map((word, wi) => (
              <span
                key={wi}
                aria-hidden="true"
                className="flex overflow-hidden pb-[0.04em]"
              >
                {word.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: (wi * 4 + i) * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* photo */}
          <div
            aria-hidden="true"
            className={`absolute bottom-0 left-1/2 h-[64%] w-[min(80%,480px)] -translate-x-1/2 ${
              PHOTO_IN_FRONT ? "z-30" : "z-10"
            }`}
            style={{
              backgroundImage: `url(${PHOTO})`,
              backgroundSize: "contain",
              backgroundPosition: "center bottom",
              backgroundRepeat: "no-repeat",
              filter: "grayscale(1) contrast(1.05)",
            }}
          />

          {/* buttons, bottom left */}
          <div className="absolute bottom-8 left-6 z-40 flex items-center gap-6 sm:bottom-12 sm:left-20 sm:gap-8">
            <a href="#work" className={buttonDark}>
              View work
            </a>
            <a href="#contact" className={linkLine}>
              Contact me
            </a>
          </div>

          {/* latest project, bottom right */}
          <div className="absolute bottom-12 right-20 z-40 hidden sm:block">
            <p className="text-xs uppercase leading-7 tracking-[0.3em]">
              Latest project
              <br />
              Capstone LMS
              <br />
              2026
            </p>
            <span className="mt-2 block h-px w-10 bg-ink" />
          </div>
        </section>

        {/* ============ SKILLS (black band) ============ */}
        <section className="bg-ink px-6 py-14 text-chalk sm:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-3">
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} delay={i * 0.1}>
                <h2 className="text-2xl font-medium uppercase tracking-wide">
                  {group.title}
                </h2>
                <p className="mt-2 text-sm text-smoke">{group.text}</p>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium uppercase tracking-[0.1em]">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ FEATURED PROJECT (grey banner) ============ */}
        <section
          id="work"
          className="scroll-mt-4 bg-gradient-to-b from-[#d3d2cf] to-[#b8b7b4] px-6 py-20 sm:px-10"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
            <Reveal>
              <p className={label}>Latest project</p>
              <h2 className="mt-6 text-5xl font-bold uppercase leading-[1.02] tracking-tighter sm:text-7xl">
                Learning
                <br />
                Management
                <br />
                System
              </h2>
              <p className="mt-6 max-w-md text-lg text-ink/80">
                Student and faculty portals for managing courses, lessons, and
                records. Built with React on the frontend and Laravel on the
                backend as my capstone project.
              </p>
              <div className="mt-8 flex items-center gap-8">
                <a href={lms.href} className={buttonDark}>
                  View project
                </a>
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkLine}
                >
                  Source code
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <BrowserMock />
            </Reveal>
          </div>
        </section>

        {/* ============ WHAT I DO (info row) ============ */}
        <section className="bg-paper px-6 py-14 sm:px-10">
          <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.title} className="border-t border-ink pt-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.1em]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-ash">{service.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ SELECTED WORK (grid) ============ */}
        <section className="bg-bone px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="text-2xl font-medium uppercase tracking-wide">
                Selected work
              </h2>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className={linkLine}
              >
                View all
              </a>
            </div>

            <ul className="grid gap-6 sm:grid-cols-3">
              {projects.map((project, i) => (
                <li key={project.title}>
                  <Reveal delay={i * 0.1}>
                    <a href={project.href} className="group block">
                      <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#d9d8d4] to-[#b9b8b4]">
                        <div
                          className="flex h-full w-full items-center justify-center bg-cover bg-center text-xs uppercase tracking-[0.3em] text-ash transition-transform duration-500 group-hover:scale-105"
                          style={
                            project.image
                              ? { backgroundImage: `url(${project.image})` }
                              : undefined
                          }
                        >
                          {project.image ? null : "Add a screenshot"}
                        </div>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm text-ash">{project.stack}</p>
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ ABOUT ============ */}
        <section id="about" className="scroll-mt-4 bg-paper px-6 py-20 sm:px-10">
          <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-[1fr_2fr]">
            <h2 className="text-2xl font-medium uppercase tracking-wide">
              About
            </h2>
            <div className="max-w-xl space-y-5 text-xl leading-relaxed text-ink/80">
              <p>
                I&apos;m {NAME}, a developer who builds web applications from
                the database to the screen. I work with React and Next.js on
                the frontend and Laravel on the backend.
              </p>
              <p>
                Right now I&apos;m building a learning management system with
                separate student and faculty portals. Replace this with your
                school and the kind of work you are looking for.
              </p>
            </div>
          </div>
        </section>

        {/* ============ CONTACT (black) ============ */}
        <section
          id="contact"
          className="scroll-mt-4 bg-ink px-6 py-20 text-chalk sm:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <p className={label}>Contact</p>
            <h2 className="mt-6 text-5xl font-bold uppercase leading-[0.95] tracking-tighter sm:text-8xl">
              Let&apos;s work
              <br />
              together
            </h2>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-10 inline-block break-all border-b border-chalk pb-2 text-2xl font-medium transition-opacity hover:opacity-60 sm:text-4xl"
            >
              {EMAIL}
            </a>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonLight}
              >
                GitHub
              </a>
              <a href={LINKEDIN} className={linkLine}>
                LinkedIn
              </a>
            </div>

            <p className="mt-20 border-t border-white/15 pt-6 text-xs uppercase tracking-[0.15em] text-smoke">
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