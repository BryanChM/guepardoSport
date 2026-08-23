import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PrendaService } from '../../../core/services/prenda.service';
import { DeporteService } from '../../../core/services/deporte.service';
import { Deporte } from '../../../core/models/deporte.model';
import { Prenda } from '../../../core/models/prenda.model';
import { forkJoin } from 'rxjs';
import { ImagenService } from '../../../core/services/imagen.service';

@Component({
  selector: 'app-admin-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-producto-form.html',
  styleUrl: './admin-producto-form.scss',
})
export class AdminProductoForm implements OnInit {
  esEdicion = false;
  prendaId: number | null = null;

  nombre = '';
  descripcion = '';
  precioBase: number | null = null;
  genero = 'UNISEX';
  deportesDisponibles = signal<Deporte[]>([]);
  deportesSeleccionados = new Set<number>();

  prendaActual = signal<Prenda | null>(null);
  guardando = signal(false);
  error = signal<string | null>(null);

  // --- estado del formulario de "agregar color" ---
  nuevoColor = '';

  nuevasTallas = [{ talla: '', stock: 0, sku: '' }];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prendaService: PrendaService,
    private deporteService: DeporteService,
    private imagenService: ImagenService,
  ) {}

  ngOnInit(): void {
    this.deporteService.listar().subscribe((d) => this.deportesDisponibles.set(d));

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.esEdicion = true;
      this.prendaId = Number(idParam);
      this.cargarPrenda();
    }
  }

  cargarPrenda(): void {
    if (!this.prendaId) return;
    this.prendaService.obtener(this.prendaId).subscribe((p) => {
      this.prendaActual.set(p);
      this.nombre = p.nombre;
      this.descripcion = p.descripcion;
      this.precioBase = p.precioBase;
      this.genero = p.genero;
      // Nota: deportesSeleccionados se llena por nombre acá; para simplificar,
      // en edición el admin puede re-marcar los deportes si necesita cambiarlos.
    });
  }

  toggleDeporte(id: number): void {
    if (this.deportesSeleccionados.has(id)) {
      this.deportesSeleccionados.delete(id);
    } else {
      this.deportesSeleccionados.add(id);
    }
  }

  guardarDatosBasicos(): void {
    this.error.set(null);

    if (this.precioBase === null || this.precioBase <= 0) {
      this.error.set('Ingresa un precio válido mayor a 0');
      return;
    }

    this.guardando.set(true);
    const dto = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precioBase: this.precioBase, // TypeScript ya sabe que aquí no es null, por el chequeo de arriba
      genero: this.genero,
      deporteIds: Array.from(this.deportesSeleccionados),
    };

    const peticion =
      this.esEdicion && this.prendaId
        ? this.prendaService.actualizar(this.prendaId, dto)
        : this.prendaService.crear(dto);

    peticion.subscribe({
      next: (prenda) => {
        this.guardando.set(false);
        if (!this.esEdicion) {
          void this.router.navigate(['/admin/productos', prenda.id]);
        } else {
          this.cargarPrenda();
        }
      },
      error: (err) => {
        this.guardando.set(false);
        this.error.set(err.error?.error ?? 'No se pudo guardar el producto');
      },
    });
  }

  agregarTallaAlFormulario(): void {
    this.nuevasTallas.push({ talla: '', stock: 0, sku: '' });
  }

  quitarTalla(index: number): void {
    this.nuevasTallas.splice(index, 1);
  }

  agregarColor(): void {
    if (!this.prendaId) return;
    this.error.set(null);

    if (this.archivosSeleccionados.length === 0) {
      this.error.set('Selecciona al menos una imagen');
      return;
    }

    this.subiendoImagenes.set(true);

    const subidas = this.archivosSeleccionados.map((archivo) => this.imagenService.subir(archivo));

    forkJoin(subidas).subscribe({
      next: (resultados) => {
        const imagenes = resultados.map((r) => r.url);
        this.guardarColorConImagenes(imagenes);
      },
      error: () => {
        this.subiendoImagenes.set(false);
        this.error.set('No se pudieron subir las imágenes');
      },
    });
  }

  private guardarColorConImagenes(imagenes: string[]): void {
    const dto = {
      color: this.nuevoColor,
      imagenes,
      variantes: this.nuevasTallas
        .filter((t) => t.talla.trim().length > 0)
        .map((t) => ({
          talla: t.talla,
          stock: t.stock,
          sku: t.sku.trim().length > 0 ? t.sku.trim() : null,
        })),
    };

    this.prendaService.agregarColor(this.prendaId!, dto).subscribe({
      next: () => {
        this.subiendoImagenes.set(false);
        this.nuevoColor = '';
        this.archivosSeleccionados = [];
        this.nuevasTallas = [{ talla: '', stock: 0, sku: '' }];
        this.cargarPrenda();
      },
      error: (err) => {
        this.subiendoImagenes.set(false);
        this.error.set(err.error?.error ?? 'No se pudo agregar el color');
      },
    });
  }
  archivosSeleccionados: File[] = [];
  subiendoImagenes = signal(false);

  onArchivosSeleccionados(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.archivosSeleccionados = Array.from(input.files);
    }
  }
}
