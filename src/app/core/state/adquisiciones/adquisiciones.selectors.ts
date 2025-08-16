import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

// Obtener el estado de adquisiciones
export const selectAdquisicionesState = (state: AppState) => state.adquisiciones;

// Obtener la lista de adquisiciones
export const selectAdquisiciones = createSelector(
  selectAdquisicionesState,
  (adquisicionesState) => adquisicionesState.adquisiciones
);

// Obtener una adquisición por ID
export const selectAdquisicionPorId = (id: number) =>
  createSelector(selectAdquisiciones, (adquisiciones) =>
    adquisiciones.find((adq) => adq.id === id)
  );

// Obtener el estado de carga
export const selectAdquisicionesLoading = createSelector(
  selectAdquisicionesState,
  (adquisicionesState) => adquisicionesState.loading
);

// Obtener el estado de error
export const selectAdquisicionesError = createSelector(
  selectAdquisicionesState,
  (adquisicionesState) => adquisicionesState.error
);
