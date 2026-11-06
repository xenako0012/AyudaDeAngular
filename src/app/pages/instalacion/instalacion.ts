import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

import { CalloutComponent } from '../../shared/callout/callout';
import { ChapterNavComponent } from '../../shared/chapter-nav/chapter-nav';
import { CodeBlockComponent } from '../../shared/code-block/code-block';
import { SectionHeaderComponent } from '../../shared/section-header/section-header';

@Component({
  selector: 'app-instalacion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
    CodeBlockComponent,
    CalloutComponent,
    ChapterNavComponent,
    SectionHeaderComponent,
  ],
  styleUrl: './instalacion.scss',
  template: `
    <div class="adl-route">
      <app-section-header
        icon="download"
        eyebrow="Primeros pasos · Capítulo 1"
        title="Instalación y Angular CLI"
        description="Todo lo necesario para pasar de una carpeta vacía a una aplicación Angular corriendo en el navegador: Node.js, el CLI, ng new y ng serve."
        level="inicial"
        [minutes]="8"
      />

      <section aria-labelledby="requisitos">
        <h2 id="requisitos">Requisitos: Node.js</h2>
        <p class="adl-text">
          Angular no se ejecuta «solo»: el CLI y el servidor de desarrollo son aplicaciones de
          Node.js. La versión de Angular y la de Node deben ser compatibles; para
          <strong>Angular 22</strong> se necesita <strong>Node.js 22.22.3 o superior</strong>
          (también se admite Node 24.15+ y 26+). Descarga el instalador desde
          <a href="https://nodejs.org" target="_blank" rel="noopener">nodejs.org</a> eligiendo la
          versión LTS.
        </p>

        <app-code-block
          language="bash"
          filename="Terminal"
          [code]="comprobarNode"
        />

        <p class="adl-text">
          <code class="adl-inline-code">node -v</code> debe responder con una versión igual o
          superior a <code class="adl-inline-code">v22.22.3</code>, y
          <code class="adl-inline-code">npm -v</code> con la versión de npm que lo acompaña. Si esos
          dos comandos funcionan, ya tienes la base.
        </p>

        <app-callout type="tip" label="Consejo">
          <p>
            Usa <strong>nvm</strong>, <strong>fnm</strong> o <strong>Volta</strong> para cambiar de
            versión de Node por proyecto. Evita permisos de administrador al instalar paquetes
            globales y te permite convivir con proyectos antiguos.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="cli">
        <h2 id="cli">Instalar Angular CLI</h2>
        <p class="adl-text">
          El CLI es la herramienta oficial: crea el proyecto, genera componentes, ejecuta el
          servidor de desarrollo, compila para producción y actualiza entre versiones. Se instala
          globalmente con npm.
        </p>

        <app-code-block language="bash" filename="Terminal" [code]="instalarCli" />

        <p class="adl-text">
          Comprueba que la instalación funciona y qué versión tienes activa:
        </p>

        <app-code-block language="bash" filename="Terminal" [code]="comprobarCli" />

        <app-callout type="info">
          <p>
            Si <code>ng</code> no se reconoce como comando, el directorio global de binarios de npm
            no está en el <code>PATH</code>. Puedes consultarlo con
            <code>npm config get prefix</code> o usar
            <code>npx&#64;angular/cli&#64;22 new</code> sin instalar nada globalmente.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="crear">
        <h2 id="crear">Crear el proyecto con ng new</h2>
        <p class="adl-text">
          Sitúate en la carpeta donde quieras crear el proyecto y ejecuta
          <code class="adl-inline-code">ng new</code> con un nombre en <em>kebab-case</em>. Durante
          la creación el CLI puede preguntar por la configuración inicial.
        </p>

        <app-code-block language="bash" filename="Terminal" [code]="crearProyecto" />

        <div class="qa-grid">
          @for (item of preguntasNgNew; track item.title) {
            <article class="qa-card">
              <span class="qa-icon"><mat-icon>{{ item.icon }}</mat-icon></span>
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
                <code class="adl-inline-code">{{ item.answer }}</code>
              </div>
            </article>
          }
        </div>

        <app-callout type="angular" label="Buena práctica">
          <p>
            El proyecto se genera con <strong>componentes standalone</strong>, routing y detección
            de cambios <strong>sin zone.js</strong>. Si vas a seguir esta guía, responde
            <strong>sí</strong> a routing y elige SCSS como formato de estilos.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="servir">
        <h2 id="servir">Ejecutar: ng serve</h2>
        <p class="adl-text">
          <code class="adl-inline-code">ng serve</code> compila en memoria, levanta un servidor de
          desarrollo con recarga automática (HMR) y sirve la app en
          <code class="adl-inline-code">http://localhost:4200/</code>.
        </p>

        <app-code-block language="bash" filename="Terminal" [code]="servir" />

        <div class="options-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Opción</th>
                <th scope="col">Qué hace</th>
              </tr>
            </thead>
            <tbody>
              @for (option of opcionesServe; track option.flag) {
                <tr>
                  <td><code class="adl-inline-code">{{ option.flag }}</code></td>
                  <td>{{ option.text }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="generar">
        <h2 id="generar">Generar el primer componente</h2>
        <p class="adl-text">
          <code class="adl-inline-code">ng generate component</code> crea los archivos de un
          componente nuevo y lo registra automáticamente. La forma abreviada es
          <code class="adl-inline-code">ng g c</code>.
        </p>

        <app-code-block language="bash" filename="Terminal" [code]="generarComponente" />

        <p class="adl-text">El resultado, por defecto, es este conjunto de archivos:</p>

        <ul class="adl-list file-list">
          <li><code class="adl-inline-code">usuario.ts</code> — la clase con el decorador <code class="adl-inline-code">&#64;Component</code>.</li>
          <li><code class="adl-inline-code">usuario.html</code> — la plantilla.</li>
          <li><code class="adl-inline-code">usuario.scss</code> — los estilos encapsulados.</li>
          <li><code class="adl-inline-code">usuario.spec.ts</code> — el archivo de pruebas (si está habilitado).</li>
        </ul>

        <app-code-block language="ts" filename="usuario.ts" [code]="componenteGenerado" />
      </section>

      <section aria-labelledby="flujo">
        <h2 id="flujo">El flujo completo en cinco pasos</h2>
        <p class="adl-text">Resumen para tenerlo todo en el mismo sitio:</p>

        <mat-stepper class="flujo-stepper" orientation="vertical" [linear]="false">
          @for (step of pasos; track step.label) {
            <mat-step [label]="step.label" [completed]="false">
              <p class="adl-text">{{ step.text }}</p>
              @if (step.command) {
                <app-code-block language="bash" [code]="step.command" />
              }
            </mat-step>
          }
        </mat-stepper>
      </section>

      <section aria-labelledby="errores">
        <h2 id="errores">Errores habituales al empezar</h2>

        <div class="errors-grid">
          @for (error of errores; track error.title) {
            <article class="error-card">
              <h3>
                <mat-icon>error_outline</mat-icon>
                {{ error.title }}
              </h3>
              <p>{{ error.text }}</p>
              <p class="fix"><strong>Solución:</strong> {{ error.fix }}</p>
            </article>
          }
        </div>
      </section>

      <app-chapter-nav route="/instalacion" />
    </div>
  `,
})
export class InstalacionPage {
  protected readonly comprobarNode = `node -v
npm -v

# Ejemplo de salida válida para Angular 22
# v22.22.3
# 10.9.8`;

