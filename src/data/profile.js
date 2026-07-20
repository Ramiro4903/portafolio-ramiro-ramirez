// ─────────────────────────────────────────────────────────────
// Datos centrales del sitio. Para actualizar links, foto o el
// formulario de contacto, edita ÚNICAMENTE este archivo.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Ramiro Ramírez Guzmán",
  shortName: "Ramiro Ramírez",
  email: "ramiro.ramirez.guzman@gmail.com",
  phone: "+52 33 1015 7983",
  // Enlace a WhatsApp: wa.me + código de país (52) y número sin espacios.
  whatsapp: "https://wa.me/523310157983",
  github: "https://github.com/Ramiro4903",
  linkedin: "https://www.linkedin.com/in/ramiroramirezguzman/",

  // Foto de la sección "Sobre mí" (vive en /public).
  // photoHover (opcional) aparece con un cross-fade al pasar el
  // cursor; en null el efecto queda desactivado.
  // Con photo en null se muestra el placeholder tipográfico.
  photo: "/ramiro-1.jpg",
  photoHover: null,

  // CVs en PDF (viven en /public). El botón "Ver CV" abre la versión
  // del idioma activo en otra pestaña, desde donde se puede descargar.
  cv: {
    es: "/CV-Ramiro-Ramirez-ES.pdf",
    en: "/CV-Ramiro-Ramirez-EN.pdf",
  },
};

// Escena 3D de Spline que se muestra en el hero (lado derecho).
// En spline.design: Export → Code → copia la URL que termina en
// ".splinecode" y pégala aquí. Con null el hero se muestra sin 3D.
// Ejemplo: "https://prod.spline.design/AbC123xyz/scene.splinecode"
export const SPLINE_SCENE = "https://prod.spline.design/STbKL1nBtOH21O9h/scene.splinecode";

// ID de Formspree para el formulario de contacto.
// 1. Crea una cuenta gratis en https://formspree.io
// 2. Crea un formulario y copia su ID (p. ej. "mqkvazyw")
// 3. Pégalo aquí. Mientras sea null, el formulario abre el cliente
//    de correo del visitante como alternativa funcional.
export const FORMSPREE_ID = "xwvgbjrp";

// Links de cada proyecto. null oculta el botón correspondiente.
export const projectLinks = {
  pinatastore: {
    demo: null, // p. ej. "https://pinatastore.com"
    code: null, // p. ej. "https://github.com/Ramiro4903/pinatastore"
  },
  modular: {
    demo: null,
    code: null,
  },
  manuelmisael: {
    demo: null,
    code: null,
  },
};
