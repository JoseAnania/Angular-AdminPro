/* Componente creado para manejar la lógica de las páginas exclusivas de usuarios Legueados */

import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SiderbarService } from '../services/siderbar.service';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  // inyectamos el Servicio que nos permite usar la lógica de los Settings
  // inyectamos el Servicio que carga el Menú Lateral según Rol de Usuario
  constructor(private settingService: SettingsService,
              private sidebarService: SiderbarService) { }

  ngOnInit(): void {

    // inicio del Script de archivos importados
    customInitFunctions();

    // cargamos el Menú Lateral según el Rol del Usuario
    this.sidebarService.cargarMenu();
  }

}
