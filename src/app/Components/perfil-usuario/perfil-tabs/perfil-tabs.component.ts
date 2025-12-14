import { Component, Input } from '@angular/core';
import { User } from '../../../services/user/user.service';

@Component({
  selector: 'app-perfil-tabs',
  templateUrl: './perfil-tabs.component.html',
  styleUrls: ['./perfil-tabs.component.css'],
})
export class PerfilTabsComponent {
  @Input() usuario: User | null = null;
  seccionActiva = 'info';

  cambiarSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }
}
