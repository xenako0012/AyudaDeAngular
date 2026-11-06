import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
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

type Ejemplo = 'interpolacion' | 'property' | 'evento' | 'doble';

@Component({
  selector: 'app-binding',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    DatePipe,
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
  styleUrl: './binding.scss',
  template: `
    <div class="adl-route">
      <app-section-header
        icon="sync_alt"
        eyebrow="Fundamentos · Capítulo 4"
        title="Binding en plantillas"
        description="El binding conecta los datos del componente con la vista y viceversa. Cuatro formas cubren el 95 % de los casos, y las puedes probar aquí mismo."
        level="inicial"
        [minutes]="14"
      />

      <section aria-labelledby="que-es">
        <h2 id="que-es">¿Qué es el binding?</h2>
        <p class="adl-text">
          Un <em>binding</em> es una conexión declarativa entre la plantilla y el componente. En vez
          de manipular el DOM a mano con <code class="adl-inline-code">document.querySelector</code>,
          describes <strong>qué</strong> debe mostrarse y Angular se encarga de actualizarlo cuando
          los datos cambian.
        </p>

        <div class="direction-diagram">
          <div class="node comp">
            <mat-icon>code</mat-icon>
            <strong>Componente</strong>
            <code>nombre = signal('Ana')</code>
          </div>
          <div class="arrow right">
            <span>Interpolación / Property binding</span>
            <i></i>
          </div>
          <div class="arrow left">
            <span>Event binding</span>
            <i></i>
          </div>
          <div class="node view">
            <mat-icon>web</mat-icon>
            <strong>Plantilla (DOM)</strong>
            <code>&lt;p&gt;Ana&lt;/p&gt;</code>
          </div>
        </div>

        <app-callout type="angular">
          <p>
            Regla mental: los <strong>corchetes</strong> <code>[ ]</code> llevan datos
            <em>del componente a la vista</em>; los <strong>paréntesis</strong>
            <code>( )</code> llevan eventos <em>de la vista al componente</em>. Los dos juntos,
            <code>[( )]</code>, son el <em>banana in a box</em>: two-way binding.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="tipos">
        <h2 id="tipos">Los cuatro tipos de binding</h2>

        <mat-tab-group
          class="binding-tabs"
          animationDuration="220ms"
          [preserveContent]="true"
          [selectedIndex]="tabIndex()"
          (selectedIndexChange)="tabIndex.set($event)"
        >
          <!-- ========== INTERPOLACIÓN ========== -->
          <mat-tab label="Interpolación">
            <div class="tab-body">
              <p class="adl-text">
                <code class="adl-inline-code">{{ '{{ expresión }}' }}</code> evalúa una expresión y
                la inserta como texto. Puede contener operadores, llamadas a métodos y pipes.
              </p>

              <div class="demo" aria-label="Demostración de interpolación">
                <div class="demo-row">
                  <label for="nombre-interp">Tu nombre</label>
                  <input id="nombre-interp" type="text" [(ngModel)]="nombre" />
                </div>
                <div class="demo-output">
                  <p class="out-view">Vista: <strong>Hola, {{ nombre || 'invitado' }}!</strong></p>
                  <p class="out-expr">
                    Mayúsculas: <strong>{{ nombreMayus() }}</strong> · Longitud:
                    <strong>{{ nombre().length }}</strong>
                  </p>
                  <p class="out-expr">
                    Fecha formateada: <strong>{{ hoy | date: 'dd/MM/yyyy' }}</strong>
                  </p>
                </div>
              </div>

              <app-code-block language="ts" filename="saludo.ts" [code]="ejemploInterpolacion" />
            </div>
          </mat-tab>

          <!-- ========== PROPERTY BINDING ========== -->
          <mat-tab label="Property binding">
            <div class="tab-body">
              <p class="adl-text">
                Los corchetes asignan un valor del componente a una
                <strong>propiedad del DOM</strong> o a un input de otro componente. La diferencia con
                la interpolación es dónde se escribe el valor.
              </p>

              <div class="demo">
                <div class="demo-controls">
                  <mat-button-toggle-group
                    [value]="tamano()"
                    (change)="tamano.set($event.value)"
                    hideSingleSelectionIndicator
                  >
                    <mat-button-toggle value="sm">Pequeño</mat-button-toggle>
                    <mat-button-toggle value="md">Mediano</mat-button-toggle>
                    <mat-button-toggle value="lg">Grande</mat-button-toggle>
                  </mat-button-toggle-group>

                  <mat-slide-toggle [checked]="deshabilitado()" (change)="deshabilitado.set($event.checked)">
                    Deshabilitar botón
                  </mat-slide-toggle>
                </div>

                <div class="demo-stage">
                  <button
                    class="magic-btn"
                    type="button"
                    [disabled]="deshabilitado()"
                    [class.lg]="tamano() === 'lg'"
                    [class.sm]="tamano() === 'sm'"
                    [attr.aria-label]="'Botón de ejemplo, tamaño ' + tamano()"
                  >
                    <mat-icon>auto_awesome</mat-icon>
                    Botón con [property]
                  </button>
                </div>

                <div class="demo-output">
                  <p class="out-expr">
                    [disabled]="deshabilitado()" → <strong>{{ deshabilitado() }}</strong>
                  </p>
                  <p class="out-expr">
                    [class.lg] / [class.sm] → <strong>{{ tamano() }}</strong>
                  </p>
                  <p class="out-expr">
                    [attr.aria-label] → <strong>{{ 'Botón de ejemplo, tamaño ' + tamano() }}</strong>
                  </p>
                </div>
              </div>

              <app-code-block language="html" filename="plantilla" [code]="ejemploProperty" />
            </div>
          </mat-tab>

          <!-- ========== EVENT BINDING ========== -->
          <mat-tab label="Event binding">
            <div class="tab-body">
              <p class="adl-text">
                Los paréntesis escuchan eventos del DOM y llaman a un método del componente. El
                objeto <code class="adl-inline-code">$event</code> contiene la información del
                evento.
              </p>

              <div class="demo">
                <div class="click-area" role="button" tabindex="0" (click)="onAreaClick($event)" (keydown.enter)="onAreaClick($event)">
                  <mat-icon>touch_app</mat-icon>
                  <span>Haz clic aquí</span>
                  <small>x: {{ lastX() }} · y: {{ lastY() }}</small>
                </div>

                <div class="counter-demo">
                  <button matIconButton type="button" (click)="decrementar()" aria-label="Restar">
                    <mat-icon>remove</mat-icon>
                  </button>
                  <span class="counter-value">{{ clics() }}</span>
                  <button matIconButton type="button" (click)="incrementar()" aria-label="Sumar">
                    <mat-icon>add</mat-icon>
                  </button>
                  <button matButton type="button" (click)="reset()">Reiniciar</button>
                </div>

                <div class="demo-output">
                  <p class="out-expr">Clics en el área de botones: <strong>{{ clics() }}</strong></p>
                  <p class="out-expr">Última posición del clic: <strong>{{ lastX() }} : {{ lastY() }}</strong></p>
                </div>
              </div>

              <app-code-block language="html" filename="plantilla" [code]="ejemploEvento" />
              <app-code-block language="ts" filename="componente" [code]="ejemploEventoTs" />
            </div>
          </mat-tab>

          <!-- ========== TWO-WAY ========== -->
          <mat-tab label="Two-way binding">
            <div class="tab-body">
              <p class="adl-text">
                <code class="adl-inline-code">[(ngModel)]</code> sincroniza un control de formulario
                con una propiedad del componente en ambos sentidos. En componentes standalone hay
                que importar <code class="adl-inline-code">FormsModule</code>.
              </p>

              <div class="demo">
                <div class="demo-row">
                  <label for="twoway">Nombre</label>
                  <input id="twoway" type="text" [(ngModel)]="nombreDoble" placeholder="Escribe aquí" />
                </div>
                <p class="out-view">Valor del modelo: <strong>{{ nombreDoble || '(vacío)' }}</strong></p>
                <p class="out-expr">
                  El input y esta línea comparten la misma propiedad: cambiar uno cambia el otro.
                </p>

                <div class="ts-chip-row">
                  <span class="ts-chip" [class.on]="turbo()" (click)="turbo.set(!turbo())">
                    <mat-icon>bolt</mat-icon> modo turbo: {{ turbo() ? 'ON' : 'OFF' }}
                  </span>
                </div>
                <p class="out-expr">
                  Con signals, el equivalente a un control personalizado es
                  <code class="adl-inline-code">model()</code>:
                  <strong>modelo = {{ turbo() }}</strong>
                </p>
              </div>

              <app-code-block language="ts" filename="componente" [code]="ejemploDobleTs" />
              <app-code-block language="html" filename="plantilla" [code]="ejemploDoble" />
            </div>
          </mat-tab>
        </mat-tab-group>
      </section>

      <section aria-labelledby="tabla">
        <h2 id="tabla">Chuleta de sintaxis</h2>
        <div class="syntax-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Sintaxis</th>
                <th scope="col">Nombre</th>
                <th scope="col">Dirección</th>
                <th scope="col">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              @for (row of chuleta; track row.syntax) {
                <tr>
                  <td><code class="adl-inline-code">{{ row.syntax }}</code></td>
                  <td>{{ row.name }}</td>
                  <td>{{ row.direction }}</td>
                  <td><code class="adl-inline-code">{{ row.example }}</code></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="errores">
        <h2 id="errores">Errores que verás a menudo</h2>
        <div class="errors">
          @for (error of errores; track error.title) {
            <article>
              <h3><mat-icon>bug_report</mat-icon> {{ error.title }}</h3>
              <p>{{ error.text }}</p>
              <div class="wrong-right">
                <code class="wrong">✗ {{ error.wrong }}</code>
                <code class="right">✓ {{ error.right }}</code>
              </div>
            </article>
          }
        </div>
      </section>

      <section aria-labelledby="seguridad">
        <h2 id="seguridad">Binding y seguridad</h2>
        <p class="adl-text">
          Angular <strong>escapa automáticamente</strong> las interpolaciones: si el usuario escribe
          <code class="adl-inline-code">&lt;script&gt;</code> en un input, se muestra como texto y no
          se ejecuta. Es la principal defensa contra XSS. Solo se desactiva expresamente con
          <code class="adl-inline-code">DomSanitizer</code>, y eso implica asumir el riesgo.
        </p>
        <app-code-block language="ts" filename="seguro.ts" [code]="seguridad" />
        <app-callout type="warning">
          <p>
            Evita <code>bypassSecurityTrustHtml()</code> con contenido que venga del usuario. Si
            necesitas HTML enriquecido, sanitízalo antes con una librería dedicada o usa un
            sanitizador propio.
          </p>
        </app-callout>
      </section>

      <app-chapter-nav route="/binding" />
    </div>
  `,
})
export class BindingPage {
  protected readonly tabIndex = signal(0);

