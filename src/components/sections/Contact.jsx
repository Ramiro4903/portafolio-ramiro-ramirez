import { useState } from "react";
import { useLang } from "../../i18n/LanguageContext.jsx";
import { profile, FORMSPREE_ID } from "../../data/profile.js";
import { Reveal } from "../ui/Reveal.jsx";
import { SectionLabel } from "../ui/SectionLabel.jsx";
import { Pill } from "../ui/Pill.jsx";
import { GithubIcon, LinkedinIcon, MailIcon, FileIcon } from "../ui/Icons.jsx";

const inputClasses =
  "w-full rounded-2xl border border-line bg-surface px-5 py-3.5 text-sm text-paper placeholder:text-fog/60 transition-colors duration-200 focus:border-paper focus:outline-none";

export function Contact() {
  const { lang, t } = useLang();
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const form = t("contact.form");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    // Sin ID de Formspree configurado, el formulario abre el cliente
    // de correo del visitante con el mensaje ya redactado.
    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(`Portafolio — mensaje de ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error(`Formspree respondió ${response.status}`);
      setStatus("success");
      event.target.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel>{t("contact.label")}</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold sm:text-6xl">
            {t("contact.title")}
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-fog">{t("contact.subtitle")}</p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <Reveal delay={0.08}>
            <p className="font-display text-xs tracking-widest text-fog uppercase">
              {t("contact.directLabel")}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 block font-display text-lg break-all text-paper underline decoration-line underline-offset-8 transition-colors duration-200 hover:decoration-paper sm:text-xl"
            >
              {profile.email}
            </a>

            <div className="mt-8 flex flex-wrap gap-3">
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
              <Pill href={profile.cv[lang]} target="_blank" rel="noopener noreferrer" className="text-xs">
                <FileIcon />
                {t("common.cv")}
              </Pill>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block font-display text-xs text-fog">
                    {form.name}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={form.namePlaceholder}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block font-display text-xs text-fog">
                    {form.email}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={form.emailPlaceholder}
                    className={inputClasses}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-2 block font-display text-xs text-fog">
                  {form.message}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows="5"
                  placeholder={form.messagePlaceholder}
                  className={`${inputClasses} resize-y`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Pill type="submit" variant="solid" className="px-7" disabled={status === "sending"}>
                  {status === "sending" ? form.sending : form.submit}
                </Pill>
                <p role="status" aria-live="polite" className="font-display text-xs">
                  {status === "success" && <span className="text-paper">{form.success}</span>}
                  {status === "error" && <span className="text-fog">{form.error}</span>}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
