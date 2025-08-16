import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adquisiciones', loadChildren: () => import('./features/adquisiciones/adquisiciones.module').then(m => m.AdquisicionesModule) },
  { path: 'historial', loadChildren: () => import('./features/historial/historial.module').then(m => m.HistorialModule) },
  { path: '**', component: NotFoundComponent } // Página 404
];
