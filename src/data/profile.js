// ─────────────────────────────────────────────────────────────
// Datos centrales del sitio. Para actualizar links, foto o el
// formulario de contacto, edita ÚNICAMENTE este archivo.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Ramiro Ramírez Guzmán",
  shortName: "Ramiro Ramírez",
  email: "ramiro.ramirez.guzman@gmail.com",
  phone: "+52 33 1015 7983",
  github: "https://github.com/Ramiro4903",
  linkedin: "https://www.linkedin.com/in/ramiroramirezguzman/",

  // Ruta de la foto personal (colócala en /public y actualiza aquí).
  // Con null se muestra el placeholder de la sección "Sobre mí".
  photo: null,
};

// ID de Formspree para el formulario de contacto.
// 1. Crea una cuenta gratis en https://formspree.io
// 2. Crea un formulario y copia su ID (p. ej. "mqkvazyw")
// 3. Pégalo aquí. Mientras sea null, el formulario abre el cliente
//    de correo del visitante como alternativa funcional.
export const FORMSPREE_ID = null;

// Links de cada proyecto. null oculta el botón correspondiente.
export const projectLinks = {
  pinatastore: {
    demo: null, // p. ej. "https://pinatastore.com"
    code: null, // p. ej. "https://github.com/Ramiro4903/pinatastore"
  },
  manuelmisael: {
    demo: null,
    code: null,
  },
};
