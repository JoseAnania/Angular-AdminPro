/* Este componente es PADRE del COMPONENTS INCREMENTADOR */

import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  // propiedades para manejar el progreso de la barra
  progreso1: number = 25;
  progreso2: number = 35;

  // métodos para obtener el progreso de las barras
  get getProgreso1() {

    return `${this.progreso1}%`;
  }

  get getProgreso2() {

    return `${this.progreso2}%`;
  }
}
