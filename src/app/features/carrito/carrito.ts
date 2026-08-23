import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../core/services/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.scss',
})
export class Carrito {
  constructor(public carritoService: CarritoService) {}

  aumentar(varianteId: number, cantidadActual: number): void {
    this.carritoService.actualizarCantidad(varianteId, cantidadActual + 1);
  }

  disminuir(varianteId: number, cantidadActual: number): void {
    this.carritoService.actualizarCantidad(varianteId, cantidadActual - 1);
  }

  eliminar(varianteId: number): void {
    this.carritoService.eliminar(varianteId);
  }
}
