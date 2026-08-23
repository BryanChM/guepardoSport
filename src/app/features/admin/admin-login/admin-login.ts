import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
})
export class AdminLogin {
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

    this.authService.loginAdmin({ correo: this.correo, password: this.password }).subscribe({
      next: () => {
        this.cargando.set(false);
        this.router.navigate(['/admin/productos']);
      },
      error: (err) => {
        this.cargando.set(false);
        this.error.set(err.error?.error ?? 'Credenciales inválidas');
      },
    });
  }
}
