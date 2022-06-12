/* Servicio creado para manejar la lógica de la subida de Imágenes */

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

// traemos del Enviroment la Base de la URL (parte igual de todas las peticiones)
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  // Método (con promesa) para actualizar foto (con los parámetros necesarios para actualizar una img)
  async actualizarFoto(archivo: File, tipo: 'usuarios' | 'medicos' | 'hospitales', id: string) {
    
    try {
      
      // construimos la URL necesaria para la actualización
      const url = `${base_url}/uploads/${tipo}/${id}`;

      // construimos la Información que enviaremos (es decir el archivo que subiremos) (usamos FormData que es propio de JS)
      const formData = new FormData();
      formData.append('imagen', archivo);

      // realizamos la petición PUT (de FormData)
      const resp = await fetch(url, {
        
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData
      });

      // respuesta 
      const data = await resp.json();
      
      // si se hizo todo correctamente
      if(data.ok) {
        return data.nombreArchivo;

        // si hubo error
      } else {
        console.log(data.msg);
        return false;
      }
            
    } catch (error) {
      
      // mostramos en consola el error
      console.log(error);
      return false;
    }
  }
}
