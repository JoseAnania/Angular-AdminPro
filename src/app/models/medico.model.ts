/* Clase creada para el Modelo de Médicos */

import { MedicoUser } from '../interfaces/medico-usuario.interface';
import { Hospital } from './hospital.model';

export class Medico {

    // en el constructor definimos la propiedades (que serán las mismas definidas en el modelo del Back) 
    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,

        // el usuario que viene en el médico será del tipo definido en la Interface
        public usuario?: MedicoUser,

        // el hospital que viene en el médico será del tipo definido en el Modelo
        public hospital?: Hospital,
    ) {}
}