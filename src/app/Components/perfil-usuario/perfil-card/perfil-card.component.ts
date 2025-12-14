import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
// 🔑 Importar UserService y el modelo completo User
import { UserService, User } from 'src/app/services/user/user.service';
// ❌ ELIMINAR: import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil-card',
  templateUrl: './perfil-card.component.html',
  styleUrls: ['./perfil-card.component.css'],
})
export class PerfilCardComponent {
  // 🔑 CAMBIO CLAVE: El Input ahora es de tipo User
  @Input() usuario: User | null = null; 

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // 🔑 Inyectar UserService
  constructor(private authService: AuthService, private userService: UserService) {}

  cambiarFoto(event: any) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = () => {
      if (this.usuario) {
        this.usuario.foto = lector.result as string;
        // 🔑 CORRECCIÓN: Llamar a UserService
        this.userService.actualizarUsuario(this.usuario); 
      }
    };
    lector.readAsDataURL(archivo);
  }
}