/* Componente creado para el uso y explicación de las PROMESAS */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // llamamos al método GetUsuarios mostrando sólo los usuarios 
    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    })
  }

  // Método GET para obtener los Usuarios (desde el sitio reqres.in) 
  getUsuarios() {

    // creamos una Promesa con su respectivo Callback
    const promesa = new Promise(resolve => {

      // usamos la Promesa "fetch" (nativo de Angular) para llamar la API
    fetch('https://reqres.in/api/users')

    // si la promesa se cumple (THEN) mostramos el contenido de la API con un JSON (que es otra Promesa)
    .then( resp => resp.json())
    .then(body => console.log(body.data));
    });

    // retornamos la Promesa
    return promesa;
  }

}
