import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarritoService } from '../../core/services/carrito.service';

@Component({
  selector: 'app-checkout-exito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="confirmacion">
      <span class="mancha mancha--brand" aria-hidden="true"></span>
      <h1>¡Pago recibido!</h1>
      <p>
        Tu pedido <strong>#{{ pedidoId }}</strong> está siendo procesado.
      </p>
      <p class="nota">Te enviaremos la confirmación por correo en unos momentos.</p>
      <a routerLink="/" class="btn-primario">Seguir comprando</a>
    </div>
  `,
  styleUrl: './checkout-exito.scss',
})
export class CheckoutExito implements OnInit {
  pedidoId = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private carritoService: CarritoService,
  ) {}

  ngOnInit(): void {
    this.pedidoId.set(this.route.snapshot.queryParamMap.get('pedido'));
    this.carritoService.vaciar();
  }
}
