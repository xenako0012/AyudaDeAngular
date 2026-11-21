import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { EXAMEN_DAM2 } from '../../data/examenes.data';
import { EJERCICIOS, SIMULACRO } from '../../data/ejercicios.data';
import { Dificultad, Ejercicio } from '../../data/ejercicios.model';
import { CalloutComponent } from '../../shared/callout/callout';
import { ChapterNavComponent } from '../../shared/chapter-nav/chapter-nav';
import { CodeBlockComponent } from '../../shared/code-block/code-block';
import { SectionHeaderComponent } from '../../shared/section-header/section-header';

@Component({
  selector: 'app-ejercicios',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressBarModule,
    CodeBlockComponent,
    CalloutComponent,
    ChapterNavComponent,
    SectionHeaderComponent,
  ],
  styleUrl: './ejercicios.scss',
  template: `
    <div class="adl-route">
      <app-section-header
        icon="assignment"
        eyebrow="Examen · Práctica"
        title="Ejercicios de Angular Material"
        description="Diez ejercicios con formato de examen: contexto, requisitos numerados, pistas, solución completa archivo por archivo y lista de comprobación. Al final, un simulacro de 90 minutos con rúbrica."
        level="intermedio"
        [minutes]="45"
      >
        <span extra-meta class="total-pill">
          <mat-icon aria-hidden="true">workspace_premium</mat-icon>
          {{ totalPuntos }} puntos en total
        </span>
      </app-section-header>

      <section aria-labelledby="como-usar">
        <h2 id="como-usar">Cómo usar estos ejercicios</h2>
        <p class="adl-text">
          Todos los ejercicios se resuelven dentro de un proyecto Angular 22 con Angular Material
          instalado. El objetivo es que escribas el código antes de mirar la solución: el enunciado
          y los criterios de corrección bastan para saber si lo has resuelto bien.
        </p>

        <div class="method">
          @for (step of metodo; track step.title; let i = $index) {
            <article>
              <span class="method-num">{{ i + 1 }}</span>
              <div>
                <strong>{{ step.title }}</strong>
                <p>{{ step.text }}</p>
              </div>
            </article>
          }
        </div>

        <app-callout type="tip" label="Prepara el entorno">
          <p>
            Crea un proyecto de pruebas una sola vez y trabaja todos los ejercicios ahí:
          </p>
          <app-code-block language="bash" filename="Terminal" [code]="preparacion" />
        </app-callout>
      </section>

      <section aria-labelledby="indice">
        <h2 id="indice">Índice de ejercicios</h2>

        <div class="filtros">
          <mat-button-toggle-group
            [value]="filtro()"
            (change)="filtro.set($event.value)"
            hideSingleSelectionIndicator
          >
            <mat-button-toggle value="todos">Todos</mat-button-toggle>
            @for (nivel of dificultades; track nivel) {
              <mat-button-toggle [value]="nivel">{{ nivel }}</mat-button-toggle>
            }
          </mat-button-toggle-group>

          <span class="filtro-count">{{ visibles().length }} de {{ ejercicios.length }}</span>
        </div>

        <div class="indice-grid">
          @for (ejercicio of visibles(); track ejercicio.id) {
            <a class="indice-card" [href]="'#' + ejercicio.id">
              <span class="indice-num">{{ ejercicio.numero.toString().padStart(2, '0') }}</span>
              <div class="indice-text">
                <strong>{{ ejercicio.titulo }}</strong>
                <span>{{ ejercicio.resumen }}</span>
              </div>
              <div class="indice-meta">
                <span class="nivel" [attr.data-nivel]="ejercicio.dificultad">
                  {{ ejercicio.dificultad }}
                </span>
                <span class="puntos">{{ ejercicio.puntos }} pts</span>
              </div>
            </a>
          }
        </div>

        <app-callout type="info" label="Progreso">
          <p>
            Marca cada solución como revisada cuando la hayas comparado con la tuya. El progreso de
            esta página se guarda en el navegador: <strong>{{ resueltos() }} de
            {{ ejercicios.length }}</strong> ejercicios revisados.
          </p>
          <mat-progress-bar mode="determinate" [value]="porcentaje()" aria-label="Ejercicios revisados" />
        </app-callout>
      </section>

      <!-- ==================== EJERCICIOS ==================== -->
      <section aria-labelledby="lista">
        <h2 id="lista">Enunciados y soluciones</h2>

        @for (ejercicio of ejercicios; track ejercicio.id) {
          <article class="ejercicio" [id]="ejercicio.id">
            <header class="ej-head">
              <div class="ej-num">{{ ejercicio.numero.toString().padStart(2, '0') }}</div>
              <div class="ej-title">
                <h3>{{ ejercicio.titulo }}</h3>
                <p class="ej-resumen">{{ ejercicio.resumen }}</p>
                <div class="ej-meta">
                  <span class="nivel" [attr.data-nivel]="ejercicio.dificultad">
                    <mat-icon aria-hidden="true">signal_cellular_alt</mat-icon>
                    {{ ejercicio.dificultad }}
                  </span>
                  <span>
                    <mat-icon aria-hidden="true">schedule</mat-icon>
                    {{ ejercicio.minutos }} min
                  </span>
                  <span>
                    <mat-icon aria-hidden="true">grade</mat-icon>
                    {{ ejercicio.puntos }} puntos
                  </span>
                  @if (estaRevisado(ejercicio.id)) {
                    <span class="revisado">
                      <mat-icon aria-hidden="true">task_alt</mat-icon>
                      revisado
                    </span>
                  }
                </div>
              </div>
            </header>

            <div class="ej-tags">
              @for (tag of ejercicio.tags; track tag) {
                <span class="tag">{{ tag }}</span>
              }
            </div>

            <div class="ej-contexto">
              <p class="label">Contexto</p>
              <p class="adl-text">{{ ejercicio.contexto }}</p>
            </div>

            <div class="ej-section">
              <p class="label">Requisitos</p>
              <ol class="requisitos">
                @for (req of ejercicio.requisitos; track req) {
                  <li>{{ req }}</li>
                }
              </ol>
            </div>

            <mat-accordion class="ej-acordeon" multi>
              <mat-expansion-panel class="pistas">
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    <mat-icon aria-hidden="true">lightbulb</mat-icon>
                    Pistas ({{ ejercicio.pistas.length }})
                  </mat-panel-title>
                </mat-expansion-panel-header>
                <ul class="pistas-list">
                  @for (pista of ejercicio.pistas; track pista) {
                    <li>{{ pista }}</li>
                  }
                </ul>
              </mat-expansion-panel>

              <mat-expansion-panel class="criterios">
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    <mat-icon aria-hidden="true">checklist</mat-icon>
                    Criterios de corrección
                  </mat-panel-title>
                </mat-expansion-panel-header>
                <ul class="criterios-list">
                  @for (criterio of ejercicio.criterios; track criterio.criterio) {
                    <li>
                      <span>{{ criterio.criterio }}</span>
                      <strong>{{ criterio.puntos }} pts</strong>
                    </li>
                  }
                </ul>
              </mat-expansion-panel>

              <mat-expansion-panel class="solucion">
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    <mat-icon aria-hidden="true">code</mat-icon>
                    Ver solución completa
                  </mat-panel-title>
                  <mat-panel-description>
                    {{ ejercicio.solucion.length }} archivos
                  </mat-panel-description>
                </mat-expansion-panel-header>

                <div class="solucion-body">
                  @for (fichero of ejercicio.solucion; track fichero.filename) {
                    <app-code-block
                      [language]="fichero.language"
                      [filename]="fichero.filename"
                      [code]="fichero.code"
                    />
                    @if (fichero.nota) {
                      <p class="fichero-nota">{{ fichero.nota }}</p>
                    }
                  }

                  <div class="comprobar">
                    <p class="label">Comprueba antes de pasar al siguiente</p>
                    <ul>
                      @for (item of ejercicio.comprobar; track item) {
                        <li>
                          <mat-icon aria-hidden="true">check_box</mat-icon>
                          {{ item }}
                        </li>
                      }
                    </ul>
                  </div>

                  <button
                    matButton="tonal"
                    type="button"
                    class="revisado-btn"
                    [class.ok]="estaRevisado(ejercicio.id)"
                    (click)="alternarRevisado(ejercicio.id)"
                  >
                    <mat-icon>{{ estaRevisado(ejercicio.id) ? 'task_alt' : 'radio_button_unchecked' }}</mat-icon>
                    {{ estaRevisado(ejercicio.id) ? 'Marcado como revisado' : 'Marcar como revisado' }}
                  </button>
                </div>
              </mat-expansion-panel>
            </mat-accordion>
          </article>
        }
      </section>

      <!-- ==================== SIMULACRO ==================== -->
      <section aria-labelledby="simulacro">
        <h2 id="simulacro">Simulacro final</h2>
        <p class="adl-text">
          Un examen completo para practicar de principio a fin, con la misma distribución que una
          prueba real: varios requisitos encadenados, entregable y rúbrica de puntuación.
        </p>

        <article class="simulacro-card">
          <header>
            <div>
              <p class="sim-eyebrow">Simulacro</p>
              <h3>{{ simulacro.titulo }}</h3>
            </div>
            <div class="sim-meta">
              <span><mat-icon aria-hidden="true">timer</mat-icon> {{ simulacro.duracion }}</span>
              <span><mat-icon aria-hidden="true">grade</mat-icon> {{ simulacro.puntos }} puntos</span>
            </div>
          </header>

          <div class="ej-contexto">
            <p class="label">Contexto</p>
            <p class="adl-text">{{ simulacro.contexto }}</p>
          </div>

          <div class="ej-section">
            <p class="label">Requisitos</p>
            <ol class="requisitos">
              @for (req of simulacro.requisitos; track req) {
                <li>{{ req }}</li>
              }
            </ol>
          </div>

          <div class="sim-grid">
            <div>
              <p class="label">Entregable</p>
              <ul class="adl-list">
                @for (item of simulacro.entregable; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </div>
            <div>
              <p class="label">Consejos</p>
              <ul class="adl-list">
                @for (tip of simulacro.consejos; track tip) {
                  <li>{{ tip }}</li>
                }
              </ul>
            </div>
          </div>

          <div class="rubrica">
            <p class="label">Rúbrica</p>
            @for (item of simulacro.rubrica; track item.criterio) {
              <div class="rubrica-row">
                <span>{{ item.criterio }}</span>
                <span class="barra">
                  <i [style.width.%]="(item.puntos / simulacro.puntos) * 100"></i>
                </span>
                <strong>{{ item.puntos }}</strong>
              </div>
            }
          </div>

          <mat-accordion class="ej-acordeon">
            <mat-expansion-panel class="solucion">
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <mat-icon aria-hidden="true">code</mat-icon>
                  Ver solución orientativa
                </mat-panel-title>
              </mat-expansion-panel-header>
              <div class="solucion-body">
                @for (fichero of simulacro.solucion; track fichero.filename) {
                  <app-code-block
                    [language]="fichero.language"
                    [filename]="fichero.filename"
                    [code]="fichero.code"
                  />
                }
                <app-callout type="info">
                  <p>
                    La solución completa implicaría además los componentes de tabla, formulario y
                    diálogo, que puedes adaptar de los ejercicios 3, 5 y 6.
                  </p>
                </app-callout>
              </div>
            </mat-expansion-panel>
          </mat-accordion>
        </article>
      </section>

      <!-- ==================== EXAMEN OFICIAL (OCULTO) ==================== -->
      <section aria-labelledby="examen-dam2" class="examen-dam2">
        <h2 id="examen-dam2">Examen oficial DAM2</h2>
        <p class="adl-text">
          El examen real del módulo, tal y como se entregó: seis ejercicios encadenados sobre un
          cronómetro con lapsos, 10 puntos y 1 h 40 min. Está oculto a propósito, para que puedas
          intentarlo en frío antes de mirar nada.
        </p>

        <article class="examen-cover" [class.abierto]="mostrarExamen()">
          <div class="cover-icono">
            <mat-icon aria-hidden="true">{{ examen.icon }}</mat-icon>
          </div>

          <div class="cover-info">
            <p class="sim-eyebrow">Examen de convocatoria</p>
            <h3>{{ examen.titulo }} · {{ examen.subtitulo }}</h3>
            <p class="cover-asignatura">{{ examen.asignatura }}</p>
            <div class="sim-meta">
              <span><mat-icon aria-hidden="true">timer</mat-icon> {{ examen.duracion }}</span>
              <span><mat-icon aria-hidden="true">grade</mat-icon> {{ examen.puntos }} puntos</span>
              <span
                ><mat-icon aria-hidden="true">checklist</mat-icon>
                {{ examen.ejercicios.length }} ejercicios</span
              >
            </div>
          </div>

          <div class="cover-accion">
            <button
              matButton="filled"
              type="button"
              [attr.aria-expanded]="mostrarExamen()"
              aria-controls="examen-dam2-contenido"
              (click)="alternarExamen()"
            >
              <mat-icon>{{ mostrarExamen() ? 'visibility_off' : 'lock_open' }}</mat-icon>
              {{ mostrarExamen() ? 'Ocultar el examen' : 'Mostrar el examen' }}
            </button>
            <p class="cover-nota">
              {{ mostrarExamen() ? 'Incluye enunciados, soluciones y rúbrica.' : 'Enunciados + soluciones + rúbrica oficial.' }}
            </p>
          </div>
        </article>

        @if (mostrarExamen()) {
          <div id="examen-dam2-contenido" class="examen-contenido">
            <div class="examen-general">
              <p class="label">Enunciado</p>
              <ol class="requisitos">
                @for (linea of examen.enunciadoGeneral; track linea) {
                  <li>{{ linea }}</li>
                }
              </ol>

              <div class="examen-dos-columnas">
                <div>
                  <p class="label">Penalizaciones</p>
                  <ul class="adl-list">
                    @for (item of examen.penalizaciones; track item) {
                      <li>{{ item }}</li>
                    }
                  </ul>
                </div>
                <div>
                  <p class="label">Material permitido</p>
                  <ul class="adl-list">
                    @for (item of examen.materialPermitido; track item) {
                      <li>{{ item }}</li>
                    }
                  </ul>
                </div>
              </div>
            </div>

            @for (ej of examen.ejercicios; track ej.numero) {
              <article class="examen-ejercicio">
                <header class="ej-head">
                  <div class="ej-num">{{ ej.numero }}</div>
                  <div class="ej-title">
                    <h3>{{ ej.titulo }}</h3>
                    <div class="ej-meta">
                      <span class="examen-pts">
                        <mat-icon aria-hidden="true">grade</mat-icon>
                        {{ ej.puntos }} puntos
                      </span>
                      <span>
                        <mat-icon aria-hidden="true">checklist</mat-icon>
                        {{ ej.queSePide.length }} criterios
                      </span>
                    </div>
                  </div>
                </header>

                <div class="ej-contexto">
                  <p class="label">Enunciado literal</p>
                  <p class="adl-text">{{ ej.enunciado }}</p>
                </div>

                <div class="ej-section">
                  <p class="label">Qué se evalúa</p>
                  <ul class="adl-list">
                    @for (item of ej.queSePide; track item) {
                      <li>{{ item }}</li>
                    }
                  </ul>
                </div>

                <mat-accordion class="ej-acordeon">
                  <mat-expansion-panel class="solucion">
                    <mat-expansion-panel-header>
                      <mat-panel-title>
                        <mat-icon aria-hidden="true">code</mat-icon>
                        Ver solución del ejercicio
                      </mat-panel-title>
                      <mat-panel-description>
                        {{ ej.solucion.length }} archivos
                      </mat-panel-description>
                    </mat-expansion-panel-header>

                    <div class="solucion-body">
                      @for (fichero of ej.solucion; track fichero.filename) {
                        <app-code-block
                          [language]="fichero.language"
                          [filename]="fichero.filename"
                          [code]="fichero.code"
                        />
                      }

                      <div class="comprobar">
                        <p class="label">Comprueba que cumple la rúbrica</p>
                        <ul>
                          @for (item of ej.comprobar; track item) {
                            <li>
                              <mat-icon aria-hidden="true">check_box</mat-icon>
                              {{ item }}
                            </li>
                          }
                        </ul>
                      </div>
                    </div>
                  </mat-expansion-panel>
                </mat-accordion>
              </article>
            }

            <article class="examen-rubrica">
              <div class="rubrica">
                <p class="label">Rúbrica oficial · {{ examen.puntos }} puntos</p>
                @for (item of examen.rubrica; track item.criterio) {
                  <div class="rubrica-row">
                    <span>{{ item.criterio }}</span>
                    <span class="barra">
                      <i [style.width.%]="(item.puntos / examen.puntos) * 100"></i>
                    </span>
                    <strong>{{ item.puntos }}</strong>
                  </div>
                }
              </div>

              <div class="examen-estructura">
                <p class="label">Estructura de la entrega</p>
                <pre><code>{{ examen.estructura }}</code></pre>
              </div>

              <div class="examen-consejos">
                <p class="label">Cómo atacarlo en 100 minutos</p>
                <ol class="requisitos">
                  @for (tip of examen.consejos; track tip) {
                    <li>{{ tip }}</li>
                  }
                </ol>
              </div>
            </article>

            <app-callout type="warning">
              <p>
                Este examen es el de una convocatoria real: si lo usas para practicar, cronométrate
                de verdad. Cada minuto de más resta 0,2 puntos y el uso de IA o copiar supone un 0.
              </p>
            </app-callout>
          </div>
        }
      </section>

      <section aria-labelledby="errores">
        <h2 id="errores">Los cinco errores que más puntos cuestan</h2>
        <div class="errores-grid">
          @for (error of erroresComunes; track error.title) {
            <article>
              <mat-icon aria-hidden="true">error_outline</mat-icon>
              <div>
                <strong>{{ error.title }}</strong>
                <p>{{ error.text }}</p>
              </div>
            </article>
          }
        </div>
      </section>

      <app-chapter-nav route="/ejercicios" />
    </div>
  `,
})
export class EjerciciosPage {
  protected readonly ejercicios = EJERCICIOS;
  protected readonly simulacro = SIMULACRO;
  protected readonly examen = EXAMEN_DAM2;