  /* Interpolación */
  protected readonly nombre = signal('Ana');
  protected readonly nombreMayus = computed(() => this.nombre().toUpperCase() || '—');
  protected readonly hoy = new Date();

  /* Property binding */
  protected readonly tamano = signal<'sm' | 'md' | 'lg'>('md');
  protected readonly deshabilitado = signal(false);

  /* Event binding */
  protected readonly clics = signal(0);
  protected readonly lastX = signal('—');
  protected readonly lastY = signal('—');

  /* Two-way */
  protected readonly nombreDoble = signal('');
  protected readonly turbo = signal(false);

  protected readonly resumen = computed(() => `${this.clics()} clics registrados`);

  protected incrementar(): void {
    this.clics.update((n) => n + 1);
  }

  protected decrementar(): void {
    this.clics.update((n) => Math.max(0, n - 1));
  }

  protected reset(): void {
    this.clics.set(0);
  }

  protected onAreaClick(event: Event): void {
    const mouse = event as MouseEvent;
    this.lastX.set(String(mouse.offsetX ?? '—'));
    this.lastY.set(String(mouse.offsetY ?? '—'));
  }

  protected readonly ejemploInterpolacion = `import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-saludo',
  imports: [DatePipe],
  template: './saludo.html',
})
export class Saludo {
  nombre = 'Ana';
  hoy = new Date();
}

<!-- saludo.html -->
<p>Hola, {{ nombre }}!</p>
<p>{{ nombre.toUpperCase() }}</p>
<p>{{ hoy | date: 'dd/MM/yyyy' }}</p>`;

