import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// Se muestra una sola vez por sesión (misma pestaña). Al cerrar y
// reabrir el sitio vuelve a aparecer para un visitante nuevo.
const SESSION_KEY = "ramiro-portfolio-intro-seen";
const INITIALS = "rr"; // mismas iniciales del avatar y el favicon
const TYPE_SPEED = 190; // ms por letra

// Pantalla de entrada: las iniciales "rr_" se escriben en el centro con
// el cursor parpadeante y luego el fondo se desvanece revelando el sitio.
export function Preloader() {
  const reduceMotion = useReducedMotion();

  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem(SESSION_KEY);
  });
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  // Bloquea el scroll mientras la intro está visible
  useEffect(() => {
    if (!show) return undefined;
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  // Escribe las iniciales letra por letra (o al instante si se prefiere
  // menos movimiento), luego marca el fin para desvanecer.
  useEffect(() => {
    if (!show) return undefined;

    if (reduceMotion) {
      setTyped(INITIALS);
      const hold = setTimeout(() => setDone(true), 750);
      return () => clearTimeout(hold);
    }

    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setTyped(INITIALS.slice(0, i));
      if (i >= INITIALS.length) {
        clearInterval(timer);
        setTimeout(() => setDone(true), 700);
      }
    }, TYPE_SPEED);
    return () => clearInterval(timer);
  }, [show, reduceMotion]);

  const finish = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          animate={{ opacity: done ? 0 : 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onAnimationComplete={() => done && finish()}
        >
          <motion.div
            className="flex items-end font-display text-8xl leading-none font-bold text-paper sm:text-9xl"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: done && !reduceMotion ? 1.12 : 1,
            }}
            transition={{ duration: done ? 0.6 : 0.4, ease: "easeOut" }}
          >
            <span>{typed}</span>
            <span className="animate-blink" aria-hidden="true">
              _
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
