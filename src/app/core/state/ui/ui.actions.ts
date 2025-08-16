import { createAction, props } from '@ngrx/store';

// Acción para mostrar el loader
export const activarLoader = createAction('[UI] Activar Loader');

// Acción para ocultar el loader
export const desactivarLoader = createAction('[UI] Desactivar Loader');
