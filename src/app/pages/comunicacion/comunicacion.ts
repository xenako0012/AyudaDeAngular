import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { CalloutComponent } from '../../shared/callout/callout';
import { ChapterNavComponent } from '../../shared/chapter-nav/chapter-nav';
import { CodeBlockComponent } from '../../shared/code-block/code-block';
import { SectionHeaderComponent } from '../../shared/section-header/section-header';
import { DemoHijoComponent } from './demo-hijo/demo-hijo';

@Component({
  selector: 'app-comunicacion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    DemoHijoComponent,
    CodeBlockComponent,
    CalloutComponent,
    ChapterNavComponent,
    SectionHeaderComponent,
  ],
  styleUrl: './comunicacion.scss',
  template: `
    <div class="adl-route">
      <app-section-header
        icon="swap_horiz"
        eyebrow="Aplicaciones completas · Capítulo 8"
        title="Comunicación entre componentes"
        description="Los componentes se comunican de padre a hijo con inputs y de hijo a padre con outputs. Angular 22 ofrece APIs basadas en signals, pero la API clásica sigue existiendo en todos los proyectos."
        level="intermedio"
        [minutes]="12"
      />

      <section aria-labelledby="resumen">
        <h2 id="resumen">Las dos direcciones</h2>
        <div class="direction-cards">
          <article class="dir-card down">
            <header>
              <mat-icon>south</mat-icon>
              <span>Padre → Hijo</span>
            </header>
            <code>input() · input.required() · model()</code>
            <p>
              El padre pasa datos al hijo mediante <em>property binding</em>:
              <code class="adl-inline-code">[mensaje]="texto"</code>.
            </p>
          </article>
          <article class="dir-card up">
            <header>
              <mat-icon>north</mat-icon>
              <span>Hijo → Padre</span>
            </header>
            <code>output() · EventEmitter</code>
            <p>
              El hijo emite eventos que el padre escucha:
              <code class="adl-inline-code">(responder)="manejar($event)"</code>.
            </p>
          </article>
        </div>
      </section>

      <section aria-labelledby="live">
        <h2 id="live">Playground padre ↔ hijo</h2>
        <p class="adl-text">
          Este bloque es un componente real: <code class="adl-inline-code">demo-hijo</code> recibe
          <code class="adl-inline-code">input()</code>, emite con
          <code class="adl-inline-code">output()</code> y sincroniza la puntuación con
          <code class="adl-inline-code">model()</code>.
        </p>

        <div class="playground">
          <header class="pg-head">
            <span class="pg-badge">&lt;app-comunicacion&gt; · padre</span>
          </header>

          <div class="pg-controls">
            <div class="pg-field">
              <label for="pg-mensaje">[mensaje] que envío al hijo</label>
              <input id="pg-mensaje" type="text" [(ngModel)]="mensaje" />
            </div>
            <div class="pg-field">
              <label for="pg-saludo">[saludo] (obligatorio)</label>
              <input id="pg-saludo" type="text" [(ngModel)]="saludo" />
            </div>
          </div>

          <div class="pg-child">
            <demo-hijo
              [mensaje]="mensaje()"
              [saludo]="saludo()"
              [(puntuacion)]="puntuacion"
              (responder)="onResponder($event)"
              (contar)="onContar($event)"
            />
          </div>

          <div class="pg-state">
            <div class="pg-state-item">
              <span>[(puntuacion)] en el padre</span>
              <strong>{{ puntuacion() }}</strong>
            </div>
            <div class="pg-state-item">
              <span>contador de eventos</span>
              <strong>{{ contador() }}</strong>
            </div>
            <div class="pg-state-item wide">
              <span>último evento (responder)</span>
              <strong class="event-text">{{ ultimoEvento() || '—' }}</strong>
            </div>
          </div>
        </div>

        <app-callout type="tip" label="Qué observar">
          <p>
            Al escribir en el input del padre, el hijo se actualiza al instante (input). Al pulsar
            una estrella, el valor viaja al padre sin que este escuche ningún evento: es
            <code>model()</code>. Al pulsar «Emitir al padre», el hijo dispara
            <code>output()</code> y el padre actualiza su estado.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="api-moderna">
        <h2 id="api-moderna">API moderna: input() y output()</h2>
        <p class="adl-text">
          Basadas en signals, declarativas y con tipado estricto. Se declaran como propiedades de la
          clase sin decoradores.
        </p>

        <app-code-block language="ts" filename="hijo.ts" [code]="hijoModerno" />
        <app-code-block language="html" filename="padre.html" [code]="padreHtml" />

        <div class="api-table">
          <table>
            <thead>
              <tr>
                <th scope="col">API</th>
                <th scope="col">Para qué</th>
                <th scope="col">Detalle</th>
              </tr>
            </thead>
            <tbody>
              @for (row of apiRows; track row.api) {
                <tr>
                  <td><code class="adl-inline-code">{{ row.api }}</code></td>
                  <td>{{ row.use }}</td>
                  <td>{{ row.detail }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <h3>Valores derivados a partir de un input</h3>
        <p class="adl-text">
          Con signals, un <code class="adl-inline-code">computed()</code> reacciona al input. Ya no
          hace falta <code class="adl-inline-code">ngOnChanges</code> para recalcular nada.
        </p>
        <app-code-block language="ts" filename="precio.ts" [code]="computedInput" />
      </section>

      <section aria-labelledby="clasica">
        <h2 id="clasica">API clásica: &#64;Input() y &#64;Output()</h2>
        <p class="adl-text">
          Sigue funcionando y aparece en la mayoría de proyectos existentes y de librerías. Es
          importante reconocerla y saber cuándo convive con la nueva API.
        </p>

        <div class="two-col">
          <div>
            <h3>&#64;Input()</h3>
            <app-code-block language="ts" filename="hijo.ts" [code]="hijoClasico" />
          </div>
          <div>
            <h3>&#64;Output() + EventEmitter</h3>
            <app-code-block language="ts" filename="hijo.ts" [code]="outputClasico" />
          </div>
        </div>

        <app-code-block language="html" filename="padre.html" [code]="padreClasico" />

        <app-callout type="warning" label="Migración">
          <p>
            La API clásica no está deprecada, pero la moderna es preferible en código nuevo: es más
            sencilla de tipar, funciona mejor con detección de cambios sin zonas y evita el
            <code>ngOnChanges</code>. Puedes tener ambas en el mismo componente durante una
            migración gradual.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="otros">
        <h2 id="otros">Cuando no son padre e hijo</h2>
        <p class="adl-text">
          Los inputs y outputs resuelven la comunicación directa. Para el resto hay tres patrones
          habituales:
        </p>

        <div class="patterns">
          @for (pattern of patrones; track pattern.title) {
            <article>
              <mat-icon>{{ pattern.icon }}</mat-icon>
              <div>
                <strong>{{ pattern.title }}</strong>
                <p>{{ pattern.text }}</p>
                <code>{{ pattern.code }}</code>
              </div>
            </article>
          }
        </div>

        <app-code-block language="ts" filename="estado.service.ts" [code]="servicioEstado" />
      </section>

      <section aria-labelledby="errores">
        <h2 id="errores">Errores típicos</h2>
        <ul class="adl-list">
          <li>
            <strong>NG8002: Can't bind to 'mensaje'</strong> — el componente hijo no declara ese
            input, o su nombre difiere (Angular distingue mayúsculas).
          </li>
          <li>
            <strong>El input llega undefined</strong> — con
            <code class="adl-inline-code">input.required()</code> el compilador avisa; con
            <code class="adl-inline-code">input()</code> hay un valor por defecto. En la API clásica,
            usa <code class="adl-inline-code">&#64;Input(&#123; required: true &#125;)</code> o el
            operador <code class="adl-inline-code">!</code>.
          </li>
          <li>
            <strong>Mutar un array en el hijo</strong> — los inputs son de solo lectura. Si el hijo
            necesita modificar datos, debe emitir un evento y que el padre actualice el estado.
          </li>
          <li>
            <strong>Suscribirse sin desuscribirse</strong> — en componentes clásicos, usa
            <code class="adl-inline-code">takeUntilDestroyed()</code> o el patrón
            <code class="adl-inline-code">DestroyRef</code>.
          </li>
        </ul>
      </section>

      <app-chapter-nav route="/comunicacion" />
    </div>
  `,
})
export class ComunicacionPage {
  protected readonly mensaje = signal('Hola desde el padre');
  protected readonly saludo = signal('👋');
  protected readonly puntuacion = signal(3);
  protected readonly contador = signal(0);
  protected readonly ultimoEvento = signal('');

