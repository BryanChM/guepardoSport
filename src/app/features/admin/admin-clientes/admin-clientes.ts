import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteAdminService } from '../../../core/services/cliente-admin.service';
import { ClienteAdmin } from '../../../core/models/cliente.model';
import { AdminNav } from '../../../shared/admin-nav/admin-nav';

@Component({
  selector: 'app-admin-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNav],
  templateUrl: './admin-clientes.html',
  styleUrl: './admin-clientes.scss',
})
export class AdminClientes implements OnInit {
  clientes = signal<ClienteAdmin[]>([]);
  cargando = signal(true);
  editandoId: number | null = null;
  formEdicion = { nombre: '', correo: '' };

  constructor(private clienteService: ClienteAdminService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.clienteService.listar().subscribe({
      next: (data) => {
        this.clientes.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  editar(cliente: ClienteAdmin): void {
    this.editandoId = cliente.id;
    this.formEdicion = { nombre: cliente.nombre, correo: cliente.correo };
  }

  guardar(id: number): void {
    this.clienteService.actualizar(id, this.formEdicion).subscribe(() => {
      this.editandoId = null;
      this.cargar();
    });
  }

  cancelar(): void {
    this.editandoId = null;
  }

  eliminar(id: number, nombre: string): void {
    if (!confirm(`¿Eliminar al cliente "${nombre}"? Esta acción no se puede deshacer.`)) return;
    this.clienteService.eliminar(id).subscribe(() => this.cargar());
  }
}
