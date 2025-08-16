import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HistorialService } from '../../services/historial.service';
import * as HistorialActions from './historial.actions';
import * as UIActions from '../ui/ui.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class HistorialEffects {
  private actions$ = inject(Actions);
  private historialService = inject(HistorialService); // ✅ Inyectar correctamente el servicio
  private store = inject(Store);

  cargarHistorial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HistorialActions.cargarHistorial),
      mergeMap(({ adquisicionId }) => {
        this.store.dispatch(UIActions.activarLoader());
        return this.historialService.getHistorialByAdquisicionId(adquisicionId).pipe(
          map(historial => {
            this.store.dispatch(UIActions.desactivarLoader());
            return HistorialActions.cargarHistorialExito({ historial });
          }),
          catchError(error => {
            console.log(error);
            this.store.dispatch(UIActions.desactivarLoader());
            if (error.status === 404) {
              console.warn('ℹ No hay historial para esta adquisición.');
              return of(HistorialActions.cargarHistorialExito({ historial: [] })); // Retorna un array vacío
            }
            return of(HistorialActions.cargarHistorialError({ error: error.message }));
          })
        );
      })
    )
  );
}
