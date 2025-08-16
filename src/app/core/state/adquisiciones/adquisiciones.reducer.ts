import { createReducer, on } from '@ngrx/store';
import * as AdquisicionesActions from './adquisiciones.actions';
import { Adquisicion } from '../../models/adquisicion.model';

export interface AdquisicionState {
  adquisiciones: Adquisicion[];
  loading: boolean;
  error: string | null;
}

export const initialState: AdquisicionState = {
  adquisiciones: [],
  loading: false,
  error: null
};

export const adquisicionesReducer = createReducer(
  initialState,

  // Cargar adquisiciones
  on(AdquisicionesActions.cargarAdquisiciones, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AdquisicionesActions.cargarAdquisicionesExito, (state, { adquisiciones }) => ({
    ...state,
    adquisiciones,
    loading: false
  })),
  on(AdquisicionesActions.cargarAdquisicionesError, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Agregar adquisición
  on(AdquisicionesActions.agregarAdquisicion, (state) => ({
    ...state,
    loading: true
  })),
  on(AdquisicionesActions.agregarAdquisicionExito, (state, { adquisicion }) => ({
    ...state,
    adquisiciones: [...state.adquisiciones, adquisicion],
    loading: false
  })),
  on(AdquisicionesActions.agregarAdquisicionError, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Modificar adquisición
  on(AdquisicionesActions.modificarAdquisicion, (state) => ({
    ...state,
    loading: true
  })),
  on(AdquisicionesActions.modificarAdquisicionExito, (state, { adquisicion }) => ({
    ...state,
    adquisiciones: state.adquisiciones.map(a =>
      a.id === adquisicion.id ? adquisicion : a
    ),
    loading: false
  })),
  on(AdquisicionesActions.modificarAdquisicionError, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Eliminar adquisición
  on(AdquisicionesActions.desactivarAdquisicion, (state) => ({
    ...state,
    loading: true
  })),
  on(AdquisicionesActions.desactivarAdquisicionExito, (state, { id }) => ({
    ...state,
    adquisiciones: state.adquisiciones.map(adquisicion =>
      adquisicion.id === id ? { ...adquisicion, estado: false } : adquisicion
    ),
    loading: false
  })),
  on(AdquisicionesActions.desactivarAdquisicionError, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
