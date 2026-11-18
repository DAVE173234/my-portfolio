// Your certifications. Used by the Certifications section on the home page.
//
// To add one, copy the whole { ... } block below and change the text.
//   image: a picture of the certificate saved in the public folder
//   href:  what opens when the certificate is clicked (the same picture, or a verify link)
//   skills: short tags for what you learned

export type Certification = {
  type: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  href: string;
  image: string;
};

export const certifications: Certification[] = [
  {
    type: "Certificate of Content Completion",
    title: "Ignite Philippines",
    issuer: "Wadhwani Foundation",
    date: "April 28, 2026",
    description:
      "Completed all coursework and assessments of this 42-hour entrepreneurship training from the Wadhwani Foundation, as a student of Pamantasan ng Cabuyao.",
    skills: ["Ideation", "Business modeling", "Financial planning"],
    href: "/ignite-philippines-certificate.jpg",
    image: "/ignite-philippines-certificate.jpg",
  },
];