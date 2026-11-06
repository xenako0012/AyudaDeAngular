import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';

import { AppInfoService, ProgressService } from '../../core/progress.service';
import { PREGUNTAS_FRECUENTES, NAV_SECTIONS, SITE, TOTAL_CHAPTERS } from '../../data/content.data';
import { MATERIAL_COMPONENTS } from '../../data/material.data';
import { CodeBlockComponent } from '../../shared/code-block/code-block';

interface ModernoVsClasico {
  readonly clasico: string;
  readonly moderno: string;
  readonly detalle: string;
}

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressBarModule,
    CodeBlockComponent,
  ],
  styleUrl: './home.scss',
  template: `
    <!-- ============================ HERO ============================ -->
    <section class="hero">
      <div class="hero-copy">
        <p class="hero-eyebrow">
          <span class="dot" aria-hidden="true"></span>
          Guía en español · {{ site.version }}
        </p>
        <h1>
          Aprende Angular
          <span class="gradient-text">de cero a producción</span>
        </h1>
        <p class="hero-lead">
          Componentes standalone, signals, la nueva sintaxis de plantillas y Angular Material.
          Todo explicado con ejemplos que puedes ejecutar en esta misma página, sin promesas
          vacías y sin sintaxis heredada de 2016.
        </p>
        <div class="hero-actions">
          <a matButton="filled" class="cta" routerLink="/instalacion">
            <mat-icon>rocket_launch</mat-icon>
            Empezar por el principio
          </a>
          <a matButton="outlined" class="cta" routerLink="/material">
            <mat-icon>palette</mat-icon>
            Explorar Angular Material
          </a>
        </div>
        <dl class="hero-stats">
          <div>
            <dt>{{ totalChapters }}</dt>
            <dd>capítulos</dd>
          </div>
          <div>
            <dt>{{ totalMinutes }}</dt>
            <dd>minutos de lectura</dd>
          </div>
          <div>
            <dt>{{ materialCount }}</dt>
            <dd>componentes Material</dd>
          </div>
          <div>
            <dt>v{{ angularVersion() }}</dt>
            <dd>Angular instalado</dd>
          </div>
        </dl>
      </div>

      <div class="hero-visual" aria-hidden="false">
        <div class="float-card card-signal">
          <div class="fc-head">
            <mat-icon>bolt</mat-icon>
            <span>contador.ts</span>
          </div>
          <pre class="fc-code"><code><span class="tok-kw">export class</span> <span class="tok-cls">Contador</span> &#123;
  contador = <span class="tok-fn">signal</span>(<span class="tok-num">0</span>);
  doble = <span class="tok-fn">computed</span>(() =&gt;
    <span class="tok-kw">this</span>.contador() * <span class="tok-num">2</span>);
&#125;</code></pre>
          <div class="fc-live">
            <span class="live-dot"></span>
            reactivo por defecto
          </div>
        </div>

        <div class="float-card card-version">
          <mat-icon class="v-icon">verified</mat-icon>
          <div>
            <strong>Angular {{ angularVersion() }}</strong>
            <small>standalone · signals · zoneless</small>
          </div>
        </div>

        <div class="float-card card-progress">
          <span class="pc-label">Tu progreso</span>
          <mat-progress-bar mode="determinate" [value]="overallProgress()" />
          <span class="pc-value">{{ overallProgress() }} %</span>
        </div>
      </div>
    </section>

    <!-- ============================ RUTA ============================ -->
    <section class="route" aria-labelledby="ruta-title">
      <header class="route-head">
        <div>
          <p class="eyebrow">Ruta de aprendizaje</p>
          <h2 id="ruta-title">Seis bloques, {{ totalChapters }} capítulos</h2>
          <p class="route-sub">
            Sigue el orden propuesto o salta directamente al tema que te interesa. Cada capítulo
            marca su nivel y su tiempo estimado.
          </p>
        </div>
        <a matButton routerLink="/recursos" class="route-cta">
          <mat-icon>terminal</mat-icon>
          Cheatsheet de CLI
        </a>
      </header>

      @for (section of sections; track section.title; let sectionIndex = $index) {
        <div class="section-block">
          <div class="section-block-head">
            <span class="section-number">{{ (sectionIndex + 1).toString().padStart(2, '0') }}</span>
            <div>
              <h3>
                <mat-icon aria-hidden="true">{{ section.icon }}</mat-icon>
                {{ section.title }}
              </h3>
              <p>{{ section.description }}</p>
            </div>
            <span class="section-count">{{ section.chapters.length }} cap.</span>
          </div>

          <div class="chapter-grid">
            @for (chapter of section.chapters; track chapter.route) {
              <a class="chapter-card" [routerLink]="chapter.route">
                <div class="chapter-top">
                  <span class="chapter-icon"><mat-icon>{{ chapter.icon }}</mat-icon></span>
                  @if (progress.isCompleted(chapter.route)) {
                    <span class="chapter-done">
                      <mat-icon>check_circle</mat-icon>
                      completado
                    </span>
                  }
                </div>
                <h4>{{ chapter.title }}</h4>
                <p>{{ chapter.description }}</p>
                <footer>
                  <span class="chapter-level" [attr.data-level]="chapter.level">
                    {{ chapter.level }}
                  </span>
                  <span class="chapter-time">
                    <mat-icon aria-hidden="true">schedule</mat-icon>
                    {{ chapter.minutes }} min
                  </span>
                  <mat-icon class="chapter-arrow" aria-hidden="true">arrow_forward</mat-icon>
                </footer>
              </a>
            }
          </div>
        </div>
      }
    </section>

    <!-- ============================ QUÉ ES ============================ -->
    <section class="pillars" aria-labelledby="pilares-title">
      <header>
        <p class="eyebrow">Los cuatro pilares</p>
        <h2 id="pilares-title">Qué vas a aprender a manejar</h2>
      </header>
      <div class="pillar-grid">
        @for (pillar of pillars; track pillar.title) {
          <article class="pillar">
            <mat-icon [style.color]="pillar.color">{{ pillar.icon }}</mat-icon>
            <h3>{{ pillar.title }}</h3>
            <p>{{ pillar.text }}</p>
            <a [routerLink]="pillar.route">Ver capítulo →</a>
          </article>
        }
      </div>
    </section>

    <!-- ============================ MODERNO VS CLÁSICO ============================ -->
    <section class="modern" aria-labelledby="moderno-title">
      <div class="modern-copy">
        <p class="eyebrow">Angular moderno</p>
        <h2 id="moderno-title">Lo que cambió de verdad</h2>
        <p class="adl-text">
          Muchos tutoriales siguen enseñando patrones de Angular 2. Estos seis cambios resumen
          por qué un proyecto nuevo se ve tan distinto a los ejemplos de hace unos años.
        </p>
        <ul class="modern-list">
          @for (item of modernoVsClasico; track item.moderno) {
            <li>
              <mat-icon aria-hidden="true">trending_flat</mat-icon>
              <div>
                <s>{{ item.clasico }}</s>
                <strong>{{ item.moderno }}</strong>
                <span>{{ item.detalle }}</span>
              </div>
            </li>
          }
        </ul>
      </div>

      <div class="modern-code">
        <app-code-block
          language="ts"
          filename="app.ts"
          [code]="ejemploModerno"
        />
        <app-code-block
          language="html"
          filename="app.html"
          [code]="ejemploPlantilla"
        />
      </div>
    </section>

    <!-- ============================ FAQ ============================ -->
    <section class="faq" aria-labelledby="faq-title">
      <header>
        <p class="eyebrow">Dudas habituales</p>
        <h2 id="faq-title">Preguntas frecuentes</h2>
      </header>
      <mat-accordion class="faq-accordion" multi>
        @for (faq of faqs; track faq.question) {
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>{{ faq.question }}</mat-panel-title>
            </mat-expansion-panel-header>
            <p class="adl-text">{{ faq.answer }}</p>
          </mat-expansion-panel>
        }
      </mat-accordion>
    </section>

    <!-- ============================ CTA FINAL ============================ -->
    <section class="final-cta">
      <div>
        <h2>¿Empezamos?</h2>
        <p>
          Instala Node.js y Angular CLI y tendrás un proyecto funcionando en {{ '5' }} minutos.
          El primer capítulo incluye todos los comandos con botón de copiar.
        </p>
      </div>
      <a matButton="filled" class="cta" routerLink="/instalacion">
        <mat-icon>play_arrow</mat-icon>
        Ir a la instalación
      </a>
    </section>
  `,
})
export class HomePage {
  protected readonly site = SITE;
  protected readonly progress = inject(ProgressService);
  private readonly appInfo = inject(AppInfoService);

