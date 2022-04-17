/* Servicio creado para manejar la lógica global de todo lo relacionado con la Barra Lateral */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiderbarService {

  // creamos una propiedad Arreglo que define el Menu del Sidebar
  menu: any[] = [

    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'Gráficas', url: 'grafica1' },
      ]
    },
  ];

  constructor() { }
}
