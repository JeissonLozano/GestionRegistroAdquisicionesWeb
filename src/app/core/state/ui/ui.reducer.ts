import { createReducer, on } from '@ngrx/store';
import * as UIActions from './ui.actions';

export interface UIState {
  loading: boolean;
}

export const initialState: UIState = {
  loading: false
};

export const uiReducer = createReducer(
  initialState,

  on(UIActions.activarLoader, (state) => ({
    ...state,
    loading: true
  })),

  on(UIActions.desactivarLoader, (state) => ({
    ...state,
    loading: false
  }))
);
