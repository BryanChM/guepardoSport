import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from '../../core/services/carrito.service';
import { PedidoService } from '../../core/services/pedido.service';
import { AuthService } from '../../core/services/auth.service';

const TASA_IVA = 0.12;
const COSTO_ENVIO_FIJO = 25;
const MONTO_ENVIO_GRATIS = 300;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit {
  nombreContacto = '';
  correoContacto = '';
  direccionEnvio = '';
  metodoPago: 'EN_LINEA' | 'CONTRA_ENTREGA' = 'CONTRA_ENTREGA';
  nit = '';
  nombreFacturacion = '';
  direccionFiscal = '';

  codigoCupon = '';
  descuentoAplicado = signal(0);

  enviando = signal(false);
  error = signal<string | null>(null);
  pedidoCreado = signal<{ id: number; total: number } | null>(null);

  constructor(
    public carritoService: CarritoService,
    private pedidoService: PedidoService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.usuario();
    if (usuario) {
      this.nombreContacto = usuario.nombre;
      this.correoContacto = usuario.correo;
    }
  }
  costoEnvio = computed(() => {
    const baseParaEnvio = this.carritoService.subtotal() - this.descuentoAplicado();
    return baseParaEnvio >= MONTO_ENVIO_GRATIS ? 0 : COSTO_ENVIO_FIJO;
  });

  iva = computed(() => {
    // El IVA se calcula solo sobre los productos (subtotal - descuento), NO sobre el envío
    const base = this.carritoService.subtotal() - this.descuentoAplicado();
    return Math.round(base * TASA_IVA * 100) / 100;
  });

  total = computed(() => {
    return (
      Math.round(
        (this.carritoService.subtotal() -
          this.descuentoAplicado() +
          this.costoEnvio() +
          this.iva()) *
          100,
      ) / 100
    );
  });

  confirmarPedido(): void {
    this.error.set(null);

    if (!this.nombreContacto || !this.correoContacto || !this.direccionEnvio) {
      this.error.set('Completa nombre, correo y dirección de envío.');
      return;
    }

    this.enviando.set(true);

    const dto = {
      items: this.carritoService.items().map((i) => ({
        varianteId: i.varianteId,
        cantidad: i.cantidad,
      })),
      codigoCupon: this.codigoCupon.trim() || undefined,
      nombreContacto: this.nombreContacto,
      correoContacto: this.correoContacto,
      direccionEnvio: this.direccionEnvio,
      metodoPago: this.metodoPago,
      nit: this.nit.trim() || 'CF',
      nombreFacturacion: this.nombreFacturacion.trim() || this.nombreContacto,
      direccionFiscal: this.direccionFiscal.trim() || this.direccionEnvio,
    };

    this.pedidoService.crear(dto).subscribe({
      next: (pedido) => {
        this.enviando.set(false);
        if (pedido.urlPago) {
          // Pago en línea: redirige al checkout hospedado de Recurrente
          window.location.href = pedido.urlPago;
        } else {
          // Contra entrega: ya está confirmado
          this.pedidoCreado.set({ id: pedido.id, total: pedido.total });
          this.carritoService.vaciar();
        }
      },
      error: (err) => {
        this.enviando.set(false);
        this.error.set(err.error?.error ?? 'No se pudo procesar el pedido. Intenta de nuevo.');
      },
    });
  }

  irAlCatalogo(): void {
    void this.router.navigate(['/']);
  }
}
