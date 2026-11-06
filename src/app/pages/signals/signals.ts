import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { CalloutComponent } from '../../shared/callout/callout';
import { ChapterNavComponent } from '../../shared/chapter-nav/chapter-nav';
import { CodeBlockComponent } from '../../shared/code-block/code-block';
import { SectionHeaderComponent } from '../../shared/section-header/section-header';

interface ApiSignal {
  readonly name: string;
  readonly signature: string;
  readonly description: string;
  readonly icon: string;
}

@Component({
  selector: 'app-signals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    CodeBlockComponent,
    CalloutComponent,
    ChapterNavComponent,
    SectionHeaderComponent,
  ],
  styleUrl: './signals.scss',
  template: `
    <div class="adl-route">
      <app-section-header
        icon="bolt"
        eyebrow="Fundamentos · Capítulo 5"
        title="Signals y reactividad"
        description="Los signals son el sistema reactivo de Angular: un valor que avisa a todo lo que depende de él cuando cambia. Con computed() y effect() se construyen interfaces que se actualizan solas."
        level="intermedio"
        [minutes]="15"
      />

      <section aria-labelledby="que-son">
        <h2 id="que-son">¿Qué es un signal?</h2>
        <p class="adl-text">
          Un signal es un <strong>contenedor de un valor</strong> que notifica a sus consumidores
          cuando ese valor cambia. Angular sabe exactamente qué partes de la aplicación lo leen y
          solo actualiza esas, sin revisar componente por componente.
        </p>

        <div class="signal-flow">
          <div class="sf-node source">
            <span class="sf-tag">signal</span>
            <strong>contador</strong>
            <code>{{ contador() }}</code>
          </div>
          <div class="sf-line" aria-hidden="true"></div>
          <div class="sf-node derived">
            <span class="sf-tag">computed</span>
            <strong>doble</strong>
            <code>{{ doble() }}</code>
          </div>
          <div class="sf-line" aria-hidden="true"></div>
          <div class="sf-node view">
            <span class="sf-tag">template</span>
            <strong>vista</strong>
            <code>&#123;&#123; doble() &#125;&#125;</code>
          </div>
        </div>

        <app-code-block language="ts" filename="contador.ts" [code]="basico" />
      </section>

      <section aria-labelledby="demo">
        <h2 id="demo">Demostración en vivo</h2>
        <p class="adl-text">
          Este contador es un componente real de la web: usa
          <code class="adl-inline-code">signal()</code>,
          <code class="adl-inline-code">computed()</code> y
          <code class="adl-inline-code">effect()</code> exactamente como se explica.
        </p>

        <div class="counter-demo">
          <div class="counter-main">
            <header>
              <span class="live-pill"><i></i> en vivo</span>
              <h3>Contador con signals</h3>
            </header>

            <div class="counter-value" aria-live="polite">{{ contador() }}</div>

            <mat-progress-bar
              class="counter-bar"
              mode="determinate"
              [value]="progreso()"
              aria-label="Progreso del contador"
            />

            <div class="counter-stats">
              <div>
                <span class="stat-label">doble (computed)</span>
                <strong>{{ doble() }}</strong>
              </div>
              <div>
                <span class="stat-label">cuadrado (computed)</span>
                <strong>{{ cuadrado() }}</strong>
              </div>
              <div>
                <span class="stat-label">par / impar</span>
                <strong>{{ esPar() ? 'par' : 'impar' }}</strong>
              </div>
              <div>
                <span class="stat-label">efecto ejecutado</span>
                <strong>{{ efectoEjecuciones() }}×</strong>
              </div>
            </div>

            <div class="counter-actions">
              <button matButton="filled" type="button" (click)="incrementar()">
                <mat-icon>add</mat-icon> Incrementar
              </button>
              <button matButton="tonal" type="button" (click)="decrementar()">
                <mat-icon>remove</mat-icon> Decrementar
              </button>
              <button matButton="outlined" type="button" (click)="reiniciar()">
                <mat-icon>restart_alt</mat-icon> Reiniciar
              </button>
            </div>

            <div class="counter-extra">
              <mat-slide-toggle [checked]="pasoDoble()" (change)="pasoDoble.set($event.checked)">
                Sumar de 2 en 2 (paso = {{ paso() }})
              </mat-slide-toggle>
            </div>
          </div>

          <aside class="counter-log" aria-label="Registro del efecto">
            <header>
              <mat-icon>terminal</mat-icon>
              <span>effect() → consola</span>
            </header>
            <ol>
              @for (line of log(); track line.id) {
                <li>{{ line.text }}</li>
              } @empty {
                <li class="empty">Cambia el contador para ver los efectos…</li>
              }
            </ol>
          </aside>
        </div>

        <app-callout type="info" label="Cómo funciona este ejemplo">
          <p>
            <code>contador</code> es un <code>signal(0)</code>. <code>doble</code> y
            <code>cuadrado</code> son <code>computed()</code>: se recalculan solo cuando cambia
            <code>contador</code> y están memoizados, así que leerlos varias veces no cuesta nada.
            El <code>effect()</code> escribe en el registro cada vez que cambia el valor del que
            depende.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="api">
        <h2 id="api">La API, en orden</h2>
        <div class="api-grid">
          @for (api of apis; track api.name) {
            <article class="api-card">
              <div class="api-head">
                <mat-icon>{{ api.icon }}</mat-icon>
                <code>{{ api.signature }}</code>
              </div>
              <strong>{{ api.name }}</strong>
              <p>{{ api.description }}</p>
            </article>
          }
        </div>
      </section>

      <section aria-labelledby="set">
        <h2 id="set">Leer, asignar y actualizar</h2>
        <p class="adl-text">
          Para leer un signal se llama como una función: <code class="adl-inline-code">contador()</code>.
          Para escribir hay dos métodos con propósitos distintos.
        </p>

        <div class="two-col">
          <div>
            <h3>set(): sustituir</h3>
            <p class="adl-text">Asigna un valor nuevo, sin mirar el anterior.</p>
            <app-code-block language="ts" filename="set.ts" [code]="setEjemplo" />
          </div>
          <div>
            <h3>update(): transformar</h3>
            <p class="adl-text">Calcula el siguiente valor a partir del actual.</p>
            <app-code-block language="ts" filename="update.ts" [code]="updateEjemplo" />
          </div>
        </div>

        <app-callout type="warning">
          <p>
            <code>update()</code> es la opción segura cuando el valor nuevo depende del anterior: dos
            actualizaciones rápidas no se pisan. Con objetos y arrays recuerda que el signal compara
            por referencia: crea un objeto nuevo (<code>&#123; ...estado, nombre &#125;</code>) en
            lugar de mutarlo.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="computed">
        <h2 id="computed">computed(): valores derivados</h2>
        <p class="adl-text">
          Un <code class="adl-inline-code">computed()</code> declara una dependencia: «este valor se
          obtiene a partir de estos signals». Es de <strong>solo lectura</strong>, se recalcula de
          forma perezosa y solo cuando alguna dependencia cambia.
        </p>

        <app-code-block language="ts" filename="carrito.ts" [code]="computedEjemplo" />

        <div class="computed-cards">
          <div class="cc">
            <mat-icon>bolt</mat-icon>
            <strong>Perezoso</strong>
            <p>Si nadie lo lee, no se calcula. Se memoiza hasta que cambie una dependencia.</p>
          </div>
          <div class="cc">
            <mat-icon>functions</mat-icon>
            <strong>Componible</strong>
            <p>Un computed puede depender de otros computed: se forma un grafo de dependencias.</p>
          </div>
          <div class="cc">
            <mat-icon>lock</mat-icon>
            <strong>Solo lectura</strong>
            <p>No tiene set() ni update(). Si necesitas escribir, es un signal normal.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="effect">
        <h2 id="effect">effect(): efectos secundarios</h2>
        <p class="adl-text">
          Un <code class="adl-inline-code">effect()</code> ejecuta código cuando cambian los signals
          que lee. Se registra en el constructor o en un contexto de inyección y se destruye
          automáticamente con el componente.
        </p>

        <app-code-block language="ts" filename="tema.ts" [code]="effectEjemplo" />

        <div class="use-cases">
          <p class="use-title">Usos legítimos</p>
          <ul class="adl-list">
            <li>Registrar en consola o enviar telemetría.</li>
            <li>Sincronizar con algo externo: <code class="adl-inline-code">localStorage</code>, título del documento, IndexedDB.</li>
            <li>Integrar APIs no reactivas que necesitan reaccionar a un valor.</li>
          </ul>
          <p class="use-title bad">Malos usos</p>
          <ul class="adl-list">
            <li>Calcular valores derivados: para eso está <code class="adl-inline-code">computed()</code>.</li>
            <li>Cambiar otro signal dentro de un effect para «sincronizar» estado.</li>
            <li>Sustituir la lógica del evento que originó el cambio.</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="otros">
        <h2 id="otros">Más allá: linkedSignal, toSignal y resource</h2>
        <p class="adl-text">
          La familia de signals crece rápido. Estas tres utilidades resuelven tres problemas muy
          concretos:
        </p>

        <div class="advanced-grid">
          @for (item of avanzados; track item.name) {
            <article>
              <code>{{ item.name }}</code>
              <strong>{{ item.title }}</strong>
              <p>{{ item.text }}</p>
            </article>
          }
        </div>

        <app-code-block language="ts" filename="recursos.ts" [code]="avanzadoEjemplo" />
      </section>

      <section aria-labelledby="ventajas">
        <h2 id="ventajas">¿Por qué signals y no solo variables?</h2>
        <div class="why-grid">
          @for (item of ventajas; track item.title) {
            <article>
              <mat-icon>{{ item.icon }}</mat-icon>
              <div>
                <strong>{{ item.title }}</strong>
                <p>{{ item.text }}</p>
              </div>
            </article>
          }
        </div>

        <app-callout type="angular" label="Resumen">
          <ul>
            <li><code>signal(valor)</code> crea estado reactivo y <code>signal()</code> lo lee.</li>
            <li><code>set()</code> asigna; <code>update()</code> modifica a partir del valor anterior.</li>
            <li><code>computed()</code> deriva valores de forma memoizada y de solo lectura.</li>
            <li><code>effect()</code> ejecuta efectos secundarios cuando cambian sus dependencias.</li>
          </ul>
        </app-callout>
      </section>

      <app-chapter-nav route="/signals" />
    </div>
  `,
})
export class SignalsPage {
  protected readonly contador = signal(0);
  protected readonly pasoDoble = signal(false);
  protected readonly efectoEjecuciones = signal(0);
  protected readonly log = signal<{ id: number; text: string }[]>([]);

