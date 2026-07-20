import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLang } from "../../i18n/LanguageContext.jsx";

// Se muestra una sola vez por sesión (misma pestaña). Al cerrar y
// reabrir el sitio vuelve a aparecer para un visitante nuevo.
const SESSION_KEY = "ramiro-portfolio-intro-seen";
const TYPE_SPEED = 11; // ms por carácter

// Pantalla de entrada: una ventana de terminal que teclea un comando y
// su salida, luego una cortina sube para revelar el sitio.
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
    "ramiro@portfolio:~$ npm run start",
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
      const hold = setTimeout(() => setDone(true), 450);
      return () => clearTimeout(hold);
    }

    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(timer);
        setTimeout(() => setDone(true), 240);
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
          initial={{ y: 0 }}
          animate={done ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => done && finish()}
        >
          {/* Ventana de terminal */}
          <div className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface">
            {/* Barra de título con los puntos y la ruta */}
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 rounded-full border border-fog/50" />
                <span className="h-3 w-3 rounded-full border border-fog/50" />
                <span className="h-3 w-3 rounded-full border border-fog/50" />
              </div>
              <p className="font-display text-xs text-fog">ramiro@portfolio — zsh</p>
            </div>

            {/* Cuerpo de la terminal */}
            <pre className="px-5 py-5 font-display text-xs leading-relaxed text-fog sm:text-sm">
              {typed}
              <span
                className="ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 animate-blink bg-paper align-middle sm:h-4"
                aria-hidden="true"
              />
            </pre>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
