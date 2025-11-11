import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-tabs',
  templateUrl: './perfil-tabs.component.html',
  styleUrls: ['./perfil-tabs.component.css'],
})
export class PerfilTabsComponent {
  seccionActiva = 'info';

  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }
}
