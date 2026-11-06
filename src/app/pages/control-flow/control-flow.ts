import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';

import { CalloutComponent } from '../../shared/callout/callout';
import { ChapterNavComponent } from '../../shared/chapter-nav/chapter-nav';
import { CodeBlockComponent } from '../../shared/code-block/code-block';
import { SectionHeaderComponent } from '../../shared/section-header/section-header';

interface Tarea {
  readonly id: number;
  readonly titulo: string;
  readonly prioridad: 'alta' | 'media' | 'baja';
  readonly hecha: boolean;
}

@Component({
  selector: 'app-control-flow',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSlideToggleModule,
    CodeBlockComponent,
    CalloutComponent,
    ChapterNavComponent,
    SectionHeaderComponent,
  ],
  styleUrl: './control-flow.scss',
  template: `
    <div class="adl-route">
      <app-section-header
        icon="alt_route"
        eyebrow="Fundamentos · Capítulo 6"
        title="Control flow: &#64;if y &#64;for"
        description="Desde Angular 17 las plantillas tienen bucles y condicionales propios: @if, @else, @for con track, @empty y @switch. Son sintaxis del compilador, no directivas."
        level="inicial"
        [minutes]="13"
      />

      <section aria-labelledby="intro">
        <h2 id="intro">Un cambio de sintaxis, no de concepto</h2>
        <p class="adl-text">
          Antes, para condicionar o repetir HTML se usaban directivas estructurales
          (<code class="adl-inline-code">*ngIf</code>,
          <code class="adl-inline-code">*ngFor</code>) que había que importar desde
          <code class="adl-inline-code">CommonModule</code>. Ahora los bloques
          <strong>forman parte del lenguaje de plantillas</strong>: el compilador los entiende, no
          hace falta importar nada y el tipado es más estricto.
        </p>

        <div class="before-after">
          <div class="ba-col old">
            <header><span>Antiguo</span> directivas estructurales</header>
            <app-code-block language="html" filename="antes.html" [code]="antiguoIf" />
          </div>
          <div class="ba-col new">
            <header><span>Actual</span> control flow nativo</header>
            <app-code-block language="html" filename="ahora.html" [code]="nuevoIf" />
          </div>
        </div>

        <app-callout type="info">
          <p>
            Las directivas antiguas <strong>siguen funcionando</strong> para no romper código
            existente, pero en proyectos nuevos no se usan. Si necesitas migrar, el CLI incluye el
            schematic <code>ng generate &#64;angular/core:control-flow</code>.
          </p>
        </app-callout>
      </section>

      <!-- ==================== @if ==================== -->
      <section aria-labelledby="if">
        <h2 id="if">&#64;if: renderizado condicional</h2>
        <p class="adl-text">
          Renderiza el bloque solo si la condición es verdadera. Admite
          <code class="adl-inline-code">&#64;else if</code> y
          <code class="adl-inline-code">&#64;else</code>, y no crea el DOM cuando la condición es
          falsa (a diferencia de esconderlo con CSS).
        </p>

        <app-code-block language="html" filename="plantilla" [code]="ifEjemplo" />

        <div class="demo">
          <div class="demo-head">
            <h3><mat-icon>science</mat-icon> Pruébalo</h3>
            <mat-slide-toggle [checked]="logueado()" (change)="logueado.set($event.checked)">
              Sesión iniciada
            </mat-slide-toggle>
          </div>

          <div class="demo-stage">
            @if (logueado()) {
              <div class="panel-ok">
                <mat-icon>check_circle</mat-icon>
                <div>
                  <strong>Bienvenida, Ana</strong>
                  <p>Tienes 3 tareas pendientes y un mensaje sin leer.</p>
                </div>
              </div>
            } @else {
              <div class="panel-empty">
                <mat-icon>lock</mat-icon>
                <div>
                  <strong>No has iniciado sesión</strong>
                  <p>Inicia sesión para ver tu panel de tareas.</p>
                </div>
              </div>
            }
          </div>
        </div>

        <h3>&#64;else if y variables de bloque</h3>
        <p class="adl-text">
          Puedes encadenar condiciones y guardar el resultado de la expresión con
          <code class="adl-inline-code">as</code>, evitando repetir la comprobación dentro del
          bloque.
        </p>
        <app-code-block language="html" filename="plantilla" [code]="elseIfEjemplo" />
      </section>

      <!-- ==================== @for ==================== -->
      <section aria-labelledby="for">
        <h2 id="for">&#64;for: iterar colecciones</h2>
        <p class="adl-text">
          El bucle exige <code class="adl-inline-code">track</code>: Angular necesita una clave
          estable para saber qué elemento es cuál entre re-renderizados. Con listas de objetos usa
          una propiedad única; con listas estáticas,
          <code class="adl-inline-code">$index</code>.
        </p>

        <app-code-block language="html" filename="plantilla" [code]="forEjemplo" />

        <div class="vars-grid">
          @for (v of variablesFor; track v.name) {
            <article>
              <code>{{ v.name }}</code>
              <span>{{ v.text }}</span>
            </article>
          }
        </div>

        <h3>&#64;empty: cuando la lista está vacía</h3>
        <p class="adl-text">
          El bloque <code class="adl-inline-code">&#64;empty</code> sustituye al clásico
          <code class="adl-inline-code">*ngIf="lista.length === 0"</code> y se muestra si la
          colección no tiene elementos.
        </p>

        <div class="demo">
          <div class="demo-head">
            <h3><mat-icon>science</mat-icon> Lista con &#64;for y &#64;empty</h3>
            <button matButton="tonal" type="button" (click)="vaciar()" [disabled]="tareas().length === 0">
              <mat-icon>delete_sweep</mat-icon> Vaciar lista
            </button>
          </div>

          <ul class="task-list">
            @for (tarea of tareas(); track tarea.id; let i = $index, count = $count, first = $first, last = $last) {
              <li [class.done]="tarea.hecha">
                <span class="task-index">{{ i + 1 }}/{{ count }}</span>
                <button
                  matIconButton
                  type="button"
                  class="task-check"
                  (click)="alternar(tarea.id)"
                  [attr.aria-label]="'Marcar ' + tarea.titulo"
                >
                  <mat-icon>{{ tarea.hecha ? 'task_alt' : 'radio_button_unchecked' }}</mat-icon>
                </button>
                <span class="task-title">{{ tarea.titulo }}</span>
                <span class="task-prio" [attr.data-prio]="tarea.prioridad">{{ tarea.prioridad }}</span>
                @if (first) {
                  <span class="task-flag">primera</span>
                }
                @if (last) {
                  <span class="task-flag">última</span>
                }
              </li>
            } @empty {
              <li class="empty-state">
                <mat-icon>inbox</mat-icon>
                <p>No quedan tareas. Añade alguna o recarga la página.</p>
                <button matButton="filled" type="button" (click)="restaurar()">Restaurar tareas</button>
              </li>
            }
          </ul>

          <p class="demo-note">
            Pendientes: <strong>{{ pendientes() }}</strong> · Completadas:
            <strong>{{ completadas() }}</strong>
          </p>
        </div>

        <app-callout type="warning" label="track es obligatorio">
          <p>
            Si olvidas <code>track</code> el compilador falla con un error de plantilla. No es un
            capricho: sin clave Angular destruiría y recrearía los nodos en cada cambio, perdiendo
            el foco y el estado de los controles.
          </p>
        </app-callout>
      </section>

      <!-- ==================== @switch ==================== -->
      <section aria-labelledby="switch">
        <h2 id="switch">&#64;switch: varios casos</h2>
        <p class="adl-text">
          Para tres o más estados excluyentes, <code class="adl-inline-code">&#64;switch</code>
          resulta mucho más limpio que una cadena de
          <code class="adl-inline-code">&#64;else if</code>. Compara con
          <code class="adl-inline-code">===</code>, así que los valores deben coincidir de tipo.
        </p>

        <app-code-block language="html" filename="plantilla" [code]="switchEjemplo" />

        <div class="demo">
          <div class="demo-head">
            <h3><mat-icon>science</mat-icon> Estado del pedido</h3>
          </div>
          <mat-button-toggle-group [value]="estado()" (change)="estado.set($event.value)" hideSingleSelectionIndicator>
            @for (e of estados; track e) {
              <mat-button-toggle [value]="e">{{ e }}</mat-button-toggle>
            }
          </mat-button-toggle-group>

          <div class="demo-stage">
            @switch (estado()) {
              @case ('pendiente') {
                <div class="panel-status warn">
                  <mat-icon>schedule</mat-icon>
                  <div>
                    <strong>Pedido pendiente</strong>
                    <p>Estamos esperando la confirmación del pago.</p>
                  </div>
                </div>
              }
              @case ('enviado') {
                <div class="panel-status info">
                  <mat-icon>local_shipping</mat-icon>
                  <div>
                    <strong>Pedido enviado</strong>
                    <p>Llegará a tu domicilio en 24-48 h.</p>
                  </div>
                </div>
              }
              @case ('entregado') {
                <div class="panel-status ok">
                  <mat-icon>package_2</mat-icon>
                  <div>
                    <strong>Pedido entregado</strong>
                    <p>¡Gracias por tu compra! Puedes valorar el pedido.</p>
                  </div>
                </div>
              }
              @default {
                <div class="panel-status err">
                  <mat-icon>report</mat-icon>
                  <div>
                    <strong>Estado desconocido</strong>
                    <p>{{ estado() }}</p>
                  </div>
                </div>
              }
            }
          </div>
        </div>
      </section>

      <!-- ==================== NOVEDADES 22 ==================== -->
      <section aria-labelledby="novedades">
        <h2 id="novedades">Novedades de Angular 22</h2>
        <div class="novedades">
          @for (item of novedades; track item.title) {
            <article>
              <span class="nov-tag">{{ item.tag }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          }
        </div>
        <app-code-block language="html" filename="novedades.html" [code]="novedadesEjemplo" />
      </section>

      <!-- ==================== COMPARATIVA ==================== -->
      <section aria-labelledby="comparativa">
        <h2 id="comparativa">Comparativa rápida con las directivas antiguas</h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Necesidad</th>
                <th scope="col">Antiguo</th>
                <th scope="col">Actual</th>
                <th scope="col">Import necesario</th>
              </tr>
            </thead>
            <tbody>
              @for (row of comparativa; track row.need) {
                <tr>
                  <td>{{ row.need }}</td>
                  <td><code class="adl-inline-code">{{ row.old }}</code></td>
                  <td><code class="adl-inline-code">{{ row.now }}</code></td>
                  <td>{{ row.imports }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <app-chapter-nav route="/control-flow" />
    </div>
  `,
})
export class ControlFlowPage {
  protected readonly logueado = signal(true);
  protected readonly estado = signal('pendiente');
  protected readonly estados = ['pendiente', 'enviado', 'entregado', 'cancelado'];

