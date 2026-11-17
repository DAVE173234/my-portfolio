// File: app/projects/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "../project-card";
import { projects } from "../projects-data";
import SiteHeader from "../site-header";

export const metadata: Metadata = {
  title: "Projects | Dave Dacillo",
  description: "All of the projects Dave Dacillo has built.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen text-ink">
      <div className="mx-auto w-full max-w-[720px] px-5 pb-16 sm:px-6">
        <SiteHeader href="/" />

        <div className="pt-8">
          <h1 className="text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
            Projects / My works
          </h1>
          <p className="mt-4 max-w-lg text-balance text-ink/75">
            Selected projects, from academic work to personal builds.
          </p>
        </div>

        <ul className="mt-8 grid gap-4">
          {projects.map((project, i) => (
            <li key={`${project.title}-${i}`}>
              <ProjectCard project={project} index={i} wide />
            </li>
          ))}
        </ul>

        <Link
          href="/#projects"
          className="mt-10 inline-block border-b border-current pb-1 text-xs font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-60"
        >
          ← Back to portfolio
        </Link>
      </div>
    </main>
  );
}