import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';

import { ThemeService } from '../../core/theme.service';
import { ALL_CHAPTERS, NAV_SECTIONS } from '../../data/content.data';

interface SearchResult {
  readonly title: string;
  readonly route: string;
  readonly section: string;
  readonly description: string;
  readonly icon: string;
}

const MAX_RESULTS = 7;

/** Cabecera fija: marca, buscador global, menú de capítulos y cambio de tema. */
@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule, MatButtonModule, MatTooltipModule, MatDividerModule, MatMenuModule],
  host: { '(document:keydown)': 'onGlobalKey($event)' },
  styleUrl: './header.scss',
  template: `
    <header class="app-header">
      <div class="adl-container header-inner">
        <button
          matIconButton
          class="icon-btn menu-btn"
          type="button"
          aria-label="Abrir el índice"
          (click)="toggleMenu.emit()"
        >
          <mat-icon>menu</mat-icon>
        </button>

        <a class="brand" routerLink="/" (click)="closeSearch()">
          <span class="brand-logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path
                fill="currentColor"
                d="M12 2 2.5 5.3 12 22l9.5-16.7L12 2Zm0 3.3 5.6 2-5.6 9.9-5.6-9.9 5.6-2Z"
              />
            </svg>
          </span>
          <span class="brand-text">
            <strong>Ayuda de Angular</strong>
            <small>Guía práctica · v22</small>
          </span>
        </a>

        <div class="search" [class.open]="searchOpen()">
          <mat-icon class="search-icon" aria-hidden="true">search</mat-icon>
          <input
            #searchInput
            type="search"
            class="search-input"
            placeholder="Buscar {{ totalChapters }} capítulos…  (⌘K)"
            aria-label="Buscar en la documentación"
            [value]="query()"
            (input)="onInput($event)"
            (focus)="searchOpen.set(true)"
            (keydown)="onSearchKeydown($event)"
          />
          <button
            matIconButton
            class="icon-btn close-search"
            type="button"
            aria-label="Cerrar la búsqueda"
            (click)="closeSearch()"
          >
            <mat-icon>close</mat-icon>
          </button>

          @if (searchOpen() && query().length > 0) {
            <div class="search-panel" role="listbox" aria-label="Resultados de búsqueda">
              @if (results().length === 0) {
                <p class="search-empty">Sin resultados para «{{ query() }}».</p>
              } @else {
                @for (result of results(); track result.route; let i = $index) {
                  <button
                    type="button"
                    class="search-result"
                    role="option"
                    [attr.aria-selected]="i === activeIndex()"
                    [class.active]="i === activeIndex()"
                    (click)="go(result)"
                    (mouseenter)="activeIndex.set(i)"
                  >
                    <mat-icon aria-hidden="true">{{ result.icon }}</mat-icon>
                    <span class="result-text">
                      <strong>{{ result.title }}</strong>
                      <small>{{ result.section }} · {{ result.description }}</small>
                    </span>
                    <mat-icon class="result-arrow" aria-hidden="true">arrow_forward</mat-icon>
                  </button>
                }
              }
            </div>
          }
        </div>

        <div class="header-actions">
          <button
            matButton="tonal"
            class="chapters-btn"
            type="button"
            [matMenuTriggerFor]="chaptersMenu"
          >
            <mat-icon>auto_stories</mat-icon>
            <span>Capítulos</span>
          </button>

          <button
            matIconButton
            class="icon-btn theme-btn"
            type="button"
            [matTooltip]="theme.mode() === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            [attr.aria-label]="theme.mode() === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'"
            (click)="theme.toggle()"
          >
            <mat-icon>{{ theme.mode() === 'dark' ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>

          <a
            matIconButton
            class="icon-btn"
            href="https://github.com/xenako0012/AyudaDeAngular"
            target="_blank"
            rel="noopener"
            matTooltip="Ver el repositorio"
            aria-label="Ver el repositorio en GitHub"
          >
            <mat-icon>code</mat-icon>
          </a>
        </div>
      </div>

      <mat-divider />
    </header>

    <mat-menu #chaptersMenu="matMenu" class="chapters-menu" xPosition="before">
      <p class="menu-heading">Todos los capítulos</p>
      @for (section of sections; track section.title) {
        <div class="menu-section">{{ section.title }}</div>
        @for (chapter of section.chapters; track chapter.route) {
          <button mat-menu-item type="button" [routerLink]="chapter.route">
            <mat-icon>{{ chapter.icon }}</mat-icon>
            <span>{{ chapter.title }}</span>
          </button>
        }
      }
    </mat-menu>
  `,
})
export class HeaderComponent {
  readonly toggleMenu = output<void>();
  protected readonly theme = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  protected readonly sections = NAV_SECTIONS;
  protected readonly totalChapters = ALL_CHAPTERS.length;

  protected readonly query = signal('');
  protected readonly searchOpen = signal(false);
  protected readonly activeIndex = signal(0);

  protected readonly results = computed<SearchResult[]>(() => {
    const term = normalize(this.query());
    if (!term) {
      return [];
    }
    return ALL_CHAPTERS.filter((chapter) => {
      const haystack = normalize(
        [chapter.title, chapter.description, chapter.section, ...chapter.tags].join(' '),
      );
      return haystack.includes(term);
    })
      .slice(0, MAX_RESULTS)
      .map((chapter) => ({
        title: chapter.title,
        route: chapter.route,
        section: chapter.section,
        description: chapter.description,
        icon: chapter.icon,
      }));
  });

  protected onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.activeIndex.set(0);
    this.searchOpen.set(true);
  }

  protected onGlobalKey(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.searchInput()?.nativeElement.focus();
    }
    if (event.key === 'Escape') {
      this.closeSearch();
    }
  }

  protected onSearchKeydown(event: KeyboardEvent): void {
    const results = this.results();
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex.update((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex.update((i) => Math.max(i - 1, 0));
    } else if (event.key === 'Enter') {
      const result = results[this.activeIndex()];
      if (result) {
        this.go(result);
      }
    }
  }

  protected go(result: SearchResult): void {
    void this.router.navigateByUrl(result.route);
    this.closeSearch();
  }

  protected closeSearch(): void {
    this.query.set('');
    this.searchOpen.set(false);
  }
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}
