import { AdquisicionState } from './adquisiciones/adquisiciones.reducer';
import { HistorialState } from './historial/historial.reducer';
import { UIState } from './ui/ui.reducer';

export interface AppState {
  adquisiciones: AdquisicionState;
  historial: HistorialState;
  ui: UIState;
}
