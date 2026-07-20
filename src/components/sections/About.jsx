import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useLang } from "../../i18n/LanguageContext.jsx";
import { profile } from "../../data/profile.js";
import { Reveal } from "../ui/Reveal.jsx";
import { ImageReveal } from "../ui/ImageReveal.jsx";
import { SectionLabel } from "../ui/SectionLabel.jsx";

// Esquinas tipo visor de cámara sobre la foto
function ViewfinderCorners() {
  const base = "absolute h-5 w-5 border-paper/70 transition-all duration-300";
  return (
    <>
      <span aria-hidden="true" className={`${base} top-3 left-3 border-t-2 border-l-2 group-hover:top-2 group-hover:left-2`} />
      <span aria-hidden="true" className={`${base} top-3 right-3 border-t-2 border-r-2 group-hover:top-2 group-hover:right-2`} />
      <span aria-hidden="true" className={`${base} bottom-3 left-3 border-b-2 border-l-2 group-hover:bottom-2 group-hover:left-2`} />
      <span aria-hidden="true" className={`${base} bottom-3 right-3 border-b-2 border-r-2 group-hover:bottom-2 group-hover:right-2`} />
    </>
  );
}

export function About() {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();
  const paragraphs = t("about.paragraphs");

  // Parallax sutil: la foto recorre ~50px más lento que el scroll
  const photoRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [26, -26]);

  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <SectionLabel>{t("about.label")}</SectionLabel>
              <h2 className="mt-6 max-w-2xl text-3xl leading-snug font-medium sm:text-4xl">
                {t("about.greetingStart")}
                <em className="font-display font-bold text-paper not-italic">
                  {t("about.greetingHighlight")}
                </em>
                {t("about.greetingEnd")}
              </h2>
            </Reveal>

            {paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.08 + i * 0.08}>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fog">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <motion.div
            ref={photoRef}
            style={{ y: reduceMotion ? 0 : parallaxY }}
            className="group relative w-full max-w-md lg:justify-self-end"
          >
            {profile.photo ? (
              <>
                {/* Marco desplazado: al hacer hover, marco y foto se
                    deslizan uno hacia el otro hasta alinearse */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-4 translate-y-4 rounded-card border border-line transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:translate-y-2"
                />
                <ImageReveal className="relative rounded-card border border-line transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:translate-y-2">
                  <div className="relative aspect-4/5 w-full overflow-hidden rounded-card">
                    <img
                      src={profile.photo}
                      alt={t("about.photoAlt")}
                      className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    {profile.photoHover && (
                      <img
                        src={profile.photoHover}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-0 grayscale transition-all duration-500 group-hover:scale-[1.05] group-hover:opacity-100"
                      />
                    )}
                    <ViewfinderCorners />
                  </div>
                </ImageReveal>
                <p className="mt-4 font-display text-xs text-fog">{t("about.photoCaption")}</p>
              </>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