  protected readonly instalarCli = `# Instalación global del CLI
npm install -g @angular/cli

# O bien, sin instalar nada globalmente:
# npx @angular/cli@22 new mi-proyecto`;

  protected readonly comprobarCli = `ng version

# Muestra Angular CLI, la versión de Node,
# el sistema operativo y las versiones de los paquetes.`;

  protected readonly crearProyecto = `# Crea la carpeta mi-proyecto y la pone en marcha
ng new mi-proyecto

# Con opciones explícitas, sin preguntas interactivas
ng new mi-proyecto --style=scss --routing --ssr=false

cd mi-proyecto`;

  protected readonly servir = `# Servidor de desarrollo en http://localhost:4200/
ng serve

# Abre el navegador automáticamente
ng serve --open

# Cambia el puerto (útil si el 4200 está ocupado)
ng serve --port 4500

# Expone la app en la red local para probar desde el móvil
ng serve --host 0.0.0.0`;

  protected readonly generarComponente = `# Forma larga
ng generate component usuario

# Forma abreviada
ng g c usuario

# Otras variantes
ng g c usuario --skip-tests
ng g c admin/panel # lo crea en la subcarpeta admin/`;

  protected readonly componenteGenerado = `import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  imports: [],
  templateUrl: './usuario.html',
  styleUrl: './usuario.scss',
})
export class Usuario {}`;

