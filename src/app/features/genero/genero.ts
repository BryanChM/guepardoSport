import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PrendaService } from '../../core/services/prenda.service';
import { Prenda } from '../../core/models/prenda.model';
import { GridProductos } from '../../shared/grid-productos/grid-productos';

@Component({
  selector: 'app-genero',
  standalone: true,
  imports: [CommonModule, GridProductos],
  templateUrl: './genero.html',
  styleUrl: './genero.scss',
})
export class Genero implements OnInit {
  todasLasPrendas = signal<Prenda[]>([]);
  cargando = signal(true);
  error = signal<string | null>(null);
  valorGenero = signal('');
  deporteFiltro = signal<string | null>(null);

  tituloVisible = computed(() => {
    const g = this.valorGenero();
    return g === 'MASCULINO' ? 'Hombre' : g === 'FEMENINO' ? 'Mujer' : g;
  });

  prendasFiltradas = computed(() => {
    const g = this.valorGenero();
    const deporte = this.deporteFiltro();
    return this.todasLasPrendas().filter((p) => {
      const coincideGenero = p.genero === g;
      const coincideDeporte = !deporte || p.deportes.includes(deporte);
      return coincideGenero && coincideDeporte;
    });
  });

  constructor(
    private route: ActivatedRoute,
    private prendaService: PrendaService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.valorGenero.set(params.get('valor') ?? '');
      this.cargarProductos();
    });

    this.route.queryParamMap.subscribe((params) => {
      this.deporteFiltro.set(params.get('deporte'));
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
