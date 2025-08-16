import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectHistorialState = (state: AppState) => state.historial;

export const selectHistorial = createSelector(
  selectHistorialState,
  (historialState) => historialState.historial
);

export const selectHistorialPorAdquisicion = (adquisicionId: number) =>
  createSelector(selectHistorial, historial =>
    historial.filter(h => h.adquisicionId === adquisicionId)
  );

export const selectHistorialLoading = createSelector(
  selectHistorialState,
  (historialState) => historialState.loading
);

export const selectHistorialError = createSelector(
  selectHistorialState,
  (historialState) => historialState.error
);
