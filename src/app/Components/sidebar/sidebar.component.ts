import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
// 🔑 Importar UserService y el modelo completo User
import { UserService, User } from '../../services/user/user.service'; 
// ❌ ELIMINAR: import { Usuario } from '../../models/usuario.model'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  // 🔑 CAMBIO CLAVE: Usaremos la interfaz completa 'User'
  usuario: User | null = null; 
  isCollapsed: boolean = false;
  @Output() sidebarToggle = new EventEmitter<boolean>();

  // 🔑 Inyectar UserService
  constructor(private authService: AuthService, private userService: UserService) {
    // 🔑 CORRECCIÓN: Usar el email de la sesión para buscar el usuario completo
    const session = this.authService.getUsuario();
    if (session) {
        this.usuario = this.userService.getUserByEmail(session.email) || null;
    }
  }

  get rol(): string | null {
    // 🔑 El rol se mantiene en el modelo User
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