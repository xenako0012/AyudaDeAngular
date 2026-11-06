import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CalloutComponent } from '../../shared/callout/callout';
import { ChapterNavComponent } from '../../shared/chapter-nav/chapter-nav';
import { CodeBlockComponent } from '../../shared/code-block/code-block';
import { SectionHeaderComponent } from '../../shared/section-header/section-header';
import {
  MATERIAL_BY_CATEGORY,
  MATERIAL_COMPONENTS,
  materialDocsUrl,
} from '../../data/material.data';
import { ComponenteMaterial, MaterialCategory } from '../../data/doc.model';
import { DialogEjemploComponent } from './dialog-ejemplo/dialog-ejemplo';

@Component({
  selector: 'app-material',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatExpansionModule,
    MatStepperModule,
    MatListModule,
    MatToolbarModule,
    MatDividerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    CodeBlockComponent,
    CalloutComponent,
    ChapterNavComponent,
    SectionHeaderComponent,
  ],
  styleUrl: './material.scss',
  template: `
    <div class="adl-route">
      <app-section-header
        icon="auto_awesome"
        eyebrow="Angular Material · Capítulo 12"
        title="Angular Material: guía y catálogo"
        description="La librería oficial de componentes, basada en Material Design 3. Instalación, tematización con tokens y un catálogo de los componentes con ejemplos funcionales."
        level="intermedio"
        [minutes]="20"
      />

      <section aria-labelledby="intro">
        <h2 id="intro">Qué es Angular Material</h2>
        <p class="adl-text">
          Es el conjunto de componentes de UI mantenido por el equipo de Angular. Sigue las guías de
          <strong>Material Design 3</strong>, es accesible por defecto (roles ARIA, teclado, foco),
          funciona con componentes standalone y se tematiza mediante variables CSS generadas por
          Sass.
        </p>

        <div class="fact-grid">
          @for (fact of datos; track fact.label) {
            <article>
              <strong>{{ fact.value }}</strong>
              <span>{{ fact.label }}</span>
            </article>
          }
        </div>

        <app-callout type="info" label="Documentación oficial">
          <p>
            La referencia completa está en
            <a href="https://material.angular.dev" target="_blank" rel="noopener"
              >material.angular.dev</a
            >. Esta página resume lo esencial y añade ejemplos ejecutables; para la API exacta de
            cada componente, consulta siempre la documentación oficial de la versión instalada.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="instalacion">
        <h2 id="instalacion">Instalación</h2>
        <p class="adl-text">
          El schematic <code class="adl-inline-code">ng add</code> instala la librería, configura el
          tema y añade las fuentes e iconos necesarios.
        </p>

        <app-code-block language="bash" filename="Terminal" [code]="instalacion" />

        <p class="adl-text">
          Durante la instalación puede preguntar por el tema predefinido, por la tipografía y por
          las animaciones. Con la tematización moderna solo hace falta el paquete
          <code class="adl-inline-code">&#64;angular/material</code> y su CDK.
        </p>

        <div class="packages">
          @for (pkg of paquetes; track pkg.name) {
            <article>
              <code>{{ pkg.name }}</code>
              <p>{{ pkg.text }}</p>
            </article>
          }
        </div>
      </section>

      <section aria-labelledby="importar">
        <h2 id="importar">Importar componentes</h2>
        <p class="adl-text">
          En una aplicación standalone se importa <strong>solo el módulo del componente</strong> que
          se va a usar, directamente en el componente. El tree-shaking elimina el resto.
        </p>

        <div class="two-col">
          <app-code-block language="ts" filename="ejemplo.ts" [code]="importEjemplo" />
          <app-code-block language="html" filename="ejemplo.html" [code]="importHtml" />
        </div>

        <app-callout type="warning" label="No importes BrowserAnimationsModule">
          <p>
            En Angular moderno <code>BrowserAnimationsModule</code> está en desuso: la librería está
            migrando a animaciones CSS nativas con las APIs
            <code>animate.enter</code> / <code>animate.leave</code>. No lo añadas como requisito en
            guías nuevas ni en proyectos con detección sin zonas.
          </p>
        </app-callout>
      </section>

      <section aria-labelledby="tema">
        <h2 id="tema">Tematización con Material 3</h2>
        <p class="adl-text">
          Desde la versión 19 el sistema de temas se basa en el mixin
          <code class="adl-inline-code">mat.theme</code>, que genera variables CSS (tokens) para
          color, tipografía y densidad. El modo claro/oscuro se controla con la propiedad CSS
          <code class="adl-inline-code">color-scheme</code>.
        </p>

        <app-code-block language="scss" filename="src/styles.scss" [code]="temaScss" />

        <h3>Este sitio usa exactamente eso</h3>
        <p class="adl-text">
          Toda la web está construida con el tema violeta de Material 3. Cambia el modo desde el
          botón de la cabecera: los tokens <code class="adl-inline-code">--mat-sys-*</code> se
          recalculan solos, sin recompilar nada.
        </p>

        <div class="tokens-demo">
          <div class="token" style="background: var(--mat-sys-primary); color: var(--mat-sys-on-primary)">
            --mat-sys-primary
          </div>
          <div
            class="token"
            style="background: var(--mat-sys-primary-container); color: var(--mat-sys-on-primary-container)"
          >
            primary-container
          </div>
          <div
            class="token"
            style="background: var(--mat-sys-secondary-container); color: var(--mat-sys-on-secondary-container)"
          >
            secondary-container
          </div>
          <div
            class="token"
            style="background: var(--mat-sys-tertiary-container); color: var(--mat-sys-on-tertiary-container)"
          >
            tertiary-container
          </div>
          <div
            class="token"
            style="background: var(--mat-sys-surface-container-highest); color: var(--mat-sys-on-surface)"
          >
            surface-container-highest
          </div>
          <div
            class="token"
            style="background: var(--mat-sys-error-container); color: var(--mat-sys-on-error-container)"
          >
            error-container
          </div>
        </div>

        <h3>Paletas predefinidas</h3>
        <div class="palettes">
          @for (palette of paletas; track palette.name) {
            <span class="palette-chip">
              <i [style.background]="palette.color"></i>
              {{ palette.name }}
            </span>
          }
        </div>

        <app-code-block language="scss" filename="paleta personalizada" [code]="paletaPersonalizada" />
      </section>

      <!-- ==================== CATÁLOGO ==================== -->
      <section aria-labelledby="catalogo">
        <h2 id="catalogo">Catálogo de componentes</h2>
        <p class="adl-text">
          Los {{ total }} componentes de la librería agrupados por categoría. Filtra por nombre,
          selector o descripción.
        </p>

        <div class="catalog-tools">
          <mat-form-field appearance="outline" class="catalog-search" subscriptSizing="dynamic">
            <mat-label>Buscar componente</mat-label>
            <mat-icon matPrefix>search</mat-icon>
            <input matInput [ngModel]="busqueda()" (ngModelChange)="busqueda.set($event)" placeholder="card, select, tabla…" />
            @if (busqueda()) {
              <button matIconButton matSuffix type="button" aria-label="Limpiar" (click)="busqueda.set('')">
                <mat-icon>close</mat-icon>
              </button>
            }
          </mat-form-field>

          <mat-button-toggle-group
            class="cat-filter"
            [value]="categoria()"
            (change)="categoria.set($event.value)"
            hideSingleSelectionIndicator
          >
            <mat-button-toggle value="todas">Todas</mat-button-toggle>
            @for (cat of categorias; track cat) {
              <mat-button-toggle [value]="cat">{{ cat }}</mat-button-toggle>
            }
          </mat-button-toggle-group>
        </div>

        <p class="catalog-count">
          {{ filtrados().length }} de {{ total }} componentes
          @if (busqueda()) {
            · filtro: «{{ busqueda() }}»
          }
        </p>

        @for (group of gruposFiltrados(); track group.category) {
          <div class="catalog-group">
            <h3>{{ group.category }}</h3>
            <div class="catalog-grid">
              @for (item of group.items; track item.name) {
                <a class="component-card" [href]="docsUrl(item.docsSlug)" target="_blank" rel="noopener">
                  <header>
                    <strong>{{ item.name }}</strong>
                    <mat-icon aria-hidden="true">open_in_new</mat-icon>
                  </header>
                  <code>{{ item.selector }}</code>
                  <p>{{ item.description }}</p>
                  <footer>{{ item.module }}</footer>
                </a>
              }
            </div>
          </div>
        } @empty {
          <div class="catalog-empty">
            <mat-icon>search_off</mat-icon>
            <p>No hay componentes que coincidan con «{{ busqueda() }}».</p>
            <button matButton type="button" (click)="limpiar()">Limpiar filtros</button>
          </div>
        }
      </section>

      <!-- ==================== EJEMPLOS ==================== -->
      <section aria-labelledby="ejemplos">
        <h2 id="ejemplos">Ejemplos en vivo</h2>
        <p class="adl-text">
          Todos los componentes de esta sección son reales: interactúa con ellos. Cada tarjeta
          muestra el código mínimo necesario.
        </p>

        <div class="examples">
          <!-- Botones -->
          <article class="ex-card">
            <header>
              <h3>Botones</h3>
              <code>MatButtonModule</code>
            </header>
            <div class="ex-body">
              <div class="btn-row">
                <button matButton>Text</button>
                <button matButton="elevated">Elevated</button>
                <button matButton="outlined">Outlined</button>
                <button matButton="filled">Filled</button>
                <button matButton="tonal">Tonal</button>
                <button matButton disabled>Disabled</button>
              </div>
              <div class="btn-row">
                <button matIconButton aria-label="Favorito" matTooltip="Icon button">
                  <mat-icon>favorite</mat-icon>
                </button>
                <button matFab aria-label="Añadir" matTooltip="FAB">
                  <mat-icon>add</mat-icon>
                </button>
                <button matMiniFab aria-label="Menú" matTooltip="Mini FAB">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <button matFab extended>
                  <mat-icon>favorite</mat-icon>
                  Extended
                </button>
              </div>
            </div>
            <app-code-block language="html" [code]="btnCode" />
          </article>

          <!-- Form field e inputs -->
          <article class="ex-card">
            <header>
              <h3>Form field, input y select</h3>
              <code>MatFormFieldModule</code>
            </header>
            <div class="ex-body fields">
              <mat-form-field appearance="outline">
                <mat-label>Tu nombre</mat-label>
                <input matInput [(ngModel)]="nombre" placeholder="Ana" />
                <mat-icon matSuffix>person</mat-icon>
                <mat-hint>Se guarda solo en esta página</mat-hint>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Framework favorito</mat-label>
                <mat-select [(ngModel)]="framework">
                  @for (fw of frameworks; track fw) {
                    <mat-option [value]="fw">{{ fw }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Mensaje</mat-label>
                <textarea matInput rows="2" [(ngModel)]="mensaje"></textarea>
              </mat-form-field>
            </div>
            <p class="ex-note">
              Hola, <strong>{{ nombre() || 'desconocido' }}</strong>. Usas
              <strong>{{ framework() }}</strong>.
            </p>
            <app-code-block language="html" [code]="fieldCode" />
          </article>

          <!-- Selección -->
          <article class="ex-card">
            <header>
              <h3>Checkbox, radio, toggle y slider</h3>
              <code>MatCheckboxModule · MatRadioModule</code>
            </header>
            <div class="ex-body">
              <div class="controls-col">
                <mat-checkbox [(ngModel)]="notificaciones">Recibir notificaciones</mat-checkbox>
                <mat-checkbox [(ngModel)]="indeterminado" [indeterminate]="true">
                  Estado indeterminado
                </mat-checkbox>

                <mat-radio-group [(ngModel)]="plan" class="radio-group">
                  @for (p of planes; track p) {
                    <mat-radio-button [value]="p">{{ p }}</mat-radio-button>
                  }
                </mat-radio-group>

                <mat-slide-toggle [(ngModel)]="modoOscuroDemo">Modo oscuro (demo)</mat-slide-toggle>

                <div class="slider-row">
                  <span>Volumen</span>
                  <mat-slider min="0" max="100" step="5" discrete showTickMarks>
                    <input matSliderThumb [(ngModel)]="volumen" />
                  </mat-slider>
                  <strong>{{ volumen() }}</strong>
                </div>
              </div>
            </div>
            <p class="ex-note">
              Plan: <strong>{{ plan() }}</strong> · Notificaciones:
              <strong>{{ notificaciones() }}</strong>
            </p>
            <app-code-block language="html" [code]="controlsCode" />
          </article>

          <!-- Chips -->
          <article class="ex-card">
            <header>
              <h3>Chips</h3>
              <code>MatChipsModule</code>
            </header>
            <div class="ex-body">
              <mat-chip-set aria-label="Tecnologías">
                @for (tech of tecnologias(); track tech) {
                  <mat-chip [highlighted]="selectedTech() === tech" (click)="selectTech(tech)">
                    {{ tech }}
                  </mat-chip>
                }
              </mat-chip-set>
              <p class="ex-note">Seleccionada: <strong>{{ selectedTech() || 'ninguna' }}</strong></p>
            </div>
            <app-code-block language="html" [code]="chipsCode" />
          </article>

          <!-- Ripple, badge, tooltip, menu -->
          <article class="ex-card">
            <header>
              <h3>Badge, tooltip, menú y ripple</h3>
              <code>MatBadgeModule · MatMenuModule</code>
            </header>
            <div class="ex-body btn-row">
              <button matButton="tonal" matBadge="8" matBadgeColor="accent" matBadgePosition="above after">
                Notificaciones
              </button>
              <button matButton matTooltip="Esto es un tooltip" matTooltipPosition="above">
                Pasa el ratón
              </button>
              <button matButton="outlined" [matMenuTriggerFor]="menuDemo">
                Abrir menú <mat-icon iconPositionEnd>arrow_drop_down</mat-icon>
              </button>
              <mat-menu #menuDemo="matMenu">
                <button mat-menu-item (click)="avisar('Perfil')">
                  <mat-icon>person</mat-icon> Perfil
                </button>
                <button mat-menu-item (click)="avisar('Ajustes')">
                  <mat-icon>settings</mat-icon> Ajustes
                </button>
                <button mat-menu-item disabled>
                  <mat-icon>block</mat-icon> Deshabilitado
                </button>
              </mat-menu>
              <div class="ripple-box" matRipple>matRipple</div>
            </div>
            <app-code-block language="html" [code]="badgeCode" />
          </article>

          <!-- Tabs -->
          <article class="ex-card">
            <header>
              <h3>Tabs</h3>
              <code>MatTabsModule</code>
            </header>
            <div class="ex-body">
              <mat-tab-group animationDuration="200ms">
                <mat-tab label="Resumen">
                  <div class="tab-pane">
                    <p>Contenido de la primera pestaña, cargado de forma diferida la primera vez.</p>
                  </div>
                </mat-tab>
                <mat-tab label="Detalles">
                  <div class="tab-pane">
                    <p>El contenido de cada pestaña se puede diferir con <code>&lt;ng-template matTabContent&gt;</code>.</p>
                  </div>
                </mat-tab>
                <mat-tab label="Deshabilitada" disabled>
                  <div class="tab-pane"><p>No se puede abrir.</p></div>
                </mat-tab>
              </mat-tab-group>
            </div>
            <app-code-block language="html" [code]="tabsCode" />
          </article>

          <!-- Expansion y list -->
          <article class="ex-card">
            <header>
              <h3>Expansion panel y list</h3>
              <code>MatExpansionModule · MatListModule</code>
            </header>
            <div class="ex-body">
              <mat-accordion multi>
                <mat-expansion-panel>
                  <mat-expansion-panel-header>
                    <mat-panel-title>¿Qué es un token de diseño?</mat-panel-title>
                    <mat-panel-description>Material 3</mat-panel-description>
                  </mat-expansion-panel-header>
                  <p>Una variable con nombre que representa un valor visual: color, tipografía, forma o elevación.</p>
                </mat-expansion-panel>
                <mat-expansion-panel>
                  <mat-expansion-panel-header>
                    <mat-panel-title>¿Y la densidad?</mat-panel-title>
                  </mat-expansion-panel-header>
                  <p>Un valor entre 0 y -5 que compacta los componentes para tablas y herramientas densas.</p>
                </mat-expansion-panel>
              </mat-accordion>

              <mat-list>
                <mat-list-item>
                  <mat-icon matListItemIcon>inbox</mat-icon>
                  <span matListItemTitle>Bandeja de entrada</span>
                  <span matListItemLine>3 mensajes nuevos</span>
                </mat-list-item>
                <mat-divider />
                <mat-list-item>
                  <mat-icon matListItemIcon>send</mat-icon>
                  <span matListItemTitle>Enviados</span>
                  <span matListItemLine>Última entrega hace 2 h</span>
                </mat-list-item>
              </mat-list>
            </div>
            <app-code-block language="html" [code]="expansionCode" />
          </article>

          <!-- Progress -->
          <article class="ex-card">
            <header>
              <h3>Progress bar y spinner</h3>
              <code>MatProgressBarModule · MatProgressSpinnerModule</code>
            </header>
            <div class="ex-body progress-demo">
              <mat-progress-bar mode="determinate" [value]="progreso()" />
              <div class="btn-row">
                <button matButton="tonal" type="button" (click)="avanzar()">Avanzar +10 %</button>
                <span class="pct">{{ progreso() }} %</span>
              </div>
              <mat-progress-bar mode="indeterminate" />
              <div class="spinners">
                <mat-spinner diameter="36" />
                <mat-spinner diameter="36" mode="indeterminate" />
              </div>
            </div>
            <app-code-block language="html" [code]="progressCode" />
          </article>

          <!-- Snackbar y dialog -->
          <article class="ex-card">
            <header>
              <h3>Snackbar y dialog</h3>
              <code>MatSnackBarModule · MatDialogModule</code>
            </header>
            <div class="ex-body btn-row">
              <button matButton="filled" type="button" (click)="abrirSnack()">
                <mat-icon>notifications</mat-icon> Mostrar snackbar
              </button>
              <button matButton="tonal" type="button" (click)="abrirDialogo()">
                <mat-icon>open_in_new</mat-icon> Abrir diálogo
              </button>
            </div>
            <app-code-block language="ts" filename="componente.ts" [code]="popupCode" />
          </article>

          <!-- Card -->
          <article class="ex-card">
            <header>
              <h3>Card y toolbar</h3>
              <code>MatCardModule · MatToolbarModule</code>
            </header>
            <div class="ex-body">
              <mat-toolbar class="demo-toolbar">
                <mat-icon>menu</mat-icon>
                <span class="tb-title">App demo</span>
                <span class="spacer"></span>
                <button matIconButton aria-label="Buscar"><mat-icon>search</mat-icon></button>
              </mat-toolbar>
              <mat-card appearance="outlined" class="demo-card">
                <mat-card-header>
                  <mat-card-title>Tarjeta Material</mat-card-title>
                  <mat-card-subtitle>appearance="outlined"</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <p>Contenedor con cabecera, contenido y acciones. Disponible en elevated, outlined y filled.</p>
                </mat-card-content>
                <mat-card-actions>
                  <button matButton type="button">Compartir</button>
                  <button matButton="filled" type="button" (click)="avisar('Guardado')">Guardar</button>
                </mat-card-actions>
              </mat-card>
            </div>
            <app-code-block language="html" [code]="cardCode" />
          </article>

          <!-- Stepper -->
          <article class="ex-card wide">
            <header>
              <h3>Stepper</h3>
              <code>MatStepperModule</code>
            </header>
            <div class="ex-body">
              <mat-stepper [linear]="true" orientation="horizontal" class="demo-stepper">
                <mat-step label="Cuenta">
                  <mat-form-field appearance="outline">
                    <mat-label>Email</mat-label>
                    <input matInput type="email" [(ngModel)]="emailStepper" />
                  </mat-form-field>
                  <div><button matButton="filled" matStepperNext>Continuar</button></div>
                </mat-step>
                <mat-step label="Preferencias">
                  <mat-radio-group [(ngModel)]="planStepper" class="radio-group">
                    <mat-radio-button value="Mensual">Mensual</mat-radio-button>
                    <mat-radio-button value="Anual">Anual (‑20 %)</mat-radio-button>
                  </mat-radio-group>
                  <div class="stepper-actions">
                    <button matButton matStepperPrevious>Atrás</button>
                    <button matButton="filled" matStepperNext>Continuar</button>
                  </div>
                </mat-step>
                <mat-step label="Confirmar">
                  <p class="ex-note">
                    {{ emailStepper() || 'sin email' }} · {{ planStepper() }}
                  </p>
                  <button matButton="filled" type="button" (click)="avisar('Suscripción creada')">
                    Finalizar
                  </button>
                </mat-step>
              </mat-stepper>
            </div>
            <app-code-block language="html" [code]="stepperCode" />
          </article>
        </div>
      </section>

      <section aria-labelledby="accesibilidad">
        <h2 id="accesibilidad">Accesibilidad e i18n</h2>
        <ul class="adl-list">
          <li>
            <strong>ARIA incluido</strong>: los componentes gestionan roles, etiquetas y estados de
            foco. Solo necesitas aportar <code class="adl-inline-code">aria-label</code> cuando el
            contenido visible no describe la acción (por ejemplo, botones de icono).
          </li>
          <li>
            <strong>Navegación por teclado</strong>: menús, diálogos y tabs atrapan el foco
            correctamente; prueba siempre con Tab, Esc, flechas y Enter.
          </li>
          <li>
            <strong>Formatos de fecha</strong>: con <code>provideNativeDateAdapter()</code> el
            datepicker usa el formato local a través de
            <code class="adl-inline-code">LOCALE_ID</code>.
          </li>
          <li>
            <strong>Textos en español</strong>: los componentes traen etiquetas en inglés; se
            personalizan inyectando la clase de internacionalización correspondiente
            (<code>MatPaginatorIntl</code>, <code>MatDatepickerIntl</code>…).
          </li>
        </ul>
        <app-code-block language="ts" filename="i18n.ts" [code]="i18nCode" />
      </section>

      <app-chapter-nav route="/material" />
    </div>
  `,
})
export class MaterialPage {
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly total = MATERIAL_COMPONENTS.length;
  protected readonly categorias = MATERIAL_BY_CATEGORY.map((g) => g.category);
  protected readonly docsUrl = materialDocsUrl;

