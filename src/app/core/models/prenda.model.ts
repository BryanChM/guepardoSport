export interface PrendaVariante {
  id: number;
  talla: string;
  stock: number;
  sku: string;
}

export interface PrendaColor {
  id: number;
  color: string;
  imagenes: string[];
  variantes: PrendaVariante[];
}

export interface Prenda {
  id: number;
  nombre: string;
  descripcion: string;
  precioBase: number;
  precioConIva: number;
  estado: string;
  genero: string;
  deportes: string[];
  colores: PrendaColor[];
}

export interface PrendaCreateDTO {
  nombre: string;
  descripcion: string;
  precioBase: number;
  genero: string;
  deporteIds: number[];
}

