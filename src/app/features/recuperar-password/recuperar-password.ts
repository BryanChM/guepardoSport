import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recuperar-password.html',
  styleUrl: './recuperar-password.scss',
})
export class RecuperarPassword {
  correo = '';
  enviando = signal(false);
  mensaje = signal<string | null>(null);

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.enviando.set(true);
    this.authService.solicitarRecuperacion(this.correo).subscribe({
      next: (res) => {
        this.enviando.set(false);
        this.mensaje.set(res.mensaje);
      },
      error: () => {
        this.enviando.set(false);
        this.mensaje.set('Si el correo existe, te enviamos un enlace de recuperación.');
      },
    });
  }
}