  protected readonly busqueda = signal('');
  protected readonly categoria = signal<MaterialCategory | 'todas'>('todas');

  protected readonly filtrados = computed<ComponenteMaterial[]>(() => {
    const term = normalize(this.busqueda());
    const cat = this.categoria();
    return MATERIAL_COMPONENTS.filter((component) => {
      const matchesCat = cat === 'todas' || component.category === cat;
      if (!matchesCat) {
        return false;
      }
      if (!term) {
        return true;
      }
      return normalize(
        `${component.name} ${component.selector} ${component.description} ${component.module}`,
      ).includes(term);
    });
  });

  protected readonly gruposFiltrados = computed(() =>
    MATERIAL_BY_CATEGORY.map((group) => ({
      category: group.category,
      items: this.filtrados().filter((item) => item.category === group.category),
    })).filter((group) => group.items.length > 0),
  );

  /* Ejemplos */
  protected readonly nombre = signal('Ana');
  protected readonly mensaje = signal('Hola, Material');
  protected readonly framework = signal('Angular');
  protected readonly notificaciones = signal(true);
  protected readonly indeterminado = signal(true);
  protected readonly plan = signal('Anual');
  protected readonly modoOscuroDemo = signal(false);
  protected readonly volumen = signal(40);
  protected readonly selectedTech = signal('Signals');
  protected readonly progreso = signal(60);
  protected readonly emailStepper = signal('');
  protected readonly planStepper = signal('Anual');

