import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cliente-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cliente-registro.html',
  styleUrl: './cliente-registro.scss',
})
export class ClienteRegistro {
  nombre = '';
  correo = '';
  password = '';
  cargando = signal(false);
  error = signal<string | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.error.set(null);
    this.cargando.set(true);
    this.authService
      .registro({ nombre: this.nombre, correo: this.correo, password: this.password })
      .subscribe({
        next: () => {
          this.cargando.set(false);
          void this.router.navigate(['/']);
        },
        error: (err) => {
          this.cargando.set(false);
          this.error.set(
            err.error?.error ?? Object.values(err.error ?? {}).join(', ') ?? 'No se pudo registrar',
          );
        },
      });
  }
}
