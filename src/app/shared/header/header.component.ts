import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  // inyectamos el Servicio de los Usuarios
  constructor(private usuarioService: UsuarioService) { }

  // Método para desloguearse
  logout() {

    // llamamos al método del servicio para desloguearse
    this.usuarioService.logout();
  }
}
