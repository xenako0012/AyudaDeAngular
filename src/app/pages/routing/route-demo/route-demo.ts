import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

import { CodeBlockComponent } from '../../../shared/code-block/code-block';

/**
 * Página de demostración de una ruta con parámetro (`/usuarios/:id`).
 *
 * El parámetro llega como input gracias a `withComponentInputBinding()`:
 * el router rellena `id` con el segmento `:id` de la URL.
 */
@Component({
  selector: 'app-route-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, CodeBlockComponent],
  styleUrl: './route-demo.scss',
  template: `
    <div class="adl-route">
      <a class="back" routerLink="/routing">
        <mat-icon>arrow_back</mat-icon>
        Volver a Routing
      </a>

      <header class="demo-head">
        <p class="eyebrow">Ruta con parámetro · /usuarios/:id</p>
        <h1>Detalle del usuario «{{ id() }}»</h1>
        <p class="adl-lead">
          Esta página vive en la ruta <code class="adl-inline-code">usuarios/:id</code>. El valor
          del parámetro llega al componente como un <code class="adl-inline-code">input()</code>:
          esto es <code class="adl-inline-code">withComponentInputBinding()</code> en acción.
        </p>
      </header>

      <div class="demo-grid">
        <mat-card appearance="outlined" class="user-card">
          <mat-card-header>
            <div mat-card-avatar class="avatar">{{ inicial() }}</div>
            <mat-card-title>{{ usuario().nombre }}</mat-card-title>
            <mat-card-subtitle>{{ usuario().rol }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <dl class="user-facts">
              <div>
                <dt>ID de ruta</dt>
                <dd><code>{{ id() }}</code></dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{{ usuario().email }}</dd>
              </div>
              <div>
                <dt>Equipo</dt>
                <dd>{{ usuario().equipo }}</dd>
              </div>
              <div>
                <dt>Alta</dt>
                <dd>{{ usuario().alta }}</dd>
              </div>
            </dl>
            <mat-chip-set>
              @for (tag of usuario().tags; track tag) {
                <mat-chip>{{ tag }}</mat-chip>
              }
            </mat-chip-set>
          </mat-card-content>
          <mat-card-actions align="end">
            <button matButton="tonal" type="button" (click)="otroUsuario()">
              <mat-icon>casino</mat-icon>
              Otro usuario aleatorio
            </button>
            <button matButton="filled" type="button" routerLink="/usuarios/7">Ir al 7</button>
          </mat-card-actions>
        </mat-card>

        <div class="code-side">
          <app-code-block language="ts" filename="route-demo.ts" [code]="codigo" />
          <app-code-block language="ts" filename="app.routes.ts" [code]="ruta" />
        </div>
      </div>

      <aside class="note">
        <mat-icon>lightbulb</mat-icon>
        <p>
          Como el router reutiliza el componente al cambiar solo el parámetro, los inputs se
          actualizan sin destruirlo. Ese es el motivo por el que
          <code class="adl-inline-code">id()</code> es un signal: cualquier
          <code class="adl-inline-code">computed()</code> que dependa de él se recalcula solo.
        </p>
      </aside>
    </div>
  `,
})
export class RouteDemoPage {
  /** Rellenado por el router (withComponentInputBinding). */
  readonly id = input.required<string>();

  private readonly router = inject(Router);

  protected readonly usuario = computed(() => {
    const n = Number(this.id()) || 1;
    const nombres = ['Ana Torres', 'Luis Ramos', 'Marta Silva', 'Diego Peña', 'Sofía Vidal'];
    const roles = ['Administradora', 'Editor', 'Analista', 'Desarrollador', 'Diseñadora'];
    const equipos = ['Plataforma', 'Frontend', 'Datos', 'Infraestructura', 'Producto'];
    const index = Math.abs(n) % nombres.length;

    return {
      nombre: nombres[index],
      rol: roles[index],
      email: `usuario${n}@ejemplo.dev`,
      equipo: equipos[index],
      alta: `2024-0${(index % 9) + 1}-1${index}`,
      tags: ['standalone', 'signals', roles[index].toLowerCase()],
    };
  });

  protected readonly inicial = computed(() => this.usuario().nombre.charAt(0));

  protected otroUsuario(): void {
    const next = Math.floor(Math.random() * 40) + 1;
    void this.router.navigate(['/usuarios', String(next)]);
  }

  protected readonly codigo = `import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-route-demo',
  templateUrl: './route-demo.html',
})
export class RouteDemoPage {
  // El router rellena este input con el parámetro :id
  id = input.required<string>();

  usuario = computed(() => {
    const n = Number(this.id());
    return cargarUsuario(n);
  });
}`;

  protected readonly ruta = `{
  path: 'usuarios/:id',
  loadComponent: () =>
    import('./pages/routing/route-demo/route-demo')
      .then(m => m.RouteDemoPage),
}`;
}
