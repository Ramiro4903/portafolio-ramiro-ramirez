import { useLang } from "../../i18n/LanguageContext.jsx";
import { profile } from "../../data/profile.js";
import { Reveal } from "../ui/Reveal.jsx";
import { SectionLabel } from "../ui/SectionLabel.jsx";

export function About() {
  const { t } = useLang();
  const paragraphs = t("about.paragraphs");

  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Reveal>
              <SectionLabel>{t("about.label")}</SectionLabel>
              <h2 className="mt-6 max-w-xl text-2xl leading-snug font-medium sm:text-3xl">
                {t("about.greetingStart")}
                <em className="font-display font-bold text-paper not-italic">
                  {t("about.greetingHighlight")}
                </em>
                {t("about.greetingEnd")}
              </h2>
            </Reveal>

            {paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.08 + i * 0.08}>
                <p className="mt-6 max-w-xl leading-relaxed text-fog">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="lg:justify-self-end">
            {profile.photo ? (
              <div className="group relative aspect-4/5 w-full max-w-sm overflow-hidden rounded-card border border-line">
                <img
                  src={profile.photo}
                  alt={t("about.photoAlt")}
                  className="h-full w-full object-cover grayscale"
                />
                {profile.photoHover && (
                  <img
                    src={profile.photoHover}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-0 grayscale transition-opacity duration-500 group-hover:opacity-100"
                  />
                )}
              </div>
            ) : (
              <div
                role="img"
                aria-label={t("about.photoAlt")}
                className="relative flex aspect-4/5 w-full max-w-sm items-end overflow-hidden rounded-card border border-line bg-surface p-6"
              >
                {/* Placeholder tipográfico mientras llega la foto real */}
                <div
                  aria-hidden="true"
                  className="absolute -top-16 -right-16 h-64 w-64 rounded-full border border-line"
                />
                <div
                  aria-hidden="true"
                  className="absolute -top-8 -right-28 h-64 w-64 rounded-full border border-line/60"
                />
                <p
                  aria-hidden="true"
                  className="absolute top-6 left-6 font-display text-7xl font-bold text-line select-none"
                >
                  rr_
                </p>
                <p className="font-display text-xs text-fog">{t("about.photoPlaceholder")}</p>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