  protected readonly sections = NAV_SECTIONS;
  protected readonly totalChapters = TOTAL_CHAPTERS;
  protected readonly materialCount = MATERIAL_COMPONENTS.length;
  protected readonly faqs = PREGUNTAS_FRECUENTES;

  protected readonly totalMinutes = NAV_SECTIONS.flatMap((s) => s.chapters).reduce(
    (total, chapter) => total + chapter.minutes,
    0,
  );

  protected readonly angularVersion = this.appInfo.angularVersion;

  protected readonly overallProgress = computed(() =>
    Math.round((this.progress.completed() / this.totalChapters) * 100),
  );

  protected readonly pillars = [
    {
      icon: 'widgets',
      color: '#7c3aed',
      title: 'Componentes',
      text: 'Piezas aisladas con su plantilla y sus estilos. Standalone por defecto desde Angular 19: se importan directamente, sin NgModule.',
      route: '/componentes',
    },
    {
      icon: 'bolt',
      color: '#0f766e',
      title: 'Signals',
      text: 'Estado reactivo con seguimiento automático de dependencias. computed() derive valores y effect() ejecuta efectos secundarios.',
      route: '/signals',
    },
    {
      icon: 'alt_route',
      color: '#b45309',
      title: 'Control flow',
      text: '@if, @for, @switch y @empty son sintaxis nativa del compilador de plantillas: sin imports y con mejor tipado.',
      route: '/control-flow',
    },
    {
      icon: 'palette',
      color: '#c2185b',
      title: 'Angular Material',
      text: 'Componentes oficiales con Material Design 3 y tematización mediante tokens CSS y el mixin mat.theme.',
      route: '/material',
    },
  ];

