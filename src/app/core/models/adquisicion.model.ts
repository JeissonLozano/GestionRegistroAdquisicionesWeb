export interface Adquisicion {
  id?: number;
  presupuesto: number;
  unidadAdministrativa: string;
  tipoBienServicio: string;
  cantidad: number;
  valorUnitario: number;
  valorTotal: number;
  fechaAdquisicion: string;
  proveedor: string;
  documentacion: string;
  usuarioModificador: string;
  activo?: boolean;
}
