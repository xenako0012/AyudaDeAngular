import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

import { CalloutComponent } from '../../shared/callout/callout';
import { ChapterNavComponent } from '../../shared/chapter-nav/chapter-nav';
import { CodeBlockComponent } from '../../shared/code-block/code-block';
import { SectionHeaderComponent } from '../../shared/section-header/section-header';
import { RUTAS_EJEMPLO } from '../../data/content.data';

@Component({
  selector: 'app-routing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CodeBlockComponent,
    CalloutComponent,
    ChapterNavComponent,
    SectionHeaderComponent,
  ],
  styleUrl: './routing.scss',
  template: `
    <div class="adl-route">
      <app-section-header
        icon="route"
        eyebrow="Aplicaciones completas · Capítulo 7"
        title="Routing y navegación"
        description="El router de Angular convierte la URL del navegador en el componente que se muestra, sin recargar la página. Rutas, parámetros, lazy loading y guards funcionales, con un ejemplo navegable."
        level="intermedio"
        [minutes]="18"
      />

      <section aria-labelledby="concepto">
        <h2 id="concepto">Cómo funciona</h2>
        <p class="adl-text">
          Una SPA tiene una sola página HTML, así que la «navegación» la resuelve el router: compara
          la URL actual con la configuración de rutas y monta el componente que corresponde dentro
          de un <code class="adl-inline-code">&lt;router-outlet /&gt;</code>.
        </p>

        <div class="elements">
          @for (element of elementos; track element.name) {
            <article>
              <code>{{ element.name }}</code>
              <p>{{ element.text }}</p>
            </article>
          }
        </div>

        <div class="flow-strip" aria-hidden="true">
          <span>URL: /usuarios/42</span>
          <mat-icon>arrow_forward</mat-icon>
          <span>routes</span>
          <mat-icon>arrow_forward</mat-icon>
          <span>loadComponent()</span>
          <mat-icon>arrow_forward</mat-icon>
          <span>&lt;router-outlet /&gt;</span>
        </div>
      </section>

      <section aria-labelledby="config">
        <h2 id="config">Configuración básica</h2>
        <p class="adl-text">
          Las rutas se declaran en <code class="adl-inline-code">app.routes.ts</code> y se registran
          con <code class="adl-inline-code">provideRouter()</code> en
          <code class="adl-inline-code">app.config.ts</code>. No hace falta
          <code class="adl-inline-code">RouterModule</code>.
        </p>

        <app-code-block language="ts" filename="app.routes.ts" [code]="rutasBasicas" />
        <app-code-block language="ts" filename="app.config.ts" [code]="configRouter" />
        <app-code-block language="html" filename="app.html" [code]="outletHtml" />
      </section>

      <section aria-labelledby="demo">
        <h2 id="demo">Demo navegable</h2>
        <p class="adl-text">
          Esta web ya funciona con el router. Abajo tienes dos demostraciones reales: navegación con
          <code class="adl-inline-code">routerLink</code> +
          <code class="adl-inline-code">routerLinkActive</code>, y navegación programática con el
          servicio <code class="adl-inline-code">Router</code>.
        </p>

        <div class="demo-card">
          <h3><mat-icon>link</mat-icon> RouterLink y estado activo</h3>
          <nav class="link-demo" aria-label="Demo de routerLink">
            @for (ruta of rutasDemo; track ruta.path) {
              <a
                class="demo-link"
                [routerLink]="ruta.link"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: ruta.path !== '' }"
              >
                <mat-icon>{{ ruta.icon }}</mat-icon>
                {{ ruta.title }}
              </a>
            }
          </nav>
          <p class="demo-note">
            La clase <code class="adl-inline-code">active</code> la aplica
            <code class="adl-inline-code">routerLinkActive</code>; el estilo es de esta página.
          </p>
        </div>

        <div class="demo-card">
          <h3><mat-icon>keyboard</mat-icon> Navegación programática</h3>
          <div class="prog-demo">
            <button matButton="filled" type="button" (click)="irAUsuario()">
              <mat-icon>person</mat-icon> navigate(['/usuarios', '42'])
            </button>
            <button matButton="outlined" type="button" (click)="irA('signals')">
              <mat-icon>bolt</mat-icon> navigateByUrl('/signals')
            </button>
            <button matButton="outlined" type="button" (click)="irA('material')">
              <mat-icon>palette</mat-icon> navigateByUrl('/material')
            </button>
          </div>
          <p class="demo-note">
            <code class="adl-inline-code">navigate()</code> recibe una lista de segmentos;
            <code class="adl-inline-code">navigateByUrl()</code> una URL completa. La primera ruta
            abre un capítulo-demo que lee el parámetro <code class="adl-inline-code">:id</code>.
          </p>
        </div>
      </section>

      <section aria-labelledby="tabla">
        <h2 id="tabla">Tipos de ruta</h2>
        <p class="adl-text">
          Escenarios que aparecen en cualquier aplicación mediana:
        </p>

        <div class="routes-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Ruta</th>
                <th scope="col">Qué demuestra</th>
              </tr>
            </thead>
            <tbody>
              @for (ruta of rutas; track ruta.path) {
                <tr>
                  <td>
                    <span class="route-path">
                      <mat-icon>{{ ruta.icon }}</mat-icon>
                      <code class="adl-inline-code">/{{ ruta.path }}</code>
                    </span>
                  </td>
                  <td>{{ ruta.description }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <app-code-block language="ts" filename="app.routes.ts" [code]="rutasAvanzadas" />
      </section>

      <section aria-labelledby="parametros">
        <h2 id="parametros">Parámetros de ruta</h2>
        <p class="adl-text">
          Hay dos formas de leer un parámetro como <code class="adl-inline-code">:id</code>: la
          clásica con <code class="adl-inline-code">ActivatedRoute</code> y la moderna, enlazando el
          parámetro directamente a un <code class="adl-inline-code">input()</code> del componente
          gracias a <code class="adl-inline-code">withComponentInputBinding()</code>.
        </p>

        <div class="two-col">
          <div>
            <h3>Moderna: input() de ruta</h3>
            <app-code-block language="ts" filename="usuario.ts" [code]="paramsModerno" />
          </div>
          <div>
            <h3>Clásica: ActivatedRoute</h3>
            <app-code-block language="ts" filename="usuario.ts" [code]="paramsClasico" />
          </div>
        </div>

        <app-callout type="angular" label="Recomendación">
          <p>
            Con <code>withComponentInputBinding()</code> activado, cualquier parámetro de ruta,
            query param o dato resuelto por un resolver se pasa al input con el mismo nombre. Es más
            limpio y funciona de forma natural con signals.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="lazy">
        <h2 id="lazy">Lazy loading</h2>
        <p class="adl-text">
          Cargar bajo demanda partes de la aplicación reduce el JavaScript inicial. Con componentes
          standalone se usa <code class="adl-inline-code">loadComponent</code>; para agrupar varios
          capítulos, <code class="adl-inline-code">loadChildren</code> con un archivo de rutas.
        </p>

        <app-code-block language="ts" filename="app.routes.ts" [code]="lazyEjemplo" />

        <p class="adl-text">
          Esta misma web lo usa: la portada y el shell pesan poco y cada capítulo es un chunk
          independiente que se descarga al entrar. Puedes verlo en la pestaña <em>Network</em> del
          navegador.
        </p>
      </section>

      <section aria-labelledby="guards">
        <h2 id="guards">Guards de ruta</h2>
        <p class="adl-text">
          Los guards deciden si una navegación puede continuar. En Angular moderno se escriben como
          <strong>funciones</strong> que usan
          <code class="adl-inline-code">inject()</code>, sin clases ni
          <code class="adl-inline-code">@Injectable</code>.
        </p>

        <div class="guards-grid">
          @for (guard of guards; track guard.name) {
            <article>
              <code>{{ guard.name }}</code>
              <p>{{ guard.text }}</p>
              @if (guard.deprecated) {
                <span class="dep-badge">deprecado</span>
              }
            </article>
          }
        </div>

        <app-code-block language="ts" filename="auth.guard.ts" [code]="guardEjemplo" />
        <app-code-block language="ts" filename="auth.service.ts" [code]="authService" />
      </section>

      <section aria-labelledby="options">
        <h2 id="options">Opciones de provideRouter()</h2>
        <div class="opts">
          @for (opt of opciones; track opt.name) {
            <article>
              <code>{{ opt.name }}</code>
              <p>{{ opt.text }}</p>
            </article>
          }
        </div>
        <app-code-block language="ts" filename="app.config.ts" [code]="opcionesCodigo" />
      </section>

      <app-chapter-nav route="/routing" />
    </div>
  `,
})
export class RoutingPage {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly rutas = RUTAS_EJEMPLO;
  protected readonly currentUrl = signal(this.router.url);

