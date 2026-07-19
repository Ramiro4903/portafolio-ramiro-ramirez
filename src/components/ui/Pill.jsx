const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display text-sm transition-colors duration-200 cursor-pointer";

const variants = {
  outline: "border border-line text-paper hover:bg-paper hover:text-ink hover:border-paper",
  solid: "bg-paper text-ink hover:bg-pure",
  ghost: "text-fog hover:text-paper",
};

// Pill reutilizable: renderiza <a> si recibe href, <button> si no.
export function Pill({ href, variant = "outline", className = "", children, ...rest }) {
  const classes = `${base} ${variants[variant]} px-5 py-2.5 ${className}`;

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
