import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Gotham is a paid font, so Montserrat (the closest free match) is used for the whole site.
// If you own Gotham, it can be swapped in here without touching any other file.
const gotham = Montserrat({
  variable: "--font-gotham",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dave Dacillo | Full-Stack Developer",
  description:
    "Portfolio of Dave Dacillo, a full-stack developer building web applications with React, Next.js, and Laravel.",
};

// Runs before the page paints, so a visitor who chose light mode never sees a dark flash
const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={gotham.variable}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}