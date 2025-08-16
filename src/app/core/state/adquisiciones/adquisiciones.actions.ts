import { createAction, props } from '@ngrx/store';
import { Adquisicion } from '../../models/adquisicion.model';

// Cargar todas las adquisiciones
export const cargarAdquisiciones = createAction('[Adquisiciones] Cargar Adquisiciones');
export const cargarAdquisicionesExito = createAction(
  '[Adquisiciones] Cargar Adquisiciones Éxito',
  props<{ adquisiciones: Adquisicion[] }>()
);
export const cargarAdquisicionesError = createAction(
  '[Adquisiciones] Cargar Adquisiciones Error',
  props<{ error: string }>()
);

// Agregar una nueva adquisición
export const agregarAdquisicion = createAction(
  '[Adquisiciones] Agregar Adquisición',
  props<{ adquisicion: Adquisicion }>()
);
export const agregarAdquisicionExito = createAction(
  '[Adquisiciones] Agregar Adquisición Éxito',
  props<{ adquisicion: Adquisicion }>()
);
export const agregarAdquisicionError = createAction(
  '[Adquisiciones] Agregar Adquisición Error',
  props<{ error: string }>()
);

// Modificar una adquisición
export const modificarAdquisicion = createAction(
  '[Adquisiciones] Modificar Adquisición',
  props<{  id: number; adquisicion: Adquisicion }>()
);
export const modificarAdquisicionExito = createAction(
  '[Adquisiciones] Modificar Adquisición Éxito',
  props<{ adquisicion: Adquisicion }>()
);
export const modificarAdquisicionError = createAction(
  '[Adquisiciones] Modificar Adquisición Error',
  props<{ error: string }>()
);

// Acción para desactivar una adquisición
export const desactivarAdquisicion = createAction(
  '[Adquisiciones] Desactivar Adquisición',
  props<{ id: number }>()
);

// Acción cuando la desactivación es exitosa
export const desactivarAdquisicionExito = createAction(
  '[Adquisiciones] Desactivar Adquisición Éxito',
  props<{ id: number }>()
);

// Acción cuando hay un error en la desactivación
export const desactivarAdquisicionError = createAction(
  '[Adquisiciones] Desactivar Adquisición Error',
  props<{ error: any }>()
);

// Acción para reactivar una adquisición
export const reactivarAdquisicion = createAction(
  '[Adquisiciones] Reactivar Adquisición',
  props<{ id: number }>()
);

// Acción cuando la reactivación es exitosa
export const reactivarAdquisicionExito = createAction(
  '[Adquisiciones] Reactivar Adquisición Éxito',
  props<{ id: number }>()
);

// Acción cuando hay un error en la reactivación
export const reactivarAdquisicionError = createAction(
  '[Adquisiciones] Reactivar Adquisición Error',
  props<{ error: any }>()
);
