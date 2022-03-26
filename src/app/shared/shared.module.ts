/* Módulo creado para agrupar las diferentes Shared de la App (y poder importarlas en conjunto y no una por una) */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';



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
    CommonModule
  ]

})
export class SharedModule { }
