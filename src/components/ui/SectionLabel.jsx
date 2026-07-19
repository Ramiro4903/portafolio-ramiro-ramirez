// Etiqueta de sección estilo código: "... /sobre-mi ..."
export function SectionLabel({ children, className = "" }) {
  return (
    <p className={`font-display text-sm tracking-widest text-fog ${className}`}>
      {children}
    </p>
  );
}
