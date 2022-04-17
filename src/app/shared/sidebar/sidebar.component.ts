import { Component, OnInit } from '@angular/core';
import { SiderbarService } from '../../services/siderbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  // creamos una propiedad arreglo vacío que luego llenaremos
  menuItems: any[];

  // inyectamos el servicio
  constructor(private sidebarService: SiderbarService) { 

    // llenamos el menu 
    this.menuItems = sidebarService.menu;
  }

  ngOnInit(): void {
  }

}
