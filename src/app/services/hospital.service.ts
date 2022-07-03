/* Servicio creado para manejar la lógica de las peticiones HTTP de los Hospitales (que viene del Back) */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

// guardamos en una constante la parte de la URL igual en todas las peticiones HTTP (desde Enviroment)
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  // inyectamos el servicio que nos permite trabajar con peticiones HTTP
  constructor(private http: HttpClient) { }

  // Método Getter para obtener el Token
  get token(): string {

    // obtenemos el Token guardado en el LocalStorage
    return localStorage.getItem('token') || '';
  }

  // Método Getter para obtener los Headers
  get headers() {

    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  // Método para Cargar los Hospitales (Listarlos en la página de Mantenimiento/Hospitales)
  cargarHospitales() {

    // realizamos la petición GET al Back para obtener los Hospitales
    return this.http.get(`${base_url}/hospitales`, this.headers)

      // transformamos la respuesta con el Pipe y el Map (para que sólo nos devuelva lo que necesitamos)
      .pipe(
        map((resp: {ok: boolean, hospitales: Hospital[]}) => resp.hospitales)
      )
  }

  // Método para Crear los Hospitales (sólo recibe el nombre por parámetro)
  crearHospital(nombre: string) {

    // realizamos la petición POST al Back para insertar un Hospital
    return this.http.post(`${base_url}/hospitales`, {nombre}, this.headers);
  }

  // Método para Actualizar los Hospitales (recibe el id y el nombre por parámetro)
  actualizarHospital(_id: string, nombre: string) {

    // realizamos la petición PUT al Back para modificar el Hospital
    return this.http.put(`${base_url}/hospitales/${_id}`, {nombre}, this.headers);
  }

  // Método para Eliminar los Hospitales (sólo recibe el id por parámetro)
  eliminarHospital(_id: string) {

    // realizamos la petición DELETE al Back para eliminar el Hospital
    return this.http.delete(`${base_url}/hospitales/${_id}`, this.headers);
  }
}
