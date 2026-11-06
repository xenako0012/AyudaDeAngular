import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CodeHighlightService, CodeLanguage } from '../../core/code-highlight.service';
import { ThemeService } from '../../core/theme.service';

const LANGUAGE_LABEL: Record<CodeLanguage, string> = {
  ts: 'TypeScript',
  js: 'JavaScript',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  bash: 'Terminal',
  json: 'JSON',
};

/**
 * Bloque de código con resaltado de sintaxis y botón de copiar.
 *
 * ```html
 * <app-code-block language="ts" [code]="ejemplo" filename="usuario.ts" />
 * ```
 */
@Component({
  selector: 'app-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  host: {
    class: 'adl-code-block',
  },
  styleUrl: './code-block.scss',
  template: `
    <div class="code-head">
      <span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="code-file">{{ filename() || languageLabel() }}</span>
      <span class="code-lang">{{ languageLabel() }}</span>
      <button
        matIconButton
        class="copy-btn"
        type="button"
        [matTooltip]="copied() ? '¡Copiado!' : 'Copiar código'"
        (click)="copy()"
        aria-label="Copiar código"
      >
        <mat-icon>{{ copied() ? 'check' : 'content_copy' }}</mat-icon>
      </button>
    </div>
    <pre class="adl-code"><code class="hljs" [innerHTML]="highlighted()"></code></pre>
  `,
})
export class CodeBlockComponent {
  /** Lenguaje del fragmento de código. */
  readonly language = input<CodeLanguage>('ts');
  /** Código a mostrar (se eliminan los espacios sobrantes al principio y final). */
  readonly code = input.required<string>();
  /** Nombre de archivo mostrado en la cabecera del bloque. */
  readonly filename = input<string>('');

  private readonly highlighter = inject(CodeHighlightService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly theme = inject(ThemeService);

  protected readonly copied = signal(false);
  protected readonly languageLabel = computed(() => LANGUAGE_LABEL[this.language()]);

  protected readonly highlighted = computed(() => {
    this.theme.mode(); // Dependencia: el tema afecta a los colores del código.
    return this.highlighter.highlight(this.code(), this.language());
  });

  private timer: ReturnType<typeof setTimeout> | undefined;

  protected async copy(): Promise<void> {
    const text = this.code().trim();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback para navegadores sin permiso de portapapeles.
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      this.host.nativeElement.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    this.copied.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(false), 1800);
  }
}
