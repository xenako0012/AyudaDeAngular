import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { ProgressService } from '../../core/progress.service';
import { ALL_CHAPTERS } from '../../data/content.data';

/**
 * Navegación al pie de cada capítulo: anterior / siguiente y botón para
 * marcar el capítulo como completado (se guarda en localStorage).
 */
@Component({
  selector: 'app-chapter-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatTooltipModule],
  styleUrl: './chapter-nav.scss',
  template: `
    <div class="chapter-nav">
      <div class="complete-row">
        <div class="complete-copy">
          <strong>¿Has terminado este capítulo?</strong>
          <span>Marca tu progreso: se guarda en este navegador.</span>
        </div>
        <button
          matButton="tonal"
          type="button"
          class="complete-btn"
          [class.done]="isDone()"
          (click)="toggle()"
        >
          <mat-icon>{{ isDone() ? 'task_alt' : 'radio_button_unchecked' }}</mat-icon>
          {{ isDone() ? 'Completado' : 'Marcar como completado' }}
        </button>
      </div>

      <nav class="prev-next" aria-label="Navegación entre capítulos">
        @if (previous(); as prev) {
          <a class="nav-card prev" [routerLink]="prev.route">
            <span class="nav-dir"><mat-icon aria-hidden="true">arrow_back</mat-icon> Anterior</span>
            <strong>{{ prev.title }}</strong>
          </a>
        } @else {
          <a class="nav-card prev" routerLink="/">
            <span class="nav-dir"><mat-icon aria-hidden="true">arrow_back</mat-icon> Volver</span>
            <strong>Portada</strong>
          </a>
        }

        @if (next(); as following) {
          <a class="nav-card next" [routerLink]="following.route">
            <span class="nav-dir">Siguiente <mat-icon aria-hidden="true">arrow_forward</mat-icon></span>
            <strong>{{ following.title }}</strong>
          </a>
        } @else {
          <a class="nav-card next" href="https://angular.dev" target="_blank" rel="noopener">
            <span class="nav-dir">Sigue aprendiendo <mat-icon aria-hidden="true">open_in_new</mat-icon></span>
            <strong>Documentación oficial de Angular</strong>
          </a>
        }
      </nav>
    </div>
  `,
})
export class ChapterNavComponent {
  /** Ruta actual del capítulo mostrado. */
  readonly route = input.required<string>();

  protected readonly progress = inject(ProgressService);

  protected readonly isDone = computed(() => this.progress.isCompleted(this.route()));

  private readonly index = computed(() =>
    ALL_CHAPTERS.findIndex((chapter) => chapter.route === this.route()),
  );

  protected readonly previous = computed(() => {
    const i = this.index();
    return i > 0 ? ALL_CHAPTERS[i - 1] : null;
  });

  protected readonly next = computed(() => {
    const i = this.index();
    return i >= 0 && i < ALL_CHAPTERS.length - 1 ? ALL_CHAPTERS[i + 1] : null;
  });

  protected toggle(): void {
    this.progress.toggle(this.route());
  }
}
