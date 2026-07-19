import { motion, useReducedMotion } from "motion/react";
import { useLang } from "../../i18n/LanguageContext.jsx";
import { profile } from "../../data/profile.js";
import { Pill } from "../ui/Pill.jsx";
import { SectionLabel } from "../ui/SectionLabel.jsx";
import { GithubIcon, LinkedinIcon, MailIcon, ArrowIcon, FileIcon } from "../ui/Icons.jsx";

export function Hero() {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();

  const enter = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Círculos decorativos sutiles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full border border-line/50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-64 h-[40rem] w-[40rem] rounded-full border border-line/30"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div {...enter(0)}>
          <SectionLabel>{t("hero.kicker")}</SectionLabel>
        </motion.div>

        <h1 className="mt-6 font-display font-bold leading-[0.95] tracking-tight">
          <motion.span {...enter(0.08)} className="block text-[clamp(2.25rem,9vw,6.5rem)]">
            {t("hero.titleA")}
          </motion.span>
          <motion.span
            {...enter(0.16)}
            className="mt-2 block text-right text-[clamp(1.55rem,5.9vw,4.25rem)] text-paper/90"
          >
            {t("hero.titleB")}
            <span className="animate-blink" aria-hidden="true">
              _
            </span>
          </motion.span>
        </h1>

        <div className="mt-10 flex flex-col gap-10 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
          <motion.div {...enter(0.24)} className="max-w-md">
            <p className="text-base leading-relaxed text-fog">{t("hero.intro")}</p>
            <p className="mt-4 flex items-center gap-2 font-display text-xs text-fog">
              <span
                className="inline-block h-2 w-2 rounded-full bg-paper motion-safe:animate-pulse"
                aria-hidden="true"
              />
              {t("hero.status")}
            </p>
          </motion.div>

          <motion.div {...enter(0.32)} className="flex flex-wrap items-center gap-3">
            <Pill href="#projects" variant="solid" className="px-7">
              {t("hero.cta")}
              <ArrowIcon />
            </Pill>
          </motion.div>
        </div>

        <motion.div {...enter(0.4)} className="mt-12 flex flex-wrap gap-3">
          <Pill href={profile.github} className="text-xs">
            <GithubIcon />
            GitHub
          </Pill>
          <Pill href={profile.linkedin} className="text-xs">
            <LinkedinIcon />
            LinkedIn
          </Pill>
          <Pill href={`mailto:${profile.email}`} className="text-xs">
            <MailIcon />
            Email
          </Pill>
          <Pill href={profile.cv} target="_blank" rel="noopener noreferrer" className="text-xs">
            <FileIcon />
            {t("common.cv")}
          </Pill>
        </motion.div>
      </div>
    </section>
  );
}
