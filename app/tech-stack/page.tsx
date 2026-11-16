// File: app/tech-stack/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../site-header";
import { TechGroups } from "../tech-chip";
import { techGroups } from "../tech-data";

export const metadata: Metadata = {
  title: "Tech Stack | Dave Dacillo",
  description:
    "The technologies Dave Dacillo uses to build web applications, from the interface to the database.",
};

export default function TechStackPage() {
  return (
    <main className="min-h-screen text-ink">
      <div className="mx-auto w-full max-w-[720px] px-5 pb-16 sm:px-6">
        <SiteHeader href="/" />

        <div className="pb-12 pt-8">
          <h1 className="text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
            Tech Stack
          </h1>
          <p className="mt-4 max-w-md text-ink/75">
            The technologies I use to build web applications, from the
            interface to the database.
          </p>
        </div>

        <TechGroups groups={techGroups} />

        <Link
          href="/#skills"
          className="mt-10 inline-block border-b border-current pb-1 text-xs font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-60"
        >
          ← Back to portfolio
        </Link>
      </div>
    </main>
  );
}