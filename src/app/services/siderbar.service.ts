/* Servicio creado para manejar la lógica global de todo lo relacionado con la Barra Lateral */
/* Esto proviene del Backend ==> Helpers ==> menuLateral-frontend.js */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiderbarService {

  // creamos una propiedad arreglo del menu
  public menu = [];

  // método para cargar el Menú Lateral
  cargarMenu() {

    // llenamos la propiedad con el Menu almacenado en el LocalStorage (que mostrará el Menú según el Rol del Usuario)
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }
}
