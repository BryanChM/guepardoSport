export interface CheckoutItem {
  varianteId: number;
  cantidad: number;
}

export interface CheckoutRequest {
  items: CheckoutItem[];
  codigoCupon?: string;
  nombreContacto: string;
  correoContacto: string;
  direccionEnvio: string;
  metodoPago: 'EN_LINEA' | 'CONTRA_ENTREGA';
}

export interface DetallePedido {
  prenda: string;
  color: string;
  talla: string;
  cantidad: number;
  precioUnitario: number;
}

export interface Pedido {
  id: number;
  nombreContacto: string;
  correoContacto: string;
  direccionEnvio: string;
  metodoPago: string;
  estadoPago: string;
  estadoLogistico: string;
  subtotal: number;
  descuento: number;
  costoEnvio: number;
  iva: number;
  total: number;
  fechaCreacion: string;
  detalles: DetallePedido[];
  numeroRastreo?: string;
}
export interface DetallePedido {
  prenda: string;
  color: string;
  talla: string;
  cantidad: number;
  precioUnitario: number;
  ivaLinea: number;
}
