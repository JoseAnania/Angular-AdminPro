import { Component, OnInit } from '@angular/core';
import { SiderbarService } from '../../services/siderbar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  // propiedad del Modelo del Usuario
  public usuario: Usuario;

  // inyectamos el servicio del Sidebar
  // inyectamos el Servicio de los Usuarios
  constructor(public sidebarService: SiderbarService,
              private usuarioService: UsuarioService) { 

    // obtenemos los datos del Usuario almacenado en el Servicio 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
