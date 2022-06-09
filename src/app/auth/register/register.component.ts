import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // creamos una propiedad para validar el Formulario al enviarlo
  public formSumitted = false;

  // definimos el Formulario con sus validaciones
  public registerForm = this.fb.group({
    
    nombre: ['José', [Validators.required]],
    email: ['test100@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    password2: ['123456', [Validators.required]],
    terminos: [true, [Validators.requiredTrue]],

    // agregamos una validación personalizada para validar el formulario completo
  }, {
    validators: this.passwordsIguales('password', 'password2')
  } );

  // inyectamos el FormBuilder para poder trabajar con Formularios Reactivos
  // inyectamos el Servicio de Usuario (que nos permite crear un usuario)
  // inyectamos el Servicio que nos permite trabajar con las Rutas
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router) { }

  // Método para capturar la información del Formulario
  crearUsuario() {

    // cambiamos el valor de la propiedad del Formulario
    this.formSumitted = true;

    console.log(this.registerForm.value);

    // validamos que el Formulario sea valido
    if(this.registerForm.invalid) {

      return;
    }

    // si es válido realizamos el posteo del Formulario (con la creación del Usuario) y nos suscribimos para que se ejecute
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe( resp => {

        // si la creación es válida, navegamos al Dashboard
        this.router.navigateByUrl('/');

        // si no es válido mostramos el error con Sweet Alert 2
      }, (err) => {

        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  // Método para validar los campos que retorna un booleano
  campoNoValido(campo: string): boolean {
  
    // si el campo es invalido y fue mandando retornamos true (es decir el campo NO es válido)
    if(this.registerForm.get(campo)?.invalid && this.formSumitted) {

      return true;

    } else {

      return false;
    }
  }


  // Método para validar que las Contraseñas sean iguales
  contrasenasNoValidas() {
    
    // obtenemos la contraseña 1
    const pass1 = this.registerForm.get('password')?.value;

    // obtenemos la contraseña 2
    const pass2 = this.registerForm.get('password2')?.value;

    // si son diferentes las contraseñas y el Form fue mandado retornamos true (es decir las contraseñas son inválidas)
    if((pass1 !== pass2) && this.formSumitted) {

      return true;
    
    } else {

      return false;
    }
  }

   // Método para validar el Check de Aceptar los Términos
   aceptaTerminos() {
  
    // si el check es falso y fue mandando retornamos true (es decir el check NO es válido)
    return !this.registerForm.get('terminos')?.value && this.formSumitted;
  }

  // Método para validar el Formulario con los passwords iguales
  passwordsIguales(pass1Name: string, pass2Name: string) {
  
    // función que se dispara con el Formulario y retorna un objeto si da un error o null si no da error
    return (formGroup: FormGroup) => {

      // extraemos las referencias a ambos passwords
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      // si son iguales, retornamos null
      if (pass1Control?.value === pass2Control?.value){

        pass2Control?.setErrors(null);

        // caso contrario mostramos el error (que es un objeto)
      } else {

        pass2Control?.setErrors({noEsIgual: true});
      }
    }
  }
}