  protected onResponder(texto: string): void {
    this.ultimoEvento.set(texto);
    this.contador.update((n) => n + 1);
  }

  protected onContar(valor: number): void {
    this.contador.update((n) => n + valor);
  }

  protected readonly apiRows = [
    { api: 'input()', use: 'Input opcional', detail: 'Devuelve un InputSignal; se lee como función. Admiten valor por defecto, alias y transform.' },
    { api: 'input.required<T>()', use: 'Input obligatorio', detail: 'El compilador exige que el padre lo pase. No tiene valor inicial.' },
    { api: 'model()', use: 'Two-way binding', detail: 'Un input escribible con un output implícito (nameChange). Se consume con [(valor)].' },
    { api: 'output()', use: 'Emitir eventos', detail: 'Crea un OutputEmitterRef con emit(). Sin EventEmitter y sin suscripciones manuales.' },
    { api: 'viewChild()', use: 'Acceso al DOM', detail: 'Sustituye a @ViewChild: obtiene una referencia a un elemento o componente hijo.' },
    { api: 'contentChild()', use: 'Contenido proyectado', detail: 'Sustituye a @ContentChild para el contenido que el padre proyecta con ng-content.' },
  ];

  protected readonly hijoModerno = `import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-hijo',
  template: \`
    <p>{{ mensaje() }}</p>
    <button (click)="enviar()">Enviar</button>
  \`,
})
export class Hijo {
  // Input opcional con valor por defecto
  mensaje = input('Hola');

  // Input obligatorio
  titulo = input.required<string>();

  // Output tipado
  notificar = output<string>();

  enviar() {
    this.notificar.emit('Mensaje desde el hijo');
  }
}`;

