/* Clase creada para el Modelo de Hospitales */

import { HospitalUser } from "../interfaces/hospital-usuario.interface";

export class Hospital {

    // en el constructor definimos la propiedades (que serán las mismas definidas en el modelo del Back) 
    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,

        // el usuario que viene en el hospital será del tipo definido en la Interface
        public usuario?: HospitalUser,
    ) {}
}