  protected readonly rutasDemo = [
    { path: '', link: '/', title: 'Portada', icon: 'home' },
    { path: 'routing', link: '/routing', title: 'Routing', icon: 'route' },
    { path: 'signals', link: '/signals', title: 'Signals', icon: 'bolt' },
  ];

  constructor() {
    this.route.queryParamMap.subscribe(() => this.currentUrl.set(this.router.url));
  }

  protected irAUsuario(): void {
    void this.router.navigate(['/usuarios', '42']);
  }

  protected irA(ruta: string): void {
    void this.router.navigateByUrl(`/${ruta}`);
  }

  protected readonly elementos = [
    {
      name: 'Routes',
      text: 'Array de objetos que asocia un path con un componente (o una carga diferida).',
    },
    {
      name: '<router-outlet />',
      text: 'Marcador donde el router inserta el componente de la ruta activa.',
    },
    {
      name: 'RouterLink',
      text: 'Directiva que convierte un <a> en un enlace interno sin recargar la página.',
    },
    {
      name: 'ActivatedRoute',
      text: 'Servicio con la información de la ruta activa: parámetros, query params, datos resueltos.',
    },
    {
      name: 'Router',
      text: 'Servicio para navegar de forma programática: navigate(), navigateByUrl(), events.',
    },
    {
      name: 'RouterLinkActive',
      text: 'Añade una clase al enlace cuando su ruta está activa: ideal para menús.',
    },
  ];

