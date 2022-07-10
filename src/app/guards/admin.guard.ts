/* El Guard permite "bloquear" URL y no acceder si conocemos dicha URL */
/* Archivo creado para la Protección de Rutas según Rol del Usuario */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  // inyectamos el servicio de Usuarios (para validar los permisos de las rutas)
  // inyectamos el servicio que maneja las rutas
  constructor(private usuarioService: UsuarioService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      // retornamos un booleano según el Rol del Usuario
      if (this.usuarioService.role === 'ADMIN_ROLE') {
        return true;
      } else {

        // en caso que no tenga el Usuario el Rol Admin e intente ingresar por URL lo redireccionamos al Dashboard
        this.router.navigateByUrl('/dashboard');
        return false;
      }
  }
}
