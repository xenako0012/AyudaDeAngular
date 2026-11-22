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

  describe('examen anterior (puerta trasera)', () => {
    it('el disparador está oculto y no hay contenido antes de pulsarlo', async () => {
      const fixture = await crear();
      const el: HTMLElement = fixture.nativeElement;

      // Hay un botón discreto, pero ningún enunciado ni código en el DOM.
      expect(el.querySelector('#examen-anterior-contenido')).toBeNull();
      // No se filtra ni un fragmento del examen antes de abrir la puerta.
      expect(el.textContent).not.toContain('Crea una aplicación en Angular');
      expect(el.querySelectorAll('.examen-anterior app-code-block').length).toBe(0);

      const boton = el.querySelector<HTMLButtonElement>('.disparador');
      expect(boton).not.toBeNull();
      // El disparador es solo un icono: el único texto es el nombre del icono.
      expect(boton!.querySelectorAll('mat-icon').length).toBe(1);
      expect(boton!.textContent?.trim()).toBe('key');
      expect(boton!.getAttribute('aria-expanded')).toBe('false');
      // Etiqueta accesible larga: el texto visible es mínimo a propósito.
      expect(boton!.getAttribute('aria-label')).toContain('examen anterior');
    });

    it('al pulsarlo muestra solo el enunciado y el código del solucionario', async () => {
      const fixture = await crear();
      const el: HTMLElement = fixture.nativeElement;

      el.querySelector<HTMLButtonElement>('.disparador')!.click();
      fixture.detectChanges();

      const contenido = el.querySelector('#examen-anterior-contenido')!;
      expect(contenido).not.toBeNull();

      // 1) Enunciado (los tres párrafos del examen)
      expect(contenido.textContent).toContain('Enunciado');
      expect(contenido.textContent).toContain('Crea una aplicación en Angular');
      expect(contenido.textContent).toContain('bienvenido de vuelta');
      expect(contenido.textContent).toContain('routerLink');

      // 2) Solucionario completo, con los archivos clave
      for (const archivo of ['app.routes.ts', 'saludo.ts', 'cronometro.ts', 'lapso.ts', 'formato.ts']) {
        expect(contenido.textContent).toContain(archivo);
      }

      // Ni rúbrica ni listas de comprobación: solo enunciado + código.
      expect(contenido.textContent).not.toContain('Rúbrica');
      expect(contenido.querySelectorAll('.rubrica-row').length).toBe(0);
      expect(contenido.querySelectorAll('.comprobar').length).toBe(0);
    });

    it('los archivos del solucionario están comentados', () => {
      const conComentarios = EXAMEN_DAM2.solucion.filter((f) =>
        f.language === 'ts' || f.language === 'scss' || f.language === 'html'
          ? /\/\/|<!--/.test(f.code)
          : true,
      );
      // Al menos el 80% del solucionario lleva comentarios explicativos.
      expect(conComentarios.length / EXAMEN_DAM2.solucion.length).toBeGreaterThanOrEqual(0.8);
    });

    it('se puede volver a ocultar', async () => {
      const fixture = await crear();
      const el: HTMLElement = fixture.nativeElement;
      const boton = () => el.querySelector<HTMLButtonElement>('.disparador')!;

      boton().click();
      fixture.detectChanges();
      expect(el.querySelector('#examen-anterior-contenido')).not.toBeNull();
      expect(boton().getAttribute('aria-expanded')).toBe('true');

      boton().click();
      fixture.detectChanges();
      expect(el.querySelector('#examen-anterior-contenido')).toBeNull();
    });

    it('el solucionario cubre los seis ejercicios sin duplicados', () => {
      expect(EXAMEN_DAM2.ejercicios.map((e) => e.numero)).toEqual([1, 2, 3, 4, 5, 6]);

      const nombres = EXAMEN_DAM2.solucion.map((f) => f.filename);
      expect(new Set(nombres).size).toBe(nombres.length);
      expect(EXAMEN_DAM2.solucion.length).toBeGreaterThan(10);

      // La rúbrica oficial sigue sumando los 10 puntos.
      const total = EXAMEN_DAM2.rubrica.reduce((suma, c) => suma + c.puntos, 0);
      expect(total).toBeCloseTo(EXAMEN_DAM2.puntos, 5);
    });
  });
});
