import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cupon, CuponCreateDTO } from '../models/cupon.model';

const API_URL = 'http://localhost:8080/api/admin/cupones';

@Injectable({ providedIn: 'root' })
export class CuponService {
  constructor(private http: HttpClient) {}

  listar(): Observable<Cupon[]> {
    return this.http.get<Cupon[]>(API_URL);
  }

  crear(dto: CuponCreateDTO): Observable<Cupon> {
    return this.http.post<Cupon>(API_URL, dto);
  }

  actualizar(id: number, dto: CuponCreateDTO): Observable<Cupon> {
    return this.http.put<Cupon>(`${API_URL}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
