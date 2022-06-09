/* Módulo creado para agrupar los diferentes Componentes del Auth (y poder importarlas en conjunto y no una por una) */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  
  declarations: [

     // declaramos los componentes que queremos que sean parte del "conjunto"
     LoginComponent,
     RegisterComponent,

  ],

  exports: [

    // exportamos los componentes que queremos que sean parte del "conjunto"
    LoginComponent,
    RegisterComponent,
 ],

  imports: [
    CommonModule,
    // importamos el Módulo que nos permite usar las rutas
    RouterModule,
    // importamos el Módulo que nos permite usar los formularios
    FormsModule,
    // importamos el Módulo que nos permite usar formularios Reactivos
    ReactiveFormsModule,
    // importamos el Módulo que nos permite usar las peticiones HTTP
    HttpClientModule,
  ]
})
export class AuthModule { }
