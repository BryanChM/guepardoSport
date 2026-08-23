import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Prenda } from '../../core/models/prenda.model';

@Component({
  selector: 'app-grid-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './grid-productos.html',
  styleUrl: './grid-productos.scss',
})
export class GridProductos {
  @Input() prendas: Prenda[] = [];
  @Input() cargando = false;
  @Input() error: string | null = null;
  @Input() mensajeVacio = 'Todavía no hay productos en esta sección.';

  /** 8 skeletons durante la carga */
  readonly skeletons = Array(8).fill(0);

  imagenPrincipal(prenda: Prenda): string {
    const primerColor = prenda.colores?.[0];
    return primerColor?.imagenes?.[0] ?? 'https://placehold.co/400x400/181818/8C877F?text=Sin+imagen';
  }
}
