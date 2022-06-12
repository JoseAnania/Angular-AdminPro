import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  // propiedad para almacenar el título de la página
  public titulo: string;

  // propiedad para destruir el titulo 
  public tituloSubs$: Subscription;

  // inyectamos las Rutas
  constructor(private router: Router) {

    // llamamos al método para obtener los títulos de las páginas
    this.tituloSubs$ = this.getTitulos()
    
    // nos suscribimos porque es un Observable
    .subscribe(data =>{

      // mostramos el título en la página
      this.titulo = data['titulo'];

      // mostramos el título en la pestaña
      document.title = `AdminPro - ${this.titulo}`;
  });
    
  }
  ngOnDestroy(): void {
    
    // implementamos el OnDestroy para destruir el Observable
    this.tituloSubs$.unsubscribe();
  }

   // Método para obtener los títulos
   getTitulos() {

    // traemos desde las Rutas el título de la página (data) con el Events (que es un Observable)
    return this.router.events

      // usamos Pipe para modificar la info que nos llega
      .pipe(

        // usamos Filter y Map para extraer la data (que está en ActivationEnd)
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),
      );
   }
}
