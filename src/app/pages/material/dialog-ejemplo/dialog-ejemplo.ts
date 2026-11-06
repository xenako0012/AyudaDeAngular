import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface DialogData {
  readonly titulo: string;
  readonly mensaje: string;
}

/** Diálogo de ejemplo abierto desde el capítulo de Angular Material. */
@Component({
  selector: 'app-dialog-ejemplo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>
      <mat-icon aria-hidden="true">auto_awesome</mat-icon>
      {{ data.titulo }}
    </h2>
    <mat-dialog-content>
      <p>{{ data.mensaje }}</p>
      <p class="hint">
        Los datos llegan mediante <code>MAT_DIALOG_DATA</code> y el cierre se controla con
        <code>MatDialogRef</code>.
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button matButton mat-dialog-close="cancelar">Cancelar</button>
      <button matButton="filled" [mat-dialog-close]="'ok'">Aceptar</button>
    </mat-dialog-actions>
  `,
  styles: `
    h2 {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    mat-icon {
      color: var(--mat-sys-primary);
    }

    .hint {
      font-size: 0.82rem;
      color: var(--mat-sys-on-surface-variant);
      margin-top: 10px;
    }

    code {
      font-family: var(--adl-mono);
      font-size: 0.78rem;
      background: var(--mat-sys-surface-container-high);
      border-radius: 5px;
      padding: 1px 5px;
    }
  `,
})
export class DialogEjemploComponent {
  protected readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  protected readonly dialogRef = inject(MatDialogRef<DialogEjemploComponent>);
}
