import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PrendaService } from '../../../core/services/prenda.service';
import { Prenda } from '../../../core/models/prenda.model';
import { AdminNav } from '../../../shared/admin-nav/admin-nav';


@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule, RouterLink, AdminNav],
  templateUrl: './admin-productos.html',
  styleUrl: './admin-productos.scss',
})
export class AdminProductos implements OnInit {
  prendas = signal<Prenda[]>([]);
  cargando = signal(true);

  constructor(private prendaService: PrendaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.prendaService.listar().subscribe({
      next: (data) => {
        this.prendas.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  eliminar(id: number, nombre: string): void {
    if (!confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return;
    this.prendaService.eliminar(id).subscribe(() => this.cargar());
  }
}