  /** El examen oficial permanece oculto hasta que se pulsa el botón. */
  protected readonly mostrarExamen = signal(false);

  protected alternarExamen(): void {
    this.mostrarExamen.update((abierto) => !abierto);
  }
  protected readonly dificultades: readonly Dificultad[] = ['Básico', 'Medio', 'Avanzado'];

  protected readonly totalPuntos = EJERCICIOS.reduce((total, e) => total + e.puntos, 0);

  protected readonly filtro = signal<Dificultad | 'todos'>('todos');

  protected readonly visibles = computed<Ejercicio[]>(() => {
    const nivel = this.filtro();
    return nivel === 'todos'
      ? [...EJERCICIOS]
      : EJERCICIOS.filter((e) => e.dificultad === nivel);
  });

  private readonly revisadosSet = signal<ReadonlySet<string>>(this.leer());

  protected readonly resueltos = computed(() => this.revisadosSet().size);
  protected readonly porcentaje = computed(() =>
    Math.round((this.resueltos() / EJERCICIOS.length) * 100),
  );

  protected readonly metodo = [
    {
      title: 'Lee el contexto',
      text: 'Antes de tocar código, identifica qué componentes de Material necesitas y qué datos maneja la pantalla.',
    },
    {
      title: 'Intenta sin mirar',
      text: 'Escribe la solución en tu proyecto. Consulta las pistas solo si te bloqueas más de cinco minutos.',
    },
    {
      title: 'Revisa con los criterios',
      text: 'Compara tu código con cada criterio de corrección: es la forma de detectar los puntos que perderías.',
    },
    {
      title: 'Abre la solución',
      text: 'Contrasta con la solución propuesta y anota al menos una diferencia o mejora respecto a tu versión.',
    },
    {
      title: 'Comprueba en verde',
      text: 'Pasa la lista de comprobación del ejercicio y la tabla con el filtro vacío.',
    },
  ];

