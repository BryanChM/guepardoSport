import { Injectable, signal, computed } from '@angular/core';
import { ItemCarrito } from '../models/carrito.model';

const CLAVE_STORAGE = 'guepardo_carrito';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  items = signal<ItemCarrito[]>(this.cargar());

  cantidadTotal = computed(() => this.items().reduce((suma, item) => suma + item.cantidad, 0));

  subtotal = computed(() =>
    this.items().reduce((suma, item) => suma + item.precioUnitario * item.cantidad, 0),
  );

  agregar(nuevoItem: ItemCarrito): void {
    const actuales = this.items();
    const existente = actuales.find((i) => i.varianteId === nuevoItem.varianteId);

    if (existente) {
      const cantidadDeseada = existente.cantidad + nuevoItem.cantidad;
      existente.cantidad = Math.min(cantidadDeseada, existente.stockDisponible);
      this.items.set([...actuales]);
    } else {
      this.items.set([...actuales, nuevoItem]);
    }
    this.guardar();
  }

  actualizarCantidad(varianteId: number, cantidad: number): void {
    const actuales = this.items();
    const item = actuales.find((i) => i.varianteId === varianteId);
    if (!item) return;

    if (cantidad <= 0) {
      this.eliminar(varianteId);
      return;
    }

    item.cantidad = Math.min(cantidad, item.stockDisponible);
    this.items.set([...actuales]);
    this.guardar();
  }

  eliminar(varianteId: number): void {
    this.items.set(this.items().filter((i) => i.varianteId !== varianteId));
    this.guardar();
  }

  vaciar(): void {
    this.items.set([]);
    this.guardar();
  }

  private guardar(): void {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(this.items()));
  }

  private cargar(): ItemCarrito[] {
    const data = localStorage.getItem(CLAVE_STORAGE);
    return data ? JSON.parse(data) : [];
  }
}
