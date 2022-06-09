/* Clase creada para el Modelo de Usuarios */

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
}