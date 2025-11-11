import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model'; // si usas modelo aparte

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  usuario: Usuario | null = null;
  isCollapsed: boolean = false;
  @Output() sidebarToggle = new EventEmitter<boolean>();

  constructor(private authService: AuthService) {
    this.usuario = this.authService.getUsuario(); // obtiene usuario logueado
  }

  get rol(): string | null {
    return this.usuario ? this.usuario.rol : null;
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggle.emit(this.isCollapsed);
  }

  logout(): void {
    this.authService.logout();
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }
}

/*import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

}*/
