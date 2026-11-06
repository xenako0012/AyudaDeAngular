import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CalloutComponent } from '../../shared/callout/callout';
import { ChapterNavComponent } from '../../shared/chapter-nav/chapter-nav';
import { CodeBlockComponent } from '../../shared/code-block/code-block';
import { SectionHeaderComponent } from '../../shared/section-header/section-header';

interface FicheroArbol {
  readonly name: string;
  readonly type: 'folder' | 'file';
  readonly depth: number;
  readonly description: string;
  readonly badge?: string;
  readonly open?: boolean;
}

@Component({
  selector: 'app-estructura',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    CodeBlockComponent,
    CalloutComponent,
    ChapterNavComponent,
    SectionHeaderComponent,
  ],
  styleUrl: './estructura.scss',
  template: `
    <div class="adl-route">
      <app-section-header
        icon="account_tree"
        eyebrow="Primeros pasos · Capítulo 2"
        title="Estructura de un proyecto"
        description="Qué genera exactamente ng new, para qué sirve cada carpeta y cómo arranca la aplicación sin un AppModule."
        level="inicial"
        [minutes]="7"
      />

      <section aria-labelledby="arbol">
        <h2 id="arbol">El árbol de archivos</h2>
        <p class="adl-text">
          Un proyecto generado con el CLI de Angular 22 tiene muy pocos archivos. Pasa el ratón o
          toca cada uno para ver qué contiene y por qué está ahí.
        </p>

        <div class="tree" role="tree" aria-label="Estructura de un proyecto Angular">
          @for (node of arbol; track node.name) {
            <button
              type="button"
              role="treeitem"
              class="tree-row"
              [class.folder]="node.type === 'folder'"
              [class.selected]="selected() === node.name"
              [style.padding-left.px]="12 + node.depth * 22"
              (click)="select(node)"
            >
              <mat-icon aria-hidden="true">{{ iconFor(node) }}</mat-icon>
              <span class="tree-name">{{ node.name }}</span>
              @if (node.badge) {
                <span class="tree-badge">{{ node.badge }}</span>
              }
              <mat-icon class="tree-info" aria-hidden="true">chevron_right</mat-icon>
            </button>
          }
        </div>

        @if (selectedNode(); as node) {
          <div class="tree-detail" role="status">
            <div class="tree-detail-head">
              <mat-icon>{{ node.type === 'folder' ? 'folder_open' : 'description' }}</mat-icon>
              <code>{{ node.name }}</code>
            </div>
            <p>{{ node.description }}</p>
          </div>
        }
      </section>

      <section aria-labelledby="src">
        <h2 id="src">Los archivos que importan de verdad</h2>

        <h3>src/main.ts — el punto de entrada</h3>
        <p class="adl-text">
          Es lo primero que ejecuta el navegador. Importa la configuración y arranca el componente
          raíz con <code class="adl-inline-code">bootstrapApplication</code>. No hay
          <code class="adl-inline-code">AppModule</code>: la configuración se pasa como providers.
        </p>
        <app-code-block language="ts" filename="src/main.ts" [code]="mainTs" />

        <h3>src/app/app.config.ts — los providers globales</h3>
        <p class="adl-text">
          Aquí se registran las piezas de infraestructura de la aplicación: router, HTTP, formato de
          fecha, animaciones, detección de cambios… Cada
          <code class="adl-inline-code">provide*()</code> es una función que devuelve providers.
        </p>
        <app-code-block language="ts" filename="src/app/app.config.ts" [code]="appConfig" />

        <h3>src/app/app.ts — el componente raíz</h3>
        <p class="adl-text">
          El componente que se monta dentro de
          <code class="adl-inline-code">&lt;app-root&gt;</code>. Normalmente solo contiene el shell
          de la aplicación y el <code class="adl-inline-code">&lt;router-outlet /&gt;</code>.
        </p>
        <app-code-block language="ts" filename="src/app/app.ts" [code]="appComponent" />

        <h3>src/index.html — la página HTML única</h3>
        <p class="adl-text">
          Una aplicación Angular es una SPA: el servidor entrega este HTML y Angular renderiza todo
          dentro de <code class="adl-inline-code">&lt;app-root&gt;</code>. Solo se edita para el
          título, los metadatos y los enlaces globales de fuentes o iconos.
        </p>
        <app-code-block language="html" filename="src/index.html" [code]="indexHtml" />
      </section>

      <section aria-labelledby="angularjson">
        <h2 id="angularjson">angular.json: la configuración del proyecto</h2>
        <p class="adl-text">
          Angular CLI lo lee para saber cómo compilar, servir o testear. Rara vez se escribe a mano,
          pero conviene reconocer las claves más importantes.
        </p>

        <div class="config-grid">
          @for (clave of clavesAngularJson; track clave.name) {
            <article class="config-card">
              <code>{{ clave.name }}</code>
              <p>{{ clave.text }}</p>
            </article>
          }
        </div>

        <app-code-block language="json" filename="angular.json (fragmento)" [code]="angularJson" />

        <app-callout type="tip" label="Consejo">
          <p>
            Para cambiar el puerto o el host de desarrollo no hace falta tocar código: usa
            <code>ng serve --port 4500</code> o define las opciones en
            <code>architect.serve.options</code>. Con <code>ng config</code> también puedes editar
            valores concretos desde la terminal: <code>ng config projects.mi-app.architect.build.options.outputPath dist/app</code>.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="ciclo">
        <h2 id="ciclo">Cómo arranca y cómo compila</h2>
        <p class="adl-text">
          Entender el recorrido desde el código fuente hasta la pantalla ayuda a depurar problemas.
        </p>

        <ol class="flow">
          @for (step of flujo; track step.title; let i = $index) {
            <li>
              <span class="flow-index">{{ i + 1 }}</span>
              <div>
                <strong>{{ step.title }}</strong>
                <p>{{ step.text }}</p>
              </div>
            </li>
          }
        </ol>

        <h3>Comandos de compilación</h3>
        <app-code-block language="bash" filename="Terminal" [code]="comandosBuild" />

        <div class="output-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Comando</th>
                <th scope="col">Salida</th>
                <th scope="col">Uso</th>
              </tr>
            </thead>
            <tbody>
              @for (row of salidas; track row.command) {
                <tr>
                  <td><code class="adl-inline-code">{{ row.command }}</code></td>
                  <td>{{ row.output }}</td>
                  <td>{{ row.use }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="convenciones">
        <h2 id="convenciones">Convenciones del CLI</h2>
        <ul class="adl-list">
          <li>
            <strong>Carpetas y archivos en kebab-case</strong>:
            <code class="adl-inline-code">mi-componente.ts</code>,
            <code class="adl-inline-code">user-profile/</code>.
          </li>
          <li>
            <strong>Clases en PascalCase</strong> y sin sufijo «Component» desde Angular 20:
            <code class="adl-inline-code">export class Usuario</code>.
          </li>
          <li>
            <strong>Prefijo del selector</strong> configurable en
            <code class="adl-inline-code">angular.json</code> (por defecto
            <code class="adl-inline-code">app-</code>).
          </li>
          <li>
            <strong>Un componente por carpeta</strong>: facilita mover, borrar y hacer lazy loading
            de funcionalidades completas.
          </li>
          <li>
            <strong>Servicios junto a su dominio</strong> si solo los usa una feature, y en
            <code class="adl-inline-code">core/</code> si son globales.
          </li>
        </ul>
      </section>

      <app-chapter-nav route="/estructura" />
    </div>
  `,
})
export class EstructuraPage {
  protected readonly selected = signal('app');
  protected readonly selectedNode = signal<FicheroArbol | null>(null);