  protected readonly ejemploProperty = `<!-- Propiedad del DOM -->
<img [src]="imagenUrl" [alt]="descripcion" />
<button [disabled]="deshabilitado()">Enviar</button>

<!-- Clases y estilos -->
<div [class.activo]="activo" [class.lg]="tamano() === 'lg'"></div>
<div [style.background-color]="color"></div>

<!-- Atributos que no son propiedades -->
<input [attr.aria-label]="etiqueta" />

<!-- Input de un componente hijo -->
<app-tarjeta [titulo]="titulo()" [destacada]="true" />`;

  protected readonly ejemploEvento = `<!-- Eventos nativos -->
<button (click)="incrementar()">+</button>
<form (ngSubmit)="guardar()">...</form>
<input (input)="buscar($event)" (keydown.enter)="enviar()" />

<!-- Objeto $event -->
<div (click)="onAreaClick($event)">...</div>`;

  protected readonly ejemploEventoTs = `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-clics',
  template: './clics.html',
})
export class Clics {
  clics = signal(0);

  incrementar() {
    this.clics.update(n => n + 1);
  }

  onAreaClick(event: MouseEvent) {
    console.log('Coordenadas', event.offsetX, event.offsetY);
  }
}`;

  protected readonly ejemploDobleTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule],   // imprescindible para ngModel
  template: './formulario.html',
})
export class Formulario {
  nombre = '';
}`;

  protected readonly ejemploDoble = `<input [(ngModel)]="nombre" />

