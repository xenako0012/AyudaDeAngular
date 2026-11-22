import { ExamenOficial } from './ejercicios.model';

/**
 * Examen oficial de Angular (DAM2) resuelto.
 *
 * Guarda el enunciado literal, los seis ejercicios con su puntuación y el
 * solucionario completo: los archivos reales del proyecto `cronometro-app`,
 * en orden de lectura y comentados línea a línea para que se entienda qué
 * hace cada cosa.
 */
export const EXAMEN_DAM2: ExamenOficial = {
  id: 'examen-anterior',
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
    },
    {
      numero: 6,
      titulo: 'Navegación con mat-toolbar',
      puntos: 1,
      enunciado:
        'Añadir un mat-toolbar que me permita navegar entre el cronómetro y el saludo.',
      queSePide: ['Toolbar que permite navegar entre cronómetro y saludo (1 pt).'],
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
  solucion: [
    {
      filename: 'app.config.ts',
      language: 'ts',
      code: `// Configuración global de la aplicación (Angular 17+ standalone).
// Aquí se registran los proveedores que necesita toda la app.
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Optimiza la detección de cambios agrupando eventos en una sola vuelta.
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Registra el router y sus rutas: sin esto, routerLink no funcionaría.
    provideRouter(routes),
  ],
};`,
    },
    {
      filename: 'app.routes.ts',
      language: 'ts',
      code: `// Tabla de rutas: cada ruta hija carga su componente de forma perezosa (lazy).
// Cargar con loadComponent hace que el navegador solo descargue el código de la
// pantalla cuando el usuario entra en ella.
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // Ruta por defecto: el menú principal (1. Cronómetro · 2. Saludo).
    path: '',
    title: 'Menú principal',
    loadComponent: () => import('./menu/menu').then((m) => m.Menu),
  },
  {
    // Pantalla del cronómetro: contador, pausa y lapsos.
    path: 'cronometro',
    title: 'Cronómetro',
    loadComponent: () => import('./cronometro/cronometro').then((m) => m.Cronometro),
  },
  {
    // Pantalla del saludo: alerta de bienvenida + botón «Volver».
    path: 'saludo',
    title: 'Saludo',
    loadComponent: () => import('./saludo/saludo').then((m) => m.Saludo),
  },
  {
    // Cualquier URL desconocida vuelve al menú principal.
    path: '**',
    redirectTo: '',
  },
];`,
    },
    {
      filename: 'app.ts',
      language: 'ts',
      code: `// Componente raíz: solo compone el armazón de la aplicación.
// La toolbar es fija (se ve en todas las rutas) y el router-outlet es el
// hueco donde el router pinta cada pantalla.
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BarraNavegacion } from './barra-navegacion/barra-navegacion';

@Component({
  selector: 'app-root',
  // RouterOutlet => <router-outlet />; BarraNavegacion => <app-barra-navegacion />
  imports: [RouterOutlet, BarraNavegacion],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}`,
    },
    {
      filename: 'app.html',
      language: 'html',
      code: `<!-- Toolbar global: se muestra por encima de cualquier ruta (ejercicio 6). -->
<app-barra-navegacion />

<!-- Aquí el router inyecta el componente de la ruta activa:
     menu, cronometro o saludo, según la URL. -->
<main class="contenido">
  <router-outlet />
</main>`,
    },
    {
      filename: 'menu/menu.ts',
      language: 'ts',
      code: `// Menú principal (ruta ''). Es un componente simple: no tiene estado propio,
// solo pinta los dos enlaces con routerLink.
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  // RouterLink habilita la directiva [routerLink] y routerLink en esta plantilla.
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {}`,
    },
    {
      filename: 'menu/menu.html',
      language: 'html',
      code: `<!-- Menú principal con las dos opciones del enunciado.
     routerLink cambia de ruta SIN recargar la página (navegación SPA). -->
<main class="menu">
  <h1>Menú principal</h1>

  <nav class="opciones">
    <!-- Opción 1: /cronometro -->
    <a class="opcion" routerLink="/cronometro">
      <span class="num">1</span>
      Cronómetro
    </a>

    <!-- Opción 2: /saludo -->
    <a class="opcion" routerLink="/saludo">
      <span class="num">2</span>
      Saludo
    </a>
  </nav>
</main>`,
    },
    {
      filename: 'menu/menu.scss',
      language: 'scss',
      code: `// Estilos del menú: dos tarjetas grandes, una por opción.
.menu {
  max-width: 520px;
  margin: 48px auto;
  padding: 0 16px;
  text-align: center;
}

.opciones {
  display: grid;
  gap: 12px;
  margin-top: 24px;
}

.opcion {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 20px;
  border-radius: 14px;
  border: 1px solid #d0d7de;
  font-size: 1.05rem;
  font-weight: 600;
  text-decoration: none;
  color: inherit;
  transition: border-color 150ms ease, transform 150ms ease;

  &:hover {
    border-color: #6d28d9;
    transform: translateY(-2px);
  }

  .num {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #fff;
    background: #6d28d9;
    font-size: 0.9rem;
  }
}`,
    },
    {
      filename: 'saludo/saludo.ts',
      language: 'ts',
      code: `// Pantalla de saludo (ejercicio 1).
// Requisitos que resuelve:
//  - Al entrar, lanza una alerta: «Hola, ¿qué tal estás?» la primera vez y
//    «Bienvenido de vuelta» en las siguientes.
//  - Botón «Volver» que regresa al menú principal.
// El número de visitas se guarda en localStorage para que sobreviva a recargas.
import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

/** Clave con la que guardamos el contador en el navegador. */
const CLAVE_VISITAS = 'visitas-saludo';

@Component({
  selector: 'app-saludo',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './saludo.html',
  styleUrl: './saludo.scss',
})
export class Saludo implements OnInit {
  /** Signal con el número total de visitas a esta pantalla. */
  readonly visitas = signal(0);

  constructor(private router: Router) {}

  // ngOnInit se ejecuta una sola vez, justo al entrar en la ruta:
  // es el sitio ideal para lanzar la alerta.
  ngOnInit(): void {
    // 1) Leemos el valor guardado. Si no existe, empezamos en 0.
    const guardadas = Number(localStorage.getItem(CLAVE_VISITAS) ?? '0');

    // 2) Calculamos la visita actual: la que estamos haciendo ahora.
    const nuevas = guardadas + 1;

    // 3) Persistimos el nuevo valor para la próxima vez.
    localStorage.setItem(CLAVE_VISITAS, String(nuevas));

    // 4) Lo publicamos en la signal para que la plantilla lo muestre.
    this.visitas.set(nuevas);

    // 5) Elegimos el mensaje: primera visita o visita repetida.
    const mensaje = nuevas === 1 ? 'Hola, ¿qué tal estás?' : 'Bienvenido de vuelta';

    // setTimeout deja que Angular termine de pintar la pantalla antes de
    // abrir la alerta (si no, el navegador congela el render).
    setTimeout(() => alert(mensaje));
  }

  /** Botón «Volver»: navegación programática al menú principal. */
  volver(): void {
    this.router.navigate(['/']);
  }
}`,
    },
    {
      filename: 'saludo/saludo.html',
      language: 'html',
      code: `<!-- Pantalla de saludo: mensaje, contador de visitas y botón Volver. -->
<section class="saludo">
  <!-- Interpolación con operador ternario: cambia el saludo según las visitas -->
  <h1>{{ visitas() === 1 ? 'Hola, ¿qué tal estás?' : 'Bienvenido de vuelta' }}</h1>

  <p class="visitas">
    Has entrado en esta pantalla <strong>{{ visitas() }}</strong>
    {{ visitas() === 1 ? 'vez' : 'veces' }}.
  </p>

  <div class="acciones">
    <!-- Botón «Volver» con routerLink (navegación declarativa) -->
    <a matButton="filled" routerLink="/">
      <mat-icon>arrow_back</mat-icon>
      Volver al menú
    </a>

    <!-- Mismo destino, pero con router.navigate desde el componente -->
    <button matButton="outlined" type="button" (click)="volver()">
      Volver (router.navigate)
    </button>
  </div>
</section>`,
    },
    {
      filename: 'saludo/saludo.scss',
      language: 'scss',
      code: `// Estilos de la pantalla de saludo.
.saludo {
  max-width: 560px;
  margin: 56px auto;
  padding: 0 16px;
  text-align: center;

  h1 {
    font-size: 1.6rem;
    margin-bottom: 8px;
  }
}

.visitas {
  color: #57606a;
}

.acciones {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}`,
    },
    {
      filename: 'cronometro/cronometro.ts',
      language: 'ts',
      code: `// Cronómetro completo: resuelve los ejercicios 2, 3, 4 y 5 del examen.
//   - Ej. 2: contador desde 0 que sube +1 cada segundo, botón RECORD y div de lapsos.
//   - Ej. 3: botón de pausa; play continúa desde donde se quedó.
//   - Ej. 4: cada RECORD guarda el tiempo desde la pulsación anterior.
//   - Ej. 5: contador y lapsos en formato h:mm:ss.
import { Component, OnDestroy, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { formatear } from '../formato';
import { Lapso } from '../lapso/lapso';

/** Un lapso ya registrado: su id (para el track) y los segundos que duró. */
interface LapsoRegistrado {
  id: number;
  segundos: number;
}

@Component({
  selector: 'app-cronometro',
  // Lapso es el componente hijo (ejercicio 4): se usa como <app-lapso />
  imports: [MatButtonModule, MatIconModule, Lapso],
  templateUrl: './cronometro.html',
  styleUrl: './cronometro.scss',
})
export class Cronometro implements OnDestroy {
  /** Total de segundos transcurridos desde el último reinicio. */
  readonly segundos = signal(0);

  /** true mientras el cronómetro está en marcha. */
  readonly corriendo = signal(false);

  /** Lista de lapsos registrados, en orden de pulsación. */
  readonly lapsos = signal<LapsoRegistrado[]>([]);

  /** Texto del contador ya formateado: se recalcula solo cuando cambia segundos. */
  readonly display = computed(() => formatear(this.segundos()));

  /** Id del setInterval; undefined cuando está parado. */
  private intervalo?: ReturnType<typeof setInterval>;

  /** Segundo en el que se registró el último lapso (0 al empezar). */
  private ultimoLapso = 0;

  /** Contador interno para dar un id único a cada lapso. */
  private idLapso = 0;

  /**
   * Play: arranca la cuenta.
   * Si ya está corriendo, sale: así pulsar dos veces no duplica la velocidad.
   */
  play(): void {
    if (this.corriendo()) return;

    this.corriendo.set(true);

    // Cada 1000 ms sumamos un segundo. Angular repinta al cambiar la signal.
    this.intervalo = setInterval(() => {
      this.segundos.update((s) => s + 1);
    }, 1000);
  }

  /**
   * Pausa: detiene la cuenta sin perder el valor actual.
   * Es lo que permite que play continúe «por donde estaba» (ejercicio 3).
   */
  pausar(): void {
    this.corriendo.set(false);
    clearInterval(this.intervalo); // imprescindible: si no, sigue contando
    this.intervalo = undefined;
  }

  /** Un solo botón que alterna play y pausa. */
  toggle(): void {
    if (this.corriendo()) {
      this.pausar();
    } else {
      this.play();
    }
  }

  /**
   * RECORD (ejercicio 4): guarda el tiempo transcurrido desde la pulsación
   * anterior, no el total. Por eso restamos el segundo del último lapso.
   */
  record(): void {
    const transcurrido = this.segundos() - this.ultimoLapso;

    // La siguiente pulsación se medirá desde este instante.
    this.ultimoLapso = this.segundos();

    // Añadimos el lapso sin mutar el array: creamos uno nuevo (inmutable).
    this.lapsos.update((lista) => [
      ...lista,
      { id: ++this.idLapso, segundos: transcurrido },
    ]);
  }

  /** Vuelve todo a cero: tiempo, lapsos y referencias internas. */
  reiniciar(): void {
    this.pausar();
    this.segundos.set(0);
    this.ultimoLapso = 0;
    this.lapsos.set([]);
    this.idLapso = 0;
  }

  /**
   * ngOnDestroy: se ejecuta al salir de la ruta.
   * Limpiar el intervalo evita que el cronómetro siga corriendo «en la sombra»
   * y que se acumulen timers al volver a entrar.
   */
  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }
}`,
    },
    {
      filename: 'cronometro/cronometro.html',
      language: 'html',
      code: `<!-- Pantalla del cronómetro. -->
<section class="crono">
  <!-- Contador en formato h:mm:ss (ejercicio 5): 0:00:00 al arrancar. -->
  <p class="display">{{ display() }}</p>

  <div class="botones">
    <!-- Play: solo activo si está parado (ejercicio 2) -->
    <button matButton="filled" type="button" (click)="play()" [disabled]="corriendo()">
      <mat-icon>play_arrow</mat-icon>
      Play
    </button>

    <!-- Pausa: solo activa si está en marcha (ejercicio 3) -->
    <button matButton="outlined" type="button" (click)="pausar()" [disabled]="!corriendo()">
      <mat-icon>pause</mat-icon>
      Pausar
    </button>

    <!-- RECORD: guarda el lapso (ejercicio 4) -->
    <button matButton="tonal" type="button" (click)="record()">
      <mat-icon>flag</mat-icon>
      Record
    </button>

    <!-- Reiniciar: vuelve a 0 y vacía la lista -->
    <button matButton type="button" (click)="reiniciar()">
      <mat-icon>restart_alt</mat-icon>
      Reiniciar
    </button>
  </div>

  <!-- Div contenedor de lapsos: un <app-lapso> por cada registro.
       Al hijo se le pasa el número de segundos con [segundos] (ejercicio 4). -->
  <div class="lapsos">
    @for (lapso of lapsos(); track lapso.id) {
      <div class="lapso-fila">
        <span class="lapso-num">Lapso {{ lapso.id }}</span>
        <app-lapso [segundos]="lapso.segundos" />
      </div>
    } @empty {
      <p class="vacio">Pulsa RECORD para registrar el primer lapso.</p>
    }
  </div>
</section>`,
    },
    {
      filename: 'cronometro/cronometro.scss',
      language: 'scss',
      code: `// Estilos del cronómetro: display grande en monoespaciada y lista de lapsos.
.crono {
  max-width: 560px;
  margin: 40px auto;
  padding: 0 16px;
  text-align: center;
}

.display {
  // font-variant-numeric evita que los números "bailen" al cambiar.
  font-family: 'JetBrains Mono', monospace;
  font-variant-numeric: tabular-nums;
  font-size: 3.2rem;
  font-weight: 700;
  margin: 12px 0 20px;
}

.botones {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.lapsos {
  margin-top: 24px;
  display: grid;
  gap: 8px;
  text-align: left;
}

.lapso-fila {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #d0d7de;
}

.lapso-num {
  font-size: 0.85rem;
  color: #57606a;
}

.vacio {
  margin: 0;
  padding: 14px;
  border: 1px dashed #d0d7de;
  border-radius: 10px;
  color: #57606a;
  text-align: center;
}`,
    },
    {
      filename: 'lapso/lapso.ts',
      language: 'ts',
      code: `// Componente hijo del cronómetro (ejercicio 4).
// Se genera con: ng g c lapso
// Su única misión es recibir un número de segundos del padre y mostrarlo
// formateado como h:mm:ss (ejercicio 5).
import { Component, computed, input } from '@angular/core';

import { formatear } from '../formato';

@Component({
  selector: 'app-lapso',
  // Plantilla en línea: es un componente de una sola línea de texto.
  template: \`<span class="lapso-valor">{{ formateado() }}</span>\`,
  styleUrl: './lapso.scss',
})
export class Lapso {
  /**
   * Parámetro que envía el padre: número de segundos del lapso.
   * input.required obliga a pasarlo siempre: <app-lapso [segundos]="x" />
   */
  readonly segundos = input.required<number>();

  /** Valor ya formateado; se recalcula solo cuando cambia la entrada. */
  readonly formateado = computed(() => formatear(this.segundos()));
}`,
    },
    {
      filename: 'lapso/lapso.scss',
      language: 'scss',
      code: `// El hijo no decide el tamaño: hereda el estilo de la fila del padre.
.lapso-valor {
  font-family: 'JetBrains Mono', monospace;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  font-size: 1rem;
}`,
    },
    {
      filename: 'formato.ts',
      language: 'ts',
      code: `// Utilidad compartida (ejercicio 5): pasar segundos a "h:mm:ss".
// Vive en su propio archivo para que la usen el contador y el componente
// lapso, y no haya dos versiones del mismo cálculo.

/**
 * Convierte un total de segundos en el formato h:mm:ss.
 *   0    -> 0:00:00
 *   65   -> 0:01:05
 *   3661 -> 1:01:01
 */
export function formatear(total: number): string {
  // Horas completas que caben en el total.
  const horas = Math.floor(total / 3600);

  // Minutos restantes: quitamos las horas y dividimos entre 60.
  const minutos = Math.floor((total % 3600) / 60);

  // Segundos que sobran: el resto de dividir entre 60.
  const segundos = total % 60;

  // Rellena a dos cifras: 5 -> "05". Las horas no se rellenan (0:05:09).
  const dosDigitos = (n: number) => String(n).padStart(2, '0');

  return \`\${horas}:\${dosDigitos(minutos)}:\${dosDigitos(segundos)}\`;
}`,
    },
    {
      filename: 'barra-navegacion/barra-navegacion.ts',
      language: 'ts',
      code: `// Toolbar de navegación (ejercicio 6).
// Vive en el componente raíz, así que se ve en todas las rutas y permite
// saltar entre cronómetro y saludo desde cualquier pantalla.
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-barra-navegacion',
  // RouterLinkActive marca con una clase el enlace de la ruta actual.
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './barra-navegacion.html',
  styleUrl: './barra-navegacion.scss',
})
export class BarraNavegacion {
  /** Router para la navegación programática desde el componente. */
  private readonly router = inject(Router);

  /** Enlaces de la toolbar, definidos como datos para recorrerlos con @for. */
  protected readonly enlaces = [
    { path: '/', label: 'Inicio', icon: 'home' },
    { path: '/cronometro', label: 'Cronómetro', icon: 'timer' },
    { path: '/saludo', label: 'Saludo', icon: 'waving_hand' },
  ];

  /** Alternativa a routerLink: navegar desde código. */
  irA(path: string): void {
    this.router.navigate([path]);
  }
}`,
    },
    {
      filename: 'barra-navegacion/barra-navegacion.html',
      language: 'html',
      code: `<!-- Toolbar superior con los enlaces a todas las pantallas. -->
<mat-toolbar class="barra">
  <mat-icon class="logo">timer</mat-icon>
  <span class="titulo">Cronómetro + Saludo</span>

  <nav class="nav">
    <!-- @for recorre los enlaces definidos en el componente -->
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
      code: `// La toolbar se queda pegada arriba al hacer scroll.
.barra {
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

// routerLinkActive añade la clase .activo al enlace de la ruta actual.
.nav a.activo {
  background: color-mix(in srgb, var(--mat-sys-primary) 14%, transparent);
  color: var(--mat-sys-primary);
}`,
    },
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
│   ├── app.ts                  # raíz: toolbar + router-outlet
│   ├── app.html
│   ├── app.routes.ts           # '', 'cronometro', 'saludo'
│   ├── app.config.ts           # provideRouter(routes)
│   ├── barra-navegacion/       # mat-toolbar con routerLink (ej. 6)
│   ├── menu/                   # menú principal (ej. 1)
│   ├── saludo/                 # alerta + botón volver (ej. 1)
│   ├── cronometro/             # contador, pausa, lapsos (ej. 2-5)
│   ├── lapso/                  # componente hijo (ej. 4-5)
│   └── formato.ts              # función h:mm:ss compartida (ej. 5)
└── package.json`,
  consejos: [
    'Empieza por el router y el menú: con las rutas creadas, cada punto siguiente es añadir código a una pantalla.',
    'El cronómetro es el corazón del examen: play() con un único setInterval y guarda su id para limpiarlo en pausar().',
    'Para los lapsos, guarda el segundo en que registraste el último: lapso = segundos() - ultimoLapso. Es el error más habitual.',
    'El formato h:mm:ss va en formato.ts y lo usan el contador y el componente lapso: si lo duplicas, se te olvidará en uno de los dos.',
    'El componente lapso recibe los segundos con input.required<number>() y formatea dentro; el padre solo le pasa el número.',
    'No olvides ngOnDestroy con clearInterval: si no, el contador sigue corriendo aunque cambies de ruta.',
    'Reserva los últimos 10 minutos para repasar la rúbrica punto por punto: hay 0,25 y 0,5 que se pierden por detalles.',
  ],
};
