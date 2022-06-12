/* Clase creada para el Modelo de Usuarios */

import { environment } from "src/environments/environment"

// obtenemos de los Enviroments la Base de la URL (parte común de todas las URL)
const base_url = environment.base_url;

export class Usuario {

    // en el constructor definimos la propiedades (que serán las mismas definidas en el modelo del Back) 
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ) {}

    // Método GET para obtener la Imagen del Usuario
    get imagenUrl() {
        
        // validamos si el usuario tiene imagen
        if (this.img) {

            return `${base_url}/uploads/usuarios/${this.img}`;

            // de lo contrario, mostramos la "no-img"
        } else {
            
            return `${base_url}/uploads/usuarios/no-image`; 
        }
    }
}