/* Componente creado para manejar la lógica del Modal ára cambiar imagen en Mantenimientos */

import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';
import { FileUploadModalService } from '../../services/file-upload-modal.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

    // creamos una propiedad para subir archivos
    public imagenSubir: File;

    // creamos una propiedad donde guardaremos la img seleccionada
    public imagenTemp: any = null;

  // inyectamos el Servicio para subir imágenes del Modal
  // inyectamos el Servicio para Subir imágenes del Perfil del Usuario
  constructor(public fileUploadModalService: FileUploadModalService,
              public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  // Método para cerrar el Modal
  cerrarModal() {

    // eliminamos la imagen temporal cargada
    this.imagenTemp = null;

    // llamamos al método del servicio que cierra el Modal
    this.fileUploadModalService.cerrarModal;
  }

  // Método capturar el archivo a subir
  cambiarImagen(file: File) {

    // obtenemos la imagen a subir
    this.imagenSubir = file;

    // lógica para cambiar de img y mostrar la imagen previa
    if(!file) {
      
      // si el archivo no existe, la img nueva será null
      return this.imagenTemp = null;
    }

    // si seleccionamos una img nueva, para cambiar la img actual, creamos una propiedad de FileRider (propio de JS)
    const reader = new FileReader();
    
    // guardamos el archivo que se está seleccionando (la img nueva)
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    }
  }

  // Método para subir Archivos
  subirImagen() {

    // llamamos al método del Servicio que actualiza la imagen
    this.fileUploadService.actualizarFoto(this.imagenSubir, this.fileUploadModalService.tabla, this.fileUploadModalService.id)

        // cambiamos la foto en tiempo real
        .then(img => {
      
        // mostramos mensaje con Sweet Alert
        Swal.fire('Guardado', 'Imagen de Usuario actualizada', 'success');

        // llamamos al servicio con la propiedad que emite el cambio de imagen
        this.fileUploadModalService.nuevaImagen.emit(img);

        // cerramos el Modal
        this.cerrarModal();

        // en caso de error
      }).catch (err =>{

        // mostramos el error con Sweet Alert
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
  }

}
