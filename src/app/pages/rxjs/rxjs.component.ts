/* Componente creado para el uso y explicación de las RXJS */

import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, Observable, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  // propiedad para guardar los valores del Observable3
  public intervaloSubs3: Subscription;

  constructor() {

    // para ejecutar el Observable (1) nos debemos Suscribir
    this.retornaObservable().subscribe(

      // retornamos el valor por consola
      valor => console.log('Obs1:', valor),

      // mensaje de error en caso de existir
      error => console.warn('Error!!', error),

      // mensaje si se completa el Observable
      () => console.info('Observable1 terminado!!')
    );

    // para ejecutar el Observable (2) nos debemos Suscribir
    this.retornaIntervalo().subscribe(
      
      // retornamos el valor por consola
      (valor) => console.log('Obs2:', valor),

    );

    // para ejecutar el Observable (3) nos debemos Suscribir
    this.intervaloSubs3 = this.retornaIntervalo2().subscribe(
      
      // retornamos el valor por consola
      (valor) => console.log('Obs3:', valor),

    );

   }

   // implementamos el OnDestroy para destruir el Observable3 (no lo terminamos con Take)
  ngOnDestroy(): void {
    
    this.intervaloSubs3.unsubscribe();
  }

   // Método que retorna un Observable (1)
   retornaObservable(): Observable<number> {

    // creamos una variable para almacenar el valor
    let i = 0;

    // creamos un Observable (del tipo Number) con su respectivo Callback
    const obs$ = new Observable<number>(observer => {

      // el Callback será un Intervalo de tiempo que manda un valor por segundo y medio
      const intervalo = setInterval( ()=>{

        i++;
        observer.next(i);

        // terimnamos el Callback (es decir el Intervalo) del Observable al llegar a 5
        if (i === 5) {
          
          clearInterval(intervalo);
          observer.complete();
        }

      }, 1500 )
    });

    return obs$;
   }

   // Método que retorna un Observable (2)
   retornaIntervalo(): Observable<string> {

    // creamos un Observable (del tipo Interval) con su respectivo Callback
    return interval(1000)
    
    // utilizamos el Pipe para permitir modificar la info
                        .pipe(
    
    // utilizamos el Take para terminar el Observable en 10
                          take(10), 

    // utilizamos Map para contar desde 1 hasta 10 (no de 0 a 9) y transformar la info
                          map(valor => 'Hola Mundo ' + (valor + 1))
                        );
   }

   // Método que retorna un Observable (3) (se termina con el OnDestroy)
   retornaIntervalo2(): Observable<number> {

    // creamos un Observable (del tipo Interval) con su respectivo Callback
    return interval(500)
    
    // utilizamos el Pipe para permitir modificar la info
                          .pipe(
  
      // utilizamos Map para contar desde 1 hasta 10 (no de 0 a 9) y transformar la info
                            map(valor => (valor + 1)),

      // utilizamos el Filter para calcular sólo los números pares
                            filter(valor => (valor % 2 === 0) ? true: false)
                          );
    
   }
}
