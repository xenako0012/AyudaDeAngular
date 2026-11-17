import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it, beforeAll } from 'vitest';

import { EJERCICIOS, SIMULACRO } from '../../data/ejercicios.data';
import { EjerciciosPage } from './ejercicios';

/**
 * Pruebas del capítulo de ejercicios: comprueba que la página se monta sin
 * errores y que el contenido (diez ejercicios y simulacro) se renderiza.
 */
describe('EjerciciosPage', () => {
  beforeAll(() => {
    // jsdom no implementa matchMedia; Material lo consulta al inicializarse.
    if (!window.matchMedia) {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: () => undefined,
          removeListener: () => undefined,
          addEventListener: () => undefined,
          removeEventListener: () => undefined,
          dispatchEvent: () => false,
        }),
      });
    }
  });

  async function crear() {
    await TestBed.configureTestingModule({
      imports: [EjerciciosPage],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(EjerciciosPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }

  it('se monta y muestra el título del capítulo', async () => {
    const fixture = await crear();
    const texto = fixture.nativeElement.textContent as string;
    expect(texto).toContain('Ejercicios de Angular Material');
  });

  it('renderiza los diez enunciados con sus números', async () => {
    const fixture = await crear();
    const articulos = fixture.nativeElement.querySelectorAll('.ejercicio');
    expect(articulos.length).toBe(EJERCICIOS.length);

    const texto = fixture.nativeElement.textContent as string;
    for (const ejercicio of EJERCICIOS) {
      expect(texto).toContain(ejercicio.titulo);
    }
  });

  it('muestra la sección del simulacro con su rúbrica', async () => {
    const fixture = await crear();
    const texto = fixture.nativeElement.textContent as string;
    expect(texto).toContain(SIMULACRO.titulo);
    expect(texto).toContain('Rúbrica');
    expect(fixture.nativeElement.querySelectorAll('.rubrica-row').length).toBe(
      SIMULACRO.rubrica.length,
    );
  });

  it('cada ejercicio incluye requisitos y criterios coherentes', () => {
    for (const ejercicio of EJERCICIOS) {
      expect(ejercicio.requisitos.length).toBeGreaterThanOrEqual(6);
      expect(ejercicio.solucion.length).toBeGreaterThan(0);

      const sumaCriterios = ejercicio.criterios.reduce((total, c) => total + c.puntos, 0);
      expect(sumaCriterios).toBe(ejercicio.puntos);
    }
  });

  it('los totales del simulacro suman los 40 puntos anunciados', () => {
    const total = SIMULACRO.rubrica.reduce((suma, c) => suma + c.puntos, 0);
    expect(total).toBe(SIMULACRO.puntos);
  });
});
