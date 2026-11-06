import { ChangeDetectionStrategy, Component, computed, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ProgressService } from '../../core/progress.service';
import { ALL_CHAPTERS, NAV_SECTIONS, TOTAL_CHAPTERS } from '../../data/content.data';

/** Índice lateral con todos los capítulos y el progreso de lectura. */
@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatProgressBarModule],
  styleUrl: './sidebar.scss',
  template: `
    <nav class="side-nav" aria-label="Índice de capítulos">
      <a class="side-home" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="navigate.emit()">
        <mat-icon aria-hidden="true">home</mat-icon>
        <span>Portada</span>
      </a>

      @for (section of sections; track section.title) {
        <div class="side-section">
          <p class="side-title">
            <mat-icon aria-hidden="true">{{ section.icon }}</mat-icon>
            {{ section.title }}
          </p>
          <ul class="side-list">
            @for (chapter of section.chapters; track chapter.route) {
              <li>
                <a
                  [routerLink]="chapter.route"
                  routerLinkActive="active"
                  class="side-link"
                  (click)="navigate.emit()"
                >
                  <mat-icon class="side-icon" aria-hidden="true">{{ chapter.icon }}</mat-icon>
                  <span class="side-label">{{ chapter.title }}</span>
                  @if (progress.isCompleted(chapter.route)) {
                    <mat-icon class="side-check" aria-label="Capítulo completado">check_circle</mat-icon>
                  }
                </a>
              </li>
            }
          </ul>
        </div>
      }

      <div class="side-progress">
        <div class="side-progress-head">
          <span>Tu progreso</span>
          <strong>{{ completedCount() }} / {{ total }}</strong>
        </div>
        <mat-progress-bar mode="determinate" [value]="percent()" aria-label="Progreso del curso" />
        <p class="side-progress-hint">
          {{ percent() }} % de la guía completada ·
          <a routerLink="/" (click)="navigate.emit()">ver capítulos</a>
        </p>
      </div>

      <div class="side-footer">
        <p>Basado en la documentación oficial de Angular y Angular Material.</p>
        <div class="side-links">
          <a href="https://angular.dev" target="_blank" rel="noopener">angular.dev ↗</a>
          <a href="https://material.angular.dev" target="_blank" rel="noopener">material.angular.dev ↗</a>
        </div>
      </div>
    </nav>
  `,
})
export class SidebarComponent {
  readonly navigate = output<void>();
  protected readonly progress = inject(ProgressService);

  protected readonly sections = NAV_SECTIONS;
  protected readonly total = TOTAL_CHAPTERS;

  protected readonly completedCount = computed(() =>
    ALL_CHAPTERS.filter((chapter) => this.progress.isCompleted(chapter.route)).length,
  );

  protected readonly percent = computed(() =>
    Math.round((this.completedCount() / this.total) * 100),
  );
}
