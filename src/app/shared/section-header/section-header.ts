import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/** Título de página reutilizable con icono, nivel y tiempo de lectura. */
@Component({
  selector: 'app-section-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  styleUrl: './section-header.scss',
  template: `
    <header class="page-head">
      <div class="eyebrow">
        <mat-icon aria-hidden="true">{{ icon() }}</mat-icon>
        <span>{{ eyebrow() }}</span>
      </div>
      <h1>{{ title() }}</h1>
      <p class="adl-lead">{{ description() }}</p>
      <div class="meta">
        @if (level()) {
          <span class="pill" [attr.data-level]="level()">{{ level() }}</span>
        }
        @if (minutes()) {
          <span class="pill neutral">
            <mat-icon aria-hidden="true">schedule</mat-icon>
            {{ minutes() }} min de lectura
          </span>
        }
        <ng-content select="[extra-meta]" />
      </div>
    </header>
  `,
})
export class SectionHeaderComponent {
  readonly icon = input<string>('menu_book');
  readonly eyebrow = input<string>('Documentación');
  readonly title = input.required<string>();
  readonly description = input<string>('');
  readonly level = input<string>('');
  readonly minutes = input<number>(0);
}