  protected readonly arbol: readonly FicheroArbol[] = [
    {
      name: 'mi-proyecto/',
      type: 'folder',
      depth: 0,
      description: 'Raíz del proyecto generado por ng new.',
    },
    {
      name: 'src/',
      type: 'folder',
      depth: 1,
      description: 'Código fuente de la aplicación: todo lo que se compila.',
    },
    {
      name: 'app/',
      type: 'folder',
      depth: 2,
      description:
        'Aquí vive el código de la app: componentes, rutas, servicios y configuración. El CLI crea los nuevos artefactos dentro de esta carpeta.',
    },
    {
      name: 'app.ts',
      type: 'file',
      depth: 3,
      description:
        'Componente raíz (antes app.component.ts). Se declara con @Component, tiene su plantilla app.html y sus estilos app.scss.',
      badge: 'raíz',
    },
    {
      name: 'app.html',
      type: 'file',
      depth: 3,
      description:
        'Plantilla del componente raíz. Tras crearlo, ng new la sustituye por tu código; incluye <router-outlet /> si elegiste routing.',
    },
    {
      name: 'app.scss',
      type: 'file',
      depth: 3,
      description:
        'Estilos encapsulados del componente raíz: solo afectan a su plantilla.',
    },
    {
      name: 'app.config.ts',
      type: 'file',
      depth: 3,
      description:
        'Providers globales: provideRouter, provideHttpClient, provideZonelessChangeDetection… Es el sustituto moderno de AppModule.',
      badge: 'config',
    },
    {
      name: 'app.routes.ts',
      type: 'file',
      depth: 3,
      description:
        'Array de rutas que consume provideRouter(). Cada ruta asocia un path con un componente.',
    },
    { name: 'main.ts', type: 'file', depth: 1, description: 'Punto de entrada: llama a bootstrapApplication(App, appConfig).' },
    {
      name: 'index.html',
      type: 'file',
      depth: 1,
      description: 'Documento HTML único de la SPA. Contiene <app-root></app-root> y los metadatos globales.',
    },
    {
      name: 'styles.scss',
      type: 'file',
      depth: 1,
      description: 'Estilos globales: hojas de estilo compartidas, tokens, tema de Material, tipografía…',
    },
    {
      name: 'public/',
      type: 'folder',
      depth: 1,
      description:
        'Recursos estáticos copiados tal cual al build: favicon, imágenes, robots.txt, manifest…',
    },
    {
      name: 'angular.json',
      type: 'file',
      depth: 0,
      description:
        'Configuración del workspace para el CLI: builders, estilos, assets, presupuestos, configuraciones y targets.',
      badge: 'CLI',
    },
    {
      name: 'package.json',
      type: 'file',
      depth: 0,
      description: 'Dependencias del proyecto y scripts (start, build, test).',
    },
    {
      name: 'tsconfig.json',
      type: 'file',
      depth: 0,
      description: 'Opciones del compilador TypeScript. tsconfig.app.json extiende esta base para la app.',
      badge: 'TS',
    },
    {
      name: '.editorconfig / .prettierrc',
      type: 'file',
      depth: 0,
      description: 'Reglas de formato del equipo: indentación, comillas, ancho de línea…',
    },
  ];