<!-- Es azúcar sintáctico de: -->
<input [ngModel]="nombre" (ngModelChange)="nombre = $event" />

<!-- En inputs propios (Angular moderno) -->
<app-star-rating [(valor)]="puntuacion" />`;

  protected readonly chuleta = [
    { syntax: '{{ valor }}', name: 'Interpolación', direction: 'Componente → Vista', example: '{{ usuario.nombre }}' },
    { syntax: '[prop]="valor"', name: 'Property binding', direction: 'Componente → Vista', example: '[disabled]="cargando"' },
    { syntax: '(evento)="fn()"', name: 'Event binding', direction: 'Vista → Componente', example: '(click)="guardar()"' },
    { syntax: '[(ngModel)]="valor"', name: 'Two-way binding', direction: 'Ambas', example: '[(ngModel)]="email"' },
    { syntax: '[class.x]="cond"', name: 'Class binding', direction: 'Componente → Vista', example: "[class.activo]=\"ok\"" },
    { syntax: '[style.x]="val"', name: 'Style binding', direction: 'Componente → Vista', example: "[style.width.px]=\"ancho\"" },
    { syntax: '[attr.x]="val"', name: 'Attribute binding', direction: 'Componente → Vista', example: "[attr.aria-label]=\"texto\"" },
  ];

  protected readonly errores = [
    {
      title: 'Usar interpolación dentro de un atributo',
      text: 'En atributos de directivas o propiedades, la interpolación no siempre funciona; usa el binding correspondiente.',
      wrong: '&lt;img src="{{ url }}" disabled="{{ off }}"&gt;',
      right: '&lt;img [src]="url" [disabled]="off"&gt;',
    },
    {
      title: 'Olvidar FormsModule con ngModel',
      text: 'ngModel es una directiva de @angular/forms: si el componente no la importa, Angular lanza NG8002.',
      wrong: 'imports: []',
      right: 'imports: [FormsModule]',
    },
    {
      title: 'Llamar a un método pesado en la plantilla',
      text: 'Cada ciclo de detección reevalúa la expresión. Con signals y computed el resultado se memoiza.',
      wrong: '{{ filtrar(lista).length }}',
      right: 'total = computed(() =&gt; this.filtrar(this.lista()).length)',
    },
  ];

  protected readonly seguridad = `// Angular escapa por defecto: esto se muestra como texto
<p>{{ comentarioUsuario }}</p>

// Solo si de verdad confías en el HTML:
import { DomSanitizer } from '@angular/platform-browser';

private sanitizer = inject(DomSanitizer);
htmlSeguro = this.sanitizer.bypassSecurityTrustHtml(htmlConfiable);`;
}
