import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CalloutComponent } from '../../shared/callout/callout';
import { ChapterNavComponent } from '../../shared/chapter-nav/chapter-nav';
import { CodeBlockComponent } from '../../shared/code-block/code-block';
import { SectionHeaderComponent } from '../../shared/section-header/section-header';

@Component({
  selector: 'app-componentes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    MatButtonModule,
    CodeBlockComponent,
    CalloutComponent,
    ChapterNavComponent,
    SectionHeaderComponent,
  ],
  styleUrl: './componentes.scss',
  template: `
    <div class="adl-route">
      <app-section-header
        icon="widgets"
        eyebrow="Fundamentos · Capítulo 3"
        title="Componentes standalone"
        description="Un componente es una pieza de interfaz con su lógica, su plantilla HTML y sus estilos. Aquí verás sus metadatos, cómo se importa dentro de otro componente y qué ha cambiado con la llegada de los standalone."
        level="inicial"
        [minutes]="12"
      />

      <section aria-labelledby="que-es">
        <h2 id="que-es">¿Qué es un componente?</h2>
        <p class="adl-text">
          Un componente es una <strong>clase de TypeScript</strong> decorada con
          <code class="adl-inline-code">&#64;Component</code> que Angular asocia a un fragmento de
          interfaz. La clase contiene el estado y la lógica; la plantilla describe el HTML; los
          estilos se encapsulan para que no se filtren al resto de la aplicación.
        </p>

        <div class="anatomy">
          <div class="anatomy-visual">
            <div class="abc-tag" aria-hidden="true">&lt;app-usuario&gt;</div>
            <div class="anatomy-card">
              <div class="abc-head">
                <mat-icon aria-hidden="true">person</mat-icon>
                <div>
                  <strong>Ana Torres</strong>
                  <span>Administradora</span>
                </div>
                <span class="abc-badge">activa</span>
              </div>
              <p>Contenido proyectado, estilos propios e inputs que vienen del padre.</p>
              <button matButton="filled" type="button" (click)="meGusta()">
                Me gusta · {{ likes() }}
              </button>
            </div>
          </div>

          <ul class="anatomy-list">
            @for (part of anatomia; track part.title) {
              <li>
                <code>{{ part.code }}</code>
                <div>
                  <strong>{{ part.title }}</strong>
                  <p>{{ part.text }}</p>
                </div>
              </li>
            }
          </ul>
        </div>
      </section>

      <section aria-labelledby="decorador">
        <h2 id="decorador">El decorador &#64;Component</h2>
        <p class="adl-text">
          Los metadatos del decorador dicen a Angular cómo instanciar y renderizar el componente.
          Estos son los que se usan siempre:
        </p>

        <div class="props-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Propiedad</th>
                <th scope="col">Obligatoria</th>
                <th scope="col">Qué hace</th>
              </tr>
            </thead>
            <tbody>
              @for (prop of propiedades; track prop.name) {
                <tr>
                  <td><code class="adl-inline-code">{{ prop.name }}</code></td>
                  <td>
                    <mat-icon [class.yes]="prop.required" [class.no]="!prop.required">
                      {{ prop.required ? 'check_circle' : 'remove_circle_outline' }}
                    </mat-icon>
                  </td>
                  <td>{{ prop.text }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <app-code-block language="ts" filename="usuario.ts" [code]="componenteCompleto" />

        <app-callout type="info" label="Detalle">
          <p>
            <code>templateUrl</code> y <code>template</code> son excluyentes: el primero apunta a un
            HTML externo (lo habitual) y el segundo lleva la plantilla inline para componentes
            diminutos. Lo mismo ocurre con <code>styleUrl</code> / <code>styleUrls</code> y
            <code>styles</code>.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="standalone">
        <h2 id="standalone">Standalone: el valor por defecto desde Angular 19</h2>
        <p class="adl-text">
          Un componente standalone <strong>no necesita</strong> declararse en un
          <code class="adl-inline-code">NgModule</code>. Declara sus dependencias en la propiedad
          <code class="adl-inline-code">imports</code> y está listo para usarse. Desde Angular 19,
          <code class="adl-inline-code">standalone: true</code> es implícito y ya no hace falta
          escribirlo (de hecho, la opción ha quedado obsoleta).
        </p>

        <div class="compare">
          <div class="compare-col bad">
            <header>
              <mat-icon>history</mat-icon>
              Antes (Angular 15)
            </header>
            <app-code-block language="ts" filename="app.module.ts" [code]="clasicoNgModule" />
          </div>
          <div class="compare-col good">
            <header>
              <mat-icon>bolt</mat-icon>
              Ahora (Angular 22)
            </header>
            <app-code-block language="ts" filename="app.ts" [code]="modernoStandalone" />
          </div>
        </div>

        <app-callout type="tip">
          <p>
            Un componente standalone puede importar otros componentes, directivas, pipes y también
            módulos (<code>FormsModule</code>, <code>ReactiveFormsModule</code>,
            <code>MatButtonModule</code>…). Todo lo que importes queda disponible en su plantilla,
            y solo en la suya.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="usar">
        <h2 id="usar">Usar un componente dentro de otro</h2>
        <p class="adl-text">
          El componente hijo se importa y se añade al array
          <code class="adl-inline-code">imports</code> del padre. Después se usa en la plantilla con
          el selector que haya declarado (<code class="adl-inline-code">app-usuario</code>).
        </p>

        <app-code-block language="ts" filename="app.ts (padre)" [code]="padreComponente" />
        <app-code-block language="html" filename="app.html (padre)" [code]="padrePlantilla" />

        <div class="checklist">
          <p class="checklist-title">Si el componente no aparece, revisa en este orden:</p>
          <ol>
            @for (check of checklist; track check) {
              <li>{{ check }}</li>
            }
          </ol>
        </div>
      </section>

      <section aria-labelledby="proyeccion">
        <h2 id="proyeccion">Consejo: proyección de contenido</h2>
        <p class="adl-text">
          Cuando quieres que el consumidor del componente decida parte del contenido, no uses inputs
          para todo: usa <code class="adl-inline-code">ng-content</code>.
        </p>
        <div class="two-col">
          <app-code-block language="ts" filename="panel.ts" [code]="panelTs" />
          <app-code-block language="html" filename="panel.html" [code]="panelHtml" />
        </div>
        <app-code-block language="html" filename="uso en otro componente" [code]="panelUso" />
      </section>

      <section aria-labelledby="ciclo">
        <h2 id="ciclo">Ciclo de vida</h2>
        <p class="adl-text">
          Angular ofrece hooks para ejecutar código en momentos concretos. En componentes basados en
          signals muchas veces se sustituyen por <code class="adl-inline-code">effect()</code>,
          <code class="adl-inline-code">afterNextRender()</code> o simplemente
          <code class="adl-inline-code">computed()</code>.
        </p>

        <div class="lifecycle">
          @for (hook of hooks; track hook.name) {
            <article>
              <code>{{ hook.name }}</code>
              <p>{{ hook.text }}</p>
            </article>
          }
        </div>

        <app-code-block language="ts" filename="reloj.ts" [code]="cicloEjemplo" />
      </section>

      <section aria-labelledby="estilos">
        <h2 id="estilos">Estilos encapsulados</h2>
        <p class="adl-text">
          Por defecto la estrategia es <code class="adl-inline-code">Emulated</code>: Angular añade
          atributos únicos a los elementos para que los estilos de un componente no afecten a otros.
          Si necesitas escribir CSS global desde un componente, usa
          <code class="adl-inline-code">::ng-deep</code> con moderación o, mejor, define ese estilo
          en <code class="adl-inline-code">styles.scss</code>.
        </p>
        <app-code-block language="ts" filename="card.ts (estilos)" [code]="encapsulacion" />
      </section>

      <app-chapter-nav route="/componentes" />
    </div>
  `,
})
export class ComponentesPage {
  protected readonly likes = signal(12);

