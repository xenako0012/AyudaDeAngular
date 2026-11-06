import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { CalloutComponent } from '../../shared/callout/callout';
import { ChapterNavComponent } from '../../shared/chapter-nav/chapter-nav';
import { CodeBlockComponent } from '../../shared/code-block/code-block';
import { SectionHeaderComponent } from '../../shared/section-header/section-header';

@Component({
  selector: 'app-modulos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, CodeBlockComponent, CalloutComponent, ChapterNavComponent, SectionHeaderComponent],
  styleUrl: './modulos.scss',
  template: `
    <div class="adl-route">
      <app-section-header
        icon="inventory_2"
        eyebrow="Aplicaciones completas · Capítulo 11"
        title="Módulos (NgModule)"
        description="Los NgModule fueron la forma de organizar Angular durante años. Siguen soportados y aparecen en proyectos existentes, pero un proyecto nuevo ya no los necesita."
        level="intermedio"
        [minutes]="10"
      />

      <section aria-labelledby="estado">
        <h2 id="estado">Situación actual en Angular 22</h2>
        <div class="status-grid">
          @for (item of situacion; track item.title) {
            <article [class.highlight]="item.highlight">
              <mat-icon>{{ item.icon }}</mat-icon>
              <div>
                <strong>{{ item.title }}</strong>
                <p>{{ item.text }}</p>
              </div>
            </article>
          }
        </div>

        <app-callout type="danger" label="Aviso">
          <p>
            En un proyecto nuevo <strong>no necesitas crear un AppModule</strong> ni usar
            <code>platformBrowserDynamic().bootstrapModule()</code>. Si un tutorial empieza creando
            <code>app.module.ts</code>, está describiendo Angular 15 o anterior.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="que-es">
        <h2 id="que-es">¿Qué es un módulo?</h2>
        <p class="adl-text">
          Un NgModule es un contenedor que agrupa componentes, directivas, pipes y servicios en una
          unidad compilable. Antes era obligatorio: todo componente tenía que estar declarado en
          algún módulo. Hoy es opcional y su función principal es agrupar dependencias de terceros
          que solo ofrecen módulos.
        </p>

        <app-code-block language="ts" filename="feature.module.ts" [code]="moduloClasico" />

        <div class="props">
          @for (prop of propiedades; track prop.name) {
            <article>
              <code>{{ prop.name }}</code>
              <p>{{ prop.text }}</p>
            </article>
          }
        </div>
      </section>

      <section aria-labelledby="equivalencia">
        <h2 id="equivalencia">Equivalencia con componentes standalone</h2>
        <p class="adl-text">
          Casi todo lo que hacía un módulo tiene un equivalente directo en un componente
          standalone. Esta tabla sirve para traducir mentalmente cualquier proyecto antiguo.
        </p>

        <div class="equiv">
          <table>
            <thead>
              <tr>
                <th scope="col">NgModule</th>
                <th scope="col">Standalone</th>
              </tr>
            </thead>
            <tbody>
              @for (row of equivalencias; track row.modulo) {
                <tr>
                  <td><code class="adl-inline-code">{{ row.modulo }}</code></td>
                  <td><code class="adl-inline-code">{{ row.standalone }}</code></td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div class="compare">
          <div>
            <h3>Con módulo (antes)</h3>
            <app-code-block language="ts" filename="app.module.ts" [code]="conModulo" />
          </div>
          <div>
            <h3>Standalone (ahora)</h3>
            <app-code-block language="ts" filename="app.ts" [code]="sinModulo" />
          </div>
        </div>
      </section>

      <section aria-labelledby="cuando">
        <h2 id="cuando">¿Cuándo sigue siendo necesario?</h2>
        <ul class="adl-list">
          <li>
            <strong>Bibliotecas legacy</strong> que solo exportan un
            <code class="adl-inline-code">NgModule</code>. Se importa el módulo dentro del array
            <code class="adl-inline-code">imports</code> del componente standalone y listo.
          </li>
          <li>
            <strong>Aplicaciones existentes</strong> que no se han migrado. Conviven sin problema:
            un NgModule puede importar componentes standalone y viceversa.
          </li>
          <li>
            <strong>Algunos patrones avanzados</strong> con <code>forRoot()</code> /
            <code>forChild()</code> para configuración de librerías. Aun así, los providers globales
            se están moviendo a funciones <code>provide*()</code>.
          </li>
        </ul>

        <h3>Importar un módulo dentro de un componente standalone</h3>
        <app-code-block language="ts" filename="ejemplo.ts" [code]="importarModulo" />

        <h3>Migrar de módulo a standalone</h3>
        <app-code-block language="bash" filename="Terminal" [code]="comandoMigrar" />
      </section>

      <section aria-labelledby="organizar">
        <h2 id="organizar">Modularizar sin módulos</h2>
        <p class="adl-text">
          Si los NgModule ya no son la unidad de organización, ¿cómo se estructura una aplicación
          grande? Con <strong>carpetas por dominio</strong>, rutas con lazy loading y servicios con
          ámbito de ruta.
        </p>

        <app-code-block language="bash" filename="Estructura de carpetas" [code]="estructura" />

        <div class="tips">
          @for (tip of consejos; track tip.title) {
            <article>
              <mat-icon>{{ tip.icon }}</mat-icon>
              <div>
                <strong>{{ tip.title }}</strong>
                <p>{{ tip.text }}</p>
              </div>
            </article>
          }
        </div>

        <app-code-block language="ts" filename="admin/admin.routes.ts" [code]="rutasFeature" />
      </section>

      <app-chapter-nav route="/modulos" />
    </div>
  `,
})
export class ModulosPage {
  protected readonly situacion = [
    {
      icon: 'check_circle',
      title: 'Standalone por defecto',
      text: 'Desde Angular 19, ng generate component crea componentes standalone. No hay que declararlos en ningún módulo.',
      highlight: true,
    },
    {
      icon: 'settings',
      title: 'app.config.ts sustituye a AppModule',
      text: 'La configuración global vive en providers de bootstrapApplication, no en el decorador de un módulo.',
      highlight: true,
    },
    {
      icon: 'history',
      title: 'NgModule sigue soportado',
      text: 'No está deprecado. Es importante conocerlo para trabajar con proyectos existentes y con librerías antiguas.',
      highlight: false,
    },
  ];

