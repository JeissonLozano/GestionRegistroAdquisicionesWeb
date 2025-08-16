import { createReducer, on } from '@ngrx/store';
import * as HistorialActions from './historial.actions';
import { Historial } from '../../models/historial.model';

export interface HistorialState {
  historial: Historial[];
  loading: boolean;
  error: string | null;
}

export const initialState: HistorialState = {
  historial: [],
  loading: false,
  error: null
};

export const historialReducer = createReducer(
  initialState,

  on(HistorialActions.cargarHistorial, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(HistorialActions.cargarHistorialExito, (state, { historial }) => ({
    ...state,
    historial,
    loading: false
  })),

  on(HistorialActions.cargarHistorialError, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
