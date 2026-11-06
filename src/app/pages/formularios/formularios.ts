import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CalloutComponent } from '../../shared/callout/callout';
import { ChapterNavComponent } from '../../shared/chapter-nav/chapter-nav';
import { CodeBlockComponent } from '../../shared/code-block/code-block';
import { SectionHeaderComponent } from '../../shared/section-header/section-header';

@Component({
  selector: 'app-formularios',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    CodeBlockComponent,
    CalloutComponent,
    ChapterNavComponent,
    SectionHeaderComponent,
  ],
  styleUrl: './formularios.scss',
  template: `
    <div class="adl-route">
      <app-section-header
        icon="edit_note"
        eyebrow="Aplicaciones completas · Capítulo 10"
        title="Formularios reactivos"
        description="Los formularios reactivos modelan el formulario como un objeto en el componente: cada control es un valor observable, validable y testeable sin tocar el DOM."
        level="intermedio"
        [minutes]="16"
      />

      <section aria-labelledby="que-son">
        <h2 id="que-son">¿Qué son los formularios reactivos?</h2>
        <p class="adl-text">
          Angular ofrece dos aproximaciones: <strong>template-driven</strong> (con
          <code class="adl-inline-code">ngModel</code>) y <strong>reactivos</strong>. Estos últimos
          se construyen en la clase con instancias de
          <code class="adl-inline-code">FormControl</code>,
          <code class="adl-inline-code">FormGroup</code> y
          <code class="adl-inline-code">FormArray</code>. La plantilla solo los conecta.
        </p>

        <div class="builders">
          <article>
            <code>FormControl</code>
            <p>Un único campo: valor, estado y validadores.</p>
            <span>new FormControl('')</span>
          </article>
          <article>
            <code>FormGroup</code>
            <p>Un objeto con varios controles agrupados bajo claves.</p>
            <span>new FormGroup(&#123; nombre, email &#125;)</span>
          </article>
          <article>
            <code>FormArray</code>
            <p>Una lista dinámica de controles del mismo tipo.</p>
            <span>new FormArray([...])</span>
          </article>
        </div>

        <app-code-block language="ts" filename="formulario.ts" [code]="importModule" />
      </section>

      <section aria-labelledby="demo">
        <h2 id="demo">Formulario real, con validación</h2>
        <p class="adl-text">
          Todo lo que ves aquí es un <code class="adl-inline-code">FormGroup</code> real con
          validadores: se valida al escribir, muestra los errores en el
          <code class="adl-inline-code">mat-form-field</code> y se deshabilita el envío si es
          inválido.
        </p>

        <div class="form-demo">
          <form [formGroup]="formulario" (ngSubmit)="enviar()" novalidate>
            <h3><mat-icon>person_add</mat-icon> Nuevo registro</h3>

            <mat-form-field appearance="outline" class="full">
              <mat-label>Nombre completo</mat-label>
              <input matInput formControlName="nombre" autocomplete="name" />
              @if (campo('nombre').hasError('required')) {
                <mat-error>El nombre es obligatorio</mat-error>
              } @else if (campo('nombre').hasError('minlength')) {
                <mat-error>Necesita al menos 3 caracteres</mat-error>
              }
              <mat-hint align="end">{{ nombreLongitud() }}/60</mat-hint>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full">
              <mat-label>Correo electrónico</mat-label>
              <input matInput type="email" formControlName="email" autocomplete="email" />
              @if (campo('email').hasError('required')) {
                <mat-error>El correo es obligatorio</mat-error>
              } @else if (campo('email').hasError('email')) {
                <mat-error>No parece un correo válido</mat-error>
              }
            </mat-form-field>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Rol</mat-label>
                <mat-select formControlName="rol">
                  @for (rol of roles; track rol) {
                    <mat-option [value]="rol">{{ rol }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Contraseña</mat-label>
                <input matInput type="password" formControlName="password" />
                @if (campo('password').hasError('minlength')) {
                  <mat-error>Mínimo 8 caracteres</mat-error>
                } @else if (campo('password').hasError('sinNumero')) {
                  <mat-error>Debe contener al menos un número</mat-error>
                }
              </mat-form-field>
            </div>

            <mat-checkbox formControlName="acepta" class="full">
              Acepto los términos y la política de privacidad
            </mat-checkbox>

            <div class="form-state">
              <div>
                <span>Estado</span>
                <strong [class.ok]="formulario.valid">{{ formulario.status }}</strong>
              </div>
              <div>
                <span>valid</span>
                <strong>{{ formulario.valid }}</strong>
              </div>
              <div>
                <span>touched</span>
                <strong>{{ formulario.touched }}</strong>
              </div>
              <div>
                <span>dirty</span>
                <strong>{{ formulario.dirty }}</strong>
              </div>
              <div>
                <span>valor</span>
                <strong class="value-json">{{ valorResumen() }}</strong>
              </div>
            </div>

            @if (enviado()) {
              <div class="form-success" role="status">
                <mat-icon>check_circle</mat-icon>
                <div>
                  <strong>Formulario enviado correctamente</strong>
                  <p>Los datos se han validado y serían enviados al servidor.</p>
                </div>
              </div>
            }

            <div class="form-actions">
              <button matButton="filled" type="submit" [disabled]="formulario.invalid">
                <mat-icon>send</mat-icon>
                Enviar
              </button>
              <button matButton="outlined" type="button" (click)="reset()">
                <mat-icon>restart_alt</mat-icon>
                Reiniciar
              </button>
              <button matButton type="button" (click)="rellenarDemo()">
                <mat-icon>bolt</mat-icon>
                Rellenar de ejemplo
              </button>
            </div>
          </form>

          <aside class="form-side">
            <h4>Errores por campo</h4>
            <ul class="errors-list">
              @for (campo of camposEstado(); track campo.name) {
                <li [class.valid]="campo.ok">
                  <mat-icon>{{ campo.ok ? 'check_circle' : 'cancel' }}</mat-icon>
                  <span class="field-name">{{ campo.name }}</span>
                  <span class="field-errors">{{ campo.errores || 'válido' }}</span>
                </li>
              }
            </ul>
            <p class="side-note">
              Los errores se leen de <code>control.errors</code>: un objeto con una clave por
              validador incumplido.
            </p>
          </aside>
        </div>
      </section>

      <section aria-labelledby="crear">
        <h2 id="crear">Crear el formulario</h2>

        <h3>Con FormGroup y FormControl</h3>
        <app-code-block language="ts" filename="formulario.ts" [code]="crearGrupo" />
        <app-code-block language="html" filename="formulario.html" [code]="plantillaHtml" />

        <h3>Con FormBuilder</h3>
        <p class="adl-text">
          <code class="adl-inline-code">FormBuilder</code> reduce el ruido cuando el formulario
          crece. Se obtiene con <code class="adl-inline-code">inject()</code>.
        </p>
        <app-code-block language="ts" filename="formulario.ts" [code]="formBuilder" />
      </section>

      <section aria-labelledby="validators">
        <h2 id="validators">Validadores</h2>
        <p class="adl-text">
          Cada control puede recibir un validador o un array de validadores. Un validador es una
          función que devuelve <code class="adl-inline-code">null</code> si el valor es válido o un
          objeto de error si no lo es.
        </p>

        <div class="validators-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Validador</th>
                <th scope="col">Qué comprueba</th>
              </tr>
            </thead>
            <tbody>
              @for (v of validators; track v.name) {
                <tr>
                  <td><code class="adl-inline-code">{{ v.name }}</code></td>
                  <td>{{ v.text }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <h3>Validador propio</h3>
        <app-code-block language="ts" filename="validators.ts" [code]="validadorPropio" />
      </section>

      <section aria-labelledby="estado">
        <h2 id="estado">Estado y reacción a cambios</h2>

        <div class="states-grid">
          @for (state of estados; track state.name) {
            <article>
              <code>{{ state.name }}</code>
              <p>{{ state.text }}</p>
            </article>
          }
        </div>

        <app-code-block language="ts" filename="estado.ts" [code]="estadoEjemplo" />
      </section>

      <section aria-labelledby="array">
        <h2 id="array">Listas dinámicas con FormArray</h2>
        <p class="adl-text">
          Para campos que se añaden y se quitan (teléfonos, invitados, líneas de factura) se usa
          <code class="adl-inline-code">FormArray</code>.
        </p>
        <app-code-block language="ts" filename="telefonos.ts" [code]="formArray" />
        <app-code-block language="html" filename="telefonos.html" [code]="formArrayHtml" />
      </section>

      <section aria-labelledby="accesibilidad">
        <h2 id="accesibilidad">Accesibilidad y buenas prácticas</h2>
        <ul class="adl-list">
          <li>
            <strong>Una etiqueta por campo</strong>: usa
            <code class="adl-inline-code">mat-label</code> o
            <code class="adl-inline-code">&lt;label for&gt;</code>; nunca solo el placeholder.
          </li>
          <li>
            <strong>Muestra errores tras interactuar</strong>: usa
            <code class="adl-inline-code">mat-error</code> (aparece cuando el control es inválido y
            touched) para no gritar antes de que el usuario escriba.
          </li>
          <li>
            <strong>Indica el campo obligatorio</strong> con texto, no solo con un asterisco de color.
          </li>
          <li>
            <strong>Agrupa</strong> con <code class="adl-inline-code">fieldset</code> /
            <code class="adl-inline-code">legend</code> o con
            <code class="adl-inline-code">mat-form-field</code> + títulos visibles.
          </li>
          <li>
            <strong>No bloquees el envío sin explicar por qué</strong>: si el botón está deshabilitado,
            muestra un resumen de errores.
          </li>
        </ul>

        <app-callout type="tip" label="Tipado">
          <p>
            Puedes tipar el formulario con <code>FormGroup&lt;T&gt;</code> y
            <code>NonNullableFormBuilder</code> para que los valores controlados no incluyan
            <code>null</code>: evita errores al llamar a <code>getRawValue()</code>.
          </p>
        </app-callout>
      </section>

      <app-chapter-nav route="/formularios" />
    </div>
  `,
})
export class FormulariosPage {
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly roles = ['Administrador', 'Editor', 'Lector'];

