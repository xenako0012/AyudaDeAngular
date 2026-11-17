import { Ejercicio, Simulacro } from './ejercicios.model';

/**
 * Ejercicios de Angular Material con estilo de examen.
 *
 * Cada enunciado sigue el mismo formato que una prueba práctica: contexto,
 * requisitos numerados, pistas y solución completa desglosada por archivos,
 * más una lista de comprobación para autoevaluarse.
 */
export const EJERCICIOS: readonly Ejercicio[] = [
  {
    id: 'botones-material',
    numero: 1,
    titulo: 'Barra de acciones con botones Material',
    resumen:
      'Convierte unos botones HTML planos en los cinco tipos de botón de Angular Material, con iconos y tooltips accesibles.',
    dificultad: 'Básico',
    minutos: 12,
    puntos: 10,
    icon: 'smart_button',
    tags: ['matButton', 'matIconButton', 'mat-icon', 'matTooltip'],
    contexto:
      'Un componente "ficha de contacto" usa botones nativos sin estilos. Hay que migrarlo a Angular Material manteniendo la jerarquía visual: una acción principal, dos secundarias y dos acciones de icono.',
    requisitos: [
      'Crea un componente standalone `FichaContacto` con su plantilla y sus estilos.',
      'Importa únicamente los módulos de Material que se utilizan (botones, iconos y tooltips).',
      'Muestra una acción principal con `matButton="filled"` y dos acciones secundarias, una `outlined` y otra `tonal`.',
      'Añade dos botones de icono (`matIconButton`) para "editar" y "favorito", cada uno con `aria-label` propio.',
      'Todos los botones de icono deben tener además un `matTooltip`.',
      'El icono del botón "compartir" tiene que quedar a la derecha del texto usando `iconPositionEnd`.',
    ],
    pistas: [
      'Los botones de Material son directivas de atributo: se aplican sobre un `<button>` nativo, no sobre un elemento `mat-button`.',
      'Sin `MatIconModule` en `imports`, el compilador lanza NG8001: `\'mat-icon\' is not a known element`.',
      '`aria-label` es obligatorio cuando el botón no tiene texto visible: un icono solo no describe la acción.',
    ],
    criterios: [
      { criterio: 'El componente es standalone y compila sin errores', puntos: 2 },
      { criterio: 'Solo se importan los módulos necesarios', puntos: 1 },
      { criterio: 'Las cinco variantes de botón se usan correctamente', puntos: 3 },
      { criterio: 'Iconos con aria-label y tooltip en los botones de icono', puntos: 2 },
      { criterio: 'El icono final usa iconPositionEnd', puntos: 2 },
    ],
    solucion: [
      {
        filename: 'ficha-contacto.ts',
        language: 'ts',
        code: `import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-ficha-contacto',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './ficha-contacto.html',
  styleUrl: './ficha-contacto.scss',
})
export class FichaContacto {
  nombre = 'Ana Torres';
  email = 'ana.torres@ejemplo.dev';

  guardar(): void {
    console.log('Contacto guardado');
  }
}`,
      },
      {
        filename: 'ficha-contacto.html',
        language: 'html',
        code: `<article class="ficha">
  <h2>{{ nombre }}</h2>
  <p>{{ email }}</p>

  <!-- Acción principal + secundarias -->
  <div class="acciones">
    <button matButton="filled" type="button" (click)="guardar()">
      Guardar
    </button>

    <button matButton="outlined" type="button">
      <mat-icon>share</mat-icon>
      Compartir
      <mat-icon iconPositionEnd>arrow_forward</mat-icon>
    </button>

    <button matButton="tonal" type="button">Cancelar</button>
  </div>

  <!-- Acciones de icono: aria-label obligatorio + tooltip -->
  <div class="acciones-icono">
    <button
      matIconButton
      type="button"
      aria-label="Editar contacto"
      matTooltip="Editar contacto"
    >
      <mat-icon>edit</mat-icon>
    </button>

    <button
      matIconButton
      type="button"
      aria-label="Marcar como favorito"
      matTooltip="Marcar como favorito"
    >
      <mat-icon>favorite_border</mat-icon>
    </button>
  </div>
</article>`,
      },
      {
        filename: 'ficha-contacto.scss',
        language: 'scss',
        code: `.ficha {
  padding: 20px;
  border-radius: 16px;
  border: 1px solid var(--mat-sys-outline-variant);
  background: var(--mat-sys-surface-container-lowest);
}

.acciones,
.acciones-icono {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
}

.acciones-icono {
  padding-top: 12px;
  border-top: 1px dashed var(--mat-sys-outline-variant);
}

/* Separación entre el icono y el texto del botón */
button mat-icon {
  margin-right: 6px;
}

button mat-icon[iconPositionEnd] {
  margin-right: 0;
  margin-left: 6px;
}`,
      },
    ],
    comprobar: [
      'El componente importa MatButtonModule, MatIconModule y MatTooltipModule.',
      'No aparece el error NG8001 al usar <mat-icon>.',
      'Los botones de icono tienen aria-label y matTooltip.',
      'El icono "arrow_forward" se renderiza después del texto "Compartir".',
    ],
  },
  {
    id: 'card-listado',
    numero: 2,
    titulo: 'Listado de cursos con mat-card y @for',
    resumen:
      'Renderiza una colección de objetos con tarjetas Material, bloque @empty y track por id.',
    dificultad: 'Básico',
    minutos: 15,
    puntos: 10,
    icon: 'dashboard',
    tags: ['mat-card', '@for', '@empty', 'mat-chip', 'track'],
    contexto:
      'Una academia quiere mostrar su catálogo de cursos. Cada curso tiene título, profesor, número de horas y una lista de tecnologías. Si el catálogo está vacío, hay que mostrar un mensaje.',
    requisitos: [
      'Crea el componente `ListadoCursos` con un signal `cursos` que contenga al menos tres cursos.',
      'Cada curso debe renderizarse dentro de un `mat-card` con `appearance="outlined"`.',
      'Usa `@for` con `track curso.id` (no `$index`).',
      'La cabecera de la tarjeta lleva título y subtítulo (`mat-card-title`, `mat-card-subtitle`).',
      'Las tecnologías de cada curso se muestran con `mat-chip-set` y `mat-chip`.',
      'Las acciones van en `mat-card-actions` alineadas al final, con un botón `matButton="filled"`.',
      'Si no hay cursos, se muestra un bloque `@empty` con un mensaje y un botón para recargar.',
    ],
    pistas: [
      '`track` es obligatorio en `@for`: si lo omites, el compilador falla con un error de plantilla.',
      '`mat-card-actions` acepta `align="end"` para alinear los botones a la derecha.',
      'Para que el `@empty` sea visible, prueba a vaciar el signal desde un botón de depuración.',
    ],
    criterios: [
      { criterio: 'El modelo de datos está tipado con una interfaz', puntos: 2 },
      { criterio: '@for con track por id único', puntos: 2 },
      { criterio: 'Uso correcto de mat-card y sus secciones', puntos: 2 },
      { criterio: 'Chips con mat-chip-set', puntos: 2 },
      { criterio: 'Bloque @empty funcional', puntos: 2 },
    ],
    solucion: [
      {
        filename: 'listado-cursos.ts',
        language: 'ts',
        code: `import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

export interface Curso {
  id: number;
  titulo: string;
  profesor: string;
  horas: number;
  tecnologias: string[];
}

@Component({
  selector: 'app-listado-cursos',
  imports: [MatCardModule, MatChipsModule, MatButtonModule, MatIconModule],
  templateUrl: './listado-cursos.html',
  styleUrl: './listado-cursos.scss',
})
export class ListadoCursos {
  readonly cursos = signal<Curso[]>([
    { id: 1, titulo: 'Angular moderno', profesor: 'Ana Torres', horas: 40, tecnologias: ['Standalone', 'Signals', 'Control flow'] },
    { id: 2, titulo: 'Angular Material', profesor: 'Luis Ramos', horas: 24, tecnologias: ['M3', 'mat.theme', 'CDK'] },
    { id: 3, titulo: 'Testing con Vitest', profesor: 'Marta Silva', horas: 16, tecnologias: ['Vitest', 'TestBed'] },
  ]);

  vaciar(): void {
    this.cursos.set([]);
  }

  recargar(): void {
    this.cursos.set([...this.cursosIniciales]);
  }

  private readonly cursosIniciales: Curso[] = [
    { id: 1, titulo: 'Angular moderno', profesor: 'Ana Torres', horas: 40, tecnologias: ['Standalone', 'Signals'] },
    { id: 2, titulo: 'Angular Material', profesor: 'Luis Ramos', horas: 24, tecnologias: ['M3', 'CDK'] },
  ];
}`,
      },
      {
        filename: 'listado-cursos.html',
        language: 'html',
        code: `<section class="listado">
  <header class="listado-head">
    <h2>Catálogo de cursos</h2>
    <button matButton="outlined" type="button" (click)="vaciar()">
      Vaciar catálogo
    </button>
  </header>

  <div class="grid">
    @for (curso of cursos(); track curso.id) {
      <mat-card appearance="outlined" class="curso">
        <mat-card-header>
          <mat-card-title>{{ curso.titulo }}</mat-card-title>
          <mat-card-subtitle>{{ curso.profesor }} · {{ curso.horas }} h</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <mat-chip-set aria-label="Tecnologías del curso">
            @for (tech of curso.tecnologias; track tech) {
              <mat-chip>{{ tech }}</mat-chip>
            }
          </mat-chip-set>
        </mat-card-content>

        <mat-card-actions align="end">
          <button matButton="filled" type="button">Ver curso</button>
        </mat-card-actions>
      </mat-card>
    } @empty {
      <mat-card appearance="outlined" class="vacio">
        <mat-card-content>
          <mat-icon>inbox</mat-icon>
          <p>No hay cursos disponibles.</p>
        </mat-card-content>
        <mat-card-actions align="end">
          <button matButton="tonal" type="button" (click)="recargar()">Recargar</button>
        </mat-card-actions>
      </mat-card>
    }
  </div>
</section>`,
      },
      {
        filename: 'listado-cursos.scss',
        language: 'scss',
        code: `.listado-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
}

.curso {
  border-radius: 16px !important;
}

mat-chip-set {
  margin-top: 12px;
}

.vacio {
  grid-column: 1 / -1;
  text-align: center;

  mat-icon {
    font-size: 32px;
    width: 32px;
    height: 32px;
    color: var(--mat-sys-outline);
  }
}`,
      },
    ],
    comprobar: [
      'Cada tarjeta muestra título, subtítulo, chips y acciones.',
      'Al vaciar el catálogo aparece el bloque @empty con su botón.',
      'No se usa $index en el track del @for principal.',
      'El modelo está declarado con una interfaz, no con any.',
    ],
  },
  {
    id: 'formulario-material',
    numero: 3,
    titulo: 'Formulario de alta con material form field',
    resumen:
      'Construye un formulario reactivo completo con mat-form-field, mat-select, validadores y mensajes de error de Material.',
    dificultad: 'Medio',
    minutos: 25,
    puntos: 20,
    icon: 'edit_note',
    tags: ['mat-form-field', 'matInput', 'mat-select', 'ReactiveFormsModule', 'Validators'],
    contexto:
      'El departamento de formación necesita un formulario de alta de alumnos: nombre, email, curso y aceptación de las condiciones. Debe validarse en el cliente y no permitir el envío si hay errores.',
    requisitos: [
      'Usa formularios reactivos: importa `ReactiveFormsModule` en el componente standalone.',
      'Crea el formulario con `FormBuilder` obtenido mediante `inject()` (no por constructor).',
      'Campos obligatorios: `nombre` (mínimo 3 caracteres), `email` (formato válido), `curso` (obligatorio).',
      'Añade un `mat-checkbox` obligatorio para aceptar las condiciones (`Validators.requiredTrue`).',
      'Cada campo debe usar `mat-form-field` con `<mat-label>`; nombre y email con `matInput`; curso con `mat-select`.',
      'Los errores se muestran con `mat-error` dentro del `mat-form-field`, distinguiendo "obligatorio" de "formato inválido".',
      'El botón de envío se deshabilita si el formulario es inválido y, al enviarlo, muestra un `MatSnackBar` con el resultado.',
      'Al enviar con error, marca todos los campos como `touched` para que se vean los mensajes.',
    ],
    pistas: [
      '`MatSnackBar` se inyecta con `inject(MatSnackBar)` y su método `open()` devuelve una referencia.',
      'Con `mat-error` no hace falta `*ngIf` ni `@if` por el estado touched: el propio form field gestiona la visibilidad.',
      '`Validators.requiredTrue` es el validador correcto para un checkbox de aceptación.',
      '`formulario.invalid` ya tiene en cuenta los validadores de todos los controles y del grupo.',
    ],
    criterios: [
      { criterio: 'Formulario reactivo con FormBuilder mediante inject()', puntos: 3 },
      { criterio: 'Validadores correctos en los cuatro controles', puntos: 4 },
      { criterio: 'mat-form-field con mat-label en todos los campos', puntos: 3 },
      { criterio: 'mat-error distinguiendo required y formato', puntos: 4 },
      { criterio: 'Botón deshabilitado correctamente y markAllAsTouched', puntos: 3 },
      { criterio: 'MatSnackBar al enviar', puntos: 3 },
    ],
    solucion: [
      {
        filename: 'alta-alumno.ts',
        language: 'ts',
        code: `import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

function sinEspacios(control: AbstractControl): ValidationErrors | null {
  const valor = String(control.value ?? '').trim();
  return valor.length > 0 ? null : { required: true };
}

@Component({
  selector: 'app-alta-alumno',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './alta-alumno.html',
  styleUrl: './alta-alumno.scss',
})
export class AltaAlumno {
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);

  readonly cursos = ['Angular moderno', 'Angular Material', 'Testing'];

  readonly formulario = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3), sinEspacios]],
    email: ['', [Validators.required, Validators.email]],
    curso: ['', Validators.required],
    acepta: [false, Validators.requiredTrue],
  });

  get nombre() { return this.formulario.controls.nombre; }
  get email() { return this.formulario.controls.email; }
  get curso() { return this.formulario.controls.curso; }
  get acepta() { return this.formulario.controls.acepta; }

  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.snackBar.open(
      \`Alta enviada para \${this.formulario.getRawValue().nombre}\`,
      'Cerrar',
      { duration: 4000, horizontalPosition: 'center', verticalPosition: 'bottom' },
    );

    this.formulario.reset({ curso: '', acepta: false });
  }
}`,
      },
      {
        filename: 'alta-alumno.html',
        language: 'html',
        code: `<form class="alta" [formGroup]="formulario" (ngSubmit)="enviar()" novalidate>
  <h2>Alta de alumno</h2>

  <mat-form-field appearance="outline">
    <mat-label>Nombre completo</mat-label>
    <input matInput formControlName="nombre" autocomplete="name" />
    @if (nombre.hasError('required')) {
      <mat-error>El nombre es obligatorio</mat-error>
    } @else if (nombre.hasError('minlength')) {
      <mat-error>Mínimo 3 caracteres</mat-error>
    }
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Correo electrónico</mat-label>
    <input matInput type="email" formControlName="email" autocomplete="email" />
    @if (email.hasError('required')) {
      <mat-error>El correo es obligatorio</mat-error>
    } @else if (email.hasError('email')) {
      <mat-error>El formato del correo no es válido</mat-error>
    }
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Curso</mat-label>
    <mat-select formControlName="curso">
      @for (curso of cursos; track curso) {
        <mat-option [value]="curso">{{ curso }}</mat-option>
      }
    </mat-select>
    @if (curso.hasError('required')) {
      <mat-error>Selecciona un curso</mat-error>
    }
  </mat-form-field>

  <mat-checkbox formControlName="acepta" class="acepta">
    Acepto las condiciones de la formación
  </mat-checkbox>
  @if (acepta.hasError('requiredTrue')) {
    <p class="acepta-error">Debes aceptar las condiciones para continuar.</p>
  }

  <div class="acciones">
    <button matButton="filled" type="submit" [disabled]="formulario.invalid">
      Enviar alta
    </button>
  </div>
</form>`,
      },
      {
        filename: 'alta-alumno.scss',
        language: 'scss',
        code: `.alta {
  display: grid;
  gap: 14px;
  max-width: 460px;
  padding: 24px;
  border-radius: 18px;
  border: 1px solid var(--mat-sys-outline-variant);
  background: var(--mat-sys-surface-container-lowest);
}

mat-form-field {
  width: 100%;
}

.acepta {
  margin-top: 4px;
}

.acepta-error {
  margin: -6px 0 0;
  font-size: 0.76rem;
  color: var(--mat-sys-error);
}`,
      },
    ],
    comprobar: [
      'El formulario no se envía con campos vacíos ni con un email mal formado.',
      'Los mensajes de error aparecen bajo cada campo únicamente cuando corresponde.',
      'El botón se deshabilita si el grupo es inválido.',
      'Se muestra el snackbar de confirmación tras un envío válido.',
    ],
  },
  {
    id: 'sidenav-layout',
    numero: 4,
    titulo: 'Layout de aplicación con sidenav y toolbar',
    resumen:
      'Monta el shell clásico: toolbar fija arriba, sidenav con menú y contenido en un router-outlet.',
    dificultad: 'Medio',
    minutos: 20,
    puntos: 15,
    icon: 'view_sidebar',
    tags: ['mat-sidenav', 'mat-toolbar', 'mat-nav-list', 'router-outlet', 'breakpoint'],
    contexto:
      'La aplicación de gestión necesita una plantilla base: barra superior con el título y el botón de menú, panel lateral con la navegación y el área de contenido que cambia según la ruta.',
    requisitos: [
      'Crea un componente `Layout` que sirva de shell de la aplicación.',
      'Incluye una `mat-toolbar` con un `matIconButton` que abra y cierre el sidenav.',
      'El menú lateral es un `mat-sidenav` con `mat-nav-list` y enlaces `mat-list-item` con `routerLink`.',
      'El contenido principal va dentro de `mat-sidenav-content` con `<router-outlet />`.',
      'El sidenav empieza abierto en pantallas grandes y cerrado con modo `over` en móvil.',
      'Al pulsar un enlace de la navegación, el sidenav se cierra si está en modo `over`.',
      'El enlace activo se resalta con `routerLinkActive`.',
    ],
    pistas: [
      '`mat-sidenav` tiene la propiedad `mode`: `side`, `over` o `push`.',
      'Puedes leer el ancho de la ventana con `BreakpointObserver` del CDK o con `matchMedia`.',
      '`(click)="sidenav.close()"` en cada enlace resuelve el punto 6 sin listeners globales.',
      '`routerLinkActive="activo"` añade la clase al enlace cuya ruta está activa.',
    ],
    criterios: [
      { criterio: 'Estructura mat-sidenav-container + sidenav + content correcta', puntos: 4 },
      { criterio: 'Toolbar con botón que alterna el sidenav', puntos: 3 },
      { criterio: 'Navegación con routerLink y routerLinkActive', puntos: 3 },
      { criterio: 'Comportamiento responsive (side vs over)', puntos: 3 },
      { criterio: 'El sidenav se cierra al navegar en móvil', puntos: 2 },
    ],
    solucion: [
      {
        filename: 'layout.ts',
        language: 'ts',
        code: `import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  private readonly breakpoint = inject(BreakpointObserver);

  readonly sidenav = viewChild.required(MatSidenav);

  readonly esMovil = toSignal(
    this.breakpoint.observe(Breakpoints.Small).pipe(map((estado) => estado.matches)),
    { initialValue: false },
  );

  readonly modoMenu = computed(() => (this.esMovil() ? 'over' : 'side'));

  readonly enlaces = [
    { path: '/dashboard', label: 'Panel', icon: 'dashboard' },
    { path: '/alumnos', label: 'Alumnos', icon: 'group' },
    { path: '/cursos', label: 'Cursos', icon: 'school' },
  ];

  alternarMenu(): void {
    void this.sidenav().toggle();
  }

  cerrarSiMovil(): void {
    if (this.esMovil()) {
      void this.sidenav().close();
    }
  }
}`,
      },
      {
        filename: 'layout.html',
        language: 'html',
        code: `<mat-sidenav-container class="shell">
  <mat-sidenav
    #menu
    [mode]="modoMenu()"
    [opened]="!esMovil()"
    class="side"
  >
    <mat-toolbar class="side-head">Gestión</mat-toolbar>
    <mat-nav-list>
      @for (enlace of enlaces; track enlace.path) {
        <a
          mat-list-item
          [routerLink]="enlace.path"
          routerLinkActive="activo"
          (click)="cerrarSiMovil()"
        >
          <mat-icon matListItemIcon>{{ enlace.icon }}</mat-icon>
          <span matListItemTitle>{{ enlace.label }}</span>
        </a>
      }
    </mat-nav-list>
  </mat-sidenav>

  <mat-sidenav-content>
    <mat-toolbar class="top">
      <button
        matIconButton
        type="button"
        aria-label="Alternar menú"
        (click)="alternarMenu()"
      >
        <mat-icon>menu</mat-icon>
      </button>
      <span class="title">Panel de gestión</span>
    </mat-toolbar>

    <main class="content">
      <router-outlet />
    </main>
  </mat-sidenav-content>
</mat-sidenav-container>`,
      },
      {
        filename: 'layout.scss',
        language: 'scss',
        code: `.shell {
  height: 100dvh;
}

.side {
  width: 260px;
  border-right: 1px solid var(--mat-sys-outline-variant);
}

.side-head {
  font-weight: 600;
  background: var(--mat-sys-surface-container-low);
}

.top {
  position: sticky;
  top: 0;
  z-index: 10;
  gap: 8px;
  border-bottom: 1px solid var(--mat-sys-outline-variant);
}

.title {
  font-size: 1rem;
  font-weight: 600;
}

.content {
  padding: 24px;
}

/* routerLinkActive aplica esta clase */
::ng-deep .activo {
  background: color-mix(in srgb, var(--mat-sys-primary) 12%, transparent) !important;
  color: var(--mat-sys-primary) !important;
}`,
      },
    ],
    comprobar: [
      'La toolbar y el sidenav están dentro del container correcto.',
      'En escritorio el menú queda fijo; en móvil se superpone y se cierra al navegar.',
      'El enlace activo cambia de aspecto con routerLinkActive.',
      'No hay scroll duplicado: solo el área de contenido hace scroll.',
    ],
  },
  {
    id: 'dialog-snackbar',
    numero: 5,
    titulo: 'Confirmar borrado con dialog y feedback con snackbar',
    resumen:
      'Abre un diálogo de confirmación con datos, escucha su resultado y muestra avisos con MatSnackBar.',
    dificultad: 'Medio',
    minutos: 20,
    puntos: 15,
    icon: 'open_in_new',
    tags: ['MatDialog', 'MAT_DIALOG_DATA', 'MatSnackBar', 'afterClosed'],
    contexto:
      'En un listado de alumnos, el botón "Eliminar" debe pedir confirmación antes de borrar. Tras la acción se avisa al usuario del resultado con un mensaje emergente.',
    requisitos: [
      'Crea un componente de diálogo `ConfirmarBorrado` que reciba el nombre del alumno.',
      'Los datos llegan al diálogo mediante `MAT_DIALOG_DATA`, no por inputs.',
      'El diálogo tiene dos acciones: "Cancelar" (devuelve `false`) y "Eliminar" (devuelve `true`).',
      'El componente de listado inyecta `MatDialog` y `MatSnackBar`.',
      'Al pulsar eliminar se abre el diálogo y, según el resultado, se borra el alumno o no.',
      'Tras confirmar, se muestra un snackbar con la opción "Deshacer" que restaura el alumno.',
    ],
    pistas: [
      '`dialogRef.afterClosed()` es un observable: puedes usar `takeUntilDestroyed()` para no dejarlo abierto.',
      'En la plantilla del diálogo, `[mat-dialog-close]="true"` cierra devolviendo ese valor.',
      '`MatSnackBar.open(...)` devuelve una referencia con `onAction()`.',
      'Declara el diálogo en `entryComponents` NO es necesario en Angular moderno: basta con importarlo en el componente que lo abre.',
    ],
    criterios: [
      { criterio: 'Diálogo standalone con MAT_DIALOG_DATA', puntos: 3 },
      { criterio: 'Botones con mat-dialog-close devolviendo true/false', puntos: 3 },
      { criterio: 'Uso de afterClosed para decidir el borrado', puntos: 3 },
      { criterio: 'Snackbar con acción "Deshacer" funcional', puntos: 4 },
      { criterio: 'Suscripción cerrada con takeUntilDestroyed', puntos: 2 },
    ],
    solucion: [
      {
        filename: 'confirmar-borrado.ts',
        language: 'ts',
        code: `import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

export interface DatosConfirmacion {
  nombre: string;
}

@Component({
  selector: 'app-confirmar-borrado',
  imports: [MatDialogModule, MatButtonModule],
  template: \`
    <h2 mat-dialog-title>Eliminar alumno</h2>
    <mat-dialog-content>
      ¿Seguro que quieres eliminar a <strong>{{ datos.nombre }}</strong>?
      Esta acción se puede deshacer.
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button matButton [mat-dialog-close]="false">Cancelar</button>
      <button matButton="filled" [mat-dialog-close]="true">Eliminar</button>
    </mat-dialog-actions>
  \`,
})
export class ConfirmarBorrado {
  readonly datos = inject<DatosConfirmacion>(MAT_DIALOG_DATA);
}`,
      },
      {
        filename: 'listado-alumnos.ts',
        language: 'ts',
        code: `import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarBorrado, DatosConfirmacion } from './confirmar-borrado';

@Component({
  selector: 'app-listado-alumnos',
  imports: [MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './listado-alumnos.html',
})
export class ListadoAlumnos {
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  readonly alumnos = signal([
    { id: 1, nombre: 'Ana Torres' },
    { id: 2, nombre: 'Luis Ramos' },
  ]);

  eliminar(id: number): void {
    const alumno = this.alumnos().find((a) => a.id === id);
    if (!alumno) return;

    const datos: DatosConfirmacion = { nombre: alumno.nombre };

    this.dialog
      .open(ConfirmarBorrado, { width: '420px', data: datos })
      .afterClosed()
      .pipe(takeUntilDestroyed())
      .subscribe((confirmado: boolean | undefined) => {
        if (confirmado) {
          this.borrar(id, alumno.nombre);
        }
      });
  }

  private borrar(id: number, nombre: string): void {
    const anterior = this.alumnos();
    this.alumnos.set(anterior.filter((a) => a.id !== id));

    const ref = this.snackBar.open(\`\${nombre} eliminado\`, 'Deshacer', { duration: 5000 });

    ref.onAction().subscribe(() => this.alumnos.set(anterior));
  }
}`,
      },
      {
        filename: 'listado-alumnos.html',
        language: 'html',
        code: `<mat-list>
  @for (alumno of alumnos(); track alumno.id) {
    <mat-list-item>
      <mat-icon matListItemIcon>person</mat-icon>
      <span matListItemTitle>{{ alumno.nombre }}</span>
      <button
        matIconButton
        matListItemMeta
        type="button"
        aria-label="Eliminar alumno"
        (click)="eliminar(alumno.id)"
      >
        <mat-icon>delete</mat-icon>
      </button>
    </mat-list-item>
  } @empty {
    <mat-list-item>No quedan alumnos.</mat-list-item>
  }
</mat-list>`,
      },
    ],
    comprobar: [
      'Cancelar no elimina el alumno; Eliminar sí.',
      'El nombre se recibe en el diálogo por MAT_DIALOG_DATA.',
      '"Deshacer" restaura exactamente la lista anterior.',
      'No queda ninguna suscripción viva al destruir el componente.',
    ],
  },
  {
    id: 'tabla-datos',
    numero: 6,
    titulo: 'Tabla de datos con sort, paginación y filtro',
    resumen:
      'Reproduce el patrón de examen más habitual: mat-table con MatTableDataSource, matSort, mat-paginator y un filtro por texto.',
    dificultad: 'Avanzado',
    minutos: 35,
    puntos: 25,
    icon: 'table_chart',
    tags: ['mat-table', 'MatTableDataSource', 'matSort', 'mat-paginator', 'matTooltip', 'loading'],
    contexto:
      'Se necesita listar los alumnos con sus notas. La tabla debe poder ordenarse por cualquier columna, paginar los resultados y filtrarse escribiendo un nombre. Mientras se "cargan" los datos, se muestra un estado de carga.',
    requisitos: [
      'Crea el componente `TablaAlumnos` con `mat-table` y al menos cuatro columnas: nombre, curso, nota y acciones.',
      'Usa `MatTableDataSource` en lugar de un array plano.',
      'Vincula `matSort` a la tabla y añade `mat-sort-header` en las columnas ordenables.',
      'Añade un `mat-paginator` con paginación conectada a la misma fuente de datos.',
      'Incluye un campo de búsqueda con `mat-form-field` + `matInput` que aplique el filtro (`dataSource.filter`).',
      'Muestra una `mat-progress-bar` o un `mat-spinner` mientras el signal `cargando` sea verdadero.',
      'Cada fila tiene una acción de icono con tooltip y `aria-label` para ver el detalle.',
      'La columna de nota debe mostrar la fecha con el pipe `date` y la nota con `number`.',
    ],
    pistas: [
      'Hay que asignar `dataSource.sort = this.sort()` y `dataSource.paginator = this.paginator()` después de que existan las vistas.',
      'Usa `viewChild(MatSort)` y `viewChild(MatPaginator)` y asígnalos en un `effect()` o en `afterNextRender()`.',
      'El filtro se aplica sin pasar a minúsculas manualmente si sobrescribes `filterPredicate`.',
      '`MatTableDataSource` ya implementa el filtrado, la ordenación y la paginación: no hay que reimplementarlos.',
    ],
    criterios: [
      { criterio: 'Estructura de mat-table con matColumnDef y mat-header-cell/mat-cell', puntos: 5 },
      { criterio: 'MatTableDataSource conectada a sort y paginator', puntos: 5 },
      { criterio: 'Filtro funcional sobre nombre', puntos: 4 },
      { criterio: 'Estado de carga visible mientras cargando() es true', puntos: 3 },
      { criterio: 'Acciones de fila accesibles (aria-label + tooltip)', puntos: 3 },
      { criterio: 'Pipes date y number aplicados correctamente', puntos: 3 },
      { criterio: 'trackBy en las filas', puntos: 2 },
    ],
    solucion: [
      {
        filename: 'tabla-alumnos.ts',
        language: 'ts',
        code: `import { afterNextRender, Component, effect, inject, signal, viewChild } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface Alumno {
  id: number;
  nombre: string;
  curso: string;
  nota: number;
  alta: Date;
}

@Component({
  selector: 'app-tabla-alumnos',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    DatePipe,
    DecimalPipe,
  ],
  templateUrl: './tabla-alumnos.html',
  styleUrl: './tabla-alumnos.scss',
})
export class TablaAlumnos {
  readonly columnas = ['nombre', 'curso', 'nota', 'alta', 'acciones'];

  readonly cargando = signal(true);
  readonly filtro = signal('');

  readonly dataSource = new MatTableDataSource<Alumno>([]);

  private readonly sort = viewChild(MatSort);
  private readonly paginator = viewChild(MatPaginator);

  constructor() {
    // Conectar sort/paginator cuando las vistas existen
    effect(() => {
      const sort = this.sort();
      const paginator = this.paginator();
      if (sort) this.dataSource.sort = sort;
      if (paginator) this.dataSource.paginator = paginator;
    });

    // Filtro insensible a mayúsculas y acentos
    this.dataSource.filterPredicate = (alumno, filtro) =>
      normalizar(alumno.nombre).includes(filtro) ||
      normalizar(alumno.curso).includes(filtro);

    afterNextRender(() => this.cargar());
  }

  aplicarFiltro(valor: string): void {
    this.filtro.set(valor);
    this.dataSource.filter = normalizar(valor);
  }

  private cargar(): void {
    this.cargando.set(true);
    // Simulación de petición HTTP
    setTimeout(() => {
      this.dataSource.data = ALUMNOS;
      this.dataSource.paginator?.firstPage();
      this.cargando.set(false);
    }, 900);
  }

  verDetalle(alumno: Alumno): void {
    console.log('Detalle de', alumno.nombre);
  }
}

function normalizar(valor: string): string {
  return valor.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').trim();
}

const ALUMNOS: Alumno[] = [
  { id: 1, nombre: 'Ana Torres', curso: 'Angular moderno', nota: 9.2, alta: new Date('2024-09-01') },
  { id: 2, nombre: 'Luis Ramos', curso: 'Angular Material', nota: 7.8, alta: new Date('2024-09-03') },
  { id: 3, nombre: 'Marta Silva', curso: 'Testing', nota: 8.6, alta: new Date('2024-09-05') },
];`,
      },
      {
        filename: 'tabla-alumnos.html',
        language: 'html',
        code: `<section class="tabla-wrap">
  <header class="tabla-head">
    <mat-form-field appearance="outline" subscriptSizing="dynamic">
      <mat-label>Buscar alumno</mat-label>
      <mat-icon matPrefix>search</mat-icon>
      <input matInput [value]="filtro()" (input)="aplicarFiltro($any($event.target).value)" />
    </mat-form-field>
  </header>

  @if (cargando()) {
    <mat-progress-bar mode="indeterminate" aria-label="Cargando alumnos" />
  }

  <div class="tabla-scroll">
    <table mat-table [dataSource]="dataSource" matSort>
      <!-- Nombre -->
      <ng-container matColumnDef="nombre">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Alumno</th>
        <td mat-cell *matCellDef="let alumno">{{ alumno.nombre }}</td>
      </ng-container>

      <!-- Curso -->
      <ng-container matColumnDef="curso">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Curso</th>
        <td mat-cell *matCellDef="let alumno">{{ alumno.curso }}</td>
      </ng-container>

      <!-- Nota -->
      <ng-container matColumnDef="nota">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Nota</th>
        <td mat-cell *matCellDef="let alumno">{{ alumno.nota | number: '1.1-2' }}</td>
      </ng-container>

      <!-- Alta -->
      <ng-container matColumnDef="alta">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Alta</th>
        <td mat-cell *matCellDef="let alumno">{{ alumno.alta | date: 'dd/MM/yyyy' }}</td>
      </ng-container>

      <!-- Acciones -->
      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef class="col-acciones">Acciones</th>
        <td mat-cell *matCellDef="let alumno" class="col-acciones">
          <button
            matIconButton
            type="button"
            aria-label="Ver detalle"
            matTooltip="Ver detalle"
            (click)="verDetalle(alumno)"
          >
            <mat-icon>visibility</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columnas"></tr>
      <tr mat-row *matRowDef="let fila; columns: columnas"></tr>
      <tr class="sin-datos" *matNoDataRow>
        <td [attr.colspan]="columnas.length">No hay alumnos que coincidan con el filtro.</td>
      </tr>
    </table>
  </div>

  <mat-paginator
    [pageSizeOptions]="[5, 10, 25]"
    [pageSize]="5"
    showFirstLastButtons
    aria-label="Seleccionar página"
  />
</section>`,
      },
    ],
    comprobar: [
      'Ordenar por cualquier columna ordenable reordena la tabla completa.',
      'El paginador cambia de página y de tamaño de página correctamente.',
      'El filtro ignora mayúsculas y acentos.',
      'La barra de progreso solo aparece durante la carga simulada.',
      'La tabla muestra un mensaje cuando el filtro no devuelve filas.',
    ],
  },
  {
    id: 'tabs-stepper',
    numero: 7,
    titulo: 'Asistente de matrícula con tabs y stepper',
    resumen:
      'Organiza un flujo de varios pasos con mat-stepper lineal y usa mat-tab-group para separar vistas de un mismo recurso.',
    dificultad: 'Medio',
    minutos: 25,
    puntos: 18,
    icon: 'linear_scale',
    tags: ['mat-stepper', 'mat-tab-group', 'mat-radio-group', 'mat-tab-nav-bar'],
    contexto:
      'La matrícula tiene tres pasos: datos del alumno, elección de curso y confirmación. Además, la ficha del curso debe mostrar pestañas: descripción, temario y profesorado.',
    requisitos: [
      'Crea `AsistenteMatricula` con un `mat-stepper` lineal de tres pasos.',
      'Cada paso tiene su propio `mat-form-field` o control Material.',
      'No se puede avanzar al siguiente paso sin completar el formulario del paso actual (stepper lineal + validación).',
      'Los botones "Atrás" y "Continuar" usan `matStepperPrevious` / `matStepperNext`.',
      'Usa `completed` en `mat-step` para marcar pasos ya resueltos.',
      'En la ficha del curso, usa `mat-tab-group` con tres pestañas y `<ng-template matTabContent>` para diferir el contenido.',
      'Al finalizar el asistente, muestra la matrícula resumida con `mat-card` y un snackbar de confirmación.',
    ],
    pistas: [
      'Con `[linear]="true"`, el stepper obliga a completar cada step; puedes forzar la validación con `[stepControl]`.',
      '`stepControl` recibe un `AbstractControl`: el `FormGroup` del paso.',
      'Para diferencias el contenido de las pestañas solo cuando se abren, usa `ng-template matTabContent`.',
      'La orientación del stepper es configurable: `orientation="horizontal"` o `"vertical"`.',
    ],
    criterios: [
      { criterio: 'Stepper lineal con tres pasos bien definidos', puntos: 4 },
      { criterio: 'Validación por paso con stepControl', puntos: 5 },
      { criterio: 'Botones matStepperPrevious/matStepperNext', puntos: 3 },
      { criterio: 'mat-tab-group con contenido diferido', puntos: 3 },
      { criterio: 'Resumen final y snackbar', puntos: 3 },
    ],
    solucion: [
      {
        filename: 'asistente-matricula.ts',
        language: 'ts',
        code: `import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-asistente-matricula',
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './asistente-matricula.html',
  styleUrl: './asistente-matricula.scss',
})
export class AsistenteMatricula {
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);

  readonly cursos = ['Angular moderno', 'Angular Material', 'Testing'];

  readonly pasoDatos = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  });

  readonly pasoCurso = this.fb.nonNullable.group({
    curso: ['', Validators.required],
    modalidad: ['Presencial', Validators.required],
  });

  get resumen() {
    return { ...this.pasoDatos.getRawValue(), ...this.pasoCurso.getRawValue() };
  }

  finalizar(): void {
    if (this.pasoDatos.invalid || this.pasoCurso.invalid) return;

    this.snackBar.open('Matrícula registrada correctamente', 'Cerrar', { duration: 4000 });
  }
}`,
      },
      {
        filename: 'asistente-matricula.html',
        language: 'html',
        code: `<mat-stepper [linear]="true" orientation="horizontal" class="asistente">
  <!-- Paso 1 -->
  <mat-step [stepControl]="pasoDatos" label="Datos del alumno">
    <form [formGroup]="pasoDatos" class="paso">
      <mat-form-field appearance="outline">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="nombre" />
        @if (pasoDatos.controls.nombre.hasError('required')) {
          <mat-error>Obligatorio</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input matInput type="email" formControlName="email" />
        @if (pasoDatos.controls.email.hasError('email')) {
          <mat-error>Formato no válido</mat-error>
        }
      </mat-form-field>
    </form>

    <div class="acciones">
      <button matButton="filled" matStepperNext [disabled]="pasoDatos.invalid">Continuar</button>
    </div>
  </mat-step>

  <!-- Paso 2 -->
  <mat-step [stepControl]="pasoCurso" label="Curso">
    <form [formGroup]="pasoCurso" class="paso">
      <mat-form-field appearance="outline">
        <mat-label>Curso</mat-label>
        <mat-select formControlName="curso">
          @for (curso of cursos; track curso) {
            <mat-option [value]="curso">{{ curso }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-radio-group formControlName="modalidad" class="modalidad">
        <mat-radio-button value="Presencial">Presencial</mat-radio-button>
        <mat-radio-button value="Online">Online</mat-radio-button>
      </mat-radio-group>
    </form>

    <div class="acciones">
      <button matButton matStepperPrevious>Atrás</button>
      <button matButton="filled" matStepperNext [disabled]="pasoCurso.invalid">Continuar</button>
    </div>
  </mat-step>

  <!-- Paso 3 -->
  <mat-step label="Confirmar" [completed]="false">
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>Resumen de matrícula</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p><strong>Alumno:</strong> {{ resumen.nombre }}</p>
        <p><strong>Email:</strong> {{ resumen.email }}</p>
        <p><strong>Curso:</strong> {{ resumen.curso }}</p>
        <p><strong>Modalidad:</strong> {{ resumen.modalidad }}</p>
      </mat-card-content>
    </mat-card>

    <div class="acciones">
      <button matButton matStepperPrevious>Atrás</button>
      <button matButton="filled" type="button" (click)="finalizar()">Confirmar matrícula</button>
    </div>
  </mat-step>
</mat-stepper>

<!-- Pestañas de la ficha del curso -->
<mat-tab-group class="ficha" animationDuration="200ms">
  <mat-tab label="Descripción">
    <ng-template matTabContent>
      <p>Descripción del curso cargada al abrir la pestaña.</p>
    </ng-template>
  </mat-tab>
  <mat-tab label="Temario">
    <ng-template matTabContent>
      <ol>
        <li>Fundamentos</li>
        <li>Componentes y signals</li>
        <li>Angular Material</li>
      </ol>
    </ng-template>
  </mat-tab>
  <mat-tab label="Profesorado">
    <ng-template matTabContent>
      <p>Equipo docente del curso.</p>
    </ng-template>
  </mat-tab>
</mat-tab-group>`,
      },
    ],
    comprobar: [
      'No se puede pasar al paso 2 con el formulario del paso 1 vacío.',
      'Los botones Atrás/Continuar funcionan en todos los pasos.',
      'El contenido de las pestañas solo se crea al abrirlas.',
      'El resumen final muestra los datos de los dos formularios.',
    ],
  },
  {
    id: 'menu-tooltip-badge',
    numero: 8,
    titulo: 'Cabecera con menú, avisos y tooltips',
    resumen:
      'Implementa una toolbar de aplicación con menú de usuario, badge de notificaciones, tooltips y un panel de novedades.',
    dificultad: 'Básico',
    minutos: 18,
    puntos: 12,
    icon: 'notifications',
    tags: ['mat-menu', 'matBadge', 'matTooltip', 'mat-toolbar', 'mat-icon-button'],
    contexto:
      'La barra superior de la aplicación debe tener: logo, título, botón de notificaciones con contador, menú de usuario con avatar y opciones, y tooltips en todos los iconos.',
    requisitos: [
      'Crea el componente `CabeceraApp` con `mat-toolbar`.',
      'Añade un botón de notificaciones con `matBadge` que muestre el número de avisos sin leer.',
      'El badge debe ocultarse cuando el contador sea 0 (`matBadgeHidden`).',
      'El menú de usuario se abre con `matMenuTriggerFor` y contiene al menos tres opciones, una de ellas deshabilitada.',
      'Cada opción del menú lleva un icono (`mat-icon`) y un texto.',
      'Todos los botones de icono deben tener `matTooltip` y `aria-label`.',
      'El botón de notificaciones, al pulsarlo, marca todos los avisos como leídos.',
    ],
    pistas: [
      '`mat-menu-item` es una directiva de atributo sobre `<button>`.',
      '`matBadgePosition="above after"` y `matBadgeColor` personalizan el badge.',
      'Los elementos con `aria-label` sin texto visible son los que más se penalizan en accesibilidad.',
      'Para deshabilitar una opción del menú, usa `disabled` en el `button`.',
    ],
    criterios: [
      { criterio: 'Toolbar con estructura correcta', puntos: 2 },
      { criterio: 'Badge conectado al contador y oculto en 0', puntos: 3 },
      { criterio: 'Menú con opciones, iconos y una deshabilitada', puntos: 3 },
      { criterio: 'Tooltips y aria-label en botones de icono', puntos: 2 },
      { criterio: 'Contador se resetea al abrir notificaciones', puntos: 2 },
    ],
    solucion: [
      {
        filename: 'cabecera-app.ts',
        language: 'ts',
        code: `import { Component, computed, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-cabecera-app',
  imports: [MatToolbarModule, MatBadgeModule, MatButtonModule, MatMenuModule, MatIconModule, MatTooltipModule],
  templateUrl: './cabecera-app.html',
  styleUrl: './cabecera-app.scss',
})
export class CabeceraApp {
  readonly avisos = signal(3);
  readonly hayAvisos = computed(() => this.avisos() > 0);

  marcarLeidos(): void {
    this.avisos.set(0);
  }

  cerrarSesion(): void {
    console.log('Sesión cerrada');
  }
}`,
      },
      {
        filename: 'cabecera-app.html',
        language: 'html',
        code: `<mat-toolbar class="barra">
  <mat-icon>school</mat-icon>
  <span class="titulo">Academia Angular</span>

  <span class="spacer"></span>

  <button
    matIconButton
    type="button"
    aria-label="Notificaciones"
    matTooltip="Notificaciones"
    [matBadge]="avisos()"
    [matBadgeHidden]="!hayAvisos()"
    matBadgeColor="accent"
    matBadgePosition="above after"
    (click)="marcarLeidos()"
  >
    <mat-icon>notifications</mat-icon>
  </button>

  <button
    matIconButton
    type="button"
    aria-label="Menú de usuario"
    matTooltip="Cuenta"
    [matMenuTriggerFor]="menuUsuario"
  >
    <mat-icon>account_circle</mat-icon>
  </button>

  <mat-menu #menuUsuario="matMenu">
    <button mat-menu-item type="button">
      <mat-icon>person</mat-icon>
      <span>Mi perfil</span>
    </button>
    <button mat-menu-item type="button">
      <mat-icon>settings</mat-icon>
      <span>Ajustes</span>
    </button>
    <button mat-menu-item type="button" disabled>
      <mat-icon>workspace_premium</mat-icon>
      <span>Plan premium</span>
    </button>
    <button mat-menu-item type="button" (click)="cerrarSesion()">
      <mat-icon>logout</mat-icon>
      <span>Cerrar sesión</span>
    </button>
  </mat-menu>
</mat-toolbar>`,
      },
    ],
    comprobar: [
      'El badge desaparece después de pulsar el botón de notificaciones.',
      'El menú se abre y se cierra con teclado (Enter/Esc).',
      'La opción "Plan premium" aparece deshabilitada.',
      'Todos los botones de icono tienen tooltip y aria-label.',
    ],
  },
  {
    id: 'material-en-formulario',
    numero: 9,
    titulo: 'Encuesta con radio, slider, toggle y chips',
    resumen:
      'Practica todos los controles de selección de Material en un mismo formulario y lee su valor en vivo.',
    dificultad: 'Medio',
    minutos: 22,
    puntos: 15,
    icon: 'tune',
    tags: ['mat-radio-group', 'mat-slider', 'mat-slide-toggle', 'mat-checkbox', 'mat-chip'],
    contexto:
      'El equipo de calidad quiere una encuesta rápida de satisfacción del curso: valoración general, nota del 0 al 10, si se recomendaría y qué temas interesan más.',
    requisitos: [
      'Crea `EncuestaCurso` con un formulario reactivo que contenga cuatro controles.',
      'Valoración general con `mat-radio-group` y `mat-radio-button` (Mala / Regular / Buena / Excelente).',
      'Nota del 0 al 10 con `mat-slider` (con `discrete`, `showTickMarks` y `matSliderThumb`).',
      'Recomendación con `mat-slide-toggle`.',
      'Temas de interés con `mat-chip-set` y `mat-chip` seleccionables (`mat-chip-option`).',
      'Muestra en vivo, debajo del formulario, el valor de cada control.',
      'El botón "Enviar" se habilita solo cuando haya al menos un tema marcado.',
    ],
    pistas: [
      '`mat-chip-listbox` + `mat-chip-option` permite selección simple; `mat-chip-grid` con `MatChipInput` es para chips libres.',
      '`matSliderThumb` es una directiva: el `<input matSliderThumb>` es el que lleva el `formControlName`.',
      'Recuerda importar `MatSliderModule` y `MatChipsModule`, además de `ReactiveFormsModule`.',
      'Puedes derivar el estado del botón con un `computed()` o con un validador personalizado.',
    ],
    criterios: [
      { criterio: 'Cuatro controles Material distintos y funcionando', puntos: 5 },
      { criterio: 'Uso correcto de matSliderThumb y opciones del slider', puntos: 3 },
      { criterio: 'Chips de selección múltiple', puntos: 3 },
      { criterio: 'Valor en vivo visible en la plantilla', puntos: 2 },
      { criterio: 'Botón habilitado solo con al menos un tema', puntos: 2 },
    ],
    solucion: [
      {
        filename: 'encuesta-curso.ts',
        language: 'ts',
        code: `import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const TEMAS = ['Signals', 'Routing', 'Formularios', 'Material', 'Testing'];

@Component({
  selector: 'app-encuesta-curso',
  imports: [
    ReactiveFormsModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatButtonModule,
  ],
  templateUrl: './encuesta-curso.html',
})
export class EncuestaCurso {
  private readonly fb = inject(FormBuilder);

  readonly temas = TEMAS;

  readonly formulario = this.fb.nonNullable.group({
    valoracion: ['Buena', Validators.required],
    nota: [7, [Validators.min(0), Validators.max(10)]],
    recomienda: [true],
    temas: [[] as string[]],
  });

  readonly temasSeleccionados = computed(() => this.formulario.controls.temas.value.length > 0);

  enviar(): void {
    console.log('Encuesta enviada', this.formulario.getRawValue());
  }
}`,
      },
      {
        filename: 'encuesta-curso.html',
        language: 'html',
        code: `<form class="encuesta" [formGroup]="formulario" (ngSubmit)="enviar()">
  <p class="pregunta">¿Cómo valoras el curso?</p>
  <mat-radio-group formControlName="valoracion" class="radios">
    @for (opcion of ['Mala', 'Regular', 'Buena', 'Excelente']; track opcion) {
      <mat-radio-button [value]="opcion">{{ opcion }}</mat-radio-button>
    }
  </mat-radio-group>

  <p class="pregunta">Nota del 0 al 10</p>
  <mat-slider min="0" max="10" step="1" discrete showTickMarks>
    <input matSliderThumb formControlName="nota" />
  </mat-slider>

  <mat-slide-toggle formControlName="recomienda">
    ¿Recomendarías el curso a un compañero?
  </mat-slide-toggle>

  <p class="pregunta">Temas que más te interesan</p>
  <mat-chip-listbox formControlName="temas" multiple>
    @for (tema of temas; track tema) {
      <mat-chip-option [value]="tema">{{ tema }}</mat-chip-option>
    }
  </mat-chip-listbox>

  <!-- Valor en vivo -->
  <pre class="vivo">{{ formulario.getRawValue() | json }}</pre>

  <button matButton="filled" type="submit" [disabled]="!temasSeleccionados()">
    Enviar encuesta
  </button>
</form>`,
      },
    ],
    comprobar: [
      'El JSON inferior cambia al mover cada control.',
      'El slider es arrastrable y muestra su valor con las marcas.',
      'Se pueden marcar varios temas a la vez.',
      'El botón está deshabilitado hasta marcar el primer tema.',
    ],
  },
  {
    id: 'expansion-progress',
    numero: 10,
    titulo: 'Temario plegable con estados de carga',
    resumen:
      'Usa mat-expansion-panel para un temario por módulos y combina spinner, barra de progreso y chips de estado.',
    dificultad: 'Básico',
    minutos: 15,
    puntos: 10,
    icon: 'expand_more',
    tags: ['mat-expansion-panel', 'mat-accordion', 'mat-progress-spinner', 'mat-divider'],
    contexto:
      'La página de un curso debe mostrar los módulos plegables. Cada módulo indica su estado: pendiente, en curso o completado, y se muestra un progreso general de la carga.',
    requisitos: [
      'Crea `TemarioCurso` con un `mat-accordion` que contenga al menos cuatro `mat-expansion-panel`.',
      'Cada panel tiene `mat-panel-title` y `mat-panel-description`.',
      'El panel del módulo que está en curso se abre por defecto (`[expanded]`).',
      'La descripción del panel muestra el estado con un `mat-chip` de color coherente.',
      'Encima del acordeón, una `mat-progress-bar` indica el porcentaje de módulos completados.',
      'Mientras se "cargan" los módulos, se muestra un `mat-spinner` centrado y un mensaje.',
      'Separa los paneles con `mat-divider` donde aporte claridad.',
    ],
    pistas: [
      '`mat-accordion` permite `multi` para abrir varios paneles a la vez.',
      '`[expanded]` en `mat-expansion-panel` controla su apertura inicial.',
      'Puedes calcular el porcentaje con un `computed()`: completados / total * 100.',
      '`MatProgressSpinnerModule` y `MatProgressBarModule` son módulos distintos.',
    ],
    criterios: [
      { criterio: 'Accordion con cuatro paneles bien estructurados', puntos: 3 },
      { criterio: 'Uso de mat-panel-title / mat-panel-description', puntos: 2 },
      { criterio: 'Estado por módulo con chips', puntos: 2 },
      { criterio: 'Barra de progreso calculada con computed()', puntos: 2 },
      { criterio: 'Spinner visible durante la carga', puntos: 1 },
    ],
    solucion: [
      {
        filename: 'temario-curso.ts',
        language: 'ts',
        code: `import { Component, computed, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

type EstadoModulo = 'pendiente' | 'en curso' | 'completado';

interface Modulo {
  id: number;
  titulo: string;
  duracion: string;
  estado: EstadoModulo;
}

@Component({
  selector: 'app-temario-curso',
  imports: [
    MatExpansionModule,
    MatChipsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  templateUrl: './temario-curso.html',
  styleUrl: './temario-curso.scss',
})
export class TemarioCurso {
  readonly cargando = signal(true);

  readonly modulos = signal<Modulo[]>([
    { id: 1, titulo: 'Fundamentos de Angular', duracion: '4 h', estado: 'completado' },
    { id: 2, titulo: 'Componentes y signals', duracion: '6 h', estado: 'completado' },
    { id: 3, titulo: 'Angular Material', duracion: '8 h', estado: 'en curso' },
    { id: 4, titulo: 'Testing', duracion: '3 h', estado: 'pendiente' },
  ]);

  readonly progreso = computed(() => {
    const lista = this.modulos();
    const hechos = lista.filter((m) => m.estado === 'completado').length;
    return Math.round((hechos / lista.length) * 100);
  });

  constructor() {
    setTimeout(() => this.cargando.set(false), 800);
  }
}`,
      },
      {
        filename: 'temario-curso.html',
        language: 'html',
        code: `@if (cargando()) {
  <div class="cargando">
    <mat-spinner diameter="40" />
    <p>Cargando temario…</p>
  </div>
} @else {
  <div class="barra">
    <span>Progreso del curso</span>
    <strong>{{ progreso() }} %</strong>
    <mat-progress-bar mode="determinate" [value]="progreso()" />
  </div>

  <mat-accordion multi class="temario">
    @for (modulo of modulos(); track modulo.id) {
      <mat-expansion-panel [expanded]="modulo.estado === 'en curso'">
        <mat-expansion-panel-header>
          <mat-panel-title>{{ modulo.titulo }}</mat-panel-title>
          <mat-panel-description>
            {{ modulo.duracion }}
            <mat-chip [highlighted]="modulo.estado === 'en curso'">
              {{ modulo.estado }}
            </mat-chip>
          </mat-panel-description>
        </mat-expansion-panel-header>

        <p>Contenido del módulo {{ modulo.id }}.</p>
      </mat-expansion-panel>
      <mat-divider />
    }
  </mat-accordion>
}`,
      },
    ],
    comprobar: [
      'El spinner se muestra durante los primeros milisegundos de carga.',
      'El panel "Angular Material" aparece abierto al cargar.',
      'El porcentaje coincide con los módulos completados (2 de 4 → 50 %).',
      'Se pueden abrir varios paneles a la vez (multi).',
    ],
  },
];

