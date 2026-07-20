import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLang } from "../../i18n/LanguageContext.jsx";
import { profile } from "../../data/profile.js";

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
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#top"
            onClick={() => setMenuOpen(false)}
            className="font-display text-sm leading-tight text-paper"
          >
            {firstName}
            <br />
            {rest.join(" ")}
          </a>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLang}
              aria-label={t("nav.langToggle")}
              className="cursor-pointer font-display text-xs leading-snug transition-colors duration-200"
            >
              <span className={lang === "es" ? "text-paper" : "text-fog hover:text-paper"}>Es</span>
              <br />
              <span className={lang === "en" ? "text-paper" : "text-fog hover:text-paper"}>En</span>
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full border border-line transition-colors duration-200 hover:border-paper"
            >
              <span
                className={`h-px w-4 bg-paper transition-transform duration-200 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-4 bg-paper transition-transform duration-200 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
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
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink"
          >
            <div className="mx-auto grid min-h-full max-w-6xl items-center gap-10 px-5 pt-24 pb-10 sm:px-8 lg:grid-cols-[1fr_0.8fr]">
              <ul>
                {links.map((link, i) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setMenuOpen(false)}
                      onMouseEnter={() => setHovered(link.id)}
                      onFocus={() => setHovered(link.id)}
                      className="group flex items-baseline gap-5 py-3 sm:py-4"
                    >
                      <span className="font-display text-xs text-fog" aria-hidden="true">
                        0{i + 1}
                      </span>
                      <span className="font-display text-4xl font-bold text-fog transition-colors duration-200 group-hover:text-paper group-focus-visible:text-paper sm:text-6xl">
                        {link.label}
                      </span>
                    </a>
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
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
