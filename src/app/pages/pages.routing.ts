/* Módulo creado para las Rutas Hijas de las diferentes Páginas (y no sobrecargar el Módulo app.Routing)*/

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';


const routes: Routes = [

    
  // Rutas exclusivas de usuarios Registrados (es decir Rutas Hijas o Protegidas)
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

// al exportar cambiar por el nombre que querramos
export class PagesRoutingModule {}
