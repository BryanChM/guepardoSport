import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { MensajeBanner, ImagenHero } from '../models/banner.model';

const API_MENSAJES = 'http://localhost:8080/api/banner-mensajes';
const API_IMAGENES = 'http://localhost:8080/api/imagenes-hero';

@Injectable({ providedIn: 'root' })
export class BannerService {
  mensajes = signal<MensajeBanner[]>([]);
  imagenesHero = signal<ImagenHero[]>([]);

  constructor(private http: HttpClient) {}

  cargarMensajes() {
    return this.http.get<MensajeBanner[]>(API_MENSAJES).pipe(tap((m) => this.mensajes.set(m)));
  }

  crearMensaje(texto: string, orden: number) {
    return this.http.post<MensajeBanner>(API_MENSAJES, { texto, orden });
  }

  eliminarMensaje(id: number) {
    return this.http.delete<void>(`${API_MENSAJES}/${id}`);
  }

  cargarImagenesHero() {
    return this.http.get<ImagenHero[]>(API_IMAGENES).pipe(tap((i) => this.imagenesHero.set(i)));
  }

  agregarImagenHero(url: string, orden: number) {
    return this.http.post<ImagenHero>(API_IMAGENES, { url, orden });
  }

  eliminarImagenHero(id: number) {
    return this.http.delete<void>(`${API_IMAGENES}/${id}`);
  }
}
