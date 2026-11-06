import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './layout/header/header';
import { SidebarComponent } from './layout/sidebar/sidebar';
import { ThemeService } from './core/theme.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  styleUrl: './app.scss',
  template: `
    <a class="skip-link" href="#contenido">Saltar al contenido</a>

    <app-header (toggleMenu)="toggleSidebar()" />

    <div class="shell adl-container">
      <aside class="shell-side" [class.open]="sidebarOpen()" aria-label="Navegación lateral">
        <app-sidebar (navigate)="closeSidebar()" />
      </aside>

      @if (sidebarOpen()) {
        <div class="scrim" (click)="closeSidebar()" aria-hidden="true"></div>
      }

      <main id="contenido" class="shell-main" tabindex="-1">
        <router-outlet />
      </main>
    </div>

    <footer class="app-footer">
      <div class="adl-container footer-inner">
        <div class="footer-brand">
          <span class="footer-logo" aria-hidden="true">A</span>
          <div>
            <strong>Ayuda de Angular</strong>
            <p>Hecho con Angular 22, Angular Material y demasiado cariño por los signals.</p>
          </div>
        </div>
        <nav class="footer-links" aria-label="Enlaces del pie">
          <a href="https://angular.dev" target="_blank" rel="noopener">Documentación oficial</a>
          <a href="https://material.angular.dev" target="_blank" rel="noopener">Angular Material</a>
          <a href="https://angular.dev/tools/cli" target="_blank" rel="noopener">Angular CLI</a>
          <a href="https://github.com/xenako0012/AyudaDeAngular" target="_blank" rel="noopener">
            GitHub del proyecto
          </a>
        </nav>
      </div>
    </footer>
  `,
})
export class App {
  private readonly theme = inject(ThemeService);
  protected readonly sidebarOpen = signal(false);

  constructor() {
    // Inicializa el tema (y mantiene el modo al recargar).
    void this.theme;
  }

  protected toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  protected closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}
