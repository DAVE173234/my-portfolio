// File: app/api/contact/route.ts
import { Resend } from "resend";
import {
  ALLOWED_EXTENSIONS,
  MAX_FILES,
  MAX_TOTAL_BYTES,
} from "../../contact-limits";

function reply(body: object, status = 200) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  // Not set up yet: the form falls back to the visitor's email app
  if (!apiKey || !to) {
    return reply({ error: "not-configured" }, 503);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply({ error: "bad-request" }, 400);
  }

  // Hidden field that only spam bots fill in
  if (String(form.get("_gotcha") ?? "") !== "") {
    return reply({ ok: true });
  }

  const email = String(form.get("email") ?? "").trim();
  const subject = String(form.get("subject") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();

  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (
    !emailLooksValid ||
    !subject ||
    !message ||
    email.length > 200 ||
    subject.length > 200 ||
    message.length > 10000
  ) {
    return reply({ error: "invalid" }, 400);
  }

  const files = form
    .getAll("files")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (files.length > MAX_FILES) {
    return reply({ error: "too-many-files" }, 400);
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > MAX_TOTAL_BYTES) {
    return reply({ error: "too-large" }, 413);
  }

  for (const file of files) {
    const extension = "." + (file.name.split(".").pop() ?? "").toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return reply({ error: "file-type" }, 400);
    }
  }

  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: file.name.replace(/[^\w.\- ()]/g, "_"),
      content: Buffer.from(await file.arrayBuffer()),
    })),
  );

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: [to],
    replyTo: email, // pressing Reply in your inbox answers the visitor
    subject: `[Portfolio] ${subject}`,
    text: `From: ${email}\n\n${message}`,
    attachments,
  });

  if (error) {
    return reply({ error: "send-failed" }, 502);
  }

  return reply({ ok: true });
}