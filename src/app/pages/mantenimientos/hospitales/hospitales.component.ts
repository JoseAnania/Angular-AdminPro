/* Componente creado para manejar la lógica de los Hospitales/Mantenimiento */

import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { FileUploadModalService } from 'src/app/services/file-upload-modal.service';
import { delay } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  // propiedad Arreglo de Hospitales
  public hospitales: Hospital[] = [];

  // propiedad del loading
  public cargando: boolean = true;

  // inyectamos el Servicio de Hospitales
  // inyectamos el Servicio de subir imágen desde el Modal
  // inyectamos el Servicio de la Búsqueda
  constructor(private hospitalService: HospitalService,
              private fileUploadModalService: FileUploadModalService,
              private busquedasService: BusquedasService,) { }

  ngOnInit(): void {

    // llamamos al método que carga los hospitales al iniciar la página
    this.cargarHospitales();

    // llamamos al servicio con la propiedad que emite el cambio de imagen y nos suscribimos recargando los hospitales
    // usamos el Pipe y el Delay para darle tiempo al servidor a cambiar la imagen antes de refrescar
    this.fileUploadModalService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarHospitales());
  }

  // Método para la Búsqueda
  buscar(termino: string) {
    
    // si no hay caracteres en la búsqueda no buscamos y mostramos el Arreglo de Hospitales
    if(termino.length === 0) {
      
      return this.cargarHospitales();
    } 

    // llamamos al método que realiza la búsqueda y nos suscribimos para ejecutarlo
    return this.busquedasService.buscar('hospitales', termino)
      .subscribe(resp => {

        // llenamos las propiedades
        this.hospitales = resp as Hospital[];
      });
  }

  // Método que carga los Hospitales
  cargarHospitales() {

    // cargamos el loading
    this.cargando = true;

    // llamamos al método del servicio para que obtiene los hospitales
    // y nos suscribimos para que se dispare la petición
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {

        // cancelamos el loading
        this.cargando = false;

        // cargamos los hospitales
        this.hospitales = hospitales;
      });
  }

  // Método para actualizar un Hospital
  actualizarHospital(hospital: Hospital) {

    // llamamos al método del Servicio que actualiza un Hospital y nos suscribimos para disparar la petición
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(resp => {
        
        // Mostramos mensaje con SweetAlert
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  // Método para elimina un Hospital
  eliminarHospital(hospital: Hospital) {

    // llamamos al método del Servicio que elimina un Hospital y nos suscribimos para disparar la petición
    this.hospitalService.eliminarHospital(hospital._id)
      .subscribe(resp => {
        
        // cargamos la lista sin el hospital eliminado
        this.cargarHospitales();

        // Mostramos mensaje con SweetAlert
        Swal.fire('Eliminado', hospital.nombre, 'success');
      });
  }

  // Método que abre un Modal de SweetAlert (para la creación de un Hospital)
  async abrirSweetAlert() {

    // copiamos según documentación de Sweetalert
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el Nombre del Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
    });

    // validamos que no recibamos un string vacío (es decir que se escriba algo)
    if (value.trim().length > 0) {
      
      // llamamos al método del Servicio que crea un Hospital y nos suscribimos para disparar la petición
      this.hospitalService.crearHospital(value)
        .subscribe((resp: any) => {

          // añadimos el hospital creado al arreglo para mostrarlo
          this.hospitales.push(resp.hospital);
        })
    }
  }

  // Método que abre el Modal para cargar una imágen
  abrirModal(hospital: Hospital) {

    // llamamos al método del Servicio que abre el Modal
    this.fileUploadModalService.abrirModal('hospitales', hospital._id, hospital.img);
  }
}
