import { Component, Input } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-perfil-tabs',
  templateUrl: './perfil-tabs.component.html',
  styleUrls: ['./perfil-tabs.component.css'],
})
export class PerfilTabsComponent {
  @Input() usuario: Usuario | null = null;
  seccionActiva = 'info';

  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }
}
