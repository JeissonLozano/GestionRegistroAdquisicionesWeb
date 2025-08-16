export interface Historial {
  id: number;
  adquisicionId: number;
  fechaCambio: Date;
  campoModificado: string;
  modificadoPor: string,
  valorAnterior: string;
  valorNuevo: string;
}
