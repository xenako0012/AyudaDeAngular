/** Modelo de los datos que alimentan la web de documentación. */

export type DocLevel = 'inicial' | 'intermedio' | 'avanzado';

export interface NavChapter {
  readonly title: string;
  readonly route: string;
  readonly description: string;
  readonly icon: string;
  readonly level: DocLevel;
  readonly minutes: number;
  readonly tags: readonly string[];
  readonly summary: readonly string[];
}

export interface NavSection {
  readonly title: string;
  readonly icon: string;
  readonly description: string;
  readonly chapters: readonly NavChapter[];
}

/** Un apartado de una página de capítulo. */
export interface DocSection {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
}

export interface RutaInfo {
  readonly path: string;
  readonly title: string;
  readonly icon: string;
  readonly description: string;
}

export interface PreguntaFrecuente {
  readonly question: string;
  readonly answer: string;
}

export interface ComponenteMaterial {
  readonly name: string;
  readonly selector: string;
  readonly module: string;
  readonly category: MaterialCategory;
  readonly docsSlug: string;
  readonly description: string;
}

export type MaterialCategory =
  | 'Formularios'
  | 'Botones e indicadores'
  | 'Navegación'
  | 'Layout'
  | 'Popups y mensajes'
  | 'Datos';
