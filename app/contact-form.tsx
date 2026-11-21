"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  ALLOWED_EXTENSIONS,
  MAX_FILES,
  MAX_TOTAL_BYTES,
} from "./contact-limits";
import { EMAIL } from "./site-config";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

const field =
  "w-full rounded-xl border border-ink/30 bg-ink/5 px-4 py-3 text-ink placeholder:text-ash transition-colors focus:border-ink focus:outline-none";
const fieldLabel =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-ash";

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function PaperclipIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [files, setFiles] = useState<File[]>([]);
  const [fileProblem, setFileProblem] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;

    const next = [...files];
    let problem = "";

    for (const file of Array.from(list)) {
      const extension = "." + (file.name.split(".").pop() ?? "").toLowerCase();
      const usedBytes = next.reduce((sum, item) => sum + item.size, 0);

      if (!ALLOWED_EXTENSIONS.includes(extension)) {
        problem = `${file.name} can't be attached. Allowed: PDF, Word, Excel, PowerPoint, text, images, and ZIP.`;
      } else if (next.length >= MAX_FILES) {
        problem = `You can attach up to ${MAX_FILES} files.`;
      } else if (usedBytes + file.size > MAX_TOTAL_BYTES) {
        problem = `Attachments can be ${formatSize(MAX_TOTAL_BYTES)} in total.`;
      } else {
        next.push(file);
      }
    }

    setFiles(next);
    setFileProblem(problem);
    if (fileInput.current) fileInput.current.value = ""; // lets you pick the same file again
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, i) => i !== index));
    setFileProblem("");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    files.forEach((file) => data.append("files", file));

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        form.reset();
        setFiles([]);
        setFileProblem("");
        setStatus("sent");
        return;
      }

      // Sending is not set up on the server yet: open the visitor's email app instead
      if (response.status === 503) {
        const email = String(data.get("email") ?? "");
        const subject = String(data.get("subject") ?? "");
        const message = String(data.get("message") ?? "");
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
          subject,
        )}&body=${encodeURIComponent(`${message}\n\nFrom: ${email}`)}`;
        setStatus("fallback");
        return;
      }

      setStatus("error");
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

        {/* the message box and the attachments sit in one frame, like an email */}
        <div className="overflow-hidden rounded-xl border border-ink/30 bg-ink/5 transition-colors focus-within:border-ink">
          <textarea
            id="message"
            name="message"
            required
            rows={7}
            placeholder="Your message here..."
            className="block w-full resize-y bg-transparent px-4 py-3 text-ink placeholder:text-ash focus:outline-none"
          />

          {files.length > 0 && (
            <ul className="flex flex-wrap gap-2 border-t border-ink/15 px-3 py-3">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="inline-flex max-w-full items-center gap-2 rounded-md border border-ink/30 bg-ink/5 py-1 pl-3 pr-1 text-xs font-medium"
                >
                  <span className="truncate">{file.name}</span>
                  <span className="shrink-0 text-ash">
                    {formatSize(file.size)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    aria-label={`Remove ${file.name}`}
                    className="grid h-6 w-6 shrink-0 place-items-center rounded text-base leading-none transition-colors hover:bg-ink hover:text-chalk"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center justify-between gap-4 border-t border-ink/15 px-3 py-2">
            <p className="text-xs text-ash">
              Up to {MAX_FILES} files, {formatSize(MAX_TOTAL_BYTES)} in total
            </p>

            <input
              ref={fileInput}
              type="file"
              multiple
              accept={ALLOWED_EXTENSIONS.join(",")}
              onChange={(event) => addFiles(event.target.files)}
              className="hidden"
              tabIndex={-1}
              aria-label="Attach files"
            />
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-ink hover:text-chalk"
            >
              <PaperclipIcon />
              Attach
            </button>
          </div>
        </div>

        {fileProblem && (
          <p role="alert" className="mt-2 text-xs text-ash">
            {fileProblem}
          </p>
        )}
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

      <p
        role="status"
        aria-live="polite"
        className="min-h-[1.5em] text-center text-sm"
      >
        {status === "sent" &&
          "Thank you! Your message was sent. I'll get back to you soon."}
        {status === "fallback" &&
          "Your email app opened with your message. Attach your files there before sending."}
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