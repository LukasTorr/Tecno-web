import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
// 🔑 Importar UserService y el modelo completo User
import { UserService, User } from '../../services/user/user.service'; 
// ❌ ELIMINAR: import { Usuario } from '../../models/usuario.model'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit {
  // 🔑 CAMBIO CLAVE: Usaremos la interfaz completa 'User' (que incluye ID, password, etc.)
  usuario: User | null = null; 

  constructor(
      private authService: AuthService,
      private userService: UserService // 🔑 Inyectar UserService
  ) {}

  ngOnInit(): void {
    // 🔑 CORRECCIÓN: Usamos el email de la sesión para buscar el usuario completo en UserService
    const session = this.authService.getUsuario();
    if (session) {
      this.usuario = this.userService.getUserByEmail(session.email) || null;
    }
  }

  isSidebarCollapsed = false;

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}