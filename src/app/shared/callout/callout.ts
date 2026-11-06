import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type CalloutType = 'info' | 'tip' | 'warning' | 'danger' | 'angular';

const CALLOUT_META: Record<CalloutType, { icon: string; label: string }> = {
  info: { icon: 'info', label: 'Nota' },
  tip: { icon: 'lightbulb', label: 'Consejo' },
  warning: { icon: 'warning', label: 'Atención' },
  danger: { icon: 'report', label: 'Deprecado' },
  angular: { icon: 'verified', label: 'Buena práctica' },
};

/** Nota destacada dentro de una página de documentación. */
@Component({
  selector: 'app-callout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  host: {
    class: 'adl-callout',
    '[class]': 'type()',
  },
  styleUrl: './callout.scss',
  template: `
    <mat-icon class="callout-icon" aria-hidden="true">{{ meta().icon }}</mat-icon>
    <div class="callout-body">
      <p class="callout-label">{{ label() || meta().label }}</p>
      <div class="callout-content"><ng-content /></div>
    </div>
  `,
})
export class CalloutComponent {
  readonly type = input<CalloutType>('info');
  readonly label = input<string>('');

  protected readonly meta = () => CALLOUT_META[this.type()];
}
