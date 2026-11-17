import type { Project } from "./projects-data";

// One project card. Used on the home page and on the Projects page.
export default function ProjectCard({
  project,
  index,
  wide = false,
}: {
  project: Project;
  index: number;
  wide?: boolean;
}) {
  const clickable = project.href !== "";
  const external = project.href.startsWith("http");

  const className = `group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-ink/25 bg-gradient-to-br from-ink/[0.07] to-ink/[0.02] p-6 transition-colors duration-300 ${
    clickable ? "hover:border-ink/60" : ""
  } ${wide ? "min-h-[210px]" : "min-h-[230px]"}`;

  const content = (
    <>
      {/* screenshot on the right, or a faint number until you add one */}
      {project.image ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-cover bg-right opacity-60 transition-transform duration-700 [mask-image:linear-gradient(to_left,black,transparent)] group-hover:scale-105"
          style={{ backgroundImage: `url(${project.image})` }}
        />
      ) : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-4 text-6xl font-bold tracking-tight text-ink/[0.07] transition-transform duration-500 group-hover:scale-110"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <p className="relative text-[11px] font-semibold uppercase tracking-[0.15em] text-ash">
        {project.category}
      </p>

      <div className="relative mt-8 pr-12">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ash">
          {project.description}
        </p>
        <p className="mt-3 text-xs font-medium text-ink/70">{project.stack}</p>
      </div>

      {clickable && (
        <span
          aria-hidden="true"
          className="absolute bottom-5 right-5 grid h-9 w-9 place-items-center rounded-full bg-ink text-chalk transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        >
          ↗
        </span>
      )}
    </>
  );

  return clickable ? (
    <a
      href={project.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}