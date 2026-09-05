import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckoutRequest, Pedido } from '../models/pedido.model';

import { environment } from '../../../environments/environment';

const API_URL = `${environment.apiUrl}/pedidos`;




@Injectable({ providedIn: 'root' })
export class PedidoService {
  constructor(private http: HttpClient) {}

  crear(dto: CheckoutRequest): Observable<Pedido> {
    return this.http.post<Pedido>(API_URL, dto);
  }

  obtener(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${API_URL}/${id}`);
  }
}
