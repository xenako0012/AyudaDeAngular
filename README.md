# Ayuda de Angular

Web de documentación en español sobre **Angular 22** y **Angular Material 22**. No es solo
texto: cada capítulo incluye demostraciones funcionales (contadores con signals, formularios
validados en vivo, catálogo filtrable de componentes Material, navegación real con el router…)
construidas con las APIs modernas del framework.

> Contenido basado en los apuntes del curso y contrastado con la documentación oficial:
> [angular.dev](https://angular.dev) y [material.angular.dev](https://material.angular.dev).

---

## Contenido

| Bloque | Capítulos |
| --- | --- |
| **Primeros pasos** | Instalación y Angular CLI · Estructura de un proyecto |
| **Fundamentos** | Componentes standalone · Binding en plantillas · Signals y reactividad · Control flow (`@if`, `@for`, `@switch`) |
| **Aplicaciones completas** | Routing y navegación · Comunicación entre componentes · Servicios e inyección de dependencias · Formularios reactivos · Módulos (NgModule) |
| **Angular Material** | Guía de instalación, tematización M3 y catálogo de 37 componentes con ejemplos en vivo |
| **Recursos** | Cheatsheet de Angular CLI con copia al portapapeles y enlaces oficiales |

Además: portada con ruta de aprendizaje, buscador global (`Ctrl`/`⌘` + `K`), seguimiento de
progreso guardado en `localStorage`, tema claro/oscuro y diseño responsive.

## Stack

- **Angular 22.2** — standalone components, signals, **zoneless** (`provideZonelessChangeDetection`)
- **Angular Material 22** — Material Design 3, tematización con `mat.theme` y tokens `--mat-sys-*`
- **SCSS** con estilos encapsulados por componente
- **highlight.js** — resaltado de sintaxis con solo los lenguajes necesarios
- **Fuentes auto-hospedadas** (Roboto Variable, JetBrains Mono, Material Icons): cero peticiones
  externas en tiempo de ejecución

## Puesta en marcha

Requiere **Node.js ≥ 22.22.3** (o 24.15+ / 26+).

```bash
npm install
npm start          # ng serve → http://localhost:4200/
```

Otros comandos:

```bash
npm run build      # build de producción en dist/
npx ng serve --open --port 4500
```

## Estructura del código

```
src/app/
├── core/                  # Servicios globales: tema, resaltado de código, progreso
├── data/                  # Contenido estructurado: capítulos, rutas, catálogo Material, FAQ
├── layout/                # Shell: cabecera con buscador y sidebar con progreso
├── shared/                # CodeBlock, Callout, SectionHeader, ChapterNav
└── pages/                 # Un componente por capítulo, todos con lazy loading
```

### Detalles de implementación

- **Rutas con lazy loading**: cada capítulo se carga con `loadComponent`, así el bundle inicial
  pesa ~113 kB (dev) y cada capítulo es un chunk independiente.
- **Parámetro de ruta real**: `/usuarios/:id` demuestra `withComponentInputBinding()` enlazando
  `:id` a un `input.required()`.
- **Comunicación padre-hijo**: el capítulo de comunicación usa un componente hijo de verdad con
  `input()`, `output()` y `model()`.
- **Tema Material 3**: `mat.theme(...)` genera los tokens; el modo oscuro solo cambia
  `color-scheme`, sin recompilar.
- **Resaltado seguro**: el HTML de highlight.js se escapa y proviene de cadenas literales del
  código, nunca de entrada del usuario.

## Licencia

Contenido educativo de libre uso. Angular y Angular Material son marcas de Google LLC; este
proyecto no está afiliado al equipo de Angular.
