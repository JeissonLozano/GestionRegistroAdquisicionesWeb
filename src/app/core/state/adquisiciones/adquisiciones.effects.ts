import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AdquisicionService } from '../../services/adquisicion.service';
import * as AdquisicionesActions from './adquisiciones.actions';
import * as UIActions from '../ui/ui.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class AdquisicionesEffects {
  private actions$ = inject(Actions);
  private adquisicionService = inject(AdquisicionService);
  private store = inject(Store);


  cargarAdquisiciones$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdquisicionesActions.cargarAdquisiciones),
      mergeMap(() => {
        this.store.dispatch(UIActions.activarLoader());
        return this.adquisicionService.getAdquisiciones().pipe(
          tap((res) => console.log('✅ Respuesta de la API (GET):', res)),
          map(adquisiciones => {
            this.store.dispatch(UIActions.desactivarLoader());
            return AdquisicionesActions.cargarAdquisicionesExito({ adquisiciones });
          }),
          catchError(error => {
            console.error('❌ Error en la API (GET):', error);
            this.store.dispatch(UIActions.desactivarLoader());
            return of(AdquisicionesActions.cargarAdquisicionesError({ error: error.message }));
          })
        );
      })
    )
  );

  agregarAdquisicion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdquisicionesActions.agregarAdquisicion),
      mergeMap(({ adquisicion }) => {
        return this.adquisicionService.createAdquisicion(adquisicion).pipe(
          tap((res) => console.log('✅ Respuesta de la API (POST):', res)), // 🔥 DEBUG
          map(nuevaAdquisicion => {
            return AdquisicionesActions.agregarAdquisicionExito({ adquisicion: nuevaAdquisicion });
          }),
          catchError(error => {
            console.error('❌ Error en la API (POST):', error);
            return of(AdquisicionesActions.agregarAdquisicionError({ error }));
          })
        );
      })
    )
  );

  modificarAdquisicion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdquisicionesActions.modificarAdquisicion),
      tap(({ adquisicion }) => console.log('📢 Acción recibida en Effect (PUT):', adquisicion)), // 🔥 DEBUG
      mergeMap(({ id, adquisicion }) => {
        return this.adquisicionService.updateAdquisicion(id, adquisicion).pipe(
          tap((res) => console.log('✅ Respuesta de la API (PUT):', res)), // 🔥 DEBUG
          map(() => {
            return AdquisicionesActions.modificarAdquisicionExito({ adquisicion });
          }),
          catchError(error => {
            this.store.dispatch(UIActions.desactivarLoader());
            return of(AdquisicionesActions.modificarAdquisicionError({ error }));
          })
        );
      })
    )
  );

  desactivarAdquisicion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdquisicionesActions.desactivarAdquisicion),
      tap(({ id }) => console.log('📢 Acción recibida en Effect (DELETE):', id)), // ✅ Debug
      mergeMap(({ id }) => {
        return this.adquisicionService.deleteAdquisicion(id).pipe(
          tap(() => console.log('✅ API respondió correctamente (NoContent - 204)')), // ✅ Debug
          map(() => {
            this.store.dispatch(AdquisicionesActions.cargarAdquisiciones());
            return AdquisicionesActions.desactivarAdquisicionExito({ id });
          }),
          catchError(error => {
            console.error('❌ Error en la API (DELETE):', error);
            return of(AdquisicionesActions.desactivarAdquisicionError({ error: error.message }));
          })
        );
      })
    )
  );
}
