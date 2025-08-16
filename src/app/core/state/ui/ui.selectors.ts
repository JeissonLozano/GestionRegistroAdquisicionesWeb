import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectUIState = (state: AppState) => state.ui;

export const selectLoading = createSelector(
  selectUIState,
  (ui) => ui.loading
);