  protected readonly moduloClasico = `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Componente1,
    Componente2,
  ],
  imports: [
    CommonModule,
    FormsModule,
    OtroModulo,
  ],
  exports: [
    Componente1,
    Componente2,
  ],
  providers: [
    MiServicio,
  ],
})
export class FeatureModule {}`;

  protected readonly propiedades = [
    { name: 'declarations', text: 'Componentes, directivas y pipes que pertenecen al módulo. Solo pueden estar en un módulo.' },
    { name: 'imports', text: 'Otros módulos cuyas exportaciones necesita este módulo.' },
    { name: 'exports', text: 'Qué se hace público para los módulos que importen este.' },
    { name: 'providers', text: 'Servicios que se registran en el inyector del módulo.' },
    { name: 'bootstrap', text: 'Componente raíz que se inicializa al arrancar la aplicación (solo AppModule).' },
  ];

  protected readonly equivalencias = [
    { modulo: 'declarations', standalone: 'imports del propio componente' },
    { modulo: 'imports', standalone: 'imports del componente o providers de la app' },
    { modulo: 'exports', standalone: 'La clase se exporta y se importa directamente' },
    { modulo: 'providers (módulo)', standalone: "providedIn: 'root' o providers de la ruta" },
    { modulo: 'bootstrap: [App]', standalone: 'bootstrapApplication(App, appConfig)' },
    { modulo: 'AppModule', standalone: 'app.config.ts + main.ts' },
  ];

  protected readonly conModulo = `// app.module.ts
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}

// main.ts
platformBrowserDynamic().bootstrapModule(AppModule);`;

  protected readonly sinModulo = `// app.ts
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {}

// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};

// main.ts
bootstrapApplication(App, appConfig);`;

  protected readonly importarModulo = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form',
  imports: [FormsModule, MatButtonModule],
  templateUrl: './form.html',
})
export class Form {}
// Un componente standalone puede importar módulos clásicos
// y un NgModule puede importar componentes standalone.`;

  protected readonly comandoMigrar = `# Schematic oficial de migración a standalone
ng generate @angular/core:standalone

# Opciones útiles
ng g @angular/core:standalone --mode=convert-to-standalone --path=src/app

# Migrar directivas estructurales a control flow
ng generate @angular/core:control-flow

# Migrar @Input/@Output a signals (Angular 19+)
ng generate @angular/core:signal-inputs`;

  protected readonly estructura = `src/app/
├── core/                  # Servicios globales, guards, interceptores
│   ├── auth.service.ts
│   └── auth.guard.ts
├── shared/                # Componentes y pipes reutilizables
│   ├── code-block/
│   └── callout/
├── features/
│   ├── usuarios/
│   │   ├── usuarios.routes.ts     # Rutas de la feature
│   │   ├── usuario.service.ts     # Ámbito de la feature
│   │   ├── usuarios.ts            # Componente principal
│   │   └── usuario-detalle.ts
│   └── admin/
│       ├── admin.routes.ts
│       └── ...
├── app.routes.ts
├── app.config.ts
└── app.ts`;

  protected readonly consejos = [
    {
      icon: 'folder_open',
      title: 'Organiza por dominio',
      text: 'Una carpeta por funcionalidad (usuarios, pedidos, facturación) con sus componentes, servicio y rutas. Es más fácil de mover o eliminar que una separación por tipo de archivo.',
    },
    {
      icon: 'download',
      title: 'Lazy loading por feature',
      text: 'Cada dominio expone su propio archivo de rutas y se carga con loadChildren. El bundle inicial queda pequeño y cada feature se descarga al entrar.',
    },
    {
      icon: 'share',
      title: 'Limita lo compartido',
      text: 'Si un componente solo lo usa una feature, vive dentro de ella. Solo se mueve a shared/ cuando aparece un segundo consumidor real.',
    },
  ];

  protected readonly rutasFeature = `import { Routes } from '@angular/router';
import { AdminService } from './admin.service';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    providers: [AdminService],   // ámbito de la feature
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard').then(m => m.Dashboard),
      },
      {
        path: 'ajustes',
        loadComponent: () => import('./ajustes').then(m => m.Ajustes),
      },
    ],
  },
];`;
}
