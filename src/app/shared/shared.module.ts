/* Módulo creado para agrupar las diferentes Shared de la App (y poder importarlas en conjunto y no una por una) */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
 
  declarations: [

    // declaramos las Shared que queremos que sean parte del "conjunto"
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  
  exports: [

    // exportamos las Shared que queremos que sean parte del "conjunto"
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
  ],

  imports: [
    CommonModule,
    // importamos el Módulo que nos permite utilizar las rutas
    RouterModule,
    // importamos el Módulo que nos permite utilizar los formularios
    FormsModule,
  ]

})
export class SharedModule { }
