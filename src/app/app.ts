import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { DeporteService } from './core/services/deporte.service';
import { ConfiguracionService } from './core/services/configuracion.service';
import { AuthService } from './core/services/auth.service';
import { CarritoService } from './core/services/carrito.service';
import { BannerService } from './core/services/banner.service';

interface CategoriaNav {
  etiqueta: string;
  ruta: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = 'guepardoSport';

  menuAbierto = signal(false);
  terminoBusqueda = signal('');

  categorias = signal<CategoriaNav[]>([{ etiqueta: 'Todo', ruta: '/' }]);

  constructor(
    private deporteService: DeporteService,
    public configuracionService: ConfiguracionService,
    public authService: AuthService,
    public carritoService: CarritoService,
    private router: Router,
    public bannerService: BannerService,
  ) {
    this.bannerService.cargarMensajes().subscribe();
    this.deporteService.listar().subscribe((deportes) => {
      this.categorias.set([
        { etiqueta: 'Todo', ruta: '/' },
        ...deportes.map((d) => ({ etiqueta: d.nombre, ruta: `/categoria/${d.nombre}` })),
      ]);
    });
  }

  generos: CategoriaNav[] = [
    { etiqueta: 'Hombre', ruta: '/genero/MASCULINO' },
    { etiqueta: 'Mujer', ruta: '/genero/FEMENINO' },
  ];

  toggleMenu(): void {
    this.menuAbierto.update((v) => !v);
  }

  onBuscar(valor: string): void {
    this.terminoBusqueda.set(valor);
  }

  cerrarSesion(): void {
    this.authService.logout();
    void this.router.navigate(['/']);
  }
}
