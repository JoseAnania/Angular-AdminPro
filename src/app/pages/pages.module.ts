/* Módulo creado para agrupar las diferentes Páginas de la App (y poder importarlas en conjunto y no una por una) */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [

    // declaramos las páginas que queremos que sean parte del "conjunto"
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
  ],

  exports: [

    // exportamos las páginas que queremos que sean parte del "conjunto"
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
  ],

  imports: [
    CommonModule,
    // importamos el Módulo que agrupa los Shared usados en las Pages
    SharedModule,
    // importamos el Módulo que maneja las Rutas
    AppRoutingModule,
  ]
})
export class PagesModule { }
