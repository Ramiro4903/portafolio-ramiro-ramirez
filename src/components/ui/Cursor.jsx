import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

// Cursor personalizado: un punto que sigue al puntero de inmediato y
// un aro con retardo suave. Sobre elementos interactivos el aro crece
// y se rellena; con mix-blend-difference invierte lo que hay debajo,
// en línea con el lenguaje de inversión blanco/negro del sitio.
// Solo se activa con puntero de precisión (mouse) y respeta
// prefers-reduced-motion; en táctil no se renderiza.
export function Cursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 400, damping: 40, mass: 0.8 });
  const ringY = useSpring(y, { stiffness: 400, damping: 40, mass: 0.8 });

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return undefined;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const handleMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const handleOver = (event) => {
      setActive(Boolean(event.target.closest("a, button, input, textarea, select, label")));
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerover", handleOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [reduceMotion, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed top-0 left-0 z-[100] -ml-1 -mt-1 h-2 w-2 rounded-full bg-pure mix-blend-difference"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: active ? 1.8 : 1,
        }}
        transition={{ opacity: { duration: 0.15 }, scale: { type: "spring", stiffness: 350, damping: 25 } }}
        className={`pointer-events-none fixed top-0 left-0 z-[100] -ml-[18px] -mt-[18px] h-9 w-9 rounded-full mix-blend-difference transition-colors duration-200 ${
          active ? "bg-pure" : "border border-pure/70"
        }`}
      />
    </>
  );
}
