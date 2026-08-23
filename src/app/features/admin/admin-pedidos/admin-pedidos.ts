import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoAdminService } from '../../../core/services/pedido-admin.service';
import { Pedido } from '../../../core/models/pedido.model';
import { AdminNav } from '../../../shared/admin-nav/admin-nav';

@Component({
  selector: 'app-admin-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNav],
  templateUrl: './admin-pedidos.html',
  styleUrl: './admin-pedidos.scss',
})
export class AdminPedidos implements OnInit {
  pedidos = signal<Pedido[]>([]);
  cargando = signal(true);
  expandidoId: number | null = null;

  estadosLogisticos = ['RECIBIDO', 'EN_PREPARACION', 'ENVIADO', 'ENTREGADO', 'CANCELADO'];

  formRastreo: { [id: number]: { empresaMensajeria: string; numeroRastreo: string } } = {};

  constructor(private pedidoService: PedidoAdminService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.pedidoService.listar().subscribe({
      next: (data) => {
        this.pedidos.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  toggleExpandir(id: number): void {
    this.expandidoId = this.expandidoId === id ? null : id;
    if (!this.formRastreo[id]) {
      this.formRastreo[id] = { empresaMensajeria: '', numeroRastreo: '' };
    }
  }

  marcarPagado(id: number): void {
    this.pedidoService.marcarPagado(id).subscribe(() => this.cargar());
  }

  cambiarEstado(id: number, valor: string): void {
    this.pedidoService.actualizarEstadoLogistico(id, valor).subscribe(() => this.cargar());
  }

  guardarRastreo(id: number): void {
    const datos = this.formRastreo[id];
    if (!datos.empresaMensajeria || !datos.numeroRastreo) return;
    this.pedidoService
      .actualizarRastreo(id, datos.empresaMensajeria, datos.numeroRastreo)
      .subscribe(() => this.cargar());
  }
}