  protected readonly padreHtml = `<app-hijo
  [mensaje]="'Hola desde el padre'"
  titulo="Panel"
  (notificar)="manejarEvento($event)" />

<!-- manejarEvento -->
manejarEvento(texto: string) {
  console.log('Recibido del hijo:', texto);
}`;

  protected readonly computedInput = `import { Component, computed, input } from '@angular/core';

@Component({ selector: 'app-precio', template: './precio.html' })
export class Precio {
  base = input.required<number>();
  descuento = input(0);

  // Se recalcula solo cuando cambian los inputs
  total = computed(() =>
    this.base() * (1 - this.descuento() / 100),
  );

  iva = computed(() => this.total() * 0.21);
}`;

  protected readonly hijoClasico = `import { Component, Input } from '@angular/core';

@Component({ selector: 'app-hijo', template: './hijo.html' })
export class Hijo {
  // Con ! si el padre siempre lo pasa
  @Input() mensaje!: string;

  // Con valor por defecto
  @Input() titulo = 'Panel';
}`;

  protected readonly outputClasico = `import { Component, Output, EventEmitter } from '@angular/core';

@Component({ selector: 'app-hijo', template: './hijo.html' })
export class Hijo {
  @Output() notificar = new EventEmitter<string>();

  emitirEvento() {
    this.notificar.emit('Mensaje desde el hijo');
  }
}`;

  protected readonly padreClasico = `<app-hijo
  [mensaje]="'Hola desde el padre'"
  (notificar)="manejarEvento($event)" />

// En el padre
manejarEvento(mensaje: string) {
  console.log('Recibido del hijo:', mensaje);
}`;

  protected readonly patrones = [
    {
      icon: 'hub',
      title: 'Servicio compartido con signals',
      text: 'El patrón recomendado cuando los componentes no tienen relación directa. Un servicio providedIn: root guarda el estado en signals y cualquier componente lo lee o lo modifica.',
      code: 'estado.service.ts → inject(EstadoService)',
    },
    {
      icon: 'account_tree',
      title: 'Router / parámetros de URL',
      text: 'Si el «estado» es en realidad navegación, la URL es la fuente de verdad: parámetros, query params y el servicio Router.',
      code: "router.navigate(['/detalle', id])",
    },
    {
      icon: 'sync',
      title: 'RxJS para flujos complejos',
      text: 'Eventos que se combinan, se cancelan o se debouncean. Se convive con signals mediante toSignal() y toObservable().',
      code: 'busqueda$ = toObservable(this.texto).pipe(debounceTime(300))',
    },
  ];

  protected readonly servicioEstado = `import { Injectable, computed, signal } from '@angular/core';

export interface Item {
  id: number;
  nombre: string;
  hecho: boolean;
}

@Injectable({ providedIn: 'root' })
export class TareasService {
  private readonly _items = signal<Item[]>([]);

  readonly items = this._items.asReadonly();
  readonly pendientes = computed(() => this._items().filter(i => !i.hecho).length);

  agregar(nombre: string) {
    this._items.update(items => [
      ...items,
      { id: crypto.randomUUID() as unknown as number, nombre, hecho: false },
    ]);
  }

  alternar(id: number) {
    this._items.update(items =>
      items.map(i => (i.id === id ? { ...i, hecho: !i.hecho } : i)),
    );
  }
}`;
}
