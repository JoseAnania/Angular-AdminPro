/* Servicio creado para manejar la lógica de la subida de Imágenes desde el Modal en Mantenimientos*/

import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

// traemos del Enviroment la Base de la URL (parte igual de todas las peticiones)
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadModalService {

  // creamos una propiedad para ocultar o mostrar el Modal (por ser un Servicio es mejor hacerla privada para evitar que se use desde otros componentes)
  private _ocultarModal: boolean = true; 

  // definimos la propiedad del tipo de Dato (usuario, médico o hospital)
  public tabla: 'usuarios'|'medicos'|'hospitales';

  // definimos la propiedad del id 
  public id: string;

  // definimos la propiedad de la imagen
  public img: string;

  // definimos una propiedad con un EventEmitter (para usar cuando subimos una foto y "refresque" la página) 
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  // Método GETTER para ocultar el Modal
  get ocultarModal() {
    return this._ocultarModal;
  }

  // Método para abrir el Modal
  abrirModal( tabla: 'usuarios'|'medicos'|'hospitales', id: string, img: string = 'no-img') {

    // abrimos el modal
    this._ocultarModal = false;

    // llenamos las propiedades con los recibidos como argumentos
    this.tabla = tabla;
    this.id = id;
    this.img = `${base_url}/uploads/${tabla}/${img}`;
  }

  // Método GETTER para cerrar el Modal
  get cerrarModal() {
    return this._ocultarModal = true;
  }

  constructor() { }
}
