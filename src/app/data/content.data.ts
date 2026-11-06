import { NavSection, RutaInfo } from './doc.model';

export const SITE = {
  name: 'Ayuda de Angular',
  version: 'Angular 22',
  materialVersion: 'Angular Material 22',
  tagline: 'Guía práctica en español',
  description:
    'De cero a producción con Angular moderno: componentes standalone, signals, control flow, routing, formularios, servicios y Angular Material.',
  repo: 'xenako0012/AyudaDeAngular',
  links: {
    angular: 'https://angular.dev',
    material: 'https://material.angular.dev',
    cli: 'https://angular.dev/tools/cli',
    signals: 'https://angular.dev/guide/signals',
    controlFlow: 'https://angular.dev/guide/templates/control-flow',
    routing: 'https://angular.dev/guide/routing',
    forms: 'https://angular.dev/guide/forms/reactive-forms',
    di: 'https://angular.dev/guide/di',
    components: 'https://angular.dev/guide/components',
    modules: 'https://angular.dev/guide/ngmodules',
  },
} as const;

/** Índice de capítulos usado por el sidebar, la portada y la búsqueda. */
export const NAV_SECTIONS: readonly NavSection[] = [
  {
    title: 'Primeros pasos',
    icon: 'rocket_launch',
    description: 'Instala las herramientas y crea tu primer proyecto.',
    chapters: [
      {
        title: 'Instalación y Angular CLI',
        route: '/instalacion',
        description:
          'Node.js, Angular CLI, ng new, ng serve y el primer comando de generación de componentes.',
        icon: 'download',
        level: 'inicial',
        minutes: 8,
        tags: ['node', 'cli', 'ng new', 'ng serve', 'instalación'],
        summary: [
          'Requisitos de Node.js para Angular 22',
          'Instalar Angular CLI y comprobar la versión',
          'Crear un proyecto con ng new',
          'Ejecutar la aplicación con ng serve',
        ],
      },
      {
        title: 'Estructura de un proyecto',
        route: '/estructura',
        description:
          'Qué contiene un proyecto generado con Angular CLI y cómo se arranca la aplicación.',
        icon: 'account_tree',
        level: 'inicial',
        minutes: 7,
        tags: ['angular.json', 'src', 'main.ts', 'app.config', 'estructura'],
        summary: [
          'Carpetas y archivos que genera el CLI',
          'El componente raíz y app.config.ts',
          'Bootstrap con bootstrapApplication',
        ],
      },
    ],
  },
  {
    title: 'Fundamentos',
    icon: 'school',
    description: 'Componentes, plantillas y estado reactivo con signals.',
    chapters: [
      {
        title: 'Componentes standalone',
        route: '/componentes',
        description:
          'El bloque de construcción de la interfaz: @Component, selector, imports, plantillas y estilos.',
        icon: 'widgets',
        level: 'inicial',
        minutes: 12,
        tags: ['componente', '@Component', 'standalone', 'imports', 'ng generate component'],
        summary: [
          'Anatomía de un componente y sus metadatos',
          'Standalone por defecto desde Angular 19',
          'Importar un componente dentro de otro',
          'Ciclo de vida y generate component',
        ],
      },
      {
        title: 'Binding en plantillas',
        route: '/binding',
        description:
          'Interpolación, property binding, event binding y two-way binding con banco de pruebas interactivo.',
        icon: 'sync_alt',
        level: 'inicial',
        minutes: 14,
        tags: ['binding', 'interpolación', 'property binding', 'event binding', 'ngModel'],
        summary: [
          'Interpolación {{ }} para mostrar datos',
          'Property binding [prop]="valor" y atributos',
          'Event binding (click)="metodo()"',
          'Two-way binding con ngModel y FormsModule',
        ],
      },
      {
        title: 'Signals y reactividad',
        route: '/signals',
        description:
          'signal(), set(), update(), computed() y effect() con un contador interactivo real.',
        icon: 'bolt',
        level: 'intermedio',
        minutes: 15,
        tags: ['signals', 'signal', 'computed', 'effect', 'reactividad', 'zoneless'],
        summary: [
          'Qué es un signal y por qué es reactivo',
          'Leer, asignar y actualizar valores',
          'Valores derivados con computed()',
          'Efectos secundarios con effect()',
        ],
      },
      {
        title: 'Control flow: @if y @for',
        route: '/control-flow',
        description:
          'Nueva sintaxis de plantillas: @if, @else, @for con track, @empty y @switch frente a *ngIf y *ngFor.',
        icon: 'alt_route',
        level: 'inicial',
        minutes: 13,
        tags: ['@if', '@for', '@switch', '@empty', 'track', 'ngIf', 'ngFor'],
        summary: [
          'Renderizado condicional con @if / @else',
          '@for con track obligatorio y bloque @empty',
          'Novedades de Angular 22: @switch y variables de bloque',
          'Comparativa con las directivas estructurales antiguas',
        ],
      },
    ],
  },
  {
    title: 'Aplicaciones completas',
    icon: 'travel_explore',
    description: 'Navegación, formularios, servicios y organización del código.',
    chapters: [
      {
        title: 'Routing y navegación',
        route: '/routing',
        description:
          'Rutas, RouterOutlet, RouterLink, rutas con parámetros, lazy loading y guards funcionales.',
        icon: 'route',
        level: 'intermedio',
        minutes: 18,
        tags: ['router', 'routes', 'RouterOutlet', 'RouterLink', 'lazy loading', 'guards'],
        summary: [
          'Definir rutas en app.routes.ts',
          'RouterOutlet, RouterLink y routerLinkActive',
          'Parámetros de ruta y ActivatedRoute',
          'Lazy loading con loadComponent y guards funcionales',
        ],
      },
      {
        title: 'Comunicación entre componentes',
        route: '/comunicacion',
        description:
          'input() y output() modernos frente a @Input() y @Output(), con un playground padre-hijo.',
        icon: 'swap_horiz',
        level: 'intermedio',
        minutes: 12,
        tags: ['input', 'output', 'model', '@Input', '@Output', 'EventEmitter'],
        summary: [
          'Padre → hijo con input() e input.required()',
          'Hijo → padre con output()',
          'model() para two-way binding personalizado',
          'La API clásica @Input() / @Output() y cuándo encontrarla',
        ],
      },
      {
        title: 'Servicios e inyección de dependencias',
        route: '/servicios',
        description:
          '@Injectable, inject() frente al constructor, providedIn: "root" y ámbitos de los servicios.',
        icon: 'extension',
        level: 'intermedio',
        minutes: 12,
        tags: ['servicios', 'inject', 'Injectable', 'providedIn', 'DI', 'dependencias'],
        summary: [
          'Crear un servicio con ng g s',
          'Inyectar con inject() o por constructor',
          'Servicios globales con providedIn: root',
          'Limitar el ámbito en providers de un componente',
        ],
      },
      {
        title: 'Formularios reactivos',
        route: '/formularios',
        description:
          'FormControl, FormGroup, validaciones y FormBuilder con un formulario validado en vivo.',
        icon: 'edit_note',
        level: 'intermedio',
        minutes: 16,
        tags: ['formularios', 'reactive forms', 'FormGroup', 'Validators', 'FormBuilder'],
        summary: [
          'ReactiveFormsModule en componentes standalone',
          'FormControl, FormGroup y formControlName',
          'Validadores: required, email, minLength, pattern',
          'FormBuilder y estado del formulario en la plantilla',
        ],
      },
      {
        title: 'Módulos (NgModule)',
        route: '/modulos',
        description:
          'Cómo funcionan los NgModule, su relación con los componentes standalone y cómo migrar.',
        icon: 'inventory_2',
        level: 'intermedio',
        minutes: 10,
        tags: ['NgModule', 'declarations', 'imports', 'AppModule', 'standalone'],
        summary: [
          'Qué es un módulo y cuándo sigue apareciendo',
          'declarations, imports, exports y providers',
          'El equivalente moderno con componentes standalone',
        ],
      },
    ],
  },
  {
    title: 'Angular Material',
    icon: 'palette',
    description: 'La librería oficial de componentes con Material Design 3.',
    chapters: [
      {
        title: 'Angular Material: guía y catálogo',
        route: '/material',
        description:
          'Instalación, tema M3 con mat.theme, catálogo filtrable de componentes y ejemplos en vivo.',
        icon: 'auto_awesome',
        level: 'intermedio',
        minutes: 20,
        tags: ['angular material', 'mat.theme', 'matButton', 'mat-card', 'M3', 'catálogo'],
        summary: [
          'ng add @angular/material y configuración del tema',
          'Tematización M3 con mat.theme y tokens --mat-sys-*',
          'Catálogo completo de componentes con buscador',
          'Ejemplos funcionales: botones, cards, tabs, chips, stepper…',
        ],
      },
    ],
  },
  {
    title: 'Recursos',
    icon: 'library_books',
    description: 'Referencias rápidas y preguntas habituales.',
    chapters: [
      {
        title: 'Cheatsheet de CLI',
        route: '/recursos',
        description:
          'Los comandos de Angular CLI que más se usan, con copia al portapapeles y buscador.',
        icon: 'terminal',
        level: 'inicial',
        minutes: 5,
        tags: ['cheatsheet', 'comandos', 'ng generate', 'ng build', 'cli'],
        summary: [
          'Generar componentes, servicios, guards y pipes',
          'Comandos de build, test y lint',
          'Opciones habituales de ng serve',
        ],
      },
    ],
  },
];

