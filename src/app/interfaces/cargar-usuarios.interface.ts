/* Interface creada para definir la forma al cargar y mostrar los Usuarios en Mantenimiento/Usuarios */

import { Usuario } from '../models/usuario.model';

export interface CargarUsuario {
    total: number;
    usuarios: Usuario[];
}