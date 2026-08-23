import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="admin-nav">
      <a routerLink="/admin/productos" routerLinkActive="activo">Productos</a>
      <a routerLink="/admin/categorias" routerLinkActive="activo">Categorías</a>
      <a routerLink="/admin/cupones" routerLinkActive="activo">Cupones</a>
      <a routerLink="/admin/pedidos" routerLinkActive="activo">Pedidos</a>
      <a routerLink="/admin/clientes" routerLinkActive="activo">Clientes</a>
      <a routerLink="/admin/configuracion" routerLinkActive="activo">Apariencia</a>
    </nav>
  `,
})
export class AdminNav {}
