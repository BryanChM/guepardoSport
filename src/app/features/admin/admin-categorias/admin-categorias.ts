import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeporteService } from '../../../core/services/deporte.service';
import { Deporte } from '../../../core/models/deporte.model';
import { AdminNav } from '../../../shared/admin-nav/admin-nav';

@Component({
  selector: 'app-admin-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNav],
  templateUrl: './admin-categorias.html',
  styleUrl: './admin-categorias.scss',
})
export class AdminCategorias implements OnInit {
  categorias = signal<Deporte[]>([]);
  nuevoNombre = '';
  editandoId: number | null = null;
  nombreEdicion = '';

  constructor(private deporteService: DeporteService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.deporteService.listar().subscribe((d) => this.categorias.set(d));
  }

  agregar(): void {
    if (!this.nuevoNombre.trim()) return;
    this.deporteService.crear(this.nuevoNombre.trim()).subscribe(() => {
      this.nuevoNombre = '';
      this.cargar();
    });
  }

  editar(cat: Deporte): void {
    this.editandoId = cat.id;
    this.nombreEdicion = cat.nombre;
  }

  guardar(id: number): void {
    this.deporteService.actualizar(id, this.nombreEdicion).subscribe(() => {
      this.editandoId = null;
      this.cargar();
    });
  }

  eliminar(id: number, nombre: string): void {
    if (!confirm(`¿Eliminar la categoría "${nombre}"?`)) return;
    this.deporteService.eliminar(id).subscribe(() => this.cargar());
  }
}
