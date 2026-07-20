import { marqueeItems } from "../../data/skills.js";

function MarqueeRow({ hidden = false }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marqueeItems.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 font-display text-sm tracking-[0.25em] text-fog uppercase sm:px-8">
            {item}
          </span>
          <span className="font-display text-line" aria-hidden="true">
            /
          </span>
        </li>
      ))}
    </ul>
  );
}

// Banda horizontal infinita de tecnologías, inspirada en la banda de
// servicios de la referencia. Dos copias del contenido y una animación
// que recorre el 50%: cuando termina, el loop es imperceptible.
// Se pausa al pasar el cursor; con prefers-reduced-motion queda estática.
export function Marquee() {
  return (
    <div className="group overflow-hidden border-y border-line/60 py-5">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <MarqueeRow />
        <MarqueeRow hidden />
      </div>
    </div>
  );
}
