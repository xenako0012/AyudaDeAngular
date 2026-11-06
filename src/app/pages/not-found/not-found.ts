import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { NAV_SECTIONS } from '../../data/content.data';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  styleUrl: './not-found.scss',
  template: `
    <div class="adl-route notfound">
      <p class="code">404</p>
      <h1>Esta ruta no existe</h1>
      <p class="adl-lead">
        El router no ha encontrado ninguna coincidencia, así que ha entrado la ruta comodín
        <code class="adl-inline-code">&#123; path: '**', ... &#125;</code>. Puede ser un enlace roto
        o una URL mal escrita.
      </p>

      <div class="actions">
        <a matButton="filled" routerLink="/">
          <mat-icon>home</mat-icon>
          Volver a la portada
        </a>
        <a matButton="outlined" routerLink="/instalacion">
          <mat-icon>rocket_launch</mat-icon>
          Empezar la guía
        </a>
      </div>

      <div class="suggest">
        <p class="suggest-title">Capítulos disponibles</p>
        <div class="suggest-links">
          @for (chapter of chapters; track chapter.route) {
            <a [routerLink]="chapter.route">
              <mat-icon>{{ chapter.icon }}</mat-icon>
              {{ chapter.title }}
            </a>
          }
        </div>
      </div>
    </div>
  `,
})
export class NotFoundPage {
  protected readonly chapters = NAV_SECTIONS.flatMap((section) => section.chapters);
}
