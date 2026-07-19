import { useState } from "react";
import { useLang } from "../../i18n/LanguageContext.jsx";
import { profile } from "../../data/profile.js";

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = t("nav.links");
  const [firstName, ...rest] = profile.shortName.split(" ");

  const toggleLang = () => setLang(lang === "es" ? "en" : "es");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-ink/80 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:text-ink"
      >
        {t("nav.skipLink")}
      </a>

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="font-display text-sm leading-tight text-paper">
          {firstName}
          <br />
          {rest.join(" ")}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="text-sm text-fog transition-colors duration-200 hover:text-paper"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
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
            className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full border border-line transition-colors duration-200 hover:border-paper md:hidden"
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

      {menuOpen && (
        <ul className="border-t border-line/60 bg-ink px-5 py-4 md:hidden">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className="block py-3 font-display text-lg text-paper transition-colors duration-200 hover:text-fog"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
