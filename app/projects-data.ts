// Your projects. Used by the home page and the Projects page.
//
// To add a project, copy a whole { ... } block below and change the text.
//   description: what the project is and what it does
//   stack:       the technologies you used (names from tech-data.ts show with their logo)
//   href:        where the card opens (leave "" to make the card not clickable)
//   image:       a screenshot saved in the public folder, for example "/cgc-portal.jpg"

export type Project = {
  title: string;
  category: string;
  stack: string[];
  description: string;
  href: string;
  image: string;
};

export const projects: Project[] = [
  {
    title: "Learning Management System",
    category: "Web app / Education",
    stack: ["React", "Laravel", "MySQL"],
    description:
      "A learning management system for CITI Global College's Senior High School. Students follow their classes, deadlines, assignments, quizzes, and calendar. Teachers post lessons and share files or links. Admins manage users, subjects, sections, rooms, and faculty attendance. Built as my capstone project.",
    href: "https://cgc-shs-portal.vercel.app/login",
    image: "/cgc-portal.jpg",
  },
];