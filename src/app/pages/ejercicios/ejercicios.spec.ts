import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it, beforeAll } from 'vitest';

import { EXAMEN_DAM2 } from '../../data/examenes.data';
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

  describe('examen oficial DAM2', () => {
    it('empieza oculto: no hay contenidos hasta pulsar el botón', async () => {
      const fixture = await crear();
      const el: HTMLElement = fixture.nativeElement;

      expect(el.querySelector('#examen-dam2-contenido')).toBeNull();
      expect(el.textContent).not.toContain('Enunciado literal');

      const boton = el.querySelector<HTMLButtonElement>('.examen-cover button');
      expect(boton).not.toBeNull();
      expect(boton!.textContent).toContain('Mostrar el examen');
      expect(boton!.getAttribute('aria-expanded')).toBe('false');
    });

    it('el botón revela los seis ejercicios, la rúbrica y las soluciones', async () => {
      const fixture = await crear();
      const el: HTMLElement = fixture.nativeElement;

      el.querySelector<HTMLButtonElement>('.examen-cover button')!.click();
      fixture.detectChanges();

      const contenido = el.querySelector('#examen-dam2-contenido');
      expect(contenido).not.toBeNull();
      expect(el.querySelectorAll('.examen-ejercicio').length).toBe(
        EXAMEN_DAM2.ejercicios.length,
      );
      expect(contenido!.textContent).toContain('Rúbrica oficial');
      expect(contenido!.textContent).toContain('Enunciado literal');
      // La solución del cronómetro está disponible en la página
      expect(contenido!.textContent).toContain('cronometro.ts');
      expect(el.querySelector<HTMLButtonElement>('.examen-cover button')!.textContent).toContain(
        'Ocultar el examen',
      );
    });

    it('se puede volver a ocultar', async () => {
      const fixture = await crear();
      const el: HTMLElement = fixture.nativeElement;
      const boton = () => el.querySelector<HTMLButtonElement>('.examen-cover button')!;

      boton().click();
      fixture.detectChanges();
      expect(el.querySelector('#examen-dam2-contenido')).not.toBeNull();

      boton().click();
      fixture.detectChanges();
      expect(el.querySelector('#examen-dam2-contenido')).toBeNull();
    });

    it('la rúbrica oficial suma los 10 puntos del examen', () => {
      const total = EXAMEN_DAM2.rubrica.reduce((suma, c) => suma + c.puntos, 0);
      expect(total).toBeCloseTo(EXAMEN_DAM2.puntos, 5);
    });

    it('los puntos de los seis ejercicios coinciden con la rúbrica', () => {
      expect(EXAMEN_DAM2.ejercicios.map((e) => e.numero)).toEqual([1, 2, 3, 4, 5, 6]);

      const sumaEjercicios = EXAMEN_DAM2.ejercicios.reduce((t, e) => t + e.puntos, 0);
      // 2 + 1.5 + 1 + 2 + 1 + 1 = 8.5, más 1.5 de «uso del framework»
      expect(sumaEjercicios).toBeCloseTo(8.5, 5);
      expect(sumaEjercicios + 1.5).toBeCloseTo(EXAMEN_DAM2.puntos, 5);

      for (const ejercicio of EXAMEN_DAM2.ejercicios) {
        expect(ejercicio.solucion.length).toBeGreaterThan(0);
        expect(ejercicio.queSePide.length).toBeGreaterThan(0);
        expect(ejercicio.comprobar.length).toBeGreaterThan(0);
      }
    });
  });
});
