import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PrendaService } from '../../core/services/prenda.service';
import { Prenda, PrendaColor, PrendaVariante } from '../../core/models/prenda.model';
import { CarritoService } from '../../core/services/carrito.service';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.scss',
})
export class ProductoDetalle implements OnInit {
  prenda = signal<Prenda | null>(null);
  cargando = signal(true);

  colorSeleccionado = signal<PrendaColor | null>(null);
  varianteSeleccionada = signal<PrendaVariante | null>(null);
  agregadoAlCarrito = signal(false);

  imagenActual = computed(() => {
    const color = this.colorSeleccionado();
    return color?.imagenes?.[0] ?? 'https://via.placeholder.com/400x400?text=Sin+imagen';
  });

  constructor(
    private route: ActivatedRoute,
    private prendaService: PrendaService,
    private carritoService: CarritoService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.prendaService.obtener(id).subscribe({
      next: (data) => {
        this.prenda.set(data);
        this.cargando.set(false);
        if (data.colores?.length > 0) {
          this.seleccionarColor(data.colores[0]);
        }
      },
      error: (err) => {
        this.cargando.set(false);
        console.error(err);
      },
    });
  }

  seleccionarColor(color: PrendaColor): void {
    this.colorSeleccionado.set(color);
    this.varianteSeleccionada.set(null);
  }

  seleccionarTalla(variante: PrendaVariante): void {
    if (variante.stock > 0) {
      this.varianteSeleccionada.set(variante);
    }
  }

  agregarAlCarrito(): void {
    const p = this.prenda();
    const color = this.colorSeleccionado();
    const variante = this.varianteSeleccionada();
    if (!p || !color || !variante) return;

    this.carritoService.agregar({
      varianteId: variante.id,
      prendaId: p.id,
      nombre: p.nombre,
      color: color.color,
      talla: variante.talla,
      precioUnitario: p.precioBase,
      cantidad: 1,
      imagen: color.imagenes?.[0] ?? '',
      stockDisponible: variante.stock,
    });

    this.agregadoAlCarrito.set(true);
    setTimeout(() => this.agregadoAlCarrito.set(false), 2000);
  }
}