  protected readonly rutasBasicas = `import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { Usuario } from './usuario/usuario';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'usuario', component: Usuario },
];`;

  protected readonly configRouter = `import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(), // params -> inputs del componente
    ),
  ],
};`;

  protected readonly outletHtml = `<header>
  <a routerLink="/">Inicio</a>
  <a routerLink="/usuario" routerLinkActive="active">Usuario</a>
</header>

<!-- Aquí se monta el componente de la ruta activa -->
<router-outlet />`;

  protected readonly rutasAvanzadas = `export const routes: Routes = [
  // Ruta por defecto
  { path: '', component: Inicio },

  // Redirección
  { path: 'home', redirectTo: '', pathMatch: 'full' },

  // Parámetro de ruta
  { path: 'usuario/:id', component: Usuario },

  // Ruta protegida con guard funcional
  { path: 'privado', component: Privado, canActivate: [authGuard] },

  // Rutas hijas (anidadas)
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', component: AdminDashboard },
      { path: 'ajustes', component: AdminAjustes },
    ],
  },

  // Carga diferida de un componente
  {
    path: 'usuarios',
    loadComponent: () => import('./usuarios/usuarios').then(m => m.Usuarios),
  },

  // Comodín: cualquier URL no reconocida
  { path: '**', component: NotFound },
];`;

  protected readonly paramsModerno = `import { Component, inject, input } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuario',
  template: './usuario.html',
})
export class Usuario {
  // El router rellena este input con el parámetro :id
  id = input.required<string>();

  private servicio = inject(UsuarioService);
  usuario = resource({
    params: () => ({ id: this.id() }),
    loader: ({ params }) => this.servicio.get(params.id),
  });
}`;

  protected readonly paramsClasico = `import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({ selector: 'app-usuario', template: './usuario.html' })
export class Usuario {
  private ruta = inject(ActivatedRoute);

  // Observable -> signal
  id = toSignal(this.ruta.paramMap, {
    requireSync: true,
    initialValue: { get: () => '' } as unknown as ParamMap,
  });

  // O con snapshot (si el componente se recrea en cada navegación)
  get idSnapshot(): string | null {
    return this.ruta.snapshot.paramMap.get('id');
  }
}`;

  protected readonly lazyEjemplo = `// Un componente
{
  path: 'usuarios',
  loadComponent: () => import('./usuarios/usuarios').then(m => m.Usuarios),
}

// Un grupo de rutas (feature) con su propio archivo
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
}

// Precarga opcional: descarga en segundo plano tras el arranque
provideRouter(routes, withPreloading(PreloadAllModules));`;

  protected readonly guards = [
    { name: 'canActivate', text: '¿Puede el usuario entrar en esta ruta?', deprecated: false },
    { name: 'canActivateChild', text: 'Se aplica a todas las rutas hijas de un nodo.', deprecated: false },
    { name: 'canDeactivate', text: '¿Puede salir? Útil para avisar de cambios sin guardar.', deprecated: false },
    { name: 'canMatch', text: '¿Esta ruta coincide? Puede evitar cargar el chunk completo.', deprecated: false },
    { name: 'resolve', text: 'Prefetchea datos antes de activar la ruta.', deprecated: false },
    { name: 'CanLoad', text: 'Sustituido por canMatch, que también bloquea la descarga del chunk.', deprecated: true },
  ];

  protected readonly guardEjemplo = `import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.estaAutenticado()) {
    return true;
  }

  // Redirige conservando la URL de destino
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: router.url },
  });
};`;

  protected readonly authService = `import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _sesion = signal<string | null>(null);

  readonly sesion = this._sesion.asReadonly();

  estaAutenticado(): boolean {
    return this._sesion() !== null;
  }
}`;

  protected readonly opciones = [
    { name: 'withComponentInputBinding()', text: 'Enlaza parámetros, query params y datos de resolver a los inputs del componente.' },
    { name: 'withInMemoryScrolling()', text: 'Restaura la posición del scroll al navegar entre páginas.' },
    { name: 'withPreloading()', text: 'Precarga los chunks perezosos en segundo plano.' },
    { name: 'withHashLocation()', text: 'Usa #/ruta en lugar de rutas sin hash. Útil en hostings sin rewrites.' },
    { name: 'withViewTransitions()', text: 'Animaciones de transición nativas del navegador entre vistas.' },
  ];

  protected readonly opcionesCodigo = `provideRouter(
  routes,
  withComponentInputBinding(),
  withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
  withPreloading(PreloadAllModules),
  withViewTransitions(),
)`;
}
