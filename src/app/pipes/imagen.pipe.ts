/* Pipe personalizado creado para mostrar la imágen en Mantenimientos/ Hospitales o Médicos 
  (la de Usuarios utilizamos un Getter => ver usuario.models.ts)*/

import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

// obtenemos de los Enviroments la Base de la URL (parte común de todas las URL)
const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tabla: 'usuarios'|'medicos'|'hospitales'): string {
    
    // validamos que la imagen exista (si no existe mostramos la no img)
    if (!img) {
      return `${base_url}/uploads/hospitales/no-image`; 
    }

    // validamos si el hospital tiene imagen
    else if (img) {

      return `${base_url}/uploads/${tabla}/${img}`;

    // de lo contrario, mostramos la "no-img"
    } else {
      
      return `${base_url}/uploads/hospitales/no-image`; 
    }
  }
}
