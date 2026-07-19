// Lista de tecnologías al estilo de la referencia: "PHP / MySQL / CSS"
export function TechList({ items, className = "" }) {
  return (
    <p className={`font-display text-sm leading-relaxed text-fog ${className}`}>
      {items.map((item, i) => (
        <span key={item}>
          <span className="text-paper">{item}</span>
          {i < items.length - 1 && <span aria-hidden="true"> / </span>}
        </span>
      ))}
    </p>
  );
}