  protected readonly paso = computed(() => (this.pasoDoble() ? 2 : 1));
  protected readonly doble = computed(() => this.contador() * 2);
  protected readonly cuadrado = computed(() => this.contador() ** 2);
  protected readonly esPar = computed(() => this.contador() % 2 === 0);
  protected readonly progreso = computed(() => Math.min(100, Math.abs(this.contador()) * 5));

  private logId = 0;

  constructor() {
    effect(() => {
      const valor = this.contador();
      this.efectoEjecuciones.update((n) => n + 1);
      this.log.update((entries) =>
        [
          {
            id: ++this.logId,
            text: `contador() → ${valor} · doble → ${valor * 2} · ${valor % 2 === 0 ? 'par' : 'impar'}`,
          },
          ...entries,
        ].slice(0, 7),
      );
    });
  }

  protected incrementar(): void {
    this.contador.update((valor) => valor + this.paso());
  }

  protected decrementar(): void {
    this.contador.update((valor) => valor - this.paso());
  }

  protected reiniciar(): void {
    this.contador.set(0);
  }

  protected readonly basico = `import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.html',
  styleUrl: './contador.scss',
})
export class Contador {
  contador = signal(0);
  doble = computed(() => this.contador() * 2);
}

<!-- contador.html -->
<p>Valor: {{ contador() }}</p>
<p>Doble: {{ doble() }}</p>`;

