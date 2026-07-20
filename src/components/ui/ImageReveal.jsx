import { motion, useReducedMotion } from "motion/react";

// Revelado de imagen tipo cortina: el contenido aparece de arriba
// hacia abajo con un ligero zoom-out al entrar en el viewport.
export function ImageReveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="h-full w-full"
        initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)", scale: 1.08 }}
        whileInView={{ clipPath: "inset(0 0 0% 0)", scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay, ease: [0.65, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
