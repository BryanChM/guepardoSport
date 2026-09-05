import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegistroRequest } from '../models/auth.model';

import { environment } from '../../../environments/environment';
const API_URL = `${environment.apiUrl}/auth`;


@Injectable({ providedIn: 'root' })
export class AuthService {
  usuario = signal<AuthResponse | null>(this.cargarSesion());

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${API_URL}/login`, data)
      .pipe(tap((res) => this.guardarSesion(res)));
  }

  loginAdmin(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${API_URL}/admin/login`, data)
      .pipe(tap((res) => this.guardarSesion(res)));
  }

  registro(data: RegistroRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${API_URL}/registro`, data)
      .pipe(tap((res) => this.guardarSesion(res)));
  }

  // NUEVO: consulta al backend si el token actual sigue siendo válido
  verificarSesion(): Observable<{ correo: string; rol: string }> {
    return this.http.get<{ correo: string; rol: string }>(`${API_URL}/me`);
  }

  logout(): void {
    sessionStorage.removeItem('auth');
    this.usuario.set(null);
  }

  getToken(): string | null {
    return this.usuario()?.token ?? null;
  }

  estaAutenticado(): boolean {
    return this.usuario() !== null;
  }

  esAdmin(): boolean {
    return this.usuario()?.rol === 'ADMIN';
  }
  esCliente(): boolean {
    return this.usuario()?.rol === 'CLIENTE';
  }

  private guardarSesion(res: AuthResponse): void {
    sessionStorage.setItem('auth', JSON.stringify(res));
    this.usuario.set(res);
  }

  private cargarSesion(): AuthResponse | null {
    const data = sessionStorage.getItem('auth');
    return data ? JSON.parse(data) : null;
  }
  solicitarRecuperacion(correo: string): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${API_URL}/recuperar`, { correo });
  }

  restablecerPassword(token: string, nuevaPassword: string): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${API_URL}/restablecer`, { token, nuevaPassword });
  }
}