  private readonly tareasIniciales: readonly Tarea[] = [
    { id: 1, titulo: 'Revisar pull request de signals', prioridad: 'alta', hecha: false },
    { id: 2, titulo: 'Actualizar dependencias de Angular', prioridad: 'media', hecha: true },
    { id: 3, titulo: 'Documentar el nuevo componente de tabla', prioridad: 'baja', hecha: false },
  ];

  protected readonly tareas = signal<readonly Tarea[]>(this.tareasIniciales);

  protected readonly pendientes = computed(() => this.tareas().filter((t) => !t.hecha).length);
  protected readonly completadas = computed(() => this.tareas().filter((t) => t.hecha).length);

  protected alternar(id: number): void {
    this.tareas.update((lista) =>
      lista.map((tarea) => (tarea.id === id ? { ...tarea, hecha: !tarea.hecha } : tarea)),
    );
  }

  protected vaciar(): void {
    this.tareas.set([]);
  }

  protected restaurar(): void {
    this.tareas.set(this.tareasIniciales);
  }

  protected readonly antiguoIf = `<div *ngIf="esVisible; else noVisible">
  Este contenido es visible
</div>

<ng-template #noVisible>
  <div>Contenido alternativo</div>
</ng-template>

<ul>
  <li *ngFor="let item of lista; let i = index">
    {{ i }} - {{ item }}
  </li>
</ul>`;

