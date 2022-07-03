// Componente creado para el manejo de la lógica de Creación o Actualización de un Médico

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../../services/hospital.service';
import { Hospital } from '../../../../models/hospital.model';
import { MedicoService } from '../../../../services/medico.service';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  // creamos una propiedad del Formulario del Médico
  public medicoForm: FormGroup;

  // creamos la propiedad de Arreglo de Hospitales
  public hospitales: Hospital[] = [];

  // creamos una propiedad para tomar el Médico Seleccionado
  public medicoSeleccionado: Medico;

  // creamos una propiedad para tomar el Hospital Seleccionado en Combo
  public hospitalSeleccionado: Hospital;

  // inyectamos el FormBuilder que nos permite trabajar con Formularios
  // inyectamos el Servicio de Hospitales para cargarlo en el Combo
  // inyectamos el Servicio del Médico
  // inyectamos las Rutas para poder navegar
  // inyectamos la Ruta Activa para poder tomar el id del URL
  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService, 
              private router: Router, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    // obtenemos el ID del Médico desde la URL
    this.activatedRoute.params.subscribe(({id}) => {

      // si el Id del Médico es nuevo, salimos, de lo contrario continuamos
      if (id === 'nuevo') {
        return;
      } 
      
      // llamamos al servicio que obtiene el médico por Id y nos suscribimos para disparar la petición
      // lo pasamos por el PIPE para darle tiempo a cargar la imagen al servidor
      this.medicoService.cargarMedicoPorId(id)
        .pipe(
          delay(100)
        )
        .subscribe(medico => {

          // si el Médico no existe (es decir alguien pone en la URL un id cualquiera), redireccionamos, sino continuamos
          if (!medico) {
            this.router.navigateByUrl(`medicos`);
          }
          
          // desestructuramos el objeto Médico recibido con los datos que necesitamos (nombre de Médico y Id de Hospital)
          const {nombre, hospital:{_id}} = medico;

          // cargamos la propiedad del Médico seleccionado con el que estamos recibiendo
          this.medicoSeleccionado = medico;

          // establecemos los valores al formulario
          this.medicoForm.setValue({nombre, hospital: _id});
        });
    }); 

    // traemos desde la BD los campos a los TextBox los datos del Médico para mostrarlos
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', [Validators.required]],
    });

    // llamamos al método que carga los Hospitales en el Combo
    this.cargarHospitales();

    // creamos un Observable que esté pendiente de los cambios en el Hospital que viene en el Form 
    // y nos suscribimos para disparar la petición cuando el valor del Combo cambie
    this.medicoForm.get('hospital').valueChanges
      .subscribe(hospitalId => {
        
        // cargamos la propiedad con el Hospital seleccionado en el combo
        this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId);
      })
  }

  // Método para Cargar los Hospitales en el Combo
  cargarHospitales() {

    // llamamos al método del Servicio que obtiene los Hospitales y nos suscribimos para disparar la petición
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {

        // cargo los hospitales de la BD en la propiedad vacía
        this.hospitales = hospitales;
      })
  }

  // Método para Actualizar o Crear un Médico
  guardarMedico() {

    // si existe un médico seleccionado, actualizamos, sino cremos
    if(this.medicoSeleccionado) {

      // desestructuramos el Formulario para obtener lo que necesitamos para actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id,
      }

       // llamamos al método del Servicio que actualiza un Médico y nos suscribimos para disparar la petición
       this.medicoService.actualizarMedico(data)
         .subscribe(resp => {

          // usamos SweetAlert para el mensaje de Actualización
          Swal.fire('Médico Actualizado', `${data.nombre} actualizado correctamente`, 'success');

         })

    } else {
      
      // llamamos al método del Servicio que crea un Médico nuevo y nos suscribimos para disparar la petición
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe( (resp: any) => {
  
          // usamos SweetAlert para el mensaje de Creación
          Swal.fire('Médico Creado', `${this.medicoForm.value.nombre} creado correctamente`, 'success');
  
          // redireccionamos a la página del Médico creado
          this.router.navigateByUrl(`/medico/${resp.medico._id}`)
        });
    }
  }
}
