export interface LoginRequest {
  correo: string;
  password: string;
}

export interface RegistroRequest {
  nombre: string;
  correo: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  nombre: string;
  correo: string;
  rol: string;
}
