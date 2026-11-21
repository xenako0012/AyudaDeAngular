import { ExamenOficial } from './ejercicios.model';

/**
 * Examen oficial de Angular (DAM2).
 *
 * Contiene el enunciado literal, la transcripción de cada ejercicio con su
 * puntuación y una solución completa que cubre todos los puntos de la rúbrica:
 * menú con routerLink, saludo con visitas persistidas, cronómetro con
 * play/pausa/reset, lapsos como componente hijo con `input()`, formato
 * h:mm:ss y navegación con `mat-toolbar`.
 */
export const EXAMEN_DAM2: ExamenOficial = {
  id: 'examen-dam2',
  titulo: 'Examen DAM2 · Angular',
  subtitulo: 'Cronómetro + Saludo',
  asignatura: 'Desarrollo de Aplicaciones Multiplataforma (DAM2)',
  duracion: '1 h 40 min',
  puntos: 10,
  icon: 'assignment_turned_in',
  resumen:
    'Aplicación con menú principal, ruta de saludo con historial de visitas, cronómetro con play, pausa y registro de lapsos mediante componente hijo, y navegación con mat-toolbar.',
  enunciadoGeneral: [
    'Crea una aplicación en Angular que muestre un menú principal con las opciones: 1. Cronómetro · 2. Saludo.',
    'Al pulsar sobre «Saludo» se accede a una nueva ruta que muestra una pantalla en la que aparece una alerta que dice «Hola, ¿qué tal estás?» si es la primera vez que entras, o «bienvenido de vuelta» si ya has entrado más veces. Incluye un botón «Volver» que lleve de nuevo al menú de inicio.',
    'Al pulsar sobre «Cronómetro» se accede a otra ruta. El acceso a las rutas se tiene que hacer con routerLink.',
  ],
  ejercicios: [
    {
      numero: 1,
      titulo: 'Menú principal con rutas y pantalla de saludo',
      puntos: 2,
      enunciado:
        'Crea una aplicación Angular que muestre un menú principal con las opciones «Cronómetro» y «Saludo». Al pulsar «Saludo» se accede a una nueva ruta con una alerta que diga «Hola, ¿qué tal estás?» la primera vez, o «bienvenido de vuelta» si ya has entrado más veces, y un botón «Volver» que lleve al menú de inicio. La navegación se hace con routerLink.',
      queSePide: [
        'Menú principal visible con las dos opciones (0,5 pt).',
        'Navegación con routerLink a las dos pantallas (0,5 pt).',
        'Pantalla de saludo con alerta condicional y botón «Volver» (1 pt).',
      ],
      solucion: [
        {
          filename: 'app.routes.ts',
          language: 'ts',
          code: `import { Routes } from '@angular/router';

export const routes: Routes = [
  // Menú principal (ruta por defecto)
  {
    path: '',
    loadComponent: () => import('./menu/menu').then((m) => m.Menu),
  },
  {
    path: 'cronometro',
    loadComponent: () => import('./cronometro/cronometro').then((m) => m.Cronometro),
  },
  {
    path: 'saludo',
    loadComponent: () => import('./saludo/saludo').then((m) => m.Saludo),
  },
  { path: '**', redirectTo: '' },
];`,
        },
        {
          filename: 'menu/menu.ts',
          language: 'ts',
          code: `import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {}`,
        },
        {
          filename: 'menu/menu.html',
          language: 'html',
          code: `<main class="menu">
  <h1>Menú principal</h1>

  <nav class="opciones">
    <a class="opcion" routerLink="/cronometro">
      <span class="num">1</span>
      Cronómetro
    </a>

    <a class="opcion" routerLink="/saludo">
      <span class="num">2</span>
      Saludo
    </a>
  </nav>
</main>`,
        },
        {
          filename: 'saludo/saludo.ts',
          language: 'ts',
          code: `import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

const CLAVE_VISITAS = 'visitas-saludo';

@Component({
  selector: 'app-saludo',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './saludo.html',
  styleUrl: './saludo.scss',
})
export class Saludo implements OnInit {
  readonly visitas = signal(0);

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Contador de visitas persistido en el navegador
    const guardadas = Number(localStorage.getItem(CLAVE_VISITAS) ?? '0');
    const nuevas = guardadas + 1;

    localStorage.setItem(CLAVE_VISITAS, String(nuevas));
    this.visitas.set(nuevas);

    // Alerta al entrar (la primera vez o en las siguientes)
    const mensaje = nuevas === 1 ? 'Hola, ¿qué tal estás?' : 'Bienvenido de vuelta';
    setTimeout(() => alert(mensaje));
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}`,
        },
        {
          filename: 'saludo/saludo.html',
          language: 'html',
          code: `<section class="saludo">
  <h1>{{ visitas() === 1 ? 'Hola, ¿qué tal estás?' : 'Bienvenido de vuelta' }}</h1>

  <p class="visitas">
    Has entrado en esta pantalla <strong>{{ visitas() }}</strong>
    {{ visitas() === 1 ? 'vez' : 'veces' }}.
  </p>

  <div class="acciones">
    <!-- Botón Volver: routerLink + ruta programática -->
    <a matButton="filled" routerLink="/">
      <mat-icon>arrow_back</mat-icon>
      Volver al menú
    </a>

    <button matButton="outlined" type="button" (click)="volver()">
      Volver (router.navigate)
    </button>
  </div>
</section>`,
        },
      ],
      comprobar: [
        'La ruta por defecto muestra el menú con «Cronómetro» y «Saludo».',
        'Los dos enlaces usan routerLink, no href.',
        'La primera visita muestra «Hola, ¿qué tal estás?»; la segunda, «Bienvenido de vuelta».',
        'El botón «Volver» regresa al menú sin recargar la página.',
        'Si recargas la página, el número de visitas se mantiene.',
      ],
    },
    {
      numero: 2,
      titulo: 'Contador con play y botón RECORD',
      puntos: 1.5,
      enunciado:
        'En la nueva actividad debe haber un contador que muestra el número que inicia desde cero. Al pulsar el botón de play debe comenzar un contador que se incrementa +1 cada segundo. También hay que añadir un botón «record» y un div contenedor de lapsos. PISTA: await new Promise(f => setTimeout(f, 1000));',
      queSePide: [
        'Contador visible que arranca en cero (0,5 pt).',
        'Play que incrementa +1 cada segundo (0,5 pt).',
        'Botón «record» presente en el diseño (0,25 pt).',
        'Div contenedor de lapsos presente en el diseño (0,25 pt).',
      ],
      solucion: [
        {
          filename: 'cronometro/cronometro.ts (parte 1)',
          language: 'ts',
          code: `import { Component, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cronometro',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './cronometro.html',
  styleUrl: './cronometro.scss',
})
export class Cronometro implements OnDestroy {
  readonly segundos = signal(0);
  readonly corriendo = signal(false);

  private intervalo?: ReturnType<typeof setInterval>;

  play(): void {
    if (this.corriendo()) return; // evita duplicar el intervalo

    this.corriendo.set(true);

    // Opción con la pista del examen:
    // this.correrConPista();

    // Opción recomendada: un único setInterval
    this.intervalo = setInterval(() => {
      this.segundos.update((s) => s + 1);
    }, 1000);
  }

  /** Versión con la pista del enunciado (await + setTimeout). */
  private async correrConPista(): Promise<void> {
    while (this.corriendo()) {
      await new Promise((f) => setTimeout(f, 1000));
      if (this.corriendo()) {
        this.segundos.update((s) => s + 1);
      }
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }
}`,
        },
        {
          filename: 'cronometro/cronometro.html (parte 1)',
          language: 'html',
          code: `<section class="crono">
  <!-- Contador: inicia en cero -->
  <p class="display">{{ segundos() }}</p>

  <div class="botones">
    <button matButton="filled" type="button" (click)="play()" [disabled]="corriendo()">
      <mat-icon>play_arrow</mat-icon>
      Play
    </button>

    <button matButton="tonal" type="button" (click)="record()">
      <mat-icon>flag</mat-icon>
      Record
    </button>
  </div>

  <!-- Div contenedor de lapsos -->
  <div class="lapsos">
    @for (lapso of lapsos(); track lapso.id) {
      <p>{{ lapso.segundos }}</p>
    } @empty {
      <p class="vacio">Todavía no hay lapsos.</p>
    }
  </div>
</section>`,
        },
      ],
      comprobar: [
        'El contador muestra 0 antes de pulsar play.',
        'Cada segundo que pasa, el número sube de uno en uno.',
        'Pulsar play dos veces no acelera el contador.',
        'El botón «Record» y el div de lapsos existen desde el primer momento.',
      ],
    },
    {
      numero: 3,
      titulo: 'Pausar y continuar desde donde estaba',
      puntos: 1,
      enunciado:
        'Añadir un botón que permita pausar el contador, y que al volverle a dar al play continúe por donde estaba.',
      queSePide: [
        'Botón que pausa el contador (0,25 pt).',
        'Play continúa desde el valor anterior (0,25 pt).',
        'Implementación correcta de pausa/continuar (0,5 pt).',
      ],
      solucion: [
        {
          filename: 'cronometro/cronometro.ts (parte 2)',
          language: 'ts',
          code: `// Añadir al componente del ejercicio anterior:

pausar(): void {
  this.corriendo.set(false);
  clearInterval(this.intervalo);
  this.intervalo = undefined;
}

/** Play continúa: no reinicia el valor de segundos. */
continuar(): void {
  this.play(); // play() respeta el valor actual de segundos
}

reiniciar(): void {
  this.pausar();
  this.segundos.set(0);
  this.lapsos.set([]);
}

toggle(): void {
  if (this.corriendo()) {
    this.pausar();
  } else {
    this.play();
  }
}`,
        },
        {
          filename: 'cronometro/cronometro.html (parte 2)',
          language: 'html',
          code: `<div class="botones">
  <!-- Un solo botón play/pausa -->
  <button matButton="filled" type="button" (click)="toggle()">
    <mat-icon>{{ corriendo() ? 'pause' : 'play_arrow' }}</mat-icon>
    {{ corriendo() ? 'Pausar' : 'Play' }}
  </button>

  <!-- O dos botones separados, como pide el enunciado -->
  <button matButton="filled" type="button" (click)="play()" [disabled]="corriendo()">
    <mat-icon>play_arrow</mat-icon>
    Play
  </button>
  <button matButton="outlined" type="button" (click)="pausar()" [disabled]="!corriendo()">
    <mat-icon>pause</mat-icon>
    Pausar
  </button>

  <button matButton="tonal" type="button" (click)="record()">
    <mat-icon>flag</mat-icon>
    Record
  </button>
  <button matButton type="button" (click)="reiniciar()">
    <mat-icon>restart_alt</mat-icon>
    Reiniciar
  </button>
</div>`,
        },
      ],
      comprobar: [
        'Pausar detiene la cuenta al instante.',
        'Volver a pulsar play NO reinicia a cero: sigue desde el segundo en el que se pausó.',
        'Al destruir el componente no queda ningún intervalo ejecutándose.',
      ],
    },
    {
      numero: 4,
      titulo: 'Lapsos con el componente hijo `lapso`',
      puntos: 2,
      enunciado:
        'Se debe realizar la función de un cronómetro que permite registrar varios lapsos en el div de abajo. La pulsación del botón «RECORD» añade al div el lapso transcurrido desde la pulsación anterior (o desde el inicio del cronómetro si es la primera vez). Un lapso es un componente creado con ng g c lapso al que desde el padre le pasaremos como parámetro un número (el número de segundos que tiene que mostrar).',
      queSePide: [
        'Div para los lapsos con llamadas al componente `lapso` pasándole parámetros (1 pt).',
        'Registro correcto de los lapsos desde la pulsación anterior (1 pt).',
      ],
      solucion: [
        {
          filename: 'lapso/lapso.ts',
          language: 'ts',
          code: `import { Component, computed, input } from '@angular/core';

/** Componente hijo: recibe el número de segundos y lo muestra. */
@Component({
  selector: 'app-lapso',
  template: \`<span class="lapso-valor">{{ formateado() }}</span>\`,
  styleUrl: './lapso.scss',
})
export class Lapso {
  /** Parámetro que envía el padre: segundos del lapso. */
  readonly segundos = input.required<number>();

  /** Formato h:mm:ss (ejercicio 5). */
  readonly formateado = computed(() => formatear(this.segundos()));
}

export function formatear(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const dos = (n: number) => String(n).padStart(2, '0');
  return \`\${h}:\${dos(m)}:\${dos(s)}\`;
}`,
        },
        {
          filename: 'cronometro/cronometro.ts (parte 3)',
          language: 'ts',
          code: `import { Component, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Lapso } from '../lapso/lapso';
import { formatear } from '../lapso/lapso';

interface LapsoRegistrado {
  id: number;
  segundos: number;
}

@Component({
  selector: 'app-cronometro',
  imports: [MatButtonModule, MatIconModule, Lapso],
  templateUrl: './cronometro.html',
})
export class Cronometro implements OnDestroy {
  readonly segundos = signal(0);
  readonly corriendo = signal(false);
  readonly lapsos = signal<LapsoRegistrado[]>([]);

  private intervalo?: ReturnType<typeof setInterval>;
  private ultimoLapso = 0;
  private idLapso = 0;

  readonly display = () => formatear(this.segundos());

  record(): void {
    // Segundos transcurridos desde la última pulsación
    const transcurrido = this.segundos() - this.ultimoLapso;

    this.ultimoLapso = this.segundos();
    this.lapsos.update((lista) => [
      ...lista,
      { id: ++this.idLapso, segundos: transcurrido },
    ]);
  }

  play(): void {
    if (this.corriendo()) return;
    this.corriendo.set(true);
    this.intervalo = setInterval(() => this.segundos.update((s) => s + 1), 1000);
  }

  pausar(): void {
    this.corriendo.set(false);
    clearInterval(this.intervalo);
    this.intervalo = undefined;
  }

  reiniciar(): void {
    this.pausar();
    this.segundos.set(0);
    this.ultimoLapso = 0;
    this.lapsos.set([]);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }
}`,
        },
        {
          filename: 'cronometro/cronometro.html (parte 3)',
          language: 'html',
          code: `<!-- Div contenedor de lapsos: un <app-lapso> por cada registro -->
<div class="lapsos">
  @for (lapso of lapsos(); track lapso.id) {
    <div class="lapso-fila">
      <span class="lapso-num">Lapso {{ lapso.id }}</span>
      <app-lapso [segundos]="lapso.segundos" />
    </div>
  } @empty {
    <p class="vacio">Pulsa RECORD para registrar el primer lapso.</p>
  }
</div>`,
        },
      ],
      comprobar: [
        'El componente se ha creado con ng g c lapso y se importa en el padre.',
        'Cada lapso muestra el tiempo desde la pulsación anterior, no el total.',
        'El segundo lapso se calcula desde el primero, no desde el inicio.',
        'Al reiniciar, la lista de lapsos también se vacía.',
      ],
    },
    {
      numero: 5,
      titulo: 'Formato h:mm:ss en contador y lapsos',
      puntos: 1,
      enunciado:
        'Hacer que se muestren los tiempos desglosados en horas, minutos y segundos (0:00:00) tanto en el contador como en los lapsos.',
      queSePide: [
        'Segundos desglosados en el contador (0,5 pt).',
        'Segundos desglosados en los lapsos (0,5 pt).',
      ],
      solucion: [
        {
          filename: 'cronometro/cronometro.html (parte 4)',
          language: 'html',
          code: `<!-- Contador con formato h:mm:ss -->
<p class="display">{{ display() }}</p>

<!-- Alternativa con métodos del componente -->
<p class="display">{{ formatear(segundos()) }}</p>`,
        },
        {
          filename: 'formato.ts',
          language: 'ts',
          code: `/** Función reutilizable para el contador y para los lapsos. */
export function formatear(total: number): string {
  const horas = Math.floor(total / 3600);
  const minutos = Math.floor((total % 3600) / 60);
  const segundos = total % 60;

  const dosDigitos = (n: number) => String(n).padStart(2, '0');

  return \`\${horas}:\${dosDigitos(minutos)}:\${dosDigitos(segundos)}\`;
}

// 0    -> 0:00:00
// 65   -> 0:01:05
// 3661 -> 1:01:01`,
        },
      ],
      comprobar: [
        'El contador muestra 0:00:00 al arrancar.',
        'A los 65 segundos pone 0:01:05, no 0:1:5.',
        'Los lapsos usan exactamente el mismo formato.',
        'Con más de una hora el dígito de horas aparece correctamente (1:00:00).',
      ],
    },
    {
      numero: 6,
      titulo: 'Navegación con mat-toolbar',
      puntos: 1,
      enunciado:
        'Añadir un mat-toolbar que me permita navegar entre el cronómetro y el saludo.',
      queSePide: [
        'Toolbar que permite navegar entre cronómetro y saludo (1 pt).',
      ],
      solucion: [
        {
          filename: 'app.ts',
          language: 'ts',
          code: `import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BarraNavegacion } from './barra-navegacion/barra-navegacion';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BarraNavegacion],
  templateUrl: './app.html',
})
export class App {}`,
        },
        {
          filename: 'app.html',
          language: 'html',
          code: `<!-- Toolbar global: visible en todas las rutas -->
<app-barra-navegacion />

<main class="contenido">
  <router-outlet />
</main>`,
        },
        {
          filename: 'barra-navegacion/barra-navegacion.ts',
          language: 'ts',
          code: `import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-barra-navegacion',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './barra-navegacion.html',
  styleUrl: './barra-navegacion.scss',
})
export class BarraNavegacion {
  private readonly router = inject(Router);

  protected readonly enlaces = [
    { path: '/', label: 'Inicio', icon: 'home' },
    { path: '/cronometro', label: 'Cronómetro', icon: 'timer' },
    { path: '/saludo', label: 'Saludo', icon: 'waving_hand' },
  ];

  irA(path: string): void {
    this.router.navigate([path]);
  }
}`,
        },
        {
          filename: 'barra-navegacion/barra-navegacion.html',
          language: 'html',
          code: `<mat-toolbar class="barra">
  <mat-icon class="logo">timer</mat-icon>
  <span class="titulo">Cronómetro + Saludo</span>

  <nav class="nav">
    @for (enlace of enlaces; track enlace.path) {
      <a
        matButton
        [routerLink]="enlace.path"
        routerLinkActive="activo"
        [routerLinkActiveOptions]="{ exact: enlace.path === '/' }"
      >
        <mat-icon>{{ enlace.icon }}</mat-icon>
        {{ enlace.label }}
      </a>
    }
  </nav>
</mat-toolbar>`,
        },
        {
          filename: 'barra-navegacion/barra-navegacion.scss',
          language: 'scss',
          code: `.barra {
  position: sticky;
  top: 0;
  z-index: 20;
  gap: 8px;
  border-bottom: 1px solid var(--mat-sys-outline-variant);
}

.logo {
  color: var(--mat-sys-primary);
}

.titulo {
  font-weight: 600;
  font-size: 0.95rem;
  margin-right: auto;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  a mat-icon {
    margin-right: 5px;
    font-size: 18px;
    width: 18px;
    height: 18px;
  }
}

/* routerLinkActive aplica esta clase al enlace activo */
::ng-deep .nav a.activo {
  background: color-mix(in srgb, var(--mat-sys-primary) 14%, transparent);
  color: var(--mat-sys-primary);
}`,
        },
      ],
      comprobar: [
        'La toolbar es visible en todas las rutas.',
        'Los enlaces usan routerLink y navegan sin recargar.',
        'El enlace de la ruta activa aparece resaltado.',
        'Se puede ir del cronómetro al saludo y volver al inicio desde la toolbar.',
      ],
    },
  ],
  rubrica: [
    { criterio: 'Ej. 1 · Menú principal visible con las dos opciones', puntos: 0.5 },
    { criterio: 'Ej. 1 · Las dos opciones acceden a sus pantallas', puntos: 0.5 },
    { criterio: 'Ej. 1 · Pantalla de saludo correcta y botón Volver', puntos: 1 },
    { criterio: 'Ej. 2 · Contador que inicia en cero', puntos: 0.5 },
    { criterio: 'Ej. 2 · Play incrementa cada segundo', puntos: 0.5 },
    { criterio: 'Ej. 2 · Botón «record» presente', puntos: 0.25 },
    { criterio: 'Ej. 2 · Div contenedor de lapsos presente', puntos: 0.25 },
    { criterio: 'Ej. 3 · Botón para pausar el contador', puntos: 0.25 },
    { criterio: 'Ej. 3 · Play continúa desde donde estaba', puntos: 0.25 },
    { criterio: 'Ej. 3 · Implementación correcta de pausa y continuar', puntos: 0.5 },
    { criterio: 'Ej. 4 · Div con llamadas al componente lapso y parámetros', puntos: 1 },
    { criterio: 'Ej. 4 · Registro adecuado de lapsos', puntos: 1 },
    { criterio: 'Ej. 5 · Segundos desglosados en el contador', puntos: 0.5 },
    { criterio: 'Ej. 5 · Segundos desglosados en los lapsos', puntos: 0.5 },
    { criterio: 'Ej. 6 · mat-toolbar con navegación', puntos: 1 },
    { criterio: 'Uso correcto del framework: código limpio', puntos: 1.5 },
  ],
  penalizaciones: [
    'El examen dura 1 h 40 min: cada minuto extra resta −0,2 puntos de la nota.',
    'Copia o uso de IA durante el examen: calificación de 0 puntos.',
  ],
  materialPermitido: [
    'Proyectos entregados por el alumno a lo largo del módulo.',
    'Esquemas y apuntes proporcionados por el profesor durante el módulo.',
  ],
  estructura: `cronometro-app/
├── src/app/
│   ├── app.ts                  # raíz con <router-outlet> + toolbar
│   ├── app.html
│   ├── app.routes.ts           # '', 'cronometro', 'saludo'
│   ├── app.config.ts           # provideRouter(routes)
│   ├── barra-navegacion/       # mat-toolbar con routerLink (ej. 6)
│   │   ├── barra-navegacion.ts
│   │   ├── barra-navegacion.html
│   │   └── barra-navegacion.scss
│   ├── menu/                   # menú principal (ej. 1)
│   │   ├── menu.ts
│   │   └── menu.html
│   ├── saludo/                 # alerta + botón volver (ej. 1)
│   │   ├── saludo.ts
│   │   └── saludo.html
│   ├── cronometro/             # contador, pausa, lapsos (ej. 2-5)
│   │   ├── cronometro.ts
│   │   ├── cronometro.html
│   │   └── cronometro.scss
│   └── lapso/                  # componente hijo (ej. 4-5)
│       ├── lapso.ts
│       └── lapso.scss
└── package.json`,
  consejos: [
    'Empieza por el router y el menú: con las rutas creadas, cada punto siguiente es añadir código a una pantalla.',
    'El cronómetro es el corazón del examen: escribe play() con un único setInterval y guarda su id para poder limpiarlo en pausar().',
    'Para los lapsos, guarda el segundo en que registraste el último: lapso = segundos() − ultimoLapso. Es el error más habitual.',
    'El formato h:mm:ss va en una función compartida y la usan el contador y el componente lapso: si la duplicas, se te olvidará en uno de los dos.',
    'El componente lapso recibe los segundos con input.required<number>() y formatea dentro; el padre solo le pasa el número.',
    'No olvides ngOnDestroy con clearInterval: si no, el contador sigue corriendo aunque cambies de ruta.',
    'Reserva los últimos 10 minutos para repasar la rúbrica punto por punto: hay 0,25 y 0,5 que se pierden por detalles.',
  ],
};
