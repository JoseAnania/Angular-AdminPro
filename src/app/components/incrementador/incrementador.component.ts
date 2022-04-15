/* Componente creado para manejar la lógica de los incrementadores */

/* Este componente es HIJO de la PAGE PROGRESS */

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

ngOnInit() {
  
  this.btnClass = `btn ${this.btnClass}`;
}

// declaramos el decorador INPUT que le dice a este componente que puede recibir desde el padre (Page Progress)

// propiedad para manejar el valor del incrementador
@Input('valor') progreso: number = 40;

// propiedad para manejar la clase del Botón del incrementador (color de los incrementadores)
@Input('btnClass') btnClass: string = 'btn-primary';

// declaramos el decorador OUTPUT que le dice a este componente que puede enviar al padre (Page Progress)
@Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

// método para aumentar y disminuir el incrementador desde los botones
cambiarValor(valor: number) {
  
  // validamos que el máximo sea el 100% 
  if (this.progreso >= 100 && valor >= 0 ) {

    // emitimos el máximo (con el Output)
    this.valorSalida.emit(100);
    return this.progreso = 100;
  }

  // validamos que el mínimo sea el 0% 
  if (this.progreso <= 0 && valor < 0 ) {

    // emitimos el mínimo (con el Output)
    this.valorSalida.emit(0);
    return this.progreso = 0;
  }

  // cambiamos el valor
  this.progreso = this.progreso + valor;
  return this.valorSalida.emit(this.progreso);
}

// método para aumentar y disminuir el incrementador desde el TextBox (es decir manualmente)
onChange(nuevoValor: number) {

  // validamos que el máximo sea 100 y el menor 0
  if(nuevoValor >= 100 ) {

    nuevoValor = 100;

  } else if (nuevoValor <= 0) {

    nuevoValor = 0;

  } else {

    this.progreso = nuevoValor;
  }

  // emitimos el valor
  this.valorSalida.emit(this.progreso);
}

}