  protected meGusta(): void {
    this.likes.update((n) => n + 1);
  }

  protected readonly anatomia = [
    {
      code: 'selector',
      title: 'Nombre en la plantilla',
      text: 'La etiqueta HTML personalizada con la que se usa el componente en cualquier plantilla.',
    },
    {
      code: 'templateUrl',
      title: 'La vista',
      text: 'Ruta al archivo HTML con la estructura y los bindings.',
    },
    {
      code: 'styleUrl',
      title: 'Los estilos',
      text: 'Hoja de estilos encapsulada: solo se aplica a este componente.',
    },
    {
      code: 'imports',
      title: 'Dependencias',
      text: 'Componentes, directivas, pipes y módulos que usa la plantilla.',
    },
  ];

  protected readonly propiedades = [
    { name: 'selector', required: true, text: 'Etiqueta HTML que representa al componente. Ej: app-usuario.' },
    { name: 'template / templateUrl', required: true, text: 'Una de las dos: plantilla inline o ruta al HTML externo.' },
    { name: 'styles / styleUrl', required: false, text: 'Estilos encapsulados. Opcional, pero recomendable por componente.' },
    { name: 'imports', required: false, text: 'Dependencias de la plantilla. Sin esto, los elementos de otros componentes dan NG8001.' },
    { name: 'changeDetection', required: false, text: 'Estrategia de detección de cambios. Con signals, OnPush es el valor habitual.' },
    { name: 'providers', required: false, text: 'Servicios con ámbito de componente: se crea una instancia por instancia del componente.' },
    { name: 'host', required: false, text: 'Bindings y clases aplicados al elemento anfitrión, sin necesidad de @HostBinding.' },
    { name: 'encapsulation', required: false, text: 'Emulated (por defecto), ShadowDom o None.' },
  ];

