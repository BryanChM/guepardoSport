import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface ConfiguracionSitio {
  id: number;
  tituloHero: string;
  subtituloHero: string;
  textoBanner: string;
  colorMarca: string;
  logoUrl: string | null;
}

const API_URL = 'http://localhost:8080/api/configuracion';

@Injectable({ providedIn: 'root' })
export class ConfiguracionService {
  config = signal<ConfiguracionSitio | null>(null);

  constructor(private http: HttpClient) {}

  cargar(): Observable<ConfiguracionSitio> {
    return this.http.get<ConfiguracionSitio>(API_URL).pipe(
      tap((c) => {
        this.config.set(c);
        document.documentElement.style.setProperty('--brand', c.colorMarca);
      }),
    );
  }

  actualizar(datos: ConfiguracionSitio): Observable<ConfiguracionSitio> {
    return this.http.put<ConfiguracionSitio>(API_URL, datos).pipe(
      tap((c) => {
        this.config.set(c);
        document.documentElement.style.setProperty('--brand', c.colorMarca);
      }),
    );
  }
}
