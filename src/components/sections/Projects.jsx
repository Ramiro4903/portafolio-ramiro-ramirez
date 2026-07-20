import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { useLang } from "../../i18n/LanguageContext.jsx";
import { projects } from "../../data/projects.js";
import { profile, projectLinks } from "../../data/profile.js";
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
    <article className="h-full rounded-card border border-line bg-surface p-6 transition-colors duration-300 hover:border-fog/60 sm:p-10">
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

// Tarjeta final del carrusel: invitación a colaborar
function ExtraCard() {
  const { t } = useLang();
  const extra = t("projects.extra");

  return (
    <article className="flex h-full flex-col justify-between rounded-card border border-dashed border-line bg-surface/50 p-6 transition-colors duration-300 hover:border-fog/60 sm:p-10">
      <div>
        <p className="font-display text-sm text-fog">{extra.kicker}</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-paper sm:text-4xl">
          {extra.title}
          <span className="animate-blink" aria-hidden="true">
            _
          </span>
        </h3>
        <p className="mt-6 max-w-md leading-relaxed text-fog">{extra.text}</p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Pill href="#contact" variant="solid">
          {extra.cta}
          <ArrowIcon />
        </Pill>
        <Pill href={profile.github}>
          <GithubIcon />
          {extra.github}
        </Pill>
      </div>
    </article>
  );
}

// Carrusel horizontal arrastrable, inspirado en la referencia: las
// tarjetas se mueven con drag o con las flechas, con un peek de la
// siguiente tarjeta como invitación a explorar.
export function Projects() {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [dims, setDims] = useState({ cardW: 0, step: 0, offset: 0 });
  const x = useMotionValue(0);
  const slideCount = projects.length + 1;

  // La tarjeta activa queda centrada: ancho = contenedor - 2 peeks
  // simétricos; el offset inicial deja el mismo aire a ambos lados.
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      const peek = width >= 768 ? 96 : 24;
      const gap = 24;
      setDims({ cardW: width - peek * 2, step: width - peek * 2 + gap, offset: peek });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const positionFor = (i) => dims.offset - i * dims.step;

  const snapTo = (target) => {
    const clamped = Math.min(Math.max(target, 0), slideCount - 1);
    setIndex(clamped);
    animate(x, positionFor(clamped), reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 32 });
  };

  useEffect(() => {
    // Reposiciona al cambiar el ancho de la ventana
    x.set(positionFor(index));
  }, [dims]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -60 || info.velocity.x < -400) snapTo(index + 1);
    else if (info.offset.x > 60 || info.velocity.x > 400) snapTo(index - 1);
    else snapTo(index);
  };

  const arrowClasses =
    "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-paper transition-all duration-200 hover:border-paper hover:bg-paper hover:text-ink disabled:pointer-events-none disabled:opacity-30";

  return (
    <section id="projects" className="scroll-mt-24 overflow-x-clip py-20 sm:py-28">
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

        <Reveal delay={0.1}>
          <div ref={containerRef} className="mt-12">
            <motion.div
              className="flex cursor-grab gap-6 active:cursor-grabbing"
              style={{ x, touchAction: "pan-y" }}
              drag="x"
              dragConstraints={{
                left: positionFor(slideCount - 1),
                right: dims.offset,
              }}
              dragElastic={0.08}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex-shrink-0"
                  style={{ width: dims.cardW || "100%" }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
              <div className="flex-shrink-0" style={{ width: dims.cardW || "100%" }}>
                <ExtraCard />
              </div>
            </motion.div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="font-display text-xs tracking-widest text-fog">
              0{index + 1} <span aria-hidden="true">/</span> 0{slideCount}
              <span className="ml-4 hidden text-fog/60 sm:inline">
                — {t("projects.carousel.dragHint")}
              </span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => snapTo(index - 1)}
                disabled={index === 0}
                aria-label={t("projects.carousel.prev")}
                className={arrowClasses}
              >
                <ArrowIcon style={{ transform: "rotate(180deg)" }} />
              </button>
              <button
                onClick={() => snapTo(index + 1)}
                disabled={index === slideCount - 1}
                aria-label={t("projects.carousel.next")}
                className={arrowClasses}
              >
                <ArrowIcon />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