  protected readonly modernoVsClasico: readonly ModernoVsClasico[] = [
    {
      clasico: 'NgModules',
      moderno: 'Componentes standalone',
      detalle: 'Cada componente declara en `imports` lo que necesita.',
    },
    {
      clasico: 'zone.js',
      moderno: 'Detección sin zonas',
      detalle: 'El CLI genera proyectos zoneless de forma predeterminada.',
    },
    {
      clasico: '*ngIf / *ngFor',
      moderno: '@if / @for',
      detalle: 'Bloques integrados en el compilador de plantillas.',
    },
    {
      clasico: '@Input() / @Output()',
      moderno: 'input() / output()',
      detalle: 'APIs basadas en signals, con tipado y valores iniciales.',
    },
    {
      clasico: 'Constructor con parámetros',
      moderno: 'inject()',
      detalle: 'Inyección dentro del contexto de inicialización.',
    },
    {
      clasico: 'BrowserAnimationsModule',
      moderno: 'animate.enter / animate.leave',
      detalle: 'Animaciones nativas con CSS, sin @angular/animations.',
    },
  ];

  protected readonly ejemploModerno = `import { Component, signal, input } from '@angular/core';

@Component({
  selector: 'app-contador',
  template: './contador.html',
  styleUrl: './contador.scss',
})
export class Contador {
  contador = signal(0);
  titulo = input('Contador');

  incrementar() {
    this.contador.update(valor => valor + 1);
  }
}`;

  protected readonly ejemploPlantilla = `@if (contador() > 0) {
  <p>Vas por {{ contador() }}</p>
} @else {
  <p>Pulsa + para empezar</p>
}

@for (paso of pasos; track paso.id) {
  <li>{{ paso.nombre }}</li>
}`;
}