  protected readonly nuevoIf = `@if (esVisible) {
  <div>Este contenido es visible</div>
} @else {
  <div>Contenido alternativo</div>
}

<ul>
  @for (item of lista; track item.id) {
    <li>{{ $index }} - {{ item.nombre }}</li>
  }
</ul>`;

  protected readonly ifEjemplo = `@if (esVisible) {
  <div>Este contenido es visible</div>
}

<!-- con alternativa -->
@if (logueado) {
  <p>Bienvenida</p>
} @else {
  <p>Inicia sesión</p>
}

<!-- con condición múltiple y variable -->
@if (usuario(); as user) {
  <p>Hola, {{ user.nombre }}</p>
}`;

  protected readonly elseIfEjemplo = `@if (estado === 'cargando') {
  <p>Cargando…</p>
} @else if (estado === 'error') {
  <p>Ha ocurrido un error.</p>
} @else {
  <p>Datos listos: {{ datos.length }}</p>
}`;

  protected readonly forEjemplo = `<!-- Básico: $index es la posición actual -->
<ul>
  @for (item of lista; track $index) {
    <li>{{ $index }} - {{ item }}</li>
  }
</ul>

<!-- Recomendado con objetos: clave única -->
@for (usuario of usuarios(); track usuario.id) {
  <p>{{ usuario.nombre }}</p>
}

<!-- Con todas las variables del contexto -->
@for (tarea of tareas(); track tarea.id; let i = $index, par = $even, ultima = $last) {
  <li [class.par]="par">{{ i + 1 }}. {{ tarea.titulo }}</li>
}`;