  protected select(node: FicheroArbol): void {
    this.selected.set(node.name);
    this.selectedNode.set(node);
  }

  protected iconFor(node: FicheroArbol): string {
    if (node.type === 'folder') {
      return node.depth === 0 ? 'folder_special' : 'folder';
    }
    if (node.name.endsWith('.ts')) {
      return 'code';
    }
    if (node.name.endsWith('.html')) {
      return 'html';
    }
    if (node.name.endsWith('.scss')) {
      return 'palette';
    }
    if (node.name.endsWith('.json')) {
      return 'data_object';
    }
    return 'description';
  }

  protected readonly mainTs = `import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));`;

  protected readonly appConfig = `import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    // provideHttpClient(),
    // provideNativeDateAdapter(),
  ],
};`;

  protected readonly appComponent = `import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}`;

  protected readonly indexHtml = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Mi proyecto</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>`;

  protected readonly clavesAngularJson = [
    {
      name: 'projects → architect → build',
      text: 'Builder que compila la app: entry point (browser), tsConfig, styles, assets y configuraciones named (production, development).',
    },
    {
      name: 'options.styles',
      text: 'Hojas de estilo globales, incluidas las de librerías como Angular Material o las fuentes.',
    },
    {
      name: 'options.assets',
      text: 'Qué carpetas se copian al build. public/ se incluye por defecto.',
    },
    {
      name: 'architect → serve',
      text: 'Dev server: puerto, host, configuración de build y allowedHosts.',
    },
    {
      name: 'budgets',
      text: 'Límites de tamaño del bundle. Si te pasas, el build avisa o falla: sirve para detectar dependencias enormes.',
    },
    {
      name: 'defaultConfiguration',
      text: 'Indica que ng build usa production y ng serve usa development cuando no se especifica.',
    },
  ];

  protected readonly angularJson = `{
  "projects": {
    "mi-proyecto": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json",
            "styles": ["src/styles.scss"],
            "assets": [{ "glob": "**/*", "input": "public" }]
          },
          "configurations": {
            "production": { "outputHashing": "all" },
            "development": { "optimization": false, "sourceMap": true }
          },
          "defaultConfiguration": "production"
        }
      }
    }
  }
}`;

  protected readonly comandosBuild = `# Build de producción en dist/
ng build

# Build de desarrollo (más rápido, sin optimizar)
ng build --configuration development

# Build con estadísticas para analizar el bundle
ng build --stats-json

# Tests unitarios
ng test`;

  protected readonly salidas = [
    { command: 'ng build', output: 'dist/mi-proyecto/browser/', use: 'Subir a producción o a cualquier hosting estático.' },
    { command: 'ng serve', output: 'Memoria (solo dev server)', use: 'Desarrollo local con recarga automática.' },
    { command: 'ng test', output: 'Navegador o runner en terminal', use: 'Pruebas unitarias con Vitest/Karma según la versión.' },
  ];

  protected readonly flujo = [
    {
      title: 'TypeScript y plantillas se compilan',
      text: 'El Angular compiler (AOT) convierte plantillas y componentes en código JavaScript optimizado antes de ejecutarse en el navegador. Los errores de plantilla aparecen durante el build.',
    },
    {
      title: 'Vite empaqueta y sirve',
      text: 'El builder @angular/build usa Vite/esbuild: en desarrollo sirve módulos sin empaquetar todo, y en producción genera bundles con tree-shaking, minificación y hashes.',
    },
    {
      title: 'bootstrapApplication arranca la app',
      text: 'main.ts crea el componente raíz, registra los providers de appConfig y monta el árbol de componentes.',
    },
    {
      title: 'El router resuelve la URL',
      text: 'Con provideRouter, la URL actual se compara con las rutas de app.routes.ts y el componente correspondiente se carga dentro de <router-outlet>.',
    },
    {
      title: 'La detección de cambios actualiza el DOM',
      text: 'Con signals y sin zone.js, Angular refresca la vista cuando cambia un signal leído por la plantilla o cuando se dispara un evento.',
    },
  ];
}
