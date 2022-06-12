/* Servicio creado para manejar la lógica de las peticiones HTTP de los Usuarios (que viene del Back) */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, tap } from 'rxjs/operators';
import { map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

// guardamos en una constante la parte de la URL igual en todas las peticiones HTTP (desde Enviroment)
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // propiedad donde almacenaremos al Usuario
  public usuario: Usuario;

  // inyectamos el servicio que nos permite trabajar con peticiones HTTP
  // inyectamos el servicio que nos permite trabajar con las Rutas
  constructor( private http: HttpClient,
               private router: Router) { }

  // Getter para obtener el Id del Usuario
  get uid(): string {
    return this.usuario.uid || '';
  }

  // Método para desloguearse
  logout() {

    // eliminamos el token del LocalStorage
    localStorage.removeItem('token');

    // redireccionamos al login
    this.router.navigateByUrl('/login');
  }

  // Método para validar el Token (y poder ingresar a las páginas protegidas por el AuthGuard)
  validarToken(): Observable<boolean> {

    // obtenemos el Token guardado en el LocalStorage
    const token = localStorage.getItem('token') || '';

    // realizamos la petición GET al Back para obtener el token (al login renew)
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
      // si la petición es correcta lo pasamos por el PIPE y el MAP (para transformar la respuesta en un booleano) y renovamos el Token
    }).pipe(
      map((resp: any) => {
        
        localStorage.setItem('token', resp.token);
        
        // extraemos (desestructuración) de la respuesta los datos del usuario
        const { email, google, nombre, role, img='', uid } = resp.usuario;

        // llenamos la propiedad con los datos del Usuario
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);

        return true;
      }), 

      // atrapamos los errores
      catchError(err => of(false) )
    );
  }

  // Método para Crear un Usuario del tipo RegisterForm(interface) (recibe por parámetro los datos del Formulario de Registro)
  crearUsuario( formData: RegisterForm) {
    
    // realizamos la inserción con la petición HTTP POST y usamos el PIPE y TAP para guardar el Token en el LocalStorage
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

  // Método para Actualizar un Usuario (que recibe por parámetro los datos a actualizar)
  actualizarPerfil( data: {email: string, nombre: string, role: string} ) {

    // como el "Role" es obligatorio pero no lo podemos modificar desde el Form lo desestructuramos y mandamos igual
    data = {
      ...data,
      role: this.usuario.role || '',
    };

    // obtenemos el Token guardado en el LocalStorage
    const token = localStorage.getItem('token') || '';

    // realizamos la modificación con una petición PUT
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': token
      }
    });
  }

  // Método de Login del tipo LoginForm(interface) (recibe por parámetro los datos del Formulario de Login)
  login( formData: LoginForm) {
    
    // realizamos la inserción con la petición HTTP POST y usamos el PIPE y TAP para guardar el Token en el LocalStorage
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }
}
