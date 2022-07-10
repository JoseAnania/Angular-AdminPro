/* Servicio creado para manejar la lógica de las peticiones HTTP de las Búsquedas 
de Usuarios/Médicos/Hospitales de las páginas de Mantenimientos (que viene del Back) 
y de la Búsqueda Global del Header*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

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
  private transformarUsuario(resultados: any[]): Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }

  // Método privado para transformar el Objeto Hospitales
  private transformarHospitales(resultados: any[]): Hospital[] {

    return resultados.map(
      hospital => new Hospital(hospital.nombre, hospital._id, hospital.img, hospital.usuario._id)
    );
  }

    // Método privado para transformar el Objeto Médicos
    private transformarMedicos(resultados: any[]): Medico[] {

      return resultados.map(
        medico => new Medico(medico.nombre, medico._id, medico.img, medico.usuario._id)
      );
    }

  // Método que realiza la búsqueda por Colección (es decir busca un Médico, Usuario u Hospital desde la pag Mantenimientos)
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

          case 'hospitales':
            return this.transformarHospitales(resp.resultados);

          case 'medicos':
            return this.transformarMedicos(resp.resultados);
        
          default:
            return [];
        }
      })
    );
  }

  // Método que realiza la búsqueda Global (desde el Header)
  busquedaGlobal(termino: string) {

    // obtenemos el Token guardado en el LocalStorage
    const token = localStorage.getItem('token') || '';
    
    // realizamos la petición GET al Back para realizar la Búsqueda (respuesta del tipo Arreglo de Any)
    return this.http.get(`${base_url}/todo/${termino}`, {
      headers: {
        'x-token': token
      }
    })
  }
}

