/* Módulo creado para agrupar las diferentes Páginas de la App (y poder importarlas en conjunto y no una por una) */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';


@NgModule({
  declarations: [

    // declaramos las páginas que queremos que sean parte del "conjunto"
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
  ],

  exports: [

    // exportamos las páginas que queremos que sean parte del "conjunto"
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
  ],

  imports: [
    CommonModule,
    // importamos el Módulo que agrupa los Shared usados en las Pages
    SharedModule,
    // importamos el Módulo que maneja las Rutas
    AppRoutingModule,
    // importamos el Módulo que nos permite usar los Formularios de Angular
    FormsModule,
    // importamos el Módulo que nos permite usar los Componentes
    ComponentsModule,
    // importamos el Módulo que nos permite usar los Formularios Reactivos
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
