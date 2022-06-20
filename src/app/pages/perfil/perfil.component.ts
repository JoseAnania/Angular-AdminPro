/* Componente creado para el manejo de la Página del Perfil del Usuario */

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  // creamos una propiedad del Formulario del Perfil del Usuario
  public perfilForm: FormGroup;

  // creamos la propiedad del Modelo de Usuarios
  public usuario: Usuario;

  // creamos una propiedad para subir archivos
  public imagenSubir: File;

  // creamos una propiedad donde guardaremos la img seleccionada
  public imagenTemp: any = null;

  // inyectamos el FormBuilder que nos permite trabajar con Formularios
  // inyectamos el Servicio del Usuario
  // inyectamos el Servicio para Subir Archivos
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) {

    // llenamos la propiedad del Usuario con los datos del Servicio del Usuario
    this.usuario = usuarioService.usuario;          
  }

  ngOnInit(): void {

    // traemos desde la BD los campos a los TextBox los datos del USuario para mostrarlos
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });

  }

  // Método para Actualizar un Perfil de Usuario
  actualizarPerfil() {

    // llamamos al método del servicio que actualiza el Perfil del Usuario y le pasamos lo que traemos del formulario
    this.usuarioService.actualizarPerfil(this.perfilForm.value)

      // y nos suscribimos para que se dispare la petición
      .subscribe( () => {

        // extraemos los cambios que vienen del Form del Perfil del Usuario
        const {nombre, email} = this.perfilForm.value;

        // y se lo asignamos
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        // mostramos mensaje con Sweet Alert
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
       
        // en caso de error (el único posible sería que ya exista el email)
      }, (err) => {

        // mostramos el error con Sweet Alert
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  // Método capturar el archivo a subir
  cambiarImagen(file: File) {

    // obtenemos la imagen a subir
    this.imagenSubir = file;

    // lógica para cambiar de img y mostrar la imagen previa
    if(!file) {
      
      // si el archivo no existe, la img nueva será null
      return this.imagenTemp = null;
    }

    // si seleccionamos una img nueva, para cambiar la img actual, creamos una propiedad de FileRider (propio de JS)
    const reader = new FileReader();
    
    // guardamos el archivo que se está seleccionando (la img nueva)
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    }
  }

  // Método para subir Archivos
  subirImagen() {

    // llamamos al método del Servicio que actualiza la imagen
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)

        // cambiamos la foto en tiempo real
        .then(img => {this.usuario.img = img;
      
        // mostramos mensaje con Sweet Alert
        Swal.fire('Guardado', 'Imagen de Usuario actualizada', 'success');

        // en caso de error
      }).catch (err =>{

        // mostramos el error con Sweet Alert
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
  }
  
}
