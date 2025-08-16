import { createAction, props } from '@ngrx/store';
import { Historial } from '../../models/historial.model';

// Cargar historial por adquisición
export const cargarHistorial = createAction(
  '[Historial] Cargar Historial',
  props<{ adquisicionId: number }>()
);

export const cargarHistorialExito = createAction(
  '[Historial] Cargar Historial Éxito',
  props<{ historial: Historial[] }>()
);

export const cargarHistorialError = createAction(
  '[Historial] Cargar Historial Error',
  props<{ error: string }>()
);
