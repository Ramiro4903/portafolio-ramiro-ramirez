import { useLang } from "../../i18n/LanguageContext.jsx";
import { Reveal } from "../ui/Reveal.jsx";
import { SectionLabel } from "../ui/SectionLabel.jsx";

// Timeline por filas con inversión de color al pasar el cursor,
// el gesto firma tomado de la referencia visual.
export function Journey() {
  const { t } = useLang();
  const rows = t("journey.rows");

  return (
    <section id="journey" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>{t("journey.label")}</SectionLabel>
          <h2 className="mt-4 text-right font-display text-4xl font-bold sm:text-6xl">
            {t("journey.title")}
          </h2>
        </Reveal>
      </div>

      <Reveal className="mt-12">
        <ul className="border-y border-line">
          {rows.map((row, i) => (
            <li key={i} className={i > 0 ? "border-t border-line" : ""}>
              <div className="group bg-ink transition-colors duration-300 hover:bg-paper">
                <div className="mx-auto grid max-w-6xl gap-1 px-5 py-6 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-6 sm:px-8">
                  <div>
                    <p className="font-display text-sm text-paper transition-colors duration-300 group-hover:text-ink">
                      {row.period}
                    </p>
                    <p className="text-xs text-fog transition-colors duration-300 group-hover:text-ink/60">
                      {row.periodNote}
                    </p>
                  </div>
                  <p className="text-base font-medium text-paper transition-colors duration-300 group-hover:text-ink sm:text-lg">
                    {row.place}
                  </p>
                  <p className="font-display text-sm text-fog transition-colors duration-300 group-hover:text-ink">
                    {row.role} <span aria-hidden="true">|</span> {row.tag}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal delay={0.1}>
          <p className="mt-6 text-right text-sm text-fog">
            {t("journey.footnoteLabel")}{" "}
            <em className="font-medium text-paper not-italic">{t("journey.footnote")}</em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
