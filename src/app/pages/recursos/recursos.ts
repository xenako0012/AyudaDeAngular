import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ChapterNavComponent } from '../../shared/chapter-nav/chapter-nav';
import { SectionHeaderComponent } from '../../shared/section-header/section-header';

interface Comando {
  readonly cmd: string;
  readonly desc: string;
  readonly tag: string;
}

@Component({
  selector: 'app-recursos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    ChapterNavComponent,
    SectionHeaderComponent,
  ],
  styleUrl: './recursos.scss',
  template: `
    <div class="adl-route">
      <app-section-header
        icon="terminal"
        eyebrow="Recursos"
        title="Cheatsheet de Angular CLI"
        description="Los comandos que se usan a diario, agrupados por tarea, con copia al portapapeles. Filtra por nombre o por categoría."
        level="inicial"
        [minutes]="5"
      />

      <div class="tools">
        <label class="search-box">
          <mat-icon aria-hidden="true">search</mat-icon>
          <input
            type="search"
            placeholder="Filtrar comandos: generate, build, test…"
            [value]="query()"
            (input)="query.set($any($event.target).value)"
            aria-label="Filtrar comandos"
          />
        </label>

        <div class="tags">
          <button
            type="button"
            class="tag"
            [class.active]="tag() === 'todos'"
            (click)="tag.set('todos')"
          >
            Todos
          </button>
          @for (t of tags; track t) {
            <button type="button" class="tag" [class.active]="tag() === t" (click)="tag.set(t)">
              {{ t }}
            </button>
          }
        </div>
      </div>

      @for (group of grupos(); track group.title) {
        <section class="cmd-group">
          <h2>{{ group.title }}</h2>
          <div class="cmd-list">
            @for (cmd of group.items; track cmd.cmd) {
              <div class="cmd-row">
                <code class="cmd-text">{{ cmd.cmd }}</code>
                <span class="cmd-desc">{{ cmd.desc }}</span>
                <button
                  matIconButton
                  type="button"
                  class="copy"
                  [attr.aria-label]="'Copiar ' + cmd.cmd"
                  (click)="copiar(cmd.cmd)"
                >
                  <mat-icon>content_copy</mat-icon>
                </button>
              </div>
            }
          </div>
        </section>
      } @empty {
        <div class="empty">
          <mat-icon>search_off</mat-icon>
          <p>Ningún comando coincide con «{{ query() }}».</p>
          <button matButton type="button" (click)="reset()">Limpiar filtros</button>
        </div>
      }

      <section class="shortcuts">
        <h2>Enlaces útiles</h2>
        <div class="link-grid">
          @for (link of enlaces; track link.url) {
            <a [href]="link.url" target="_blank" rel="noopener">
              <mat-icon>{{ link.icon }}</mat-icon>
              <div>
                <strong>{{ link.title }}</strong>
                <span>{{ link.desc }}</span>
              </div>
              <mat-icon class="ext">arrow_outward</mat-icon>
            </a>
          }
        </div>
      </section>

      <app-chapter-nav route="/recursos" />
    </div>
  `,
})
export class RecursosPage {
  private readonly snackBar = inject(MatSnackBar);

  protected readonly query = signal('');
  protected readonly tag = signal('todos');
  protected readonly tags = ['Proyecto', 'Generate', 'Build', 'Testing', 'Mantenimiento'];

