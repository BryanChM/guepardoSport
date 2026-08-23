import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuponService } from '../../../core/services/cupon.service';
import { Cupon, CuponCreateDTO } from '../../../core/models/cupon.model';
import { AdminNav } from '../../../shared/admin-nav/admin-nav';

@Component({
  selector: 'app-admin-cupones',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNav],
  templateUrl: './admin-cupones.html',
  styleUrl: './admin-cupones.scss',
})
export class AdminCupones implements OnInit {
  cupones = signal<Cupon[]>([]);
  cargando = signal(true);
  error = signal<string | null>(null);
  mostrarForm = signal(false);
  editandoId: number | null = null;

  form: CuponCreateDTO = this.formVacio();

  constructor(private cuponService: CuponService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.cuponService.listar().subscribe({
      next: (data) => {
        this.cupones.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  formVacio(): CuponCreateDTO {
    return {
      codigo: '',
      tipoDescuento: 'PORCENTAJE',
      valor: 0,
      montoMinimo: null,
      fechaInicio: '',
      fechaFin: '',
      limiteUso: null,
      activo: true,
    };
  }

  nuevoNuevo(): void {
    this.editandoId = null;
    this.form = this.formVacio();
    this.mostrarForm.set(true);
  }

  editar(cupon: Cupon): void {
    this.editandoId = cupon.id;
    this.form = {
      codigo: cupon.codigo,
      tipoDescuento: cupon.tipoDescuento,
      valor: cupon.valor,
      montoMinimo: cupon.montoMinimo,
      fechaInicio: cupon.fechaInicio,
      fechaFin: cupon.fechaFin,
      limiteUso: cupon.limiteUso,
      activo: cupon.activo,
    };
    this.mostrarForm.set(true);
  }

  guardar(): void {
    this.error.set(null);
    const peticion = this.editandoId
      ? this.cuponService.actualizar(this.editandoId, this.form)
      : this.cuponService.crear(this.form);

    peticion.subscribe({
      next: () => {
        this.mostrarForm.set(false);
        this.cargar();
      },
      error: (err) =>
        this.error.set(
          err.error?.error ?? Object.values(err.error ?? {}).join(', ') ?? 'No se pudo guardar',
        ),
    });
  }

  eliminar(id: number, codigo: string): void {
    if (!confirm(`¿Eliminar el cupón "${codigo}"?`)) return;
    this.cuponService.eliminar(id).subscribe(() => this.cargar());
  }

  cancelar(): void {
    this.mostrarForm.set(false);
  }
}
