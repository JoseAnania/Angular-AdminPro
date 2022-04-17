/* Componente creado para manejar la lógica de las páginas exclusivas de usuarios Legueados */

import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  // inyectamos el Servicio que nos permite usar la lógica de los Settings
  constructor(private settingService: SettingsService) { }

  ngOnInit(): void {

    // inicio del Script de archivos importados
    customInitFunctions();
  }

}
