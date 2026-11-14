// Everything on the Tech Stack page comes from this list.
//
// slugs: the logo name on simpleicons.org. Several can be listed and they are
//        tried in order. Leave it out to show a plain </> icon instead.
// featured: true shows the item in the short summary on the home page.

export type Tech = {
  name: string;
  slugs?: string[];
  featured?: boolean;
};

export type TechGroup = {
  title: string;
  items: Tech[];
};

export const techGroups: TechGroup[] = [
  {
    title: "Frontend",
    items: [
      { name: "HTML", slugs: ["html5"] },
      { name: "CSS", slugs: ["css", "css3"] },
      { name: "JavaScript", slugs: ["javascript"], featured: true },
      { name: "TypeScript", slugs: ["typescript"] },
      { name: "React", slugs: ["react"], featured: true },
      { name: "Next.js", slugs: ["nextdotjs"], featured: true },
      { name: "Tailwind CSS", slugs: ["tailwindcss"], featured: true },
      { name: "Framer Motion", slugs: ["framer"] },
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      { name: "PHP", slugs: ["php"], featured: true },
      { name: "Laravel", slugs: ["laravel"], featured: true },
      { name: "REST API" },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "MySQL", slugs: ["mysql"], featured: true },
      { name: "PostgreSQL", slugs: ["postgresql"] },
    ],
  },
  {
    title: "Tools & Deployment",
    items: [
      { name: "Git", slugs: ["git"], featured: true },
      { name: "GitHub", slugs: ["github"] },
      { name: "VS Code", slugs: ["visualstudiocode"] },
      { name: "Vercel", slugs: ["vercel"] },
    ],
  },
];