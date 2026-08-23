import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ConfiguracionService,
  ConfiguracionSitio,
} from '../../../core/services/configuracion.service';
import { AdminNav } from '../../../shared/admin-nav/admin-nav';
import { BannerService } from '../../../core/services/banner.service';
import { ImagenService } from '../../../core/services/imagen.service';

@Component({
  selector: 'app-admin-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNav],
  templateUrl: './admin-configuracion.html',
  styleUrl: './admin-configuracion.scss',
})
export class AdminConfiguracion implements OnInit {
  form: ConfiguracionSitio = {
    id: 1,
    tituloHero: '',
    subtituloHero: '',
    textoBanner: '',
    colorMarca: '#F2A21B',
    logoUrl: '',
  };

  // Señales y variables de estado
  guardando = signal(false);
  mensaje = signal<string | null>(null);
  cargado = signal(false);
  subiendoHero = signal(false);

  nuevoMensaje = '';
  archivoHero: File | null = null;

  // 1. UN SOLO CONSTRUCTOR que inyecta todos los servicios necesarios
  constructor(
    private configuracionService: ConfiguracionService,
    public bannerService: BannerService,
    private imagenService: ImagenService,
  ) {}

  // 2. UN SOLO ngOnInit que ejecuta todas las cargas iniciales
  ngOnInit(): void {
    // Cargar configuración principal
    this.configuracionService.cargar().subscribe((c) => {
      this.form = { ...c };
      this.cargado.set(true);
    });

    // Cargar datos del banner y hero
    this.bannerService.cargarMensajes().subscribe();
    this.bannerService.cargarImagenesHero().subscribe();
  }

  guardar(): void {
    this.guardando.set(true);
    this.mensaje.set(null);
    this.configuracionService.actualizar(this.form).subscribe({
      next: () => {
        this.guardando.set(false);
        this.mensaje.set('Cambios guardados correctamente.');
      },
      error: () => {
        this.guardando.set(false);
        this.mensaje.set('No se pudo guardar. Intenta de nuevo.');
      },
    });
  }

  agregarMensaje(): void {
    if (!this.nuevoMensaje.trim()) return;
    const orden = this.bannerService.mensajes().length;
    this.bannerService.crearMensaje(this.nuevoMensaje.trim(), orden).subscribe(() => {
      this.nuevoMensaje = '';
      this.bannerService.cargarMensajes().subscribe();
    });
  }

  eliminarMensaje(id: number): void {
    this.bannerService
      .eliminarMensaje(id)
      .subscribe(() => this.bannerService.cargarMensajes().subscribe());
  }

  onArchivoHeroSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.archivoHero = input.files?.[0] ?? null;
  }

  subirImagenHero(): void {
    if (!this.archivoHero) return;
    this.subiendoHero.set(true);
    this.imagenService.subir(this.archivoHero).subscribe({
      next: (res) => {
        const orden = this.bannerService.imagenesHero().length;
        this.bannerService.agregarImagenHero(res.url, orden).subscribe(() => {
          this.subiendoHero.set(false);
          this.archivoHero = null;
          this.bannerService.cargarImagenesHero().subscribe();
        });
      },
      error: () => this.subiendoHero.set(false),
    });
  }

  eliminarImagenHero(id: number): void {
    this.bannerService
      .eliminarImagenHero(id)
      .subscribe(() => this.bannerService.cargarImagenesHero().subscribe());
  }
}
