import { createContext, useContext, useEffect, useState } from "react";
import es from "./es.json";
import en from "./en.json";

const dictionaries = { es, en };
const STORAGE_KEY = "ramiro-portfolio-lang";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "en" || stored === "es" ? stored : "es";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // Resolves dot-paths ("hero.title") against the active dictionary.
  // Returns strings, arrays or objects as stored, so sections can map over lists.
  const t = (path) => {
    const value = path
      .split(".")
      .reduce((node, key) => (node == null ? undefined : node[key]), dictionaries[lang]);
    if (value === undefined) {
      console.warn(`[i18n] Missing key "${path}" for "${lang}"`);
      return path;
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
