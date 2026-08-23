import { Routes } from '@angular/router';
import { Catalogo } from './features/catalogo/catalogo/catalogo';
import { ProductoDetalle } from './features/producto-detalle/producto-detalle';
import { Categoria } from './features/categoria/categoria';
import { Genero } from './features/genero/genero';
import { AdminLogin } from './features/admin/admin-login/admin-login';
import { AdminProductos } from './features/admin/admin-productos/admin-productos';
import { AdminProductoForm } from './features/admin/admin-producto-form/admin-producto-form';
import { AdminCupones } from './features/admin/admin-cupones/admin-cupones';
import { AdminPedidos } from './features/admin/admin-pedidos/admin-pedidos';
import { AdminClientes } from './features/admin/admin-clientes/admin-clientes';
import { AdminCategorias } from './features/admin/admin-categorias/admin-categorias';
import { adminGuard } from './core/guards/admin.guard';
import { AdminConfiguracion } from './features/admin/admin-configuracion/admin-configuracion';
import { ClienteLogin } from './features/cliente-login/cliente-login';
import { ClienteRegistro } from './features/cliente-registro/cliente-registro';
import { Carrito } from './features/carrito/carrito';
import { Checkout } from './features/checkout/checkout';
import { RecuperarPassword } from './features/recuperar-password/recuperar-password';
import { RestablecerPassword } from './features/restablecer-password/restablecer-password';
export const routes: Routes = [
  { path: '', component: Catalogo },
  { path: 'categoria/:nombre', component: Categoria },
  { path: 'genero/:valor', component: Genero },
  { path: 'producto/:id', component: ProductoDetalle },

  { path: 'admin/login', component: AdminLogin },
  { path: 'admin/productos', component: AdminProductos, canActivate: [adminGuard] },
  { path: 'admin/productos/nuevo', component: AdminProductoForm, canActivate: [adminGuard] },
  { path: 'admin/productos/:id', component: AdminProductoForm, canActivate: [adminGuard] },
  { path: 'admin/cupones', component: AdminCupones, canActivate: [adminGuard] },
  { path: 'admin/pedidos', component: AdminPedidos, canActivate: [adminGuard] },
  { path: 'admin/clientes', component: AdminClientes, canActivate: [adminGuard] },
  { path: 'admin/categorias', component: AdminCategorias, canActivate: [adminGuard] },
  { path: 'admin/configuracion', component: AdminConfiguracion, canActivate: [adminGuard] },
  { path: 'login', component: ClienteLogin },
  { path: 'registro', component: ClienteRegistro },
  { path: 'carrito', component: Carrito },
  { path: 'checkout', component: Checkout },
  { path: 'recuperar-password', component: RecuperarPassword },
  { path: 'restablecer-password', component: RestablecerPassword },
];
