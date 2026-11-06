import { Routes } from '@angular/router';

/**
 * Rutas de la aplicación.
 *
 * Cada capítulo se carga de forma diferida con `loadComponent`, de modo que el
 * bundle inicial solo contiene el shell (cabecera, sidebar y portada). Algunas
 * rutas tienen parámetros (`:section`) para demostrar la lectura de inputs de
 * ruta con `withComponentInputBinding()`.
 */
export const routes: Routes = [
  {
    path: '',
    title: 'Ayuda de Angular · Guía práctica en español',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomePage),
  },
  {
    path: 'instalacion',
    title: 'Instalación y Angular CLI · Ayuda de Angular',
    loadComponent: () => import('./pages/instalacion/instalacion').then((m) => m.InstalacionPage),
  },
  {
    path: 'estructura',
    title: 'Estructura de un proyecto · Ayuda de Angular',
    loadComponent: () => import('./pages/estructura/estructura').then((m) => m.EstructuraPage),
  },
  {
    path: 'componentes',
    title: 'Componentes standalone · Ayuda de Angular',
    loadComponent: () => import('./pages/componentes/componentes').then((m) => m.ComponentesPage),
  },
  {
    path: 'binding',
    title: 'Binding en plantillas · Ayuda de Angular',
    loadComponent: () => import('./pages/binding/binding').then((m) => m.BindingPage),
  },
  {
    path: 'signals',
    title: 'Signals y reactividad · Ayuda de Angular',
    loadComponent: () => import('./pages/signals/signals').then((m) => m.SignalsPage),
  },
  {
    path: 'control-flow',
    title: 'Control flow: @if y @for · Ayuda de Angular',
    loadComponent: () =>
      import('./pages/control-flow/control-flow').then((m) => m.ControlFlowPage),
  },
  {
    path: 'routing',
    title: 'Routing y navegación · Ayuda de Angular',
    loadComponent: () => import('./pages/routing/routing').then((m) => m.RoutingPage),
  },
  {
    path: 'usuarios/:id',
    title: 'Detalle de usuario · Ayuda de Angular',
    loadComponent: () =>
      import('./pages/routing/route-demo/route-demo').then((m) => m.RouteDemoPage),
  },
  {
    path: 'comunicacion',
    title: 'Comunicación entre componentes · Ayuda de Angular',
    loadComponent: () =>
      import('./pages/comunicacion/comunicacion').then((m) => m.ComunicacionPage),
  },
  {
    path: 'servicios',
    title: 'Servicios e inyección de dependencias · Ayuda de Angular',
    loadComponent: () => import('./pages/servicios/servicios').then((m) => m.ServiciosPage),
  },
  {
    path: 'formularios',
    title: 'Formularios reactivos · Ayuda de Angular',
    loadComponent: () => import('./pages/formularios/formularios').then((m) => m.FormulariosPage),
  },
  {
    path: 'modulos',
    title: 'Módulos (NgModule) · Ayuda de Angular',
    loadComponent: () => import('./pages/modulos/modulos').then((m) => m.ModulosPage),
  },
  {
    path: 'material',
    title: 'Angular Material: guía y catálogo · Ayuda de Angular',
    loadComponent: () => import('./pages/material/material').then((m) => m.MaterialPage),
  },
  {
    path: 'recursos',
    title: 'Cheatsheet de CLI · Ayuda de Angular',
    loadComponent: () => import('./pages/recursos/recursos').then((m) => m.RecursosPage),
  },
  {
    path: '404',
    title: 'Página no encontrada · Ayuda de Angular',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundPage),
  },
  {
    path: '**',
    title: 'Página no encontrada · Ayuda de Angular',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundPage),
  },
];
