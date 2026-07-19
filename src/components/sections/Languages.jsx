import { useLang } from "../../i18n/LanguageContext.jsx";
import { Reveal } from "../ui/Reveal.jsx";
import { SectionLabel } from "../ui/SectionLabel.jsx";

const TOTAL_SEGMENTS = 6;

export function Languages() {
  const { t } = useLang();
  const items = t("languages.items");

  return (
    <section id="languages" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>{t("languages.label")}</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-6xl">
            {t("languages.title")}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {items.map((language, i) => (
            <Reveal key={language.name} delay={i * 0.08}>
              <div className="rounded-card border border-line bg-surface p-6 transition-colors duration-300 hover:border-fog/60 sm:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-bold text-paper">{language.name}</h3>
                  <p className="font-display text-sm text-fog">{language.level}</p>
                </div>
                <div
                  className="mt-6 flex gap-1.5"
                  role="meter"
                  aria-label={`${language.name}: ${language.level}`}
                  aria-valuemin="0"
                  aria-valuemax={TOTAL_SEGMENTS}
                  aria-valuenow={language.segments}
                >
                  {Array.from({ length: TOTAL_SEGMENTS }, (_, segment) => (
                    <span
                      key={segment}
                      className={`h-1.5 flex-1 rounded-full ${
                        segment < language.segments ? "bg-paper" : "bg-line"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-4 font-display text-xs text-fog">{t("languages.scaleNote")}</p>
        </Reveal>
      </div>
    </section>
  );
}
