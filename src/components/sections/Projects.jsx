import { useLang } from "../../i18n/LanguageContext.jsx";
import { projects } from "../../data/projects.js";
import { projectLinks } from "../../data/profile.js";
import { Reveal } from "../ui/Reveal.jsx";
import { SectionLabel } from "../ui/SectionLabel.jsx";
import { TechList } from "../ui/TechList.jsx";
import { Pill } from "../ui/Pill.jsx";
import { ArrowIcon, GithubIcon } from "../ui/Icons.jsx";

function ProjectCard({ project }) {
  const { t } = useLang();
  const item = t(`projects.items.${project.id}`);
  const labels = t("projects.labels");
  const links = projectLinks[project.id] ?? {};

  const details = [
    { key: "objective", text: item.objective },
    { key: "challenge", text: item.challenge },
    { key: "solution", text: item.solution },
  ];

  return (
    <article className="group rounded-card border border-line bg-surface p-6 transition-colors duration-300 hover:border-fog/60 sm:p-10">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-display text-sm text-fog">
            {project.index} <span aria-hidden="true">/</span> {item.type}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold text-paper sm:text-4xl">
            {item.name}
          </h3>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 font-display text-xs text-fog">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-paper" aria-hidden="true" />
          {item.status}
        </span>
      </header>

      <p className="mt-6 max-w-2xl leading-relaxed text-fog">{item.description}</p>

      <dl className="mt-8 grid gap-6 md:grid-cols-3">
        {details.map((detail) => (
          <div key={detail.key} className="rounded-2xl border border-line/70 p-5">
            <dt className="font-display text-xs tracking-widest text-fog uppercase">
              {labels[detail.key]}
            </dt>
            <dd className="mt-3 text-sm leading-relaxed text-paper/90">{detail.text}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <p className="font-display text-xs tracking-widest text-fog uppercase">
            {labels.results}
          </p>
          <ul className="mt-3 space-y-2">
            {item.results.map((result) => (
              <li key={result} className="flex items-start gap-3 text-sm text-paper/90">
                <span className="mt-0.5 text-fog" aria-hidden="true">
                  →
                </span>
                {result}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display text-xs tracking-widest text-fog uppercase">{labels.stack}</p>
          <TechList items={project.tech} className="mt-3" />

          {(links.demo || links.code) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {links.demo && (
                <Pill href={links.demo} variant="solid" className="text-xs">
                  {t("projects.demo")}
                  <ArrowIcon />
                </Pill>
              )}
              {links.code && (
                <Pill href={links.code} className="text-xs">
                  <GithubIcon />
                  {t("projects.code")}
                </Pill>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const { t } = useLang();

  return (
    <section id="projects" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>{t("projects.label")}</SectionLabel>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl font-bold sm:text-6xl">
              {t("projects.title")}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-fog">{t("projects.subtitle")}</p>
          </div>
        </Reveal>

        <div className="mt-12 space-y-8">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