  protected readonly apis: readonly ApiSignal[] = [
    {
      name: 'Crear',
      signature: 'signal(valorInicial)',
      description: 'Devuelve un WritableSignal: un contenedor reactivo susceptible de cambios.',
      icon: 'add_circle',
    },
    {
      name: 'Leer',
      signature: 'miSignal()',
      description: 'Se invoca como función. Angular registra al lector como consumidor.',
      icon: 'visibility',
    },
    {
      name: 'Asignar',
      signature: 'miSignal.set(valor)',
      description: 'Sustituye el valor actual por el indicado.',
      icon: 'edit',
    },
    {
      name: 'Actualizar',
      signature: 'miSignal.update(fn)',
      description: 'Recibe el valor anterior y devuelve el nuevo.',
      icon: 'trending_up',
    },
    {
      name: 'Derivar',
      signature: 'computed(fn)',
      description: 'Valor calculado y memoizado, de solo lectura.',
      icon: 'functions',
    },
    {
      name: 'Reaccionar',
      signature: 'effect(fn)',
      description: 'Ejecuta un efecto secundario cuando cambian sus dependencias.',
      icon: 'bolt',
    },
  ];

  protected readonly setEjemplo = `contador = signal(0);

reiniciar() {
  this.contador.set(0);
}

// También sirve para un objeto completo
usuario = signal({ nombre: 'Ana', rol: 'admin' });
cambiarRol() {
  this.usuario.set({ nombre: 'Ana', rol: 'editor' });
}`;