/** Simulacro completo para practicar de principio a fin. */
export const SIMULACRO: Simulacro = {
  titulo: 'Simulacro: gestor de biblioteca',
  duracion: '90 minutos',
  puntos: 40,
  contexto:
    'Construye una aplicación Angular standalone llamada `biblioteca` con Angular Material. Gestiona un listado de libros con datos de ejemplo: título, autor, año, género y disponibilidad.',
  requisitos: [
    'Crea el proyecto con `ng new biblioteca --style=scss --routing` y añade Angular Material con `ng add @angular/material`.',
    'Configura el tema con `mat.theme` (paleta a tu elección) y comprueba el modo claro/oscuro con `color-scheme`.',
    'Crea un layout con `mat-toolbar` + `mat-sidenav` y dos rutas lazy: `/libros` y `/nuevo`.',
    'En `/libros`, muestra los libros en una `mat-table` con `MatTableDataSource`, `matSort`, `mat-paginator` y filtro por título o autor.',
    'Cada fila tiene una acción de icono (con tooltip y aria-label) que abre un `MatDialog` de detalle con los datos del libro.',
    'En `/nuevo`, crea un formulario reactivo con `mat-form-field` para título, autor, año y género; año numérico entre 1900 y el año actual, resto obligatorios.',
    'El formulario, si es válido, añade el libro al servicio compartido y vuelve a `/libros` mostrando un `MatSnackBar`.',
    'El servicio de libros debe estar en `providedIn: "root"` y guardar los datos en un signal.',
    'Usa `@if` / `@for` (nada de `*ngIf` / `*ngFor`) y `track` por id en todas las listas.',
    'Toda la interfaz debe verse correctamente en móvil y usar únicamente componentes de Material para los controles.',
  ],
  entregable: [
    'Repositorio o ZIP con el proyecto completo compilando (`ng build`).',
    'Un `README.md` breve con las rutas implementadas y las decisiones tomadas.',
    'Captura o GIF de la tabla funcionando con filtro y ordenación.',
  ],
  rubrica: [
    { criterio: 'Proyecto compila y arranca sin errores de plantilla', puntos: 6 },
    { criterio: 'Layout con toolbar y sidenav responsive', puntos: 4 },
    { criterio: 'Tabla con datasource, sort, paginator y filtro', puntos: 8 },
    { criterio: 'Formulario reactivo con validadores y form fields', puntos: 8 },
    { criterio: 'Diálogo de detalle y snackbar de confirmación', puntos: 5 },
    { criterio: 'Servicio con signals y ámbito root', puntos: 4 },
    { criterio: 'Uso exclusivo de control flow nuevo y track por id', puntos: 3 },
    { criterio: 'Accesibilidad: aria-label, tooltips y foco', puntos: 2 },
  ],
  consejos: [
    'Empieza por el layout y las rutas: si compila y navega, el resto se añade de forma incremental.',
    'Reutiliza el patrón de tabla del ejercicio 6; cambia solo los datos y las columnas.',
    'Copia el diálogo del ejercicio 5 y adáptalo: MAT_DIALOG_DATA no cambia.',
    'Antes de entregar, ejecuta `ng build` y revisa que no haya warnings de presupuesto de estilos.',
    'Prueba la tabla con el filtro vacío y con datos que no coincidan para verificar el `*matNoDataRow`.',
  ],
  solucion: [
    {
      filename: 'app.routes.ts',
      language: 'ts',
      code: `import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'libros' },
  {
    path: 'libros',
    loadComponent: () => import('./libros/libros').then((m) => m.Libros),
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./nuevo/nuevo').then((m) => m.Nuevo),
  },
  { path: '**', redirectTo: 'libros' },
];`,
      },
    {
      filename: 'libro.service.ts',
      language: 'ts',
      code: `import { Injectable, computed, signal } from '@angular/core';

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  anio: number;
  genero: string;
  disponible: boolean;
}

@Injectable({ providedIn: 'root' })
export class LibroService {
  private readonly _libros = signal<Libro[]>([
    { id: 1, titulo: 'El nombre del viento', autor: 'Patrick Rothfuss', anio: 2007, genero: 'Fantasía', disponible: true },
    { id: 2, titulo: 'Sapiens', autor: 'Yuval Noah Harari', anio: 2011, genero: 'Ensayo', disponible: false },
  ]);

  readonly libros = this._libros.asReadonly();
  readonly total = computed(() => this._libros().length);

  agregar(libro: Omit<Libro, 'id' | 'disponible'>): void {
    this._libros.update((lista) => [
      ...lista,
      { ...libro, id: Date.now(), disponible: true },
    ]);
  }
}`,
    },
    {
      filename: 'nuevo.ts',
      language: 'ts',
      code: `import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LibroService } from '../libro.service';

@Component({
  selector: 'app-nuevo',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './nuevo.html',
})
export class Nuevo {
  private readonly fb = inject(FormBuilder);
  private readonly libros = inject(LibroService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  readonly generos = ['Fantasía', 'Ensayo', 'Novela', 'Ciencia ficción', 'Historia'];
  readonly anioActual = new Date().getFullYear();

  readonly formulario = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(2)]],
    autor: ['', Validators.required],
    anio: [this.anioActual, [Validators.required, Validators.min(1900), Validators.max(this.anioActual)]],
    genero: ['', Validators.required],
  });

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.libros.agregar(this.formulario.getRawValue());
    this.snackBar.open('Libro añadido a la biblioteca', 'Cerrar', { duration: 3000 });
    void this.router.navigate(['/libros']);
  }
}`,
    },
  ],
};
