/* Componente creado para manejar la lógica de los Usuarios/Mantenimiento */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { FileUploadModalService } from '../../../services/file-upload-modal.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  // propiedad para mostrar el total de usuarios
  public totalUsuarios: number = 0;
  
  // propiedad Arreglo de Usuarios
  public usuarios: Usuario[] = [];

  // propiedad para almacenar Temporalmente el Arreglo de Usuarios
  public usuariosTemp: Usuario[] = [];

  // propiedad para la páginación
  public desde: number = 0;

  // propiedad del loading
  public cargando: boolean = true;

  // inyectamos el Servicio del Usuario
  // inyectamos el Servicio de la Búsqueda
  // inyectamos el Servicio de subir imágen desde el Modal
  constructor(private usuarioService: UsuarioService,
              private busquedasService: BusquedasService,
              private fileUploadModalService: FileUploadModalService) { }

  ngOnInit(): void {

    // llamamos al método para que al iniciar la página cargue los usuarios
    this.cargarUsuarios();

    // llamamos al servicio con la propiedad que emite el cambio de imagen y nos suscribimos recargando los usuarios
    // usamos el Pipe y el Delay para darle tiempo al servidor a cambiar la imagen antes de refrescar
    this.fileUploadModalService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarUsuarios());
  }

  // Método para mostrar los Usuarios
  cargarUsuarios() {
    
    // activamos el loading
    this.cargando = true;

    // disparamos (con el Suscribe) la petición para obtener los Usuarios y mostrarlos (paginados)
    // la respuesta será del tipo de la Interface CargarUsuario
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe( ({total, usuarios}) => {
        
        // llenamos las propiedades
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;

        // desactivamos el loading
    this.cargando = false;
      })
  }

  // Método para cambiar páginas
  cambiarPagina(valor: number) {

    // igualamos la propiedad "desde" al valor recibido por parámetro
    this.desde += valor;

    // validamos que no supere los límites inferior y superior
    if(this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    // mostramos los usuarios correspondientes a la paginación
    this.cargarUsuarios();
  }

  // Método para la Búsqueda
  buscar(termino: string) {
    
    // si no hay caracteres en la búsqueda no buscamos y mostramos el último Arreglo de Usuarios buscados
    if(termino.length === 0) {
      
      return this.usuarios = this.usuariosTemp;
    } 

    // llamamos al método que realiza la búsqueda y nos suscribimos para ejecutarlo
    return this.busquedasService.buscar('usuarios', termino)
      .subscribe(resp => {

        // llenamos las propiedades
        this.usuarios = resp as Usuario[];
      });
  }

  // Método para eliminar un Usuario
  eliminarUsuario(usuario: Usuario) {

    // validamos que no se pueda borrar a si mismo el usuario
    if(usuario.uid === this.usuarioService.uid) {

      // mostramos mensaje con Sweet Alert
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    // se muestra mensaje de confirmación de eliminación (según documentación de Sweet Alert)
    return Swal.fire({
      title: '¿Está seguro que desea borrar el Usuario?',
      text: `Está a punto de eliminar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        // llamamos al método del Servicio para eliminar y nos suscribimos para que se ejecute
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe( resp => {
            // refrescamos el arreglo de usuarios
            this.cargarUsuarios();

            // mostramos mensaje
            Swal.fire(
            'Usuario Eliminado',
            `${usuario.nombre} fue eliminado correctamente`,
            'success',
          ) 
          });
      }
    })
  }

  // Método para cambiar el Rol de Usuario desde el Mantenimiento
  cambiarRole(usuario: Usuario) {
    
    // llamamos al método que Actualiza un Role de Usuario y nos suscribimos para que se ejecute
    this.usuarioService.actualizarRole(usuario)
      .subscribe(resp => {
        console.log(resp);
      })
  }

  // Método que abre el Modal para cargar una imágen
  abrirModal(usuario: Usuario) {

    // llamamos al método del Servicio que abre el Modal
    this.fileUploadModalService.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
