// Your projects. Used by the home page and the Projects page.
//
// href: where the card opens. Leave it empty ("") and the card is not clickable.
// image: a screenshot saved in the public folder, for example "/cgc-portal.jpg".

export type Project = {
  title: string;
  category: string;
  stack: string;
  description: string;
  href: string;
  image: string;
};

export const projects: Project[] = [
  {
    title: "Learning Management System",
    category: "Web app / Education",
    stack: "React, Laravel, MySQL",
    description:
      "Student and faculty portals for managing courses, lessons, and records, built for CITI Global College's Senior High School. My capstone project.",
    href: "https://cgc-shs-portal.vercel.app/login",
    image: "/cgc-portal.jpg",
  },
  {
    title: "N/A",
    category: "N/A",
    stack: "N/A",
    description: "N/A",
    href: "",
    image: "",
  },
  {
    title: "N/A",
    category: "N/A",
    stack: "N/A",
    description: "N/A",
    href: "",
    image: "",
  },
];