  protected readonly variablesFor = [
    { name: '$index', text: 'Posición del elemento actual (empieza en 0).' },
    { name: '$count', text: 'Número total de elementos de la colección.' },
    { name: '$first', text: 'true si es el primer elemento.' },
    { name: '$last', text: 'true si es el último elemento.' },
    { name: '$even / $odd', text: 'Según la paridad del índice.' },
  ];

  protected readonly switchEjemplo = `@switch (estado()) {
  @case ('pendiente') {
    <p>Esperando pago</p>
  }
  @case ('enviado') {
    <p>En camino</p>
  }
  @case ('entregado') {
    <p>Entregado</p>
  }
  @default {
    <p>Estado desconocido</p>
  }
}`;

  protected readonly novedades = [
    {
      tag: 'Angular 17',
      title: 'Llegan @if, @for y @switch',
      text: 'La nueva sintaxis de control flow se introdujo como developer preview y se estabilizó en la versión 18.',
    },
    {
      tag: 'Angular 19',
      title: 'Standalone por defecto',
      text: 'Los componentes dejan de necesitar NgModule, y por tanto desaparece la necesidad de CommonModule para los bloques de plantilla.',
    },
    {
      tag: 'Angular 22',
      title: 'Variables en bloques y animaciones',
      text: 'Los bloques admiten variables locales propias y conviven con las nuevas APIs animate.enter / animate.leave para animar entradas y salidas sin @angular/animations.',
    },
  ];

  protected readonly novedadesEjemplo = `<!-- Los bloques se anidan y cada uno mantiene su propio contexto -->
@for (grupo of grupos(); track grupo.id) {
  <section>
    <h4>{{ grupo.titulo }}</h4>

    @if (grupo.items.length > 0) {
      @for (item of grupo.items; track item.id) {
        <p>{{ item.nombre }}</p>
      }
    } @else {
      <p>Grupo vacío</p>
    }
  </section>
} @empty {
  <p>No hay grupos todavía.</p>
}`;

  protected readonly comparativa = [
    { need: 'Condicional simple', old: '*ngIf', now: '@if', imports: 'Ninguno con @if · CommonModule antes' },
    { need: 'Condicional con else', old: '*ngIf / ng-template', now: '@else', imports: 'Ninguno' },
    { need: 'Iterar una lista', old: '*ngFor', now: '@for + track', imports: 'Ninguno' },
    { need: 'Lista vacía', old: '*ngIf', now: '@empty', imports: 'Ninguno' },
    { need: 'Múltiples casos', old: 'ngSwitch / ngSwitchCase', now: '@switch / @case', imports: 'CommonModule antes' },
    { need: 'Bloque reutilizable', old: 'ng-template / ngTemplateOutlet', now: 'ng-template + ngTemplateOutlet', imports: 'CommonModule' },
  ];
}
