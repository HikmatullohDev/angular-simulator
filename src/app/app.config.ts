import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Nora from '@primeuix/themes/nora';
import Lara from '@primeuix/themes/lara';
import { Preset } from '@primeuix/themes/types';
import { Theme } from '../enum/Theme';

function getTheme(): Preset {
  const savedTheme: Theme | null = localStorage.getItem('app-theme') as Theme;

  if (!savedTheme) {
    return Lara;
  }

  switch(savedTheme) {
    case Theme.AURA:
      return Aura;
    case Theme.NORA:
      return Nora;
    default:
      return Lara
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: getTheme(),
        options: {
          darkModeSelector: '.app-dark',
          ripple: true,
        }
      }
    }),
  ]
};