  protected readonly preguntasNgNew = [
    {
      icon: 'check_circle',
      title: '¿Standalone?',
      text: 'Desde Angular 19 todos los componentes se generan standalone. No hay que elegirlo: es el comportamiento por defecto.',
      answer: 'Por defecto: standalone',
    },
    {
      icon: 'route',
      title: '¿Routing?',
      text: 'Si respondes que sí, el CLI crea app.routes.ts y configura provideRouter(), que usaremos en el capítulo de routing.',
      answer: 'Recomendado: sí',
    },
    {
      icon: 'palette',
      title: '¿Hoja de estilos?',
      text: 'CSS, SCSS, Sass o Less. SCSS permite anidar reglas y usar variables y mixins, y es la opción más habitual.',
      answer: 'Recomendado: SCSS',
    },
    {
      icon: 'dns',
      title: '¿SSR / SSG?',
      text: 'El renderizado en servidor y la generación estática se activan opcionalmente. Para empezar, no hacen falta.',
      answer: 'Recomendado: no',
    },
  ];

  protected readonly opcionesServe = [
    { flag: 'ng serve --open', text: 'Abre el navegador cuando el servidor está listo (alias -o).' },
    { flag: 'ng serve --port 4500', text: 'Sirve la aplicación en el puerto indicado.' },
    { flag: 'ng serve --host 0.0.0.0', text: 'Escucha en todas las interfaces, útil para probar desde otro dispositivo.' },
    { flag: 'ng serve --configuration=production', text: 'Usa la configuración de producción de angular.json.' },
    { flag: 'ng serve --hmr', text: 'Recarga en caliente preservando el estado de los componentes.' },
  ];

  protected readonly pasos = [
    {
      label: '1. Instalar Node.js',
      text: 'Descarga el instalador prebuilt desde nodejs.org y comprueba con node -v que la versión es compatible con Angular 22.',
      command: 'node -v\nnpm -v',
    },
    {
      label: '2. Instalar Angular CLI',
      text: 'Instala el CLI de forma global para tener el comando ng disponible en cualquier carpeta.',
      command: 'npm install -g @angular/cli\nng version',
    },
    {
      label: '3. Crear el proyecto',
      text: 'Genera la aplicación con los valores que prefieras. El nombre debe ir en kebab-case (mi-proyecto, no MiProyecto).',
      command: 'ng new mi-proyecto --style=scss --routing',
    },
    {
      label: '4. Servir en desarrollo',
      text: 'Levanta el servidor local. Cualquier cambio en el código se refleja al instante en el navegador.',
      command: 'cd mi-proyecto\nng serve --open',
    },
    {
      label: '5. Generar código',
      text: 'Crea componentes, servicios, guards o pipes con los schematics del CLI. Se registran solos.',
      command: 'ng g c usuario\nng g s usuario',
    },
  ];

  protected readonly errores = [
    {
      title: 'ng no se reconoce como comando',
      text: 'El CLI se instaló globalmente pero el directorio de binarios de npm no está en el PATH.',
      fix: 'Añade npm config get prefix (seguido de /bin) al PATH o usa npx @angular/cli.',
    },
    {
      title: 'Node demasiado antiguo',
      text: 'ng serve muestra un aviso de versión de Node incompatible o un error de sintaxis dentro de node_modules.',
      fix: 'Actualiza Node a 22.22.3+, 24.15+ o 26+ y vuelve a instalar dependencias.',
    },
    {
      title: 'El puerto 4200 está ocupado',
      text: 'El servidor de desarrollo no puede escuchar porque otro proceso usa el mismo puerto.',
      fix: 'Arranca con ng serve --port 4500 o cierra el proceso que ocupa el puerto.',
    },
    {
      title: 'NG8001: no es un elemento conocido',
      text: 'Se usa un componente o directiva en una plantilla sin importarlo en el array imports del componente.',
      fix: 'Añade el componente, directiva o módulo a los imports del componente standalone.',
    },
  ];
}
