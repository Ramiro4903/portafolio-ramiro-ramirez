import { Suspense, lazy } from "react";
import { SPLINE_SCENE } from "../../data/profile.js";

// El runtime de Spline pesa ~1 MB: se carga en diferido (lazy) para
// no retrasar el primer render de la página.
const Spline = lazy(() => import("@splinetool/react-spline"));

// Render 3D interactivo de Spline en el hero. Solo se muestra en
// pantallas medianas en adelante (en móvil el 3D cuesta rendimiento
// y compite con el texto). Con SPLINE_SCENE en null no renderiza nada.
export function HeroScene() {
  if (!SPLINE_SCENE) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-y-0 right-0 hidden w-1/2 opacity-90 md:block"
    >
      <Suspense fallback={null}>
        <Spline scene={SPLINE_SCENE} className="h-full w-full" />
      </Suspense>
      {/* Degradado para que el 3D se funda con el fondo y no compita
          con el título del hero */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-transparent to-transparent" />
    </div>
  );
}
