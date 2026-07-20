import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLang } from "../../i18n/LanguageContext.jsx";

// Se muestra una sola vez por sesión (misma pestaña). Al cerrar y
// reabrir el sitio vuelve a aparecer para un visitante nuevo.
const SESSION_KEY = "ramiro-portfolio-intro-seen";
const TYPE_SPEED = 26; // ms por carácter

// Pantalla de entrada estilo terminal: escribe unas líneas de consola
// y luego una cortina sube para revelar el sitio.
export function Preloader() {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();

  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem(SESSION_KEY);
  });
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  const lines = [
    `> ${t("loader.line1")}`,
    `> ${t("loader.line2")}...`,
    `✓ ${t("loader.line3")}`,
  ];
  const fullText = lines.join("\n");

  // Bloquea el scroll mientras la intro está visible
  useEffect(() => {
    if (!show) return undefined;
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  // Efecto de tecleo (o revelado instantáneo si se prefiere menos movimiento)
  useEffect(() => {
    if (!show) return undefined;

    if (reduceMotion) {
      setTyped(fullText);
      const hold = setTimeout(() => setDone(true), 650);
      return () => clearTimeout(hold);
    }

    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(timer);
        setTimeout(() => setDone(true), 420);
      }
    }, TYPE_SPEED);
    return () => clearInterval(timer);
  }, [show, fullText, reduceMotion]);

  const finish = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink px-6"
          initial={{ opacity: 1 }}
          animate={done ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => done && finish()}
        >
          {/* Círculo decorativo, mismo lenguaje que el hero */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full border border-line/40"
          />

          <pre className="font-display text-sm leading-loose text-fog sm:text-base">
            {typed}
            <span className="animate-blink text-paper" aria-hidden="true">
              _
            </span>
          </pre>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
