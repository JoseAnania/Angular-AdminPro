import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  // creamos una propiedad para validar el Formulario al enviarlo
  public formSumitted = false;

  // creamos una propiedad del Botón de Google
  public auth2: any;

  // definimos el Formulario con sus validaciones
  public loginForm = this.fb.group({
    
    // si el check de Remember se marcó, recuperamos el email del LocalStorage
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  // inyectamos el Módulo que nos permite usar las Rutas
  // inyectamos el FormBuilder para poder trabajar con Formularios Reactivos
  // inyectamos el Servicio de Usuario para la petición HTTP del Login
  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService) { }
  
  ngOnInit(): void {
    
    // llamamos al método de renderización del Botón de Google
    //this.renderButton();
  }

  // Método de Login que al ingresar nos lleve al Dashboard
  login() {

    // obtenemos los valores del Formulario y nos suscribimos para que se ejecute
    this.usuarioService.login(this.loginForm.value)
      .subscribe( resp => {
        
        // si el check Remember está marcado, guardamos el Email en el LocalStorage
        if (this.loginForm.get('remember')?.value){
          
          localStorage.setItem('email', this.loginForm.get('email')?.value);

          // si el check no está marcado
        } else {

          localStorage.removeItem('email');
        }
        
      // si el ingreso es válido, navegamos al Dashboard
      this.router.navigateByUrl('/');

        // si no es válido mostramos el error con Sweet Alert 2
      }, (err) => {

        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}
