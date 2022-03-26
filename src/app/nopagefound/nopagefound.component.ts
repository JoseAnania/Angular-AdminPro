/* Componente generado para manejar la lógica de la página default (404) */

import { Component } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.css']
})
export class NopagefoundComponent {

  // propiedad para obtener el año en curso y mostrarlo en la página 404
  year = new Date().getFullYear();
}
