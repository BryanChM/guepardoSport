import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';
import { environment } from '../../../environments/environment';

const API_URL = `${environment.apiUrl}/admin/pedidos`;

@Injectable({ providedIn: 'root' })
export class PedidoAdminService {
  constructor(private http: HttpClient) {}

  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(API_URL);
  }

  marcarPagado(id: number): Observable<Pedido> {
    return this.http.put<Pedido>(`${API_URL}/${id}/marcar-pagado`, {});
  }

  actualizarEstadoLogistico(id: number, valor: string): Observable<Pedido> {
    return this.http.put<Pedido>(`${API_URL}/${id}/estado-logistico`, { valor });
  }

  actualizarRastreo(
    id: number,
    empresaMensajeria: string,
    numeroRastreo: string,
  ): Observable<Pedido> {
    return this.http.put<Pedido>(`${API_URL}/${id}/rastreo`, { empresaMensajeria, numeroRastreo });
  }
}