  protected readonly componenteCompleto = `import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  imports: [],
  templateUrl: './usuario.html',
  styleUrl: './usuario.scss',
})
export class Usuario {
  nombre = 'Ana Torres';
  rol = 'Administradora';
  activo = true;
}`;

  protected readonly clasicoNgModule = `@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// main.ts
platformBrowserDynamic()
  .bootstrapModule(AppModule);`;

  protected readonly modernoStandalone = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from './usuario/usuario';

@Component({
  selector: 'app-root',
  imports: [FormsModule, Usuario],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

// main.ts
bootstrapApplication(App, appConfig);`;

  protected readonly padreComponente = `import { Component, signal } from '@angular/core';
import { Usuario } from './usuario/usuario';

@Component({
  selector: 'app-root',
  imports: [Usuario],   // <- imprescindible
  templateUrl: './app.html',
})
export class App {
  usuarios = signal([
    { id: 1, nombre: 'Ana', rol: 'Admin' },
    { id: 2, nombre: 'Luis', rol: 'Editor' },
  ]);
}`;

  protected readonly padrePlantilla = `<h1>Equipo</h1>

@for (usuario of usuarios(); track usuario.id) {
  <app-usuario />
}

<!-- El selector coincide con el del hijo -->
<!-- <app-usuario></app-usuario> también es válido -->`;

  protected readonly checklist = [
    'El componente hijo está incluido en el array imports del padre.',
    'El selector de la plantilla coincide exactamente con el declarado (incluido el prefijo app-).',
    'El nombre de la clase importada coincide con el exportado (no hay default export).',
    'Si el elemento está dentro de un @if o @for, el imports sigue estando en el componente contenedor.',
  ];

  protected readonly panelTs = `import { Component } from '@angular/core';

@Component({
  selector: 'app-panel',
  template: \`
    <header>{{ titulo }}</header>
    <div class="panel-body">
      <ng-content />
    </div>
    <footer>
      <ng-content select="[acciones]" />
    </footer>
  \`,
})
export class Panel {
  titulo = 'Detalles del pedido';
}`;

  protected readonly panelHtml = `<!-- Cualquier elemento con el atributo
     acciones se proyecta en el footer -->
[acciones]`;

  protected readonly panelUso = `<app-panel>
  <p>Este contenido se proyecta en el cuerpo.</p>
  <p>Puede contener cualquier HTML o componentes.</p>

  <button matButton acciones>Guardar</button>
</app-panel>`;

  protected readonly hooks = [
    { name: 'ngOnChanges', text: 'Se ejecuta cuando cambia un @Input() clásico. Con input() signals no hace falta: usa computed().' },
    { name: 'ngOnInit', text: 'Una vez creados los inputs. Ideal para cargas iniciales; en proyectos modernos también se resuelven con el router o effect().' },
    { name: 'ngDoCheck', text: 'Detección personalizada de cambios. Se usa poco: signals y computed lo hacen innecesario.' },
    { name: 'ngAfterViewInit', text: 'La vista (y sus hijos) ya existen. Sustituido normalmente por viewChild() + afterNextRender().' },
    { name: 'ngOnDestroy', text: 'Antes de destruir el componente: cancela suscripciones, timers y listeners. takeUntilDestroyed() simplifica las suscripciones.' },
  ];

  protected readonly cicloEjemplo = `import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-reloj',
  template: './reloj.html',
})
export class Reloj implements OnInit, OnDestroy {
  private intervalo?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.intervalo = setInterval(() => console.log(new Date()), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }
}`;

  protected readonly encapsulacion = `@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styles: \`
    .card {            /* solo afecta a estilos de este componente */
      border-radius: 16px;
      border: 1px solid var(--mat-sys-outline-variant);
    }
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {}
// Angular añade un atributo único (p. ej. _ngcontent-abc123)
// a cada elemento para aislar el alcance de los estilos.`;
}
