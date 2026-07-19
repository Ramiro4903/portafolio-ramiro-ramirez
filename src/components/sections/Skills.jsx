import { useLang } from "../../i18n/LanguageContext.jsx";
import { skillCategories } from "../../data/skills.js";
import { Reveal } from "../ui/Reveal.jsx";
import { SectionLabel } from "../ui/SectionLabel.jsx";
import { TechList } from "../ui/TechList.jsx";

// Distribución escalonada al estilo de la referencia: tarjetas de
// anchos distintos que forman una retícula asimétrica.
const spans = {
  languages: "md:col-span-3",
  web: "md:col-span-3",
  databases: "md:col-span-2",
  tools: "md:col-span-2",
  os: "md:col-span-2",
};

export function Skills() {
  const { t } = useLang();

  return (
    <section id="skills" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>{t("skills.label")}</SectionLabel>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl font-bold sm:text-6xl">{t("skills.title")}</h2>
            <p className="max-w-sm text-sm leading-relaxed text-fog">{t("skills.subtitle")}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {skillCategories.map((category, i) => (
            <Reveal key={category.id} delay={i * 0.06} className={spans[category.id]}>
              <div className="h-full rounded-card border border-line bg-surface p-6 transition-colors duration-300 hover:border-fog/60 sm:p-8">
                <h3 className="text-lg font-medium text-paper">
                  {t(`skills.categories.${category.id}`)}
                </h3>
                <TechList items={category.chips} className="mt-4" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
