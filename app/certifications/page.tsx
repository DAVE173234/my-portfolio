// File: app/certifications/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import CertificationCard from "../certification-card";
import { certifications } from "../certifications-data";
import SiteHeader from "../site-header";

export const metadata: Metadata = {
  title: "Certifications | Dave Dacillo",
  description: "Certifications and trainings completed by Dave Dacillo.",
};

export default function CertificationsPage() {
  return (
    <main className="min-h-screen text-ink">
      <div className="mx-auto w-full max-w-[720px] px-5 pb-16 sm:px-6">
        <SiteHeader href="/" />

        <div className="pt-8">
          <h1 className="text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
            Certifications
          </h1>
          <p className="mt-4 max-w-lg text-balance text-ink/75">
            Trainings and courses I have completed.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {certifications.map((cert) => (
            <CertificationCard key={cert.title} cert={cert} />
          ))}
        </div>

        <Link
          href="/#certifications"
          className="mt-10 inline-block border-b border-current pb-1 text-xs font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-60"
        >
          ← Back to portfolio
        </Link>
      </div>
    </main>
  );
}