  private readonly comandos: readonly Comando[] = [
    { cmd: 'ng version', desc: 'Versión del CLI, de Angular y de Node.', tag: 'Proyecto' },
    { cmd: 'ng new mi-app --style=scss --routing', desc: 'Crea un proyecto con SCSS y routing.', tag: 'Proyecto' },
    { cmd: 'ng serve --open', desc: 'Servidor de desarrollo y abre el navegador.', tag: 'Proyecto' },
    { cmd: 'ng serve --port 4500', desc: 'Cambia el puerto del dev server.', tag: 'Proyecto' },
    { cmd: 'ng config projects.mi-app.architect.build.options.outputPath dist/app', desc: 'Modifica un valor de angular.json.', tag: 'Proyecto' },
    { cmd: 'ng update', desc: 'Muestra dependencias con actualizaciones disponibles.', tag: 'Mantenimiento' },
    { cmd: 'ng update @angular/core @angular/cli', desc: 'Actualiza Angular a la última versión compatible.', tag: 'Mantenimiento' },
    { cmd: 'ng add @angular/material', desc: 'Instala y configura Angular Material.', tag: 'Mantenimiento' },
    { cmd: 'ng g c usuario', desc: 'Genera un componente standalone.', tag: 'Generate' },
    { cmd: 'ng g c usuario --skip-tests', desc: 'Componente sin archivo de pruebas.', tag: 'Generate' },
    { cmd: 'ng g s auth', desc: 'Genera un servicio con @Injectable.', tag: 'Generate' },
    { cmd: 'ng g g auth/guards/auth', desc: 'Genera un guard funcional.', tag: 'Generate' },
    { cmd: 'ng g p shared/truncate', desc: 'Genera un pipe standalone.', tag: 'Generate' },
    { cmd: 'ng g d shared/highlight', desc: 'Genera una directiva standalone.', tag: 'Generate' },
    { cmd: 'ng g e models/usuario', desc: 'Genera una interfaz TypeScript.', tag: 'Generate' },
    { cmd: 'ng g environments', desc: 'Crea la estructura de entornos.', tag: 'Generate' },
    { cmd: 'ng build', desc: 'Build de producción optimizado en dist/.', tag: 'Build' },
    { cmd: 'ng build --configuration development', desc: 'Build sin optimizar, con source maps.', tag: 'Build' },
    { cmd: 'ng build --stats-json', desc: 'Genera stats.json para analizar el bundle.', tag: 'Build' },
    { cmd: 'ng build --watch', desc: 'Recompila al cambiar archivos.', tag: 'Build' },
    { cmd: 'ng test', desc: 'Ejecuta las pruebas unitarias.', tag: 'Testing' },
    { cmd: 'ng test --watch=false', desc: 'Ejecuta los tests una sola vez (CI).', tag: 'Testing' },
    { cmd: 'ng e2e', desc: 'Pruebas end-to-end con el runner configurado.', tag: 'Testing' },
    { cmd: 'ng lint', desc: 'Ejecuta el linter configurado en el workspace.', tag: 'Testing' },
    { cmd: 'ng deploy', desc: 'Despliega con el builder indicado (Angular CLI 17+).', tag: 'Build' },
  ];

  protected readonly grupos = computed(() => {
    const term = normalize(this.query());
    const activeTag = this.tag();

    const filtered = this.comandos.filter((cmd) => {
      const matchesTag = activeTag === 'todos' || cmd.tag === activeTag;
      const matchesTerm =
        !term || normalize(`${cmd.cmd} ${cmd.desc} ${cmd.tag}`).includes(term);
      return matchesTag && matchesTerm;
    });

    const order = ['Proyecto', 'Generate', 'Build', 'Testing', 'Mantenimiento'];
    return order
      .map((title) => ({
        title,
        items: filtered.filter((cmd) => cmd.tag === title),
      }))
      .filter((group) => group.items.length > 0);
  });

  protected readonly enlaces = [
    {
      icon: 'menu_book',
      title: 'Documentación de Angular',
      desc: 'Guías, tutoriales y referencia de API.',
      url: 'https://angular.dev',
    },
    {
      icon: 'palette',
      title: 'Angular Material',
      desc: 'Catálogo de componentes y guía de tematización.',
      url: 'https://material.angular.dev',
    },
    {
      icon: 'terminal',
      title: 'Angular CLI',
      desc: 'Referencia de todos los comandos y schematics.',
      url: 'https://angular.dev/tools/cli',
    },
    {
      icon: 'bolt',
      title: 'Guía de signals',
      desc: 'Estado reactivo, computed, effect y recursos.',
      url: 'https://angular.dev/guide/signals',
    },
    {
      icon: 'alt_route',
      title: 'Control flow',
      desc: '@if, @for, @switch y @defer explicados por el equipo.',
      url: 'https://angular.dev/guide/templates/control-flow',
    },
    {
      icon: 'hub',
      title: 'Repo del proyecto',
      desc: 'Código fuente de esta web en GitHub.',
      url: 'https://github.com/xenako0012/AyudaDeAngular',
    },
  ];

  protected reset(): void {
    this.query.set('');
    this.tag.set('todos');
  }

  protected async copiar(cmd: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(cmd);
      this.snackBar.open(`Copiado: ${cmd}`, undefined, { duration: 2000 });
    } catch {
      this.snackBar.open('No se pudo copiar al portapapeles', undefined, { duration: 3000 });
    }
  }
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
