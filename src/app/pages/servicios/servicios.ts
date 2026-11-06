import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppInfoService } from '../../core/progress.service';
import { CalloutComponent } from '../../shared/callout/callout';
import { ChapterNavComponent } from '../../shared/chapter-nav/chapter-nav';
import { CodeBlockComponent } from '../../shared/code-block/code-block';
import { SectionHeaderComponent } from '../../shared/section-header/section-header';

@Component({
  selector: 'app-servicios',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
    CodeBlockComponent,
    CalloutComponent,
    ChapterNavComponent,
    SectionHeaderComponent,
  ],
  styleUrl: './servicios.scss',
  template: `
    <div class="adl-route">
      <app-section-header
        icon="extension"
        eyebrow="Aplicaciones completas · Capítulo 9"
        title="Servicios e inyección de dependencias"
        description="Un servicio es una clase que concentra lógica reutilizable o estado compartido. La inyección de dependencias se encarga de crearlo y entregarlo donde se necesita."
        level="intermedio"
        [minutes]="12"
      />

      <section aria-labelledby="que-son">
        <h2 id="que-son">¿Qué es un servicio?</h2>
        <p class="adl-text">
          Los componentes deberían ocuparse de la vista. Todo lo demás —llamar a una API, calcular,
          validar, compartir estado— vive mejor en un servicio: se testea sin DOM, se reutiliza y se
          sustituye con facilidad.
        </p>

        <div class="uses">
          @for (use of usos; track use.title) {
            <article>
              <mat-icon>{{ use.icon }}</mat-icon>
              <div>
                <strong>{{ use.title }}</strong>
                <p>{{ use.text }}</p>
              </div>
            </article>
          }
        </div>

        <h3>Crear un servicio</h3>
        <app-code-block language="bash" filename="Terminal" [code]="comando" />
        <app-code-block language="ts" filename="logger.service.ts" [code]="servicioBasico" />
      </section>

      <section aria-labelledby="demo">
        <h2 id="demo">Un servicio real en esta web</h2>
        <p class="adl-text">
          Los datos que ves abajo no están escritos a mano: los obtiene un servicio que hace una
          petición HTTP al archivo <code class="adl-inline-code">app-package.json</code> publicado en
          <code class="adl-inline-code">public/</code>, y expone el resultado con signals.
        </p>

        <div class="live-service">
          <div class="ls-head">
            <mat-icon>dns</mat-icon>
            <div>
              <strong>AppInfoService</strong>
              <code>inject(AppInfoService)</code>
            </div>
            <span class="ls-status" [class.ok]="installed()">
              {{ installed() ? 'datos cargados vía HttpClient' : 'cargando…' }}
            </span>
          </div>

          <div class="ls-body">
            <div class="ls-item">
              <span>angularVersion()</span>
              <strong>v{{ angularVersion() }}</strong>
            </div>
            <div class="ls-item">
              <span>installed()</span>
              <strong>{{ installed() }}</strong>
            </div>
            <div class="ls-item">
              <span>Ámbito</span>
              <strong>providedIn: 'root'</strong>
            </div>
          </div>

          <app-code-block language="ts" filename="app-info.service.ts" [code]="servicioLive" />
        </div>
      </section>

      <section aria-labelledby="inyectar">
        <h2 id="inyectar">Inyectar el servicio</h2>
        <p class="adl-text">
          Hay dos sintaxis equivalentes. <code class="adl-inline-code">inject()</code> es la
          recomendada en código nuevo: funciona en campos de clase, en funciones de guards y en
          utilidades que corren dentro de un contexto de inyección.
        </p>

        <div class="two-col">
          <div>
            <h3>inject() — recomendado</h3>
            <app-code-block language="ts" filename="ejemplo.ts" [code]="injectModerno" />
          </div>
          <div>
            <h3>Constructor — clásico</h3>
            <app-code-block language="ts" filename="ejemplo.ts" [code]="injectClasico" />
          </div>
        </div>

        <app-callout type="info" label="¿Cuándo no funciona inject()?">
          <p>
            Solo se puede llamar dentro de un <em>contexto de inyección</em>: un constructor, el
            inicializador de un campo, el factory de un <code>InjectionToken</code> o el cuerpo de un
            guard funcional. Fuera de ahí lanza
            <code>NG0203: inject() must be called from an injection context</code>.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="ambitos">
        <h2 id="ambitos">Ámbitos: dónde vive la instancia</h2>
        <p class="adl-text">
          La inyección de dependencias de Angular es jerárquica: hay un inyector raíz y un inyector
          por componente. Según dónde se registre el servicio, se crea una instancia por aplicación,
          por componente o por ruta.
        </p>

        <div class="scope-cards">
          @for (scope of ambitos; track scope.title) {
            <article [class.featured]="scope.featured">
              <code>{{ scope.code }}</code>
              <h3>{{ scope.title }}</h3>
              <p>{{ scope.text }}</p>
              <span class="scope-count">{{ scope.count }}</span>
            </article>
          }
        </div>

        <app-code-block language="ts" filename="contador-local.ts" [code]="ambitoComponente" />

        <app-callout type="angular" label="Regla práctica">
          <p>
            Empieza siempre con <code>providedIn: 'root'</code>. Baja el ámbito solo si necesitas
            estado independiente por instancia o por ruta. Subir un servicio a un ámbito incorrecto
            es una fuente clásica de bugs de estado compartido.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="tokens">
        <h2 id="tokens">InjectionToken y configuración</h2>
        <p class="adl-text">
          No todo lo que se inyecta es una clase. Con
          <code class="adl-inline-code">InjectionToken</code> se inyectan valores, interfaces no
          representables en tiempo de ejecución o configuración de plantas.
        </p>

        <app-code-block language="ts" filename="config.ts" [code]="tokens" />
      </section>

      <section aria-labelledby="http">
        <h2 id="http">Servicio con HttpClient</h2>
        <p class="adl-text">
          El patrón más habitual: un servicio encapsula las llamadas a una API y el componente solo
          consume resultados. Con <code class="adl-inline-code">provideHttpClient()</code> en
          <code class="adl-inline-code">app.config.ts</code> ya está disponible.
        </p>

        <div class="two-col">
          <app-code-block language="ts" filename="usuario.service.ts" [code]="servicioHttp" />
          <app-code-block language="ts" filename="usuario.ts" [code]="componenteHttp" />
        </div>

        <app-callout type="tip">
          <p>
            Para componentes con signals, <code>resource()</code> gestiona el ciclo de vida
            completo de la petición (carga, error, valor y recarga). Para integrarte con RxJS,
            <code>toSignal()</code> convierte cualquier observable en signal.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="depurar">
        <h2 id="depurar">Errores habituales</h2>
        <div class="errors">
          @for (error of errores; track error.title) {
            <article>
              <h3><mat-icon>error_outline</mat-icon> {{ error.title }}</h3>
              <p>{{ error.text }}</p>
              <code class="fix">{{ error.fix }}</code>
            </article>
          }
        </div>
      </section>

      <app-chapter-nav route="/servicios" />
    </div>
  `,
})
export class ServiciosPage {
  private readonly appInfo = inject(AppInfoService);

