import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * Componente hijo de demostración. Ilustra las tres APIs de comunicación:
 * - `input()` / `input.required()` → datos del padre al hijo.
 * - `output()` → eventos del hijo al padre.
 * - `model()` → two-way binding con [(puntuacion)].
 */
@Component({
  selector: 'demo-hijo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  host: { class: 'demo-child' },
  styleUrl: './demo-hijo.scss',
  template: `
    <div class="child-head">
      <span class="child-badge">&lt;demo-hijo&gt;</span>
      @if (saludo()) {
        <span class="child-greeting">{{ saludo() }}</span>
      }
    </div>

    <p class="child-text">
      Recibo <code>[mensaje]</code> del padre y emito con <code>(responder)</code>.
    </p>

    <div class="child-prop">
      <span class="prop-label">[mensaje] =</span>
      <strong>{{ mensaje() }}</strong>
    </div>

    <div class="stars" role="group" aria-label="Valoración con model()">
      @for (star of estrellas; track star) {
        <button
          type="button"
          class="star"
          [class.on]="star <= puntuacion()"
          [attr.aria-label]="'Puntuar con ' + star"
          (click)="puntuar(star)"
        >
          <mat-icon>{{ star <= puntuacion() ? 'star' : 'star_border' }}</mat-icon>
        </button>
      }
      <span class="stars-value">{{ puntuacion() }}/5</span>
    </div>

    <div class="child-actions">
      <button
        matButton="filled"
        type="button"
        (click)="responder.emit('¡Hola desde el hijo! ' + hora())"
      >
        <mat-icon>north_east</mat-icon>
        Emitir al padre
      </button>
      <button matButton="outlined" type="button" (click)="contar.emit(1)">
        <mat-icon>add</mat-icon>
        Sumar contador
      </button>
    </div>
  `,
})
export class DemoHijoComponent {
  /** Input opcional con valor por defecto. */
  readonly mensaje = input('Hola desde el padre');

  /** Input obligatorio: si el padre no lo pasa, es error de compilación. */
  readonly saludo = input<string>('');

  /** Two-way binding: [(puntuacion)] en el padre. */
  readonly puntuacion = model(3);

  /** Eventos hacia el padre. */
  readonly responder = output<string>();
  readonly contar = output<number>();

  protected readonly estrellas = [1, 2, 3, 4, 5];

  protected puntuar(valor: number): void {
    this.puntuacion.set(valor);
  }

  protected hora(): string {
    return new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }
}
