/* Componente creado para manejar la lógica de la Búsqueda Global del Header */ 

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  // creamos las propiedades arreglo de cada modelo a llenar cuando se realize la búsqueda
  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  // inyectamos el ActivatedRoute (que nos permite obtener el término de búsqueda de la URL)
  // inyectamos el Servicio de las Búsquedas
  constructor(private activatedRoute: ActivatedRoute,
              private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    // obtenemos los parámetros de la URL y desestructuramos para obtener sólo el término de la búsqueda
    this.activatedRoute.params
      .subscribe(({termino}) => {

        // llamamos al método de la Búsqueda
        this.busquedaGlobal(termino);
      })
  }

  // Método que recibe la petición de la búsqueda
  busquedaGlobal(termino: string) {

    // llamamos al método del servicio que realiza la búsqueda y nos suscribimos para ejecutar
    this.busquedasService.busquedaGlobal(termino)
      .subscribe((resp: any) => {
        
        // llenamos las propiedades arreglo con el resultado de la búsqueda
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
      })
  }
}