/** Aplanado de todos los capítulos (para buscador, progreso y navegación). */
export const ALL_CHAPTERS = NAV_SECTIONS.flatMap((section) =>
  section.chapters.map((chapter) => ({ ...chapter, section: section.title })),
);

export const TOTAL_CHAPTERS = ALL_CHAPTERS.length;

/** Ejemplo didáctico de tabla de rutas. */
export const RUTAS_EJEMPLO: readonly RutaInfo[] = [
  {
    path: '',
    title: 'Inicio',
    icon: 'home',
    description: 'Ruta por defecto: se muestra al abrir la aplicación.',
  },
  {
    path: 'usuario/:id',
    title: 'Usuario',
    icon: 'person',
    description: 'Ruta con parámetro dinámico leído con ActivatedRoute o input().',
  },
  {
    path: 'privado',
    title: 'Privado',
    icon: 'lock',
    description: 'Ruta protegida con un guard funcional canActivate.',
  },
  {
    path: 'usuarios',
    title: 'Usuarios',
    icon: 'group',
    description: 'Ruta cargada bajo demanda con loadComponent (lazy loading).',
  },
  {
    path: '**',
    title: '404',
    icon: 'report',
    description: 'Ruta comodín: cualquier URL no reconocida.',
  },
];

export const PREGUNTAS_FRECUENTES = [
  {
    question: '¿Necesito crear un NgModule en un proyecto nuevo?',
    answer:
      'No. Desde Angular 19 los componentes son standalone por defecto y una aplicación se arranca con bootstrapApplication. Los NgModule siguen soportados y aparecerán en proyectos antiguos o en librerías que no se han migrado.',
  },
  {
    question: '¿Debo usar *ngIf o @if?',
    answer:
      '@if es la sintaxis recomendada desde Angular 17: está integrada en el compilador de plantillas, no requiere importar CommonModule y ofrece mejor tipado y rendimiento. *ngIf sigue funcionando para no romper código existente.',
  },
  {
    question: '¿Los signals sustituyen a RxJS?',
    answer:
      'Son complementarios. Los signals modelan estado síncrono que la plantilla consume; RxJS sigue siendo la herramienta para flujos asíncronos y eventos complejos. Puedes convertir uno en otro con toSignal() y toObservable().',
  },
  {
    question: '¿Por qué mi proyecto no necesita zone.js?',
    answer:
      'Los proyectos generados con el CLI de Angular 22 usan detección de cambios sin zonas: la aplicación se actualiza cuando cambian los signals, los eventos de plantilla o los cambios asíncronos notificados. Es más eficiente y facilita el renderizado en servidor.',
  },
  {
    question: '¿Cómo sé qué versión de Angular estoy usando?',
    answer:
      'Ejecuta ng version en la terminal o revisa la sección dependencies de package.json. En esta misma web, la portada muestra la versión real de @angular/core instalada en el proyecto.',
  },
  {
    question: '¿Angular Material requiere Angular Animations?',
    answer:
      'No en Angular moderno. BrowserAnimationsModule está en desuso y la librería está migrando a animaciones nativas con CSS y las APIs animate.enter / animate.leave. Solo necesitas importar los módulos de Material que uses.',
  },
] as const;
