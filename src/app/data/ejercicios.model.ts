import { CodeLanguage } from '../core/code-highlight.service';

/** Archivo de código que forma parte de la solución de un ejercicio. */
export interface FicheroSolucion {
  readonly filename: string;
  readonly language: CodeLanguage;
  readonly code: string;
  readonly nota?: string;
}

export type Dificultad = 'Básico' | 'Medio' | 'Avanzado';

export interface Criterio {
  readonly criterio: string;
  readonly puntos: number;
}

/** Un ejercicio práctico con enunciado tipo examen, pistas y solución. */
export interface Ejercicio {
  readonly id: string;
  readonly numero: number;
  readonly titulo: string;
  readonly resumen: string;
  readonly dificultad: Dificultad;
  readonly minutos: number;
  readonly puntos: number;
  readonly icon: string;
  readonly tags: readonly string[];
  /** Contexto del ejercicio: qué aplicación se está construyendo. */
  readonly contexto: string;
  /** Requisitos numerados, tal y como aparecerían en un examen. */
  readonly requisitos: readonly string[];
  readonly pistas: readonly string[];
  readonly criterios: readonly Criterio[];
  readonly solucion: readonly FicheroSolucion[];
  readonly comprobar: readonly string[];
}

/** Simulacro completo de examen. */
export interface Simulacro {
  readonly titulo: string;
  readonly duracion: string;
  readonly puntos: number;
  readonly contexto: string;
  readonly requisitos: readonly string[];
  readonly entregable: readonly string[];
  readonly rubrica: readonly Criterio[];
  readonly consejos: readonly string[];
  readonly solucion: readonly FicheroSolucion[];
}