  protected readonly frameworks = ['Angular', 'React', 'Vue', 'Svelte', 'Solid'];
  protected readonly planes = ['Mensual', 'Anual', 'De por vida'];
  protected readonly tecnologias = signal(['Signals', 'Standalone', 'Material 3', 'Zoneless']);

  protected readonly datos = [
    { value: String(MATERIAL_COMPONENTS.length), label: 'componentes documentados' },
    { value: 'M3', label: 'Material Design 3' },
    { value: 'v22', label: 'versión instalada' },
    { value: '0 kB', label: 'de JS extra si no lo importas' },
  ];

  protected readonly paquetes = [
    { name: '@angular/material', text: 'Los componentes de UI y el sistema de temas.' },
    { name: '@angular/cdk', text: 'Dependencia base: overlay, portals, a11y, drag & drop, virtual scroll.' },
    { name: 'material-icons', text: 'Fuente de iconos (en esta web, auto-hospedada desde node_modules).' },
  ];

  protected readonly paletas = [
    { name: '$red-palette', color: '#dc2626' },
    { name: '$green-palette', color: '#16a34a' },
    { name: '$blue-palette', color: '#2563eb' },
    { name: '$yellow-palette', color: '#eab308' },
    { name: '$cyan-palette', color: '#0891b2' },
    { name: '$magenta-palette', color: '#db2777' },
    { name: '$orange-palette', color: '#ea580c' },
    { name: '$chartreuse-palette', color: '#84cc16' },
    { name: '$spring-green-palette', color: '#10b981' },
    { name: '$azure-palette', color: '#0ea5e9' },
    { name: '$violet-palette', color: '#7c3aed' },
    { name: '$rose-palette', color: '#e11d48' },
  ];