  protected readonly angularVersion = this.appInfo.angularVersion;
  protected readonly installed = this.appInfo.installed;

  protected readonly resumen = computed(() => `Angular ${this.angularVersion()}`);

  protected readonly usos = [
    { icon: 'cloud_sync', title: 'Comunicación con APIs', text: 'Encapsulan HttpClient: rutas, cabeceras, transformación de respuestas y manejo de errores en un único lugar.' },
    { icon: 'inventory_2', title: 'Estado compartido', text: 'Un signal en un servicio es la forma más simple de compartir estado entre componentes no relacionados.' },
    { icon: 'functions', title: 'Lógica reutilizable', text: 'Cálculos, validaciones y formateos que no dependen de la vista y se pueden testear en aislamiento.' },
    { icon: 'lock', title: 'Autenticación', text: 'Gestión de sesión, tokens y permisos. Los guards consumen el servicio para decidir si permiten la navegación.' },
  ];

  protected readonly comando = `# Forma larga
ng generate service logger

# Forma abreviada
ng g s logger

# En una carpeta concreta
ng g s core/logger`;

  protected readonly servicioBasico = `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  log(mensaje: string) {
    console.log(mensaje);
  }

  error(mensaje: string, error?: unknown) {
    console.error(mensaje, error);
  }
}`;

  protected readonly injectModerno = `import { Component, inject } from '@angular/core';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-ejemplo',
  templateUrl: './ejemplo.html',
})
export class Ejemplo {
  private logger = inject(LoggerService);

  constructor() {
    this.logger.log('Componente inicializado');
  }
}`;

  protected readonly injectClasico = `import { Component } from '@angular/core';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-ejemplo',
  templateUrl: './ejemplo.html',
})
export class Ejemplo {
  constructor(private logger: LoggerService) {}

  ngOnInit() {
    this.logger.log('Componente inicializado');
  }
}`;

