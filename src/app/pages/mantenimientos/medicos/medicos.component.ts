/* Componente creado para manejar la lógica de los Médicos/Mantenimiento */

import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { FileUploadModalService } from 'src/app/services/file-upload-modal.service';
import { MedicoService } from '../../../services/medico.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  // propiedad Arreglo de Médicos
  public medicos: Medico[] = [];

  // propiedad del loading
  public cargando: boolean = true;

  // inyectamos el Servicio de Médicos
  // inyectamos el Servicio de subir imágen desde el Modal
  // inyectamos el Servicio de la Búsqueda
  constructor(private medicoService: MedicoService,
              private fileUploadModalService: FileUploadModalService,
              private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    // llamamos al método que carga los Médicos al iniciar la página
    this.cargarMedicos();

    // llamamos al servicio con la propiedad que emite el cambio de imagen y nos suscribimos recargando los médicos
    // usamos el Pipe y el Delay para darle tiempo al servidor a cambiar la imagen antes de refrescar
    this.fileUploadModalService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarMedicos());
  }

  // Método que carga los Médicos
  cargarMedicos() {

    // cargamos el loading
    this.cargando = true;

    // llamamos al método del servicio para que obtiene los médicos
    // y nos suscribimos para que se dispare la petición
    this.medicoService.cargarMedicos()
      .subscribe(medicos => {

        // cancelamos el loading
        this.cargando = false;

        // cargamos los hospitales
        this.medicos = medicos;
      });
  }

  // Método para elimina un Hospital
  eliminarMedico(medico: Medico) {

    // se muestra mensaje de confirmación de eliminación (según documentación de Sweet Alert)
    return Swal.fire({
      title: '¿Está seguro que desea borrar el Médico?',
      text: `Está a punto de eliminar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        // llamamos al método del Servicio para eliminar y nos suscribimos para que se ejecute
        this.medicoService.eliminarMedico(medico._id)
          .subscribe( resp => {
            // refrescamos el arreglo de médicos
            this.cargarMedicos();

            // mostramos mensaje
            Swal.fire(
            'Médico Eliminado',
            `${medico.nombre} fue eliminado correctamente`,
            'success',
          ) 
          });
      }
    })
  }

  // Método que abre el Modal para cargar una imágen
  abrirModal(medico: Medico) {

    // llamamos al método del Servicio que abre el Modal
    this.fileUploadModalService.abrirModal('medicos', medico._id, medico.img);
  }

  // Método para la Búsqueda
  buscar(termino: string) {
    
    // si no hay caracteres en la búsqueda no buscamos y mostramos el Arreglo de Médicos
    if(termino.length === 0) {
      
      return this.cargarMedicos();
    } 

    // llamamos al método que realiza la búsqueda y nos suscribimos para ejecutarlo
    return this.busquedasService.buscar('medicos', termino)
      .subscribe(resp => {

        // llenamos las propiedades
        this.medicos = resp as Medico[];
      });
  }
}
