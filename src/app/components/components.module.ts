/* Módulo creado para manejar la lógica de los componentes de las páginas */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { NgChartsModule } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';

@NgModule({
  
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent
  ],

  // exportamos los Componentes que usaremos fuera de este módulo
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    // importamos el Módulo que nos permite usar los Gráficos de ng2-charts
    NgChartsModule,
  ]

})
export class ComponentsModule { }
