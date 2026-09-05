import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deporte } from '../models/deporte.model';
import { environment } from '../../../environments/environment';

const API_URL = `${environment.apiUrl}/deportes`;
@Injectable({ providedIn: 'root' })
export class DeporteService {
  constructor(private http: HttpClient) {}

  listar(): Observable<Deporte[]> {
    return this.http.get<Deporte[]>(API_URL);
  }
  crear(nombre: string): Observable<Deporte> {
    return this.http.post<Deporte>(API_URL, { nombre });
  }

  actualizar(id: number, nombre: string): Observable<Deporte> {
    return this.http.put<Deporte>(`${API_URL}/${id}`, { nombre });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
