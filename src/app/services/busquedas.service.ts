/* Servicio creado para manejar la lógica de las peticiones HTTP de las Búsquedas 
de Usuarios/Médicos/Hospitales de las páginas de Mantenimientos (que viene del Back) */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

// guardamos en una constante la parte de la URL igual en todas las peticiones HTTP (desde Enviroment)
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  // inyectamos el servicio que nos permite trabajar con peticiones HTTP
  // inyectamos el servicio que nos permite trabajar con las Rutas
  constructor( private http: HttpClient,
    private router: Router) { }

  // Método privado para transformar el Objeto Usuarios
  private transformarUsuario(resultados: any[]): any[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }

  // Método que realiza la búsqueda  
  buscar(tabla: 'usuarios'|'medicos'|'hospitales', termino: string) {
    
    // obtenemos el Token guardado en el LocalStorage
    const token = localStorage.getItem('token') || '';

    // realizamos la petición GET al Back para realizar la Búsqueda (respuesta del tipo Arreglo de Any)
    return this.http.get<any[]>(`${base_url}/todo/coleccion/${tabla}/${termino}`, {
      headers: {
        'x-token': token
      }

      // extraemos de la respuesta los "resultados" con el Pipe y el Map (según corresponda a la tabla) y lo transformamos
    }).pipe(
      map((resp: any) => {

        switch (tabla) {
          case 'usuarios':
            return this.transformarUsuario(resp.resultados);
        
          default:
            return [];
        }
      })
    );
  }
}

