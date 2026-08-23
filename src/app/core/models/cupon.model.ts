export interface Cupon {
  id: number;
  codigo: string;
  tipoDescuento: 'PORCENTAJE' | 'MONTO_FIJO';
  valor: number;
  montoMinimo: number | null;
  fechaInicio: string;
  fechaFin: string;
  limiteUso: number | null;
  usosActuales: number;
  activo: boolean;
}

export interface CuponCreateDTO {
  codigo: string;
  tipoDescuento: 'PORCENTAJE' | 'MONTO_FIJO';
  valor: number;
  montoMinimo: number | null;
  fechaInicio: string;
  fechaFin: string;
  limiteUso: number | null;
  activo: boolean;
}
