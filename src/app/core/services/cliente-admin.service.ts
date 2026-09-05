import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteAdmin } from '../models/cliente.model';
import { environment } from '../../../environments/environment';
const API_URL = `${environment.apiUrl}/admin/clientes`;

@Injectable({ providedIn: 'root' })
export class ClienteAdminService {
  constructor(private http: HttpClient) {}

  listar(): Observable<ClienteAdmin[]> {
    return this.http.get<ClienteAdmin[]>(API_URL);
  }

  actualizar(id: number, dto: { nombre: string; correo: string }): Observable<ClienteAdmin> {
    return this.http.put<ClienteAdmin>(`${API_URL}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