  protected readonly formulario = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    email: ['', [Validators.required, Validators.email]],
    rol: ['Editor', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8), tieneNumero]],
    acepta: [false, Validators.requiredTrue],
  });

  protected readonly enviado = signal(false);

  protected readonly camposEstado = computed(() => {
    this.formularioValue();
    return [
      { name: 'nombre', ok: this.formulario.controls.nombre.valid, errores: errorKeys(this.formulario.controls.nombre) },
      { name: 'email', ok: this.formulario.controls.email.valid, errores: errorKeys(this.formulario.controls.email) },
      { name: 'rol', ok: this.formulario.controls.rol.valid, errores: errorKeys(this.formulario.controls.rol) },
      { name: 'password', ok: this.formulario.controls.password.valid, errores: errorKeys(this.formulario.controls.password) },
      { name: 'acepta', ok: this.formulario.controls.acepta.valid, errores: errorKeys(this.formulario.controls.acepta) },
    ];
  });

  protected readonly valorResumen = computed(() => {
    const resumen = JSON.stringify(this.formularioValue(), null, 0);
    return resumen.length > 90 ? `${resumen.slice(0, 90)}…` : resumen;
  });

  private readonly signalValue = signal<Record<string, unknown>>({});

  private formularioValue(): Record<string, unknown> {
    return this.signalValue();
  }

  constructor() {
    this.formulario.valueChanges.subscribe((value) => {
      this.signalValue.set(value as Record<string, unknown>);
      this.enviado.set(false);
    });
  }

  protected readonly nombreLongitud = computed(() => String(this.formulario.controls.nombre.value ?? '').length);

  protected campo(nombre: 'nombre' | 'email' | 'rol' | 'password' | 'acepta') {
    return this.formulario.controls[nombre];
  }

  protected enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.enviado.set(true);
    this.snackBar.open('Formulario válido: datos listos para enviar', 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    this.formulario.markAsPristine();
  }

  protected reset(): void {
    this.formulario.reset({ rol: 'Editor', acepta: false });
    this.enviado.set(false);
  }

  protected rellenarDemo(): void {
    this.formulario.patchValue({
      nombre: 'Ana Torres',
      email: 'ana@ejemplo.dev',
      rol: 'Administrador',
      password: 'segura123',
      acepta: true,
    });
    this.formulario.markAllAsTouched();
  }

  protected readonly importModule = `import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule],  // <- imprescindible
  templateUrl: './formulario.html',
})
export class Formulario {}`;

  protected readonly crearGrupo = `import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({ selector: 'app-formulario', templateUrl: './formulario.html' })
export class Formulario {
  formulario = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
  });

  enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    console.log(this.formulario.value);
  }
}`;

  protected readonly plantillaHtml = `<form [formGroup]="formulario" (ngSubmit)="enviar()">
  <label for="nombre">Nombre</label>
  <input id="nombre" formControlName="nombre" />

  <label for="email">Email</label>
  <input id="email" type="email" formControlName="email" />

  <button type="submit" [disabled]="formulario.invalid">Enviar</button>
</form>

<!-- Con Angular Material -->
<mat-form-field>
  <mat-label>Nombre</mat-label>
  <input matInput formControlName="nombre" />
  @if (formulario.controls.nombre.hasError('required')) {
    <mat-error>El nombre es obligatorio</mat-error>
  }
</mat-form-field>`;

  protected readonly formBuilder = `import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({ selector: 'app-alta', templateUrl: './alta.html' })
export class Alta {
  private fb = inject(FormBuilder);

  // El primer elemento es el valor; el segundo, los validadores
  formulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    edad: [18, [Validators.min(18), Validators.max(120)]],
  });

  // Con nonNullable: los controles nunca devuelven null
  formularioTipado = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    acepta: [false, Validators.requiredTrue],
  });
}`;

  protected readonly validators = [
    { name: 'Validators.required', text: 'El campo debe tener un valor.' },
    { name: 'Validators.requiredTrue', text: 'El valor debe ser true (ideal para un checkbox de aceptación).' },
    { name: 'Validators.email', text: 'Comprueba el formato de correo electrónico.' },
    { name: 'Validators.minLength(n)', text: 'Longitud mínima de caracteres.' },
    { name: 'Validators.maxLength(n)', text: 'Longitud máxima de caracteres.' },
    { name: 'Validators.pattern(regex)', text: 'Coincidencia con una expresión regular.' },
    { name: 'Validators.min(n) / max(n)', text: 'Rango numérico.' },
  ];

  protected readonly validadorPropio = `import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function tieneNumero(control: AbstractControl): ValidationErrors | null {
  const valor = String(control.value ?? '');
  if (!valor) return null;              // deja que required haga su trabajo
  return /\\d/.test(valor) ? null : { sinNumero: true };
}

// Validador de grupo: compara dos campos
export const coinciden: ValidatorFn = (grupo: AbstractControl): ValidationErrors | null => {
  const a = grupo.get('password')?.value;
  const b = grupo.get('confirmar')?.value;
  return a === b ? null : { noCoinciden: true };
};

// Uso
this.formulario = this.fb.group(
  { password: [''], confirmar: [''] },
  { validators: coinciden },
);`;

  protected readonly estados = [
    { name: 'value / getRawValue()', text: 'Los valores actuales. getRawValue incluye controles deshabilitados.' },
    { name: 'valid / invalid', text: 'Resultado de todos los validadores del grupo.' },
    { name: 'touched / untouched', text: 'Si el usuario ha entrado y salido del campo.' },
    { name: 'dirty / pristine', text: 'Si el valor ha cambiado desde el estado inicial.' },
    { name: 'status', text: 'VALID, INVALID, PENDING (validación asíncrona) o DISABLED.' },
  ];

  protected readonly estadoEjemplo = `// Escuchar cambios (RxJS)
this.formulario.valueChanges.subscribe(valor => console.log(valor));

// Con signals en Angular moderno
readonly valor = toSignal(this.formulario.valueChanges, {
  initialValue: this.formulario.getRawValue(),
});

// Cambios de estado (útil para mostrar errores)
this.formulario.statusChanges.subscribe(status => console.log(status));

// Actualizaciones parciales
this.formulario.patchValue({ nombre: 'Ana' });   // actualiza solo esas claves
this.formulario.setValue({ nombre: 'Ana', email: 'a@b.c' }); // exige todas

// Deshabilitar / habilitar
this.formulario.controls.email.disable();
this.formulario.controls.email.enable();`;

  protected readonly formArray = `import { FormArray, FormBuilder, Validators } from '@angular/forms';

export class Telefonos {
  private fb = inject(FormBuilder);

  formulario = this.fb.group({
    telefonos: this.fb.array([
      this.fb.control('', [Validators.required, Validators.pattern(/^\\d{9}$/)]),
    ]),
  });

  get telefonos(): FormArray {
    return this.formulario.controls.telefonos;
  }

  agregar() {
    this.telefonos.push(this.fb.control('', Validators.required));
  }

  quitar(i: number) {
    this.telefonos.removeAt(i);
  }
}`;

  protected readonly formArrayHtml = `<form [formGroup]="formulario" formArrayName="telefonos">
  @for (control of telefonos.controls; track $index; let i = $index) {
    <div class="row">
      <input [formControlName]="i" placeholder="Teléfono {{ i + 1 }}" />
      <button type="button" (click)="quitar(i)">Quitar</button>
    </div>
  }
</form>

<button type="button" (click)="agregar()">Añadir teléfono</button>`;
}

function tieneNumero(control: AbstractControl): ValidationErrors | null {
  const valor = String(control.value ?? '');
  if (!valor) {
    return null;
  }
  return /\d/.test(valor) ? null : { sinNumero: true };
}

const ERROR_LABELS: Record<string, string> = {
  required: 'obligatorio',
  requiredTrue: 'debe aceptarse',
  minlength: 'demasiado corto',
  maxlength: 'demasiado largo',
  email: 'formato inválido',
  sinNumero: 'falta un número',
};

function errorKeys(control: AbstractControl): string {
  const errors = control.errors;
  if (!errors) {
    return '';
  }
  return Object.keys(errors)
    .map((key) => ERROR_LABELS[key] ?? key)
    .join(', ');
}
