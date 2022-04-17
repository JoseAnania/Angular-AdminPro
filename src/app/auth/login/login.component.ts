import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // inyectamos el Módulo que nos permite usar las Rutas
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // Método de Login que al ingresar nos lleve al Dashboard
  login() {

    this.router.navigateByUrl('/');
  }

}
