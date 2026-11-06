import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'adl-theme';

/**
 * Gestiona el modo claro/oscuro.
 *
 * El tema de Angular Material se define con `mat.theme(...)` sobre `html` con
 * `color-scheme: light`. Para el modo oscuro basta con añadir la clase
 * `dark-theme` al elemento `<html>`, que cambia `color-scheme` a `dark` y hace
 * que todos los tokens del sistema (`--mat-sys-*`) se recalculen.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly stored = this.readStoredTheme();

  readonly mode = signal<ThemeMode>(this.stored ?? this.systemPreference());

  constructor() {
    effect(() => {
      const mode = this.mode();
      const root = this.document.documentElement;
      root.classList.toggle('dark-theme', mode === 'dark');

      const meta = this.document.querySelector('meta[name="theme-color"]');
      meta?.setAttribute('content', mode === 'dark' ? '#141218' : '#673ab7');
    });
  }

  toggle(): void {
    this.set(this.mode() === 'dark' ? 'light' : 'dark');
  }

  set(mode: ThemeMode): void {
    this.mode.set(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Almacenamiento no disponible (modo privado): se ignora.
    }
  }

  private readStoredTheme(): ThemeMode | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch {
      return null;
    }
  }

  private systemPreference(): ThemeMode {
    return this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
}
