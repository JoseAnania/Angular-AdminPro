/* Servicio creado para manejar la lógica de las peticiones HTTP de los Médicos (que viene del Back) */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

// guardamos en una constante la parte de la URL igual en todas las peticiones HTTP (desde Enviroment)
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  // Método para Cargar los Médicos (Listarlos en la página de Mantenimiento/Médicos)
  cargarMedicos() {

    // realizamos la petición GET al Back para obtener los Médicos
    return this.http.get(`${base_url}/medicos`, this.headers)

      // transformamos la respuesta con el Pipe y el Map (para que sólo nos devuelva lo que necesitamos)
      .pipe(
        map((resp: {ok: boolean, medicos: Medico[]}) => resp.medicos)
      )
  }

  // Método para Cargar un Médico Seleccionado (recibe por parámetro un id)
  cargarMedicoPorId(id: string) {
    
    // realizamos la petición GET al Back para obtener el Médico
    return this.http.get(`${base_url}/medicos/${id}`, this.headers)

      // transformamos la respuesta con el Pipe y el Map (para que sólo nos devuelva lo que necesitamos)
      .pipe(
        map((resp: {ok: boolean, medico: Medico}) => resp.medico)
      )
  }

  // Método para Crear los Médicos (recibe por parámetro el nombre del Médico y el id del Hospital)
  crearMedico(medico: {nombre: string, hospital: string}) {

    // realizamos la petición POST al Back para insertar un Médico
    return this.http.post(`${base_url}/medicos`, medico, this.headers);
  }

  // Método para Actualizar los Médicos (recibe un objeto Médico por parámetro)
  actualizarMedico(medico: Medico) {

    // realizamos la petición PUT al Back para modificar el Médico
    return this.http.put(`${base_url}/medicos/${medico._id}`, medico, this.headers);
  }

  // Método para Eliminar un Médico (sólo recibe el id por parámetro)
  eliminarMedico(_id: string) {

    // realizamos la petición DELETE al Back para eliminar el Hospital
    return this.http.delete(`${base_url}/medicos/${_id}`, this.headers);
  }
}
