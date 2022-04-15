/* Componente creado para manejar la lógica de las Donas (Componente Hijo de Gráfica1)*/

import { Component, Input } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  // Declaramos el decorador Input para recibir info desde el componente Padre (Gráfica1)
  @Input() title: string = "Sin Título";

   // Gráfico de Dona según documentación de ng2-charts
   @Input('labels') doughnutChartLabels: string[] = [ 'Label1', 'Label2', 'Label3' ];
   @Input('data') doughnutChartData: ChartData<'doughnut'> = {
     labels: this.doughnutChartLabels,
     datasets: [
      { 
        data: [ 350, 450, 100 ], 
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'] 
      }
     ]
   };
   public doughnutChartType: ChartType = 'doughnut';


}
