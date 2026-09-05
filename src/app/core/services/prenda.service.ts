import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prenda, PrendaCreateDTO } from '../models/prenda.model';

import { environment } from '../../../environments/environment';

const API_URL = `${environment.apiUrl}/prendas`;

@Injectable({ providedIn: 'root' })
export class PrendaService {
  constructor(private http: HttpClient) {}

  listar(): Observable<Prenda[]> {
    return this.http.get<Prenda[]>(API_URL);
  }

  obtener(id: number): Observable<Prenda> {
    return this.http.get<Prenda>(`${API_URL}/${id}`);
  }

  crear(dto: PrendaCreateDTO): Observable<Prenda> {
    return this.http.post<Prenda>(API_URL, dto);
  }

  actualizar(id: number, dto: PrendaCreateDTO): Observable<Prenda> {
    return this.http.put<Prenda>(`${API_URL}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
  agregarColor(prendaId: number, dto: any): Observable<any> {
    return this.http.post(`${API_URL}/${prendaId}/colores`, dto);
  }
}
