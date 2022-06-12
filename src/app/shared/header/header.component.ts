import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

// propiedad del Modelo del Usuario
public usuario: Usuario;

  // inyectamos el Servicio de los Usuarios
  constructor(private usuarioService: UsuarioService) { 

  // obtenemos los datos del Usuario almacenado en el Servicio 
  this.usuario = usuarioService.usuario;
  }

  // Método para desloguearse
  logout() {

    // llamamos al método del servicio para desloguearse
    this.usuarioService.logout();
  }
}
