import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface ProgressStats {
  total: number;
  completed: number;
  percent: number;
}

/**
 * Guarda en `localStorage` los capítulos marcados como completados y expone
 * estadísticas derivadas mediante `computed()`.
 */
@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly storageKey = 'adl-progress';
  private readonly completedRoutes = signal<ReadonlySet<string>>(this.read());

  readonly completed = computed(() => this.completedRoutes().size);
  readonly completedList = this.completedRoutes;

  constructor() {
    effect(() => {
      const value = [...this.completedRoutes()];
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(value));
      } catch {
        // Sin almacenamiento disponible.
      }
    });
  }

  isCompleted(route: string): boolean {
    return this.completedRoutes().has(route);
  }

  toggle(route: string): void {
    const next = new Set(this.completedRoutes());
    if (next.has(route)) {
      next.delete(route);
    } else {
      next.add(route);
    }
    this.completedRoutes.set(next);
  }

  private read(): ReadonlySet<string> {
    try {
      const raw = localStorage.getItem(this.storageKey);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(parsed) ? parsed.filter((r) => typeof r === 'string') : []);
    } catch {
      return new Set();
    }
  }
}

/**
 * Servicio de ejemplo para el capítulo de servicios: lee el `package.json`
 * publicado en `public/` para mostrar la versión real de Angular instalada.
 */
@Injectable({ providedIn: 'root' })
export class AppInfoService {
  private readonly http = inject(HttpClient);
  private readonly packageJson = signal<{ dependencies: Record<string, string> } | null>(null);

  readonly angularVersion = computed(() => {
    const deps = this.packageJson()?.dependencies ?? {};
    return (deps['@angular/core'] ?? '').replace(/^[\^~]/, '') || '22';
  });

  readonly installed = computed(() => this.packageJson() !== null);

  constructor() {
    this.http
      .get<{ dependencies: Record<string, string> }>('app-package.json')
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (data) => this.packageJson.set(data),
        error: () => this.packageJson.set({ dependencies: {} }),
      });
  }
}
