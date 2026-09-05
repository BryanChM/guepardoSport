import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const API_URL = `${environment.apiUrl}/admin/imagenes`;

@Injectable({ providedIn: 'root' })
export class ImagenService {
  constructor(private http: HttpClient) {}

  subir(archivo: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    return this.http.post<{ url: string }>(`${API_URL}/subir`, formData);
  }
}