  protected readonly updateEjemplo = `incrementar() {
  this.contador.update(valor => valor + 1);
}

decrementar() {
  this.contador.update(valor => valor - 1);
}

// Muy útil con arrays inmutables
agregar(nuevo: Tarea) {
  this.tareas.update(lista => [...lista, nuevo]);
}`;

  protected readonly computedEjemplo = `import { Component, computed, signal } from '@angular/core';

interface Producto {
  nombre: string;
  precio: number;
  cantidad: number;
}

@Component({ selector: 'app-carrito', templateUrl: './carrito.html' })
export class Carrito {
  productos = signal<Producto[]>([
    { nombre: 'Teclado', precio: 49, cantidad: 2 },
    { nombre: 'Ratón', precio: 25, cantidad: 1 },
  ]);

  readonly iva = 0.21;

  subtotal = computed(() =>
    this.productos().reduce((acc, p) => acc + p.precio * p.cantidad, 0),
  );

  total = computed(() => this.subtotal() * (1 + this.iva));

  numeroArticulos = computed(() =>
    this.productos().reduce((acc, p) => acc + p.cantidad, 0),
  );

  agregar(p: Producto) {
    this.productos.update(lista => [...lista, p]);
  }
}`;

  protected readonly effectEjemplo = `import { Component, effect, inject, signal } from '@angular/core';

@Component({ selector: 'app-tema', templateUrl: './tema.html' })
export class Tema {
  modo = signal<'light' | 'dark'>('light');

  constructor() {
    effect(() => {
      // Se ejecuta al crear el componente y cada vez que cambia modo()
      document.documentElement.classList.toggle('dark-theme', this.modo() === 'dark');
      localStorage.setItem('tema', this.modo());
    });
  }

  cambiar() {
    this.modo.update(m => (m === 'light' ? 'dark' : 'light'));
  }
}`;

  protected readonly avanzados = [
    {
      name: 'linkedSignal()',
      title: 'Estado que se reinicia',
      text: 'Un signal escribible derivado de otro: se reinicia cuando cambia su fuente, pero admite escritura mientras tanto. Ideal para selecciones dependientes.',
    },
    {
      name: 'toSignal()',
      title: 'De RxJS a signal',
      text: 'Convierte un Observable en signal. Es la forma estándar de consumir peticiones HTTP o parámetros de ruta en componentes basados en signals.',
    },
    {
      name: 'resource()',
      title: 'Carga asíncrona',
      text: 'Gestiona peticiones asíncronas con estados de carga, error y valor, y se recarga cuando cambian sus parámetros.',
    },
  ];

  protected readonly avanzadoEjemplo = `import { Component, inject, input, resource } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

@Component({ selector: 'app-usuario', template: './usuario.html' })
export class Usuario {
  private http = inject(HttpClient);

  // Parámetro de ruta como signal
  id = input.required<string>();

  // Petición que se repite cuando cambia id()
  usuario = resource({
    params: () => ({ id: this.id() }),
    loader: ({ params }) =>
      fetch(\`https://api.ejemplo.com/usuarios/\${params.id}\`).then(r => r.json()),
  });
}

<!-- usuario.html -->
@if (usuario.isLoading()) {
  <mat-spinner diameter="32" />
} @else if (usuario.error()) {
  <p>No se pudo cargar.</p>
} @else {
  <h2>{{ usuario.value()?.nombre }}</h2>
}`;

  protected readonly ventajas = [
    {
      icon: 'speed',
      title: 'Actualizaciones precisas',
      text: 'Angular actualiza solo los nodos del DOM que dependen del signal modificado, sin recorrer todo el árbol de componentes.',
    },
    {
      icon: 'verified',
      title: 'Funciona sin zone.js',
      text: 'Con signals, Angular sabe que algo cambió sin parchear APIs del navegador. Es la base de los proyectos zoneless creados por el CLI.',
    },
    {
      icon: 'functions',
      title: 'Menos estado duplicado',
      text: 'computed() elimina variables que se recalculaban a mano en cada ngOnInit o ngOnChanges.',
    },
    {
      icon: 'bug_report',
      title: 'Depuración sencilla',
      text: 'Un signal es un valor normal: se inspecciona con console.log, se tipa y se testea sin herramientas especiales.',
    },
  ];
}
