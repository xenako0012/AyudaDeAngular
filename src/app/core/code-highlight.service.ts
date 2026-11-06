import { inject, Injectable, signal } from '@angular/core';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { HighlightResult } from 'highlight.js';

import { ThemeService } from './theme.service';

export type CodeLanguage = 'ts' | 'html' | 'css' | 'scss' | 'bash' | 'json' | 'js';

const LANGUAGE_MAP: Record<CodeLanguage, string> = {
  ts: 'typescript',
  js: 'javascript',
  html: 'xml',
  css: 'css',
  scss: 'scss',
  bash: 'bash',
  json: 'json',
};

/**
 * Servicio de resaltado de sintaxis.
 *
 * Se registran únicamente los lenguajes que usa la web (typescript, xml/html, scss,
 * css, bash, json y javascript), en lugar de cargar el paquete
 * `highlight.js` completo: el bundle pesa una fracción de lo que pesaría con
 * todos los lenguajes.
 *
 * Las etiquetas `<pre><code>` se generan con `innerHTML` a partir del HTML que
 * produce highlight.js. Es seguro porque el resultado está escapado y proviene
 * de cadenas literales del propio código fuente, nunca de la entrada del usuario.
 */
@Injectable({ providedIn: 'root' })
export class CodeHighlightService {
  private readonly ready = signal(false);
  private readonly theme = inject(ThemeService);

  constructor() {
    hljs.registerLanguage('typescript', typescript);
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('scss', scss);
    hljs.registerLanguage('bash', bash);
    hljs.registerLanguage('json', json);
    this.ready.set(true);

    // Reaplica el resaltado cuando cambia el tema para que los colores
    // personalizados (definidos por variables CSS) se refresquen.
    this.theme.mode();
  }

  /** Devuelve el HTML resaltado listo para insertarse con `innerHTML`. */
  highlight(code: string, language: CodeLanguage): string {
    const lang = LANGUAGE_MAP[language] ?? 'typescript';
    if (!hljs.getLanguage(lang)) {
      return escapeHtml(code);
    }
    const result: HighlightResult = hljs.highlight(code.trim(), {
      language: lang,
      ignoreIllegals: true,
    });
    return result.value;
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