  protected selectTech(tech: string): void {
    this.selectedTech.set(tech);
  }

  protected limpiar(): void {
    this.busqueda.set('');
    this.categoria.set('todas');
  }

  protected avanzar(): void {
    this.progreso.update((v) => (v >= 100 ? 0 : Math.min(100, v + 10)));
  }

  protected avisar(accion: string): void {
    this.snackBar.open(`${accion} completado`, 'Cerrar', { duration: 2500 });
  }

  protected abrirSnack(): void {
    const ref = this.snackBar.open('Cambios guardados correctamente', 'Deshacer', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    ref.onAction().subscribe(() => this.avisar('Deshacer'));
  }

  protected abrirDialogo(): void {
    this.dialog.open(DialogEjemploComponent, {
      width: '440px',
      maxWidth: '92vw',
      data: { titulo: 'Confirmar acción', mensaje: 'Este diálogo es un componente de Angular Material con datos inyectados.' },
    });
  }

  /* ------- Código mostrado ------- */

  protected readonly instalacion = `# Instala y configura Angular Material
ng add @angular/material

# El schematic añade las dependencias, el tema y la tipografía.
# Después puedes añadir componentes con:
ng g @angular/material:dashboard   # ejemplos de schematics`;

  protected readonly importEjemplo = `import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ejemplo',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './ejemplo.html',
})
export class Ejemplo {}`;

  protected readonly importHtml = `<mat-card>
  <mat-card-header>
    <mat-card-title>Hola</mat-card-title>
  </mat-card-header>
  <mat-card-content>Contenido</mat-card-content>
  <mat-card-actions>
    <button matButton="filled">
      <mat-icon>favorite</mat-icon>
      Me gusta
    </button>
  </mat-card-actions>
</mat-card>`;

  protected readonly temaScss = `@use '@angular/material' as mat;

html {
  color-scheme: light;

  @include mat.theme((
    color: (
      primary: mat.$violet-palette,
      tertiary: mat.$azure-palette,
      theme-type: light,
    ),
    typography: 'Roboto',
    density: 0,
  ));
}

/* Modo oscuro: solo cambia color-scheme, los tokens se recalculan */
html.dark-theme {
  color-scheme: dark;
}

body {
  background: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);
}`;

  protected readonly paletaPersonalizada = `# Genera una paleta a partir de tu color de marca
ng generate @angular/material:theme-color

# Salida: una paleta SCSS lista para usar en mat.theme()`;

  protected readonly btnCode = `<button matButton>Text</button>
<button matButton="elevated">Elevated</button>
<button matButton="outlined">Outlined</button>
<button matButton="filled">Filled</button>
<button matButton="tonal">Tonal</button>

<button matIconButton aria-label="Favorito">
  <mat-icon>favorite</mat-icon>
</button>

<button matFab aria-label="Añadir">
  <mat-icon>add</mat-icon>
</button>

<button matFab extended>
  <mat-icon>favorite</mat-icon>
  Extended
</button>`;

  protected readonly fieldCode = `<mat-form-field appearance="outline">
  <mat-label>Tu nombre</mat-label>
  <input matInput [(ngModel)]="nombre" />
  <mat-icon matSuffix>person</mat-icon>
  <mat-hint>Texto de ayuda</mat-hint>
  <mat-error>Campo obligatorio</mat-error>
</mat-form-field>

<mat-form-field appearance="outline">
  <mat-label>Framework</mat-label>
  <mat-select [(ngModel)]="framework">
    @for (fw of frameworks; track fw) {
      <mat-option [value]="fw">{{ fw }}</mat-option>
    }
  </mat-select>
</mat-form-field>`;

  protected readonly controlsCode = `<mat-checkbox [(ngModel)]="notificaciones">
  Recibir notificaciones
</mat-checkbox>

<mat-radio-group [(ngModel)]="plan">
  @for (p of planes; track p) {
    <mat-radio-button [value]="p">{{ p }}</mat-radio-button>
  }
</mat-radio-group>

<mat-slide-toggle [(ngModel)]="modoOscuro">Modo oscuro</mat-slide-toggle>

<mat-slider min="0" max="100" step="5" discrete showTickMarks>
  <input matSliderThumb [(ngModel)]="volumen" />
</mat-slider>`;

  protected readonly chipsCode = `<mat-chip-set aria-label="Tecnologías">
  @for (tech of tecnologias; track tech) {
    <mat-chip (click)="selectTech(tech)">{{ tech }}</mat-chip>
  }
</mat-chip-set>`;

  protected readonly badgeCode = `<button matButton matBadge="8" matBadgeColor="accent">
  Notificaciones
</button>

<button matButton matTooltip="Esto es un tooltip">
  Pasa el ratón
</button>

<button matButton [matMenuTriggerFor]="menu">Abrir menú</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item>Perfil</button>
  <button mat-menu-item>Ajustes</button>
</mat-menu>

<div matRipple>Efecto ripple</div>`;

  protected readonly tabsCode = `<mat-tab-group animationDuration="200ms">
  <mat-tab label="Resumen">
    <ng-template matTabContent>
      Contenido diferido
    </ng-template>
  </mat-tab>
  <mat-tab label="Detalles">...</mat-tab>
  <mat-tab label="Deshabilitada" disabled>...</mat-tab>
</mat-tab-group>`;

  protected readonly expansionCode = `<mat-accordion multi>
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Título</mat-panel-title>
      <mat-panel-description>Descripción</mat-panel-description>
    </mat-expansion-panel-header>
    <p>Contenido del panel</p>
  </mat-expansion-panel>
</mat-accordion>

<mat-list>
  <mat-list-item>
    <mat-icon matListItemIcon>inbox</mat-icon>
    <span matListItemTitle>Bandeja</span>
    <span matListItemLine>3 mensajes</span>
  </mat-list-item>
</mat-list>`;

  protected readonly progressCode = `<mat-progress-bar mode="determinate" [value]="progreso" />
<mat-progress-bar mode="indeterminate" />
<mat-spinner diameter="36" />
<mat-spinner diameter="36" mode="indeterminate" />`;

  protected readonly popupCode = `// Snackbar
private snackBar = inject(MatSnackBar);

mostrar() {
  const ref = this.snackBar.open('Guardado', 'Deshacer', { duration: 5000 });
  ref.onAction().subscribe(() => this.deshacer());
}

// Dialog
private dialog = inject(MatDialog);

abrir() {
  this.dialog.open(DialogEjemploComponent, {
    width: '440px',
    data: { titulo: 'Confirmar acción' },
  });
}`;

  protected readonly cardCode = `<mat-toolbar>
  <mat-icon>menu</mat-icon>
  <span>App demo</span>
  <span class="spacer"></span>
  <button matIconButton aria-label="Buscar">
    <mat-icon>search</mat-icon>
  </button>
</mat-toolbar>

<mat-card appearance="outlined">
  <mat-card-header>
    <mat-card-title>Tarjeta</mat-card-title>
    <mat-card-subtitle>outlined</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>Contenido</mat-card-content>
  <mat-card-actions>
    <button matButton>Compartir</button>
    <button matButton="filled">Guardar</button>
  </mat-card-actions>
</mat-card>`;

  protected readonly stepperCode = `<mat-stepper [linear]="true">
  <mat-step label="Cuenta">
    <input [(ngModel)]="email" />
    <button matButton matStepperNext>Continuar</button>
  </mat-step>
  <mat-step label="Preferencias">
    <mat-radio-group [(ngModel)]="plan">...</mat-radio-group>
    <button matButton matStepperPrevious>Atrás</button>
    <button matButton matStepperNext>Continuar</button>
  </mat-step>
  <mat-step label="Confirmar">...</mat-step>
</mat-stepper>`;

  protected readonly i18nCode = `import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class PaginatorEs extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elementos por página';
  override nextPageLabel = 'Página siguiente';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0) return '0 de 0';
    const start = page * pageSize + 1;
    const end = Math.min((page + 1) * pageSize, length);
    return \`\${start} – \${end} de \${length}\`;
  };
}`;
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
