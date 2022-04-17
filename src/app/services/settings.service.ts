/* Servicio creado para manejar la lógica global de todo lo relacionado con Ajustes de usuario */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // creamos una propiedad que toma el Theme seleccionado
  private linkTheme = document.querySelector('#theme');

  constructor() { 

    // implementamos la selección del tema del usuario (que seleccionó en el AccountSetting en el LocalStorage)

    // obtenemos lo seleccionado y guardado en el LocalStorage
    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css'
    
    // enviamos la url construida
    this.linkTheme?.setAttribute('href', url);
  }

  // método para cambiar el Theme (URL del Index.Html)
  changeTheme(theme: string) {

    // construimos el url del Theme
    const url = `./assets/css/colors/${theme}.css`;
    
    // enviamos la url construida
    this.linkTheme?.setAttribute('href', url);

    // guardamos la selección en el Local Storage para mantener la selección del usuario
    localStorage.setItem('theme', url);
    // llamamos al método que agrega el Check
    this.checkCurrentTheme();
  }

  // método para establecer el Check (clase Working en Html) en el Theme Seleccionado
  checkCurrentTheme() {

    // creamos una propiedad que toma el Theme seleccionado (con el selector)
    const links = document.querySelectorAll('.selector');


    // recorremos todos los elementos que tengan el selector (es decir los Themes)
    links.forEach(elem => {

      // removemos el check 
      elem.classList.remove('working');

      // tomamos el valor del Theme (con el data-theme)
      const btnTheme = elem.getAttribute('data-theme');

       // construimos el url del Theme 
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;

      // tomamos el url del Theme que estaba seleccionado (el actual)
      const currentTheme = this.linkTheme?.getAttribute('href');

      // comparamos que sean o no los mismos
      if (btnThemeUrl === currentTheme) {

        // agregamos el check (clase working en html)
        elem.classList.add('working');
      }
    });
  }
}
