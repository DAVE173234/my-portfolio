// Rules for files attached on the email page.
// Vercel accepts about 4.5 MB per request, so the total is kept just under that.

export const MAX_FILES = 5;
export const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // 4 MB in total

export const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".txt",
  ".csv",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".zip",
];