import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PrendaService } from '../../core/services/prenda.service';
import { Prenda } from '../../core/models/prenda.model';
import { GridProductos } from '../../shared/grid-productos/grid-productos';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, GridProductos],
  templateUrl: './categoria.html',
  styleUrl: './categoria.scss',
})
export class Categoria implements OnInit {
  todasLasPrendas = signal<Prenda[]>([]);
  cargando = signal(true);
  error = signal<string | null>(null);
  nombreCategoria = signal('');

  prendasFiltradas = computed(() => {
    const nombre = this.nombreCategoria().toLowerCase();
    return this.todasLasPrendas().filter((p) => p.deportes.some((d) => d.toLowerCase() === nombre));
  });

  constructor(
    private route: ActivatedRoute,
    private prendaService: PrendaService,
  ) {}

  ngOnInit(): void {
    // Se re-ejecuta si el usuario navega de una categoría a otra sin recargar la página
    this.route.paramMap.subscribe((params) => {
      this.nombreCategoria.set(params.get('nombre') ?? '');
      this.cargarProductos();
    });
  }

  private cargarProductos(): void {
    this.cargando.set(true);
    this.prendaService.listar().subscribe({
      next: (data) => {
        this.todasLasPrendas.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el catálogo.');
        this.cargando.set(false);
      },
    });
  }
}
