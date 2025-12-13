import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil-info',
  templateUrl: './perfil-info.component.html',
  styleUrls: ['./perfil-info.component.css'],
})
export class PerfilInfoComponent {
  @Input() usuario: Usuario | null = null;
  editando: boolean = false;

  constructor(private authService: AuthService) {}

  activarEdicion(): void {
    this.editando = true;
  }

  guardarCambios(): void {
    if (this.usuario) {
      this.authService.actualizarUsuario(this.usuario);
      alert('Datos actualizados con éxito');
      this.editando = false;
    }
  }

  cancelar(): void {
    this.usuario = this.authService.getUsuario(); // recarga los valores originales
    this.editando = false;
  }
}
