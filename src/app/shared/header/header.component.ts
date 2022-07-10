import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

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
  // inyectamos el Servicio que nos permite utilizar las rutas
  constructor(private usuarioService: UsuarioService,
              private router: Router) { 

  // obtenemos los datos del Usuario almacenado en el Servicio 
  this.usuario = usuarioService.usuario;
  }

  // Método para desloguearse
  logout() {

    // llamamos al método del servicio para desloguearse
    this.usuarioService.logout();
  }

  // Método de Búsqueda Global (que se encuentra en el Header y permite buscar Médicos, Usuarios u Hospitales)
  buscarGlobal(termino: string) {

    // validamos que la búsqueda no sea vacía
    if(termino.length === 0) {
      return;
    }

    // ruta a la cual nos moveremos según la búsqueda
    this.router.navigateByUrl(`/buscar/${termino}`);
  }
}