  protected readonly ambitos = [
    {
      code: "providedIn: 'root'",
      title: 'Global',
      text: 'Una única instancia para toda la aplicación. Es el valor por defecto y lo habitual para servicios sin estado por componente.',
      count: '1 instancia',
      featured: true,
    },
    {
      code: 'providers: [Srv]',
      title: 'Por componente',
      text: 'Declarado en el decorador del componente: cada instancia del componente recibe su propia copia del servicio.',
      count: '1 por instancia',
      featured: false,
    },
    {
      code: 'providers: [] en la ruta',
      title: 'Por ruta',
      text: 'La instancia vive mientras la ruta esté activa y se destruye al salir: útil para estado de una feature.',
      count: '1 por ruta activa',
      featured: false,
    },
    {
      code: "providedIn: 'platform'",
      title: 'Plataforma',
      text: 'Compartida incluso entre varias aplicaciones Angular en la misma página. Se usa muy rara vez.',
      count: '1 por plataforma',
      featured: false,
    },
  ];

  protected readonly ambitoComponente = `import { Component, Injectable, inject } from '@angular/core';

@Injectable() // sin providedIn: no es global
export class ContadorLocalService {
  valor = 0;
  incrementar() { this.valor++; }
}

@Component({
  selector: 'app-panel',
  providers: [ContadorLocalService], // ámbito de este componente
  template: \`
    <button (click)="contador.incrementar()">{{ contador.valor }}</button>
  \`,
})
export class Panel {
  protected contador = inject(ContadorLocalService);
}`;

  protected readonly tokens = `import { InjectionToken, inject } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
  pageSize: number;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// Registro en app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_CONFIG, useValue: { apiUrl: '/api', pageSize: 20 } },
  ],
};

// Consumo
export class UsuariosService {
  private config = inject(APP_CONFIG);
  private url = \`\${this.config.apiUrl}/usuarios\`;
}`;

  protected readonly servicioHttp = `import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  private readonly url = '/api/usuarios';

  // Caché reactiva opcional
  private _usuarios = signal<Usuario[]>([]);
  readonly usuarios = this._usuarios.asReadonly();

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url)
      .pipe(tap(usuarios => this._usuarios.set(usuarios)));
  }

  obtener(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(\`\${this.url}/\${id}\`);
  }

  crear(usuario: Omit<Usuario, 'id'>): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, usuario);
  }
}`;

  protected readonly componenteHttp = `import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsuarioService, Usuario } from './usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.html',
})
export class Usuarios {
  private servicio = inject(UsuarioService);

  cargando = signal(true);
  usuarios = signal<Usuario[]>([]);

  constructor() {
    this.servicio.listar()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: usuarios => {
          this.usuarios.set(usuarios);
          this.cargando.set(false);
        },
        error: () => this.cargando.set(false),
      });
  }
}`;

  protected readonly servicioLive = `import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AppInfoService {
  private http = inject(HttpClient);
  private packageJson = signal<Paquete | null>(null);

  readonly angularVersion = computed(() => {
    const deps = this.packageJson()?.dependencies ?? {};
    return (deps['@angular/core'] ?? '').replace(/^[\\^~]/, '') || '22';
  });

  readonly installed = computed(() => this.packageJson() !== null);

  constructor() {
    // Se ejecuta una sola vez: instancia global
    this.http.get<Paquete>('app-package.json')
      .pipe(takeUntilDestroyed())
      .subscribe(data => this.packageJson.set(data));
  }
}`;

  protected readonly errores = [
    {
      title: 'NG0203: inject() must be called from an injection context',
      text: 'Se llamó a inject() en un método normal, en un callback asíncrono o fuera de un componente.',
      fix: 'Mueve la llamada al inicializador del campo, al constructor o a un factory.',
    },
    {
      title: 'NullInjectorError: No provider for X',
      text: 'La dependencia no está registrada o se está pidiendo en un inyector donde no existe (por ejemplo, un servicio con ámbito de componente desde un servicio global).',
      fix: "Regístrala con providedIn: 'root' o añádela a los providers del ámbito correcto.",
    },
    {
      title: 'Ciclos de dependencias',
      text: 'El servicio A inyecta B y B inyecta A: Angular no puede resolver el grafo.',
      fix: 'Extrae la parte compartida a un tercer servicio o usa forwardRef solo como último recurso.',
    },
    {
      title: 'Estado que no se actualiza en la vista',
      text: 'Con detección sin zonas, una variable normal que cambia dentro de un callback de librería externa no provoca actualización.',
      fix: 'Guarda el estado en un signal (o llama a ChangeDetectorRef.markForCheck() con OnPush).',
    },
  ];
}
