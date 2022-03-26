/* Módulo creado para las Rutas Públicas (de acceso no registrado) de las diferentes Páginas (y no sobrecargar el Módulo app.Routing)*/
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  // Rutas Públicas
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

// al exportar cambiar por el nombre que querramos
export class AuthRoutingModule {}
