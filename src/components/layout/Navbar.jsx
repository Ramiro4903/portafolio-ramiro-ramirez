import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLang } from "../../i18n/LanguageContext.jsx";
import { profile } from "../../data/profile.js";
import { ArrowIcon, GithubIcon, LinkedinIcon, WhatsappIcon } from "../ui/Icons.jsx";

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState("projects");
  const links = t("nav.links");
  const previews = t("nav.previews");
  const [firstName, ...rest] = profile.shortName.split(" ");
  const hoveredIndex = links.findIndex((link) => link.id === hovered);

  // Bloquea el scroll del fondo mientras el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Cierra con Escape
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const toggleLang = () => setLang(lang === "es" ? "en" : "es");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:text-ink"
      >
        {t("nav.skipLink")}
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-ink/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <a
            href="#top"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-3"
          >
            <img
              src="/avatar.png"
              alt=""
              width="40"
              height="40"
              className="h-10 w-10 rounded-full border border-line transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110 group-hover:border-paper"
            />
            <span className="font-display text-sm leading-tight text-paper">
              {firstName}
              <br />
              {rest.join(" ")}
            </span>
          </a>

          <div className="flex items-center gap-3">
            {/* Selector de idioma segmentado: el idioma activo queda
                invertido (fondo claro), el otro en gris */}
            <button
              onClick={toggleLang}
              aria-label={t("nav.langToggle")}
              className="flex cursor-pointer items-center rounded-full border border-line p-1 font-display text-xs transition-colors duration-200 hover:border-paper"
            >
              <span
                className={`rounded-full px-2.5 py-1 transition-colors duration-200 ${
                  lang === "es" ? "bg-paper font-bold text-ink" : "text-fog"
                }`}
              >
                ES
              </span>
              <span
                className={`rounded-full px-2.5 py-1 transition-colors duration-200 ${
                  lang === "en" ? "bg-paper font-bold text-ink" : "text-fog"
                }`}
              >
                EN
              </span>
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              className="flex cursor-pointer items-center gap-2.5 rounded-full border border-line py-2 pr-4 pl-5 font-display text-xs text-paper transition-colors duration-200 hover:bg-paper hover:text-ink"
            >
              {menuOpen ? t("nav.closeShort") : t("nav.menuShort")}
              <span className="flex flex-col items-center justify-center gap-1" aria-hidden="true">
                <span
                  className={`h-px w-4 bg-current transition-transform duration-200 ${menuOpen ? "translate-y-[2.5px] rotate-45" : ""}`}
                />
                <span
                  className={`h-px w-4 bg-current transition-transform duration-200 ${menuOpen ? "-translate-y-[2.5px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Menú a pantalla completa: links gigantes a la izquierda y un
          preview que cambia según el link sobre el que está el cursor */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="menu-overlay"
            aria-label="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink/95 backdrop-blur-xl"
          >
            {/* Círculo decorativo que crece al abrir, para dar profundidad */}
            <motion.div
              aria-hidden="true"
              initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full border border-line/40"
            />

            <div className="mx-auto flex min-h-full max-w-6xl flex-col px-5 pt-28 pb-10 sm:px-8">
              <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
                <ul>
                  {links.map((link, i) => (
                    <li key={link.id} className="overflow-hidden">
                      <motion.a
                        href={`#${link.id}`}
                        onClick={() => setMenuOpen(false)}
                        onMouseEnter={() => setHovered(link.id)}
                        onFocus={() => setHovered(link.id)}
                        initial={reduceMotion ? { opacity: 0 } : { y: "110%" }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="group flex items-center gap-4 py-2 sm:py-3"
                      >
                        <span
                          className="w-7 font-display text-xs text-fog transition-colors duration-300 group-hover:text-paper"
                          aria-hidden="true"
                        >
                          0{i + 1}
                        </span>
                        <span className="font-display text-4xl font-bold text-fog transition-all duration-300 group-hover:translate-x-3 group-hover:text-paper group-focus-visible:text-paper sm:text-6xl">
                          {link.label}
                        </span>
                        <ArrowIcon
                          className="text-paper opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100"
                          width="28"
                          height="28"
                        />
                      </motion.a>
                    </li>
                  ))}
                </ul>

                <div className="relative hidden h-96 lg:block" aria-hidden="true">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={hovered}
                      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="absolute inset-0 flex flex-col justify-center"
                    >
                      <p className="font-display text-[7rem] leading-none font-bold text-line select-none">
                        0{hoveredIndex + 1}
                      </p>
                      {hovered === "about" ? (
                        <img
                          src={profile.photo}
                          alt=""
                          className="mt-6 aspect-4/5 w-52 rounded-card border border-line object-cover grayscale"
                        />
                      ) : (
                        <p className="mt-6 max-w-sm font-display text-lg leading-relaxed text-fog">
                          {previews[hovered]}
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Pie del menú: contacto directo y redes */}
              <motion.div
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + links.length * 0.07, duration: 0.4 }}
                className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-6"
              >
                <a
                  href={`mailto:${profile.email}`}
                  className="font-display text-sm text-fog transition-colors duration-200 hover:text-paper"
                >
                  {profile.email}
                </a>
                <div className="flex items-center gap-3">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fog transition-colors duration-200 hover:border-paper hover:text-paper"
                  >
                    <GithubIcon />
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fog transition-colors duration-200 hover:border-paper hover:text-paper"
                  >
                    <LinkedinIcon />
                  </a>
                  <a
                    href={profile.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fog transition-colors duration-200 hover:border-paper hover:text-paper"
                  >
                    <WhatsappIcon />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
