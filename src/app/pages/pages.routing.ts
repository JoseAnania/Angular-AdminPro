/* Módulo creado para las Rutas Hijas de las diferentes Páginas (y no sobrecargar el Módulo app.Routing)*/

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [

    
  // Rutas exclusivas de usuarios Registrados (es decir Rutas Hijas o Protegidas)
  {
    path: '', 
    component: PagesComponent,
    // protegemos las rutas con el CanActivate del Guard (para que no se pueda entrar con la URL)
    canActivate: [AuthGuard],
    children: [
      {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Cuenta'}},
      {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
      {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Gráfica #1'}},
      {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de Usuario'}},
      {path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'}},
      {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
      {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Observables (Rxjs)'}},
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