  protected readonly erroresComunes = [
    {
      title: 'Usar *ngIf / *ngFor',
      text: 'Los enunciados piden control flow nuevo. Con directivas estructurales se pierden puntos aunque el resultado funcione.',
    },
    {
      title: 'Olvidar el track en @for',
      text: 'Es un error de compilación, no un aviso. Además, con $index en listas de objetos el rendimiento empeora.',
    },
    {
      title: 'No importar el módulo de Material',
      text: 'NG8001 y NG8002 aparecen cuando falta el módulo en el array imports del componente standalone.',
    },
    {
      title: 'Botones de icono sin aria-label',
      text: 'Es la penalización de accesibilidad más habitual: un `mat-icon` no describe la acción.',
    },
    {
      title: 'No limpiar suscripciones',
      text: 'Los diálogos y observables deben cerrarse con takeUntilDestroyed() o al destruir el componente.',
    },
  ];

  protected estaRevisado(id: string): boolean {
    return this.revisadosSet().has(id);
  }

  protected alternarRevisado(id: string): void {
    const siguiente = new Set(this.revisadosSet());
    if (siguiente.has(id)) {
      siguiente.delete(id);
    } else {
      siguiente.add(id);
    }
    this.revisadosSet.set(siguiente);
    try {
      localStorage.setItem('adl-ejercicios', JSON.stringify([...siguiente]));
    } catch {
      // Sin almacenamiento disponible.
    }
  }

  private leer(): ReadonlySet<string> {
    try {
      const raw = localStorage.getItem('adl-ejercicios');
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : []);
    } catch {
      return new Set();
    }
  }

  protected readonly preparacion = `# Proyecto de prácticas
ng new practicas-material --style=scss --routing
cd practicas-material
ng add @angular/material

# Genera un componente por ejercicio
ng g c ejercicios/acciones
ng g c ejercicios/cursos
ng g c ejercicios/alta-alumno

ng serve`;
}
