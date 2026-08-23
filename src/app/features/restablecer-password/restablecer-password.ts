import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-restablecer-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './restablecer-password.html',
  styleUrl: './restablecer-password.scss',
})
export class RestablecerPassword implements OnInit {
  token = '';
  nuevaPassword = '';
  confirmarPassword = '';
  enviando = signal(false);
  error = signal<string | null>(null);
  exito = signal(false);

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
  }

  onSubmit(): void {
    this.error.set(null);

    if (this.nuevaPassword !== this.confirmarPassword) {
      this.error.set('Las contraseñas no coinciden');
      return;
    }

    this.enviando.set(true);
    this.authService.restablecerPassword(this.token, this.nuevaPassword).subscribe({
      next: () => {
        this.enviando.set(false);
        this.exito.set(true);
        setTimeout(() => void this.router.navigate(['/login']), 2500);
      },
      error: (err) => {
        this.enviando.set(false);
        this.error.set(err.error?.error ?? 'No se pudo restablecer la contraseña');
      },
    });
  }
}
