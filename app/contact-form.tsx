"use client";

import { useState, type FormEvent } from "react";
import { EMAIL, FORM_ENDPOINT } from "./site-config";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-ink/30 bg-ink/5 px-4 py-3 text-ink placeholder:text-ash transition-colors focus:border-ink focus:outline-none";
const fieldLabel =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-ash";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const email = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "");
    const message = String(data.get("message") ?? "");

    // No form service set up yet: open the visitor's email app, already filled in
    if (!FORM_ENDPOINT) {
      const body = `${message}\n\nFrom: ${email}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (response.ok) {
        form.reset();
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-6">
      <div>
        <label htmlFor="email" className={fieldLabel}>
          Your email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="hello@example.com"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="subject" className={fieldLabel}>
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="What's this about?"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="message" className={fieldLabel}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          placeholder="Your message here..."
          className={`${field} resize-y`}
        />
      </div>

      {/* hidden field that catches spam bots */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl bg-ink py-4 font-medium text-chalk transition-opacity hover:opacity-85 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      <p role="status" aria-live="polite" className="min-h-[1.5em] text-center text-sm">
        {status === "sent" && "Thank you! Your message was sent. I'll get back to you soon."}
        {status === "error" && (
          <>
            Something went wrong. You can email me directly at{" "}
            <a href={`mailto:${EMAIL}`} className="underline">
              {EMAIL}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}