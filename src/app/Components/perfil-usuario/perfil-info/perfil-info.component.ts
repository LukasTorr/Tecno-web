import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
// 🔑 Importar UserService y el modelo completo User
import { UserService, User } from 'src/app/services/user/user.service'; 
// ❌ ELIMINAR: import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil-info',
  templateUrl: './perfil-info.component.html',
  styleUrls: ['./perfil-info.component.css'],
})
export class PerfilInfoComponent {
  // 🔑 CAMBIO CLAVE: El Input ahora es de tipo User
  @Input() usuario: User | null = null; 
  editando: boolean = false;

  // 🔑 Inyectar UserService
  constructor(private authService: AuthService, private userService: UserService) {}

  activarEdicion(): void {
    this.editando = true;
  }

  guardarCambios(): void {
    if (this.usuario) {
      // 🔑 CORRECCIÓN: Llamar a UserService
      this.userService.actualizarUsuario(this.usuario);
      alert('Datos actualizados con éxito');
      this.editando = false;
    }
  }

  cancelar(): void {
    this.editando = false;
    // 🔑 CORRECCIÓN: Recargar los valores originales desde UserService (para deshacer cambios)
    const session = this.authService.getUsuario();
    if (session) {
        this.usuario = this.userService.getUserByEmail(session.email) || this.usuario;
    }
  }
}