// File: app/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "../contact-form";
import SiteHeader from "../site-header";
import { EMAIL } from "../site-config";

export const metadata: Metadata = {
  title: "Email | Dave Dacillo",
  description:
    "Send a message to Dave Dacillo.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen text-ink">
      <div className="mx-auto w-full max-w-[720px] px-5 pb-16 sm:px-6">
        <SiteHeader href="/" />

        <div className="pt-8">
          <h1 className="text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
            Email
          </h1>
          <p className="mt-4 text-ink/75">
            I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <ContactForm />

        <p className="mt-10 text-center text-sm text-ash">
          Note: if you want to send me an email directly, send it at {" "}
          <a
            href={`mailto:${EMAIL}`}
            className="font-medium text-ink underline underline-offset-4"
          >
            {EMAIL}
          </a>
        </p>

        <div className="mt-10 text-center">
          <Link
            href="/#contact"
            className="border-b border-current pb-1 text-xs font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-60"
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}