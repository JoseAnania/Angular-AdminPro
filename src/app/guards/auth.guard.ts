/* El Guard permite "bloquear" URL y no acceder si conocemos dicha URL*/
/*Archivo creado para la Protección de Rutas según Token (es decir al loguearse) */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // inyectamos el servicio de Usuarios (para validar los permisos de las rutas)
  // inyectamos el servicio que maneja las rutas
  constructor(private usuarioService: UsuarioService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      // retornamos el método del Servicio que valida el Token
    return this.usuarioService.validarToken()
      
    //lo pasamos por el PIPE y TAP. si está autenticado redireccionamos, caso contrario lo redireccionamos al Login
      .pipe(
        tap(estaAutenticado => {

          if(!estaAutenticado) {
            this.router.navigateByUrl('/login');
          }
        }) 
      )
  }
  
}
