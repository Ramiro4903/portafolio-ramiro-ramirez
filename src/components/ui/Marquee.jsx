import {
  siReact,
  siNodedotjs,
  siJavascript,
  siPython,
  siPhp,
  siMysql,
  siPostgresql,
  siMongodb,
  siDocker,
  siGit,
  siLinux,
  siCplusplus,
  siHtml5,
  siCss,
} from "simple-icons";

// Tecnologías de la banda: logo oficial (simple-icons) + nombre.
const items = [
  { icon: siReact, label: "React" },
  { icon: siNodedotjs, label: "Node.js" },
  { icon: siJavascript, label: "JavaScript" },
  { icon: siPython, label: "Python" },
  { icon: siPhp, label: "PHP" },
  { icon: siMysql, label: "MySQL" },
  { icon: siPostgresql, label: "PostgreSQL" },
  { icon: siMongodb, label: "MongoDB" },
  { icon: siDocker, label: "Docker" },
  { icon: siGit, label: "Git" },
  { icon: siLinux, label: "Linux" },
  { icon: siCplusplus, label: "C++" },
  { icon: siHtml5, label: "HTML5" },
  { icon: siCss, label: "CSS" },
];

function TechIcon({ icon }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

function MarqueeRow({ hidden = false }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-center gap-3 px-7 text-fog transition-colors duration-200 hover:text-paper sm:px-9"
        >
          <TechIcon icon={item.icon} />
          <span className="font-display text-sm tracking-[0.2em] uppercase">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

// Banda horizontal infinita de tecnologías. Dos copias del contenido y
// una animación que recorre el 50%: cuando termina, el loop es
// imperceptible. Se pausa al pasar el cursor; con prefers-reduced-motion
// queda estática.
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
