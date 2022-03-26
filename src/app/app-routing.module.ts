/* Módulo creado para manejar las rutas de la App (es decir las diferentes páginas) */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

// creamos las Rutas de la App 
const routes: Routes = [

  // Las rutas hijas (de las pages) y las públicas (del auth) se encuentran en sus propios módulos
  
  // Rutas default
  {path: '**', component: NopagefoundComponent},
]

@NgModule({
  imports: [

    // importamos las Rutas especificando las rutas principales
    RouterModule.forRoot(routes),
    // importamos el Módulo que contiene las Rutas Hijas
    PagesRoutingModule,
    // importamos el Módulo que contiene las Rutas Públicas
    AuthRoutingModule,
  ],

  // exportamos el RouterModule para que los demás Módulos puedan disponer de él
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
