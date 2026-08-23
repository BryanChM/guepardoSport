import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PrendaService } from '../../../core/services/prenda.service';
import { Prenda } from '../../../core/models/prenda.model';
import { GridProductos } from '../../../shared/grid-productos/grid-productos';
import { ConfiguracionService } from '../../../core/services/configuracion.service';
import { BannerService } from '../../../core/services/banner.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, GridProductos, RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo implements OnInit, OnDestroy {
  prendas = signal<Prenda[]>([]);
  cargando = signal(true);
  error = signal<string | null>(null);

  indiceImagenActual = signal(0);
  private intervaloCarrusel?: ReturnType<typeof setInterval>;

  constructor(
    private prendaService: PrendaService,
    public configuracionService: ConfiguracionService,
    public bannerService: BannerService,
  ) {}

  ngOnInit(): void {
    this.prendaService.listar().subscribe({
      next: (data) => {
        this.prendas.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el catálogo.');
        this.cargando.set(false);
      },
    });

    this.bannerService.cargarImagenesHero().subscribe(() => {
      this.intervaloCarrusel = setInterval(() => {
        const total = this.bannerService.imagenesHero().length;
        if (total > 0) {
          this.indiceImagenActual.update((i) => (i + 1) % total);
        }
      }, 4000);
    });
  }

  ngOnDestroy(): void {
    if (this.intervaloCarrusel) clearInterval(this.intervaloCarrusel);
  }
}
