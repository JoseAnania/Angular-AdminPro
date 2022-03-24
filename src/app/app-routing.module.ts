/* Módulo creado para manejar las rutas de la App (es decir las diferentes páginas) */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';

// creamos las Rutas de la App
const routes: Routes = [

  // Rutas exclusivas de usuarios Registrados (Rutas Hijas o Protegidas)
  {
    path: '', 
    component: PagesComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'progress', component: ProgressComponent},
      {path: 'grafica1', component: Grafica1Component},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  },
  // Rutas Públicas
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  // Rutas default
  {path: '**', component: NopagefoundComponent},
]

@NgModule({
  declarations: [],

  imports: [

    // importamos las Rutas especificando las rutas principales
    RouterModule.forRoot(routes)
  ],

  // exportamos el RouterModule para que los demás Módulos puedan disponer de él
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
