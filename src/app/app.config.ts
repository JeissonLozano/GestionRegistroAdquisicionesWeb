import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

// Rutas
import { appRoutes } from './app.routes';

// Interceptores
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';

// Estado global con NgRx
import { adquisicionesReducer } from './core/state/adquisiciones/adquisiciones.reducer';
import { historialReducer } from './core/state/historial/historial.reducer';
import { uiReducer } from './core/state/ui/ui.reducer';

// Efectos de NgRx
import { AdquisicionesEffects } from './core/state/adquisiciones/adquisiciones.effects';
import { HistorialEffects } from './core/state/historial/historial.effects';

import { MatIconModule } from '@angular/material/icon';

export const appConfig: ApplicationConfig = {
  providers: [
    // Proveedores de rutas
    provideRouter(appRoutes),

    // Proveedores HTTP con interceptores
    provideHttpClient(withInterceptors([HttpErrorInterceptor])),

    // Animaciones de Angular Material
    provideAnimations(),

    // Proveedores de Angular Material
    importProvidersFrom(MatSnackBarModule),

    // Estado global con NgRx
    provideStore({
      adquisiciones: adquisicionesReducer,
      historial: historialReducer,
      ui: uiReducer
    }),

    importProvidersFrom(MatIconModule),

    // Efectos de NgRx
    provideEffects([AdquisicionesEffects, HistorialEffects])
  ]
};
