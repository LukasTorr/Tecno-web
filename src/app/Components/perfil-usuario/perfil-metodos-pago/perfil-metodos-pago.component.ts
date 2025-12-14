import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
// 🔑 Importar UserService y el modelo completo User
import { UserService, User } from '../../../services/user/user.service'; 
// ❌ ELIMINAR: import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-metodos-pago',
  templateUrl: './perfil-metodos-pago.component.html',
  styleUrls: ['./perfil-metodos-pago.component.css'],
})
export class PerfilMetodosPagoComponent implements OnInit {
  // 🔑 CAMBIO CLAVE: Usaremos la interfaz completa 'User'
  usuario: User | null = null; 

  // 🔑 Inyectar UserService
  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    // 🔑 CORRECCIÓN: Usar el email de la sesión para buscar el usuario completo
    const session = this.authService.getUsuario();
    if (session) {
      this.usuario = this.userService.getUserByEmail(session.email) || null;
    }
  }

  // ... (el resto del código comentado o no se modifica) ...
}