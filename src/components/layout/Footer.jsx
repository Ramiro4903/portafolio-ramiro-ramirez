import { useLang } from "../../i18n/LanguageContext.jsx";
import { profile } from "../../data/profile.js";
import { GithubIcon, LinkedinIcon, MailIcon } from "../ui/Icons.jsx";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-line/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <p className="font-display text-xs text-fog">
          © {new Date().getFullYear()} · {t("footer.credit")}
        </p>

        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-fog transition-colors duration-200 hover:text-paper"
          >
            <GithubIcon />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-fog transition-colors duration-200 hover:text-paper"
          >
            <LinkedinIcon />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-fog transition-colors duration-200 hover:text-paper"
          >
            <MailIcon />
          </a>
          <a
            href="#top"
            className="ml-2 font-display text-xs text-fog transition-colors duration-200 hover:text-paper"
          >
            {t("footer.backToTop")} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
