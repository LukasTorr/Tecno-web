import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil-info',
  templateUrl: './perfil-info.component.html',
  styleUrls: ['./perfil-info.component.css'],
})
export class PerfilInfoComponent implements OnInit {
  usuario: Usuario | null = null;
  editando: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
  }

  activarEdicion(): void {
    this.editando = true;
  }

  guardarCambios(): void {
    if (this.usuario) {
      // En un caso real, podrías actualizar estos campos con un servicio HTTP
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
      alert('Datos actualizados con éxito');
      this.editando = false;
    }
  }

  cancelar(): void {
    this.usuario = this.authService.getUsuario(); // recarga los valores originales
    this.editando = false;
  }
}
