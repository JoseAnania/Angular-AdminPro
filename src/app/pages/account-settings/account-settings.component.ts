/* Componente creado para el manejo de la lógica del AccountSettings (cambio de Theme del usuario) */
import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  // inyectamos el servicio de las Settings
  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {

    // iniciamos con la selección del Theme con su check (llamamos al método desde el servicio)
    this.settingsService.checkCurrentTheme();
  }

  // método para cambiar el Theme (URL del Index.Html)
  changeTheme(theme: string) {

    // llamamos al servicio que tiene el método para cambiar el Theme (URL del Index.Html)
    this.settingsService.changeTheme(theme);
  }

}
