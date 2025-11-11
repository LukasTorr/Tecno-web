import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: Usuario | null = null;

  ngOnInit(): void {}

  isSidebarCollapsed = false;

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  reservas = [
    {
      peliculaTitulo: 'Avatar 2',
      fecha: '10/11/2025',
      sala: 1,
      asientos: ['A1', 'A2'],
    },
    {
      peliculaTitulo: 'Spider-Man',
      fecha: '05/11/2025',
      sala: 2,
      asientos: ['B5', 'B6'],
    },
  ];

  favoritos = ['Avatar 2', 'Matrix Resurrections'];
}

/*import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: Usuario | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();

    // Si no hay sesión iniciada, redirige a login
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
  }

  editarPerfil(): void {
    alert('Función para editar perfil próximamente disponible.');
  }

  cerrarSesion(): void {
    this.authService.logout();
  }
}

/*import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent {

}*/
