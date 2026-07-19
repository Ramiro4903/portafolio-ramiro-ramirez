# Portafolio — Ramiro Ramírez Guzmán

Portafolio web personal: bilingüe (ES/EN), tema oscuro, responsive y accesible.
Construido con **React 19 + Vite + Tailwind CSS v4 + Motion (Framer Motion)**.

## Cómo ejecutarlo

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:5173
npm run build    # build de producción en /dist
npm run preview  # sirve el build de producción localmente
```

## Estructura del proyecto

```
├── index.html                  # Meta tags SEO, Open Graph y JSON-LD
├── public/                     # favicon y archivos estáticos (foto, CV, og-image)
└── src/
    ├── main.jsx                # Entrada: fuentes, estilos y providers
    ├── App.jsx                 # Composición de secciones
    ├── index.css               # Design tokens (colores, tipografías) con Tailwind v4
    ├── i18n/
    │   ├── LanguageContext.jsx # Contexto de idioma + hook useLang()
    │   ├── es.json / en.json   # TODO el texto del sitio (mismo esquema en ambos)
    ├── data/
    │   ├── profile.js          # ★ Datos personales, links de proyectos, Formspree
    │   ├── projects.js         # Tecnologías por proyecto
    │   └── skills.js           # Categorías de habilidades
    └── components/
        ├── ui/                 # Reveal, Pill, SectionLabel, TechList, Icons
        ├── layout/             # Navbar (toggle ES/EN, menú móvil), Footer
        └── sections/           # Hero, Projects, About, Skills, Journey, Languages, Contact
```

## Personalización rápida (todo en `src/data/profile.js`)

### 1. Activar el formulario de contacto (Formspree)

Mientras no haya ID configurado, el formulario abre el cliente de correo del
visitante con el mensaje ya redactado (sigue siendo funcional).

1. Crea una cuenta gratis en [formspree.io](https://formspree.io)
2. Crea un formulario y copia su ID (p. ej. `mqkvazyw`)
3. En `src/data/profile.js`: `export const FORMSPREE_ID = "mqkvazyw";`

### 2. Agregar tu foto

1. Coloca tu foto en `public/` (p. ej. `public/ramiro.jpg`)
2. En `src/data/profile.js`: `photo: "/ramiro.jpg"`

El placeholder desaparece automáticamente.

### 3. Links de demo y código de los proyectos

En `src/data/profile.js`, rellena `projectLinks`:

```js
export const projectLinks = {
  pinatastore: {
    demo: "https://tu-demo.com",
    code: "https://github.com/Ramiro4903/pinatastore",
  },
  ...
};
```

Los botones "Ver demo" / "Ver código" aparecen solo cuando el link existe.

### 4. Actualizar el CV

Los PDFs viven en `public/` (`CV-Ramiro-Ramirez-ES.pdf` y `CV-Ramiro-Ramirez-EN.pdf`).
El botón "Ver CV" abre automáticamente la versión del idioma activo; para
actualizar tu CV solo reemplaza el PDF correspondiente (mismo nombre de archivo).

### 5. Editar textos

Todo el contenido vive en `src/i18n/es.json` y `src/i18n/en.json` (mismo
esquema). Edita ambos para mantener la paridad de idiomas.

## Deploy

### Vercel (recomendado)

1. Sube el repo a GitHub
2. En [vercel.com](https://vercel.com) → *Add New Project* → importa el repo
3. Vercel detecta Vite automáticamente; no necesitas configurar nada

### GitHub Pages

1. Instala el plugin: `npm i -D gh-pages`
2. En `vite.config.js` agrega `base: "/<nombre-del-repo>/"`
3. En `package.json` agrega el script `"deploy": "npm run build && gh-pages -d dist"`
4. `npm run deploy`

## Mejoras futuras

- [ ] Foto real y links de demo/código (ver arriba)
- [ ] Imagen Open Graph (`public/og-image.png`, 1200×630) para compartir en redes
- [ ] Sección de blog/artículos cuando haya contenido
- [ ] Analytics ligero (Vercel Analytics o Plausible)
- [ ] Dominio